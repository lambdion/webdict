let data = null;
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://example.org/products.json");
  if (response.ok) {
    data = await response.json();
  }
});
