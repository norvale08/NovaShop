const STORAGE_KEY = 'cartState';

export function getCartState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function isInCart(productId) {
  const state = getCartState();
  return state[productId] === true;
}

export function saveCartState(products) {
  const state = {};
  products.forEach(p => {
    state[p.id] = p.inCart;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
