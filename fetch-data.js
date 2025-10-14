var dict = null;
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./webdict.json");
  if (response.ok) {
    dict = await response.json();
    queryDict(dict, "") // Run first blank query to populate search results with all words
  }
});
