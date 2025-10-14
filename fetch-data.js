let dict = null;
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./webdict.json");
  if (response.ok) {
    dict = await response.json();
    queryData(dict, "")
  }
});
