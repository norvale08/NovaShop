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
        <ProductBuyButton 
          :product="product" 
          @buy="$emit('buy', $event)"
          @remove-from-cart="$emit('remove-from-cart', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductBuyButton from './ProductBuyButton.vue';

export default {
  name: 'ProductCard',
  components: {
    ProductBuyButton
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ru-RU');
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
  border: 1px solid hsla(0, 0%, 91%, 1);
  box-sizing: border-box;
  margin: 0 auto;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: hsla(0, 0%, 81%, 1);
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
  transition: transform 0.4s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 16px 16px;
}

.is-sold .product-image img {
  filter: brightness(0.7);
  opacity: 0.6;
}

.product-name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
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

}
</style>
