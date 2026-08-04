<template>
  <button 
    class="buy-button" 
    :class="buttonClass"
    @click="handleBuy"
  >
    <span v-if="product.buttonState === 'buy'" class="button-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </span>
    <span v-else-if="product.buttonState === 'processing'" class="button-icon spinner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
    </span>
    <span v-else-if="product.buttonState === 'in-cart'" class="button-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span class="button-text">{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  name: 'ProductBuyButton',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttonClass() {
      return `btn-${this.product.buttonState}`;
    },
    buttonText() {
      switch (this.product.buttonState) {
        case 'buy':
          return 'Купить';
        case 'processing':
          return 'Обрабатывается';
        case 'in-cart':
          return 'В корзине';
        default:
          return 'Купить';
      }
    }
  },
  methods: {
    handleBuy() {
      if (this.product.buttonState === 'buy') {
        this.$emit('buy', this.product.id);
      } else if (this.product.buttonState === 'in-cart') {
        this.$emit('remove-from-cart', this.product.id);
      }
    }
  }
};
</script>

<style scoped>
.buy-button {
  width: 118px;
  height: 48px;
  padding: 0 8px;
  border: none;
  border-radius: 3px;
  font-family: var(--font-serif);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  background: var(--color-btn-normal);
  color: #fff;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
}

.btn-buy:hover:not(:disabled) {
  background: var(--color-btn-hover);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.button-icon svg {
  width: 16px;
  height: 16px;
}

.button-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-processing {
  cursor: not-allowed;
  background: var(--color-btn-disabled-bg);
  color: var(--color-btn-disabled-text);
}

.btn-in-cart {
  cursor: default;
  background: var(--color-btn-cart);
  color: #fff;
}

@media (max-width: 480px) {
  .buy-button {
    width: 96px;
    height: 40px;
    font-size: 11px;
  }
}
</style>
