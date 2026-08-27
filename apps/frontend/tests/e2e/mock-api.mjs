import http from "http";

const PRODUCTS = [
  {
    _id: "prod-1",
    name: "Leather Belt",
    slug: "leather-belt",
    category: { _id: "cat-1", name: "Belts", slug: "belts", subcategories: [], image: { url: "", publicId: "" }, description: "" },
    price: 1500,
    thumbnail: { url: "https://placehold.co/200x200.png", publicId: "thumb1" },
    images: [],
    description: "A fine leather belt",
    stock: 10,
  },
  {
    _id: "prod-2",
    name: "Leather Wallet",
    slug: "leather-wallet",
    category: { _id: "cat-2", name: "Wallets", slug: "wallets", subcategories: [], image: { url: "", publicId: "" }, description: "" },
    price: 2500,
    thumbnail: { url: "https://placehold.co/200x200.png", publicId: "thumb2" },
    images: [],
    description: "A slim leather wallet",
    stock: 5,
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const url = req.url ?? "";

  if (url === "/api/v1/products" || url.startsWith("/api/v1/products?")) {
    return res.end(JSON.stringify(PRODUCTS));
  }

  const productMatch = url.match(/^\/api\/v1\/products\/([^/?]+)/);
  if (productMatch) {
    const id = productMatch[1];
    const product = PRODUCTS.find((p) => p._id === id || p.slug === id);
    if (product) return res.end(JSON.stringify(product));
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Not found" }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(4001, () => console.log("Mock API listening on http://localhost:4001"));
