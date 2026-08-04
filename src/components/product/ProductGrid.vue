<template>
  <div>
    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy="$emit('buy', $event)"
        @open-modal="$emit('open-modal', $event)"
      />
    </div>

    <div v-if="products.length === 0" class="no-results">
      <p>Картины не найдены</p>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-muted);
  font-size: 18px;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 360px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
