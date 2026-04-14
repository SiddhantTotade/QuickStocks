const YahooFinance = require("yahoo-finance2").default;
const axios = require("axios");
const cheerio = require("cheerio");

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

const fetchGoogleFinance = async (symbol, exchange = "NSE") => {
  try {
    const url = `https://www.google.com/finance/quote/${symbol}:${exchange === "BSE" ? "BOM" : exchange}`;
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    let priceText = $(".YMlquc").text() || $(".fxKbKc").text() || $(".YMlSqc").text();
    const cmp = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    let peRatio = "N/A";
    let earnings = "N/A";

    const stats = $(".gyFHrc, .mBE79e, .gy7Yac");
    stats.each((i, el) => {
      const label = $(el).find('div').first().text().trim();
      const value = $(el).find(".P6K39c, .P63S7b, .P6uYm").first().text().trim();

      if (label === "P/E ratio") {
        peRatio = value || "N/A";
      } else if (label === "EPS" || label === "Earnings per share") {
        earnings = value || "N/A";
      }
    });

    if (peRatio === "N/A" || earnings === "N/A") {
      $('*').each((i, el) => {
        const text = $(el).contents().filter(function () { return this.nodeType === 3; }).first().text().trim();
        if (peRatio === "N/A" && text === "P/E ratio") {
          const val = $(el).parent().find(".P6K39c, .P63S7b").text().trim();
          if (val && val !== "—") peRatio = val;
        }
        if (earnings === "N/A" && (text === "EPS" || text === "Earnings per share")) {
          const val = $(el).parent().find(".P6K39c, .P63S7b").text().trim();
          if (val && val !== "—") earnings = val;
        }
      });
    }

    if (isNaN(cmp)) return null;

    return {
      cmp,
      peRatio,
      earnings,
    };
  } catch (error) {
    return null;
  }
};

const fetchYahoo = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote) return null;

    return {
      cmp: quote.regularMarketPrice || null,
      peRatio: quote.trailingPE ? quote.trailingPE.toFixed(2) : "N/A",
      earnings: quote.epsTrailingTwelveMonths
        ? quote.epsTrailingTwelveMonths.toFixed(2)
        : "N/A",
    };
  } catch (error) {
    return null;
  }
};

const scrapeStockData = async (ticker) => {
  try {
    let data = null;

    const mergeData = (primary, secondary) => {
      if (!primary) return secondary;
      if (!secondary) return primary;
      return {
        cmp: primary.cmp || secondary.cmp || 0,
        peRatio: primary.peRatio !== "N/A" ? primary.peRatio : secondary.peRatio,
        earnings: primary.earnings !== "N/A" ? primary.earnings : secondary.earnings,
      };
    };

    if (!/^\d+$/.test(ticker)) {
      data = await fetchGoogleFinance(ticker, "NSE");
      if (!data || data.peRatio === "N/A" || data.earnings === "N/A") {
        const fallback = await fetchYahoo(`${ticker}.NS`);
        data = mergeData(data, fallback);
      }
    }

    if (!data && /^\d+$/.test(ticker)) {
      data = await fetchYahoo(`${ticker}.BO`);
      if (!data || data.peRatio === "N/A" || data.earnings === "N/A") {
        const fallback = await fetchGoogleFinance(ticker, "BSE");
        data = mergeData(data, fallback);
      }
    }

    if (!data) {
      data = await fetchGoogleFinance(ticker, "BSE");
      if (!data || data.peRatio === "N/A" || data.earnings === "N/A") {
        const fallback = await fetchYahoo(`${ticker}.NS`);
        data = mergeData(data, fallback);
      }
    }

    if (!data) {
      throw new Error("No price data found");
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${ticker}:`, error.message);

    return {
      cmp: 0,
      peRatio: "N/A",
      earnings: "N/A",
    };
  }
};

module.exports = { scrapeStockData };
