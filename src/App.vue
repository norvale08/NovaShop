<template>
  <div class="app">
    <AppHeader @search="handleSearch" />

    <main class="main">
      <div class="container">
        <h1 class="page-title">Картины эпохи Возрождения</h1>
        <ProductGrid
          :products="filteredProducts"
          @buy="handleBuy"
          @remove-from-cart="handleRemoveFromCart"
          @open-modal="openModal"
        />
      </div>
    </main>

    <AppFooter />

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import ProductGrid from './components/product/ProductGrid.vue';
import ProductModal from './components/product/ProductModal.vue';
import { products } from './data/products.js';
import { isInCart, saveCartState } from './utils/cartStorage.js';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductGrid,
    ProductModal
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      selectedProduct: null,
      isModalOpen: false
    };
  },
  created() {
    this.products = products.map(p => {
      const inCart = isInCart(p.id);
      return {
        ...p,
        inCart,
        buttonState: inCart ? 'in-cart' : (p.buttonState === 'sold' ? 'sold' : 'buy')
      };
    });
    this.filteredProducts = [...this.products];
    console.log('Product IDs:', this.products.map(p => p.id));
  },
  methods: {
    handleSearch(query) {
      if (!query) {
        this.filteredProducts = [...this.products];
      } else {
        this.filteredProducts = this.products.filter(p =>
          p.name.toLowerCase().includes(query)
        );
      }
    },
    handleBuy(productId) {
      const product = this.products.find(p => p.id === productId);
      if (!product || product.buttonState !== 'buy') return;

      product.buttonState = 'processing';
      console.log(`Adding product ${product.id} (${product.name}) to cart...`);

      setTimeout(() => {
        product.buttonState = 'in-cart';
        product.inCart = true;
        saveCartState(this.products);
        console.log(`Added product ${product.id} (${product.name}) to cart`);
        console.log('Cart product IDs:', this.products.filter(p => p.inCart).map(p => p.id));
      }, 2000);
    },
    handleRemoveFromCart(productId) {
      const product = this.products.find(p => p.id === productId);
      if (!product) return;

      product.buttonState = 'processing';
      console.log(`Removing product ${product.id} (${product.name}) from cart...`);

      setTimeout(() => {
        product.buttonState = 'buy';
        product.inCart = false;
        saveCartState(this.products);
        console.log(`Removed product ${product.id} (${product.name}) from cart`);
        console.log('Cart product IDs:', this.products.filter(p => p.inCart).map(p => p.id));
      }, 2000);
    },
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProduct = null;
      document.body.style.overflow = '';
    }
  }
};
</script>

<style scoped>
.main {
  flex: 1;
  padding: 32px 0 48px;
   background: var(--color-surface);
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: var(--color-dark);
  margin: 0 0 36px 0;
}

@media (max-width: 480px) {
  .page-title {
    font-size: 18px;
  }

  .main {
    padding: 20px 0 32px;
  }
}
</style>
