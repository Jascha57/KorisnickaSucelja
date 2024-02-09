export const addToCart = (productId: string) => {
  const currentCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  const newCart = [...currentCart, productId];
  sessionStorage.setItem('cart', JSON.stringify(newCart));
  window.dispatchEvent(new CustomEvent('cartChange'));
  updateCartCount();
};

export const removeFromCart = (productId: string) => {
  const currentCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  const newCart = currentCart.filter((id: string) => id !== productId);
  sessionStorage.setItem('cart', JSON.stringify(newCart));
  window.dispatchEvent(new CustomEvent('cartChange'));
  updateCartCount();
};

export const getCart = () => {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
};

export const updateCartCount = () => {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    const cart = getCart();
    cartCountElement.textContent = String(cart.length);
  }
};