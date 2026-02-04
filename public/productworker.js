// public/productWorker.js
self.onmessage = (e) => {
  const { products, search, category } = e.data;

  const filtered = products.filter((item) => {
    const matchesCategory = category === "All" || item.Category === category;
    const matchesSearch = item.Pname.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  self.postMessage(filtered);
};