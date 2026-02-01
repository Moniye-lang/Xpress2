// public/productWorker.js
self.onmessage = function(e) {
  const { products, search, category } = e.data;
  
  const results = products.filter(item => {
    const matchesCat = category === "All" || item.Category === category;
    const matchesSearch = item.Pname.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  self.postMessage(results);
};