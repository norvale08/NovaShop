<template>
  <div class="product-card">
    <div class="product-image" @click="openModal">
      <img :src="product.images[0]" :alt="product.name" />
    </div>
    <div class="product-info">
      <h3 class="product-name" @click="openModal">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }} ₽</p>
      <button 
        class="buy-button" 
        :class="buttonClass"
        @click="handleBuy"
        :disabled="product.buttonState !== 'buy'"
      >
        <span v-if="product.buttonState === 'buy'" class="button-icon">🛒</span>
        <span v-else-if="product.buttonState === 'processing'" class="button-icon spinner">⟳</span>
        <span v-else class="button-icon">✓</span>
        {{ buttonText }}
      </button>
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
      if (this.product.buttonState !== 'buy') return;
      this.$emit('buy', this.product.id);
    },
    openModal() {
      this.$emit('open-modal', this.product);
    }
  }
};
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-image:hover img {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  cursor: pointer;
  transition: color 0.2s;
}

.product-name:hover {
  color: #e63946;
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: #e63946;
  margin: 0 0 12px 0;
}

.buy-button {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button-icon {
  font-size: 18px;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-buy {
  background: #e63946;
  color: white;
}

.btn-buy:hover:not(:disabled) {
  background: #d62839;
}

.btn-processing {
  background: #f4a261;
  color: white;
  cursor: not-allowed;
}

.btn-in-cart {
  background: #2a9d8f;
  color: white;
  cursor: default;
}

.buy-button:disabled {
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .product-image {
    height: 160px;
  }

  .product-info {
    padding: 12px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 18px;
  }

  .buy-button {
    padding: 10px 16px;
    font-size: 13px;
  }
}
</style>
