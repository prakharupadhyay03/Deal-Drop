import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  // Mock Mode for testing without using credits
  if (process.env.MOCK_SCRAPE === "true") {
    console.log("🛠️ Mock Scrape enabled for:", url);
    const mockPrice = Math.floor(Math.random() * (3000 - 2000) + 2000); // Random price between 2000 and 3000
    return {
      productName: "Mock Product (Testing)",
      currentPrice: mockPrice,
      currencyCode: "INR",
      productImageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
    };
  }

  try {
    const result = await firecrawl.extract({
      urls: [url],
      prompt:
        "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
      schema: {
        type: "object",
        properties: {
          productName: { type: "string" },
          currentPrice: { type: "number" },
          currencyCode: { type: "string" },
          productImageUrl: { type: "string" },
        },
        required: ["productName", "currentPrice"],
      },
    });

    // In v2 extract(), result.data contains the extracted data. 
    // If multiple URLs are passed, result.data is an array.
    const extractedData = Array.isArray(result.data) ? result.data[0] : result.data;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}