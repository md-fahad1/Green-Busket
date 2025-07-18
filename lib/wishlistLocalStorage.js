const getLocalStorageValue = () => {
  let storedValue;
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    storedValue = localStorage?.getItem("wishlist");
  }

  if (!storedValue) {
    return [];
  }
  return JSON.parse(storedValue);
};

const setLocalStorageValue = (product) => {
  const storedValue = getLocalStorageValue();

  const isExist = storedValue.find((pd) => pd.id === product.id);

  if (!isExist) {
    storedValue.push(product);
    localStorage.setItem("wishlist", JSON.stringify(storedValue));
  }
};

const removeLocalStorageValue = (id) => {
  const storedProduct = getLocalStorageValue();

  const isExist = storedProduct.find((pd) => pd.id === id);

  if (isExist) {
    const remainingProduct = storedProduct.filter((pd) => pd.id !== id);
    localStorage.removeItem("wishlist");
    localStorage.setItem("wishlist", JSON.stringify(remainingProduct));
  }
};

export { getLocalStorageValue, setLocalStorageValue, removeLocalStorageValue };
