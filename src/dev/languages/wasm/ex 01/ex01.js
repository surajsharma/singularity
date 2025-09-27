async function fetchAndInstantiate(url, importObject) {
  const response = await fetch(url);
  const bytes = await response.arrayBuffer();
  const results = await WebAssembly.instantiate(bytes, importObject);
  return results.instance;
}
