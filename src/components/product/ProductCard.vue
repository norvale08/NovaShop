<template>
  <div class="product-card" :class="{ 'is-sold': product.buttonState === 'sold' }">
    <div class="product-image" @click="openModal">
      <img :src="product.images[0]" :alt="product.name" />
    </div>
    <div class="product-body">
      <h3 class="product-name" @click="openModal">{{ product.name }}</h3>
      <p class="product-author">{{ product.author }}</p>

      <div v-if="product.buttonState === 'sold'" class="sold-row">
        <span class="sold-label">Продана на аукционе</span>
      </div>
      <div v-else class="price-row">
        <div class="price-block">
          <span v-if="product.oldPrice" class="price-old">{{ formatPrice(product.oldPrice) }} $</span>
          <span class="price-current">{{ formatPrice(product.price) }} $</span>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
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
    formatPrice(price) {
      return price.toLocaleString('ru-RU');
    },
    handleBuy() {
      if (this.product.buttonState === 'buy') {
        this.$emit('buy', this.product.id);
      } else if (this.product.buttonState === 'in-cart') {
        this.$emit('remove-from-cart', this.product.id);
      }
    },
    openModal() {
      this.$emit('open-modal', this.product);
    }
  }
};
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 280px;
  min-height: 328px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  border: 1px solid hsla(0, 0%, 91%, 1);
  box-sizing: border-box;
  margin: 0 auto;
}

.product-image {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  cursor: pointer;
  background: #d8d5cf;
  border-radius: 2px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 16px 16px;
}

.is-sold .product-image img {
  filter: grayscale(1);
  opacity: 0.7;
}

.product-name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0;
  vertical-align: middle;
  color: hsla(0, 4%, 20%, 1);
  margin: 0 0 2px 0;
  cursor: pointer;
}

.is-sold .product-name {
  color: var(--color-muted);
}

.product-author {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0;
  vertical-align: middle;
  color: hsla(0, 4%, 20%, 1);
  margin: 0 0 12px 0;
}

.is-sold .product-author {
  color: var(--color-muted);
}

.price-row {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-old {
  font-size: 12px;
  color: var(--color-muted);
  text-decoration: line-through;
}

.price-current {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-dark);
}

.sold-row {
  margin-top: auto;
}

.sold-label {
  font-size: 14px;
  color: var(--color-muted);
  font-style: italic;
}

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

.buy-button:disabled {
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .product-name {
    font-size: 13px;
  }

  .product-author {
    font-size: 12px;
    margin-bottom: 8px;
  }

  .price-current {
    font-size: 13px;
  }

  .price-old {
    font-size: 11px;
  }

  .buy-button {
    width: 96px;
    height: 40px;
    font-size: 11px;
  }
}
</style>
