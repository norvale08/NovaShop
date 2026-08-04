<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">Banki.shop</h1>
        <div class="search-container">
          <input 
            type="text" 
            class="search-input" 
            placeholder="Поиск товаров..." 
            v-model="searchQuery"
            @input="handleSearch"
          />
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="products-grid">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
            @buy="handleBuy"
            @open-modal="openModal"
          />
        </div>
        
        <div v-if="filteredProducts.length === 0" class="no-results">
          <p>Товары не найдены</p>
        </div>
      </div>
    </main>

    <ProductModal 
      :product="selectedProduct"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ProductCard from './components/ProductCard.vue';
import ProductModal from './components/ProductModal.vue';
import { products } from './data/products.js';

export default {
  name: 'App',
  components: {
    ProductCard,
    ProductModal
  },
  data() {
    return {
      products: [],
      searchQuery: '',
      filteredProducts: [],
      selectedProduct: null,
      isModalOpen: false
    };
  },
  created() {
    this.loadCartState();
    this.products = products.map(p => ({
      ...p,
      inCart: this.isProductInCart(p.id),
      buttonState: this.isProductInCart(p.id) ? 'in-cart' : 'buy'
    }));
    this.filteredProducts = [...this.products];
  },
  methods: {
    isProductInCart(productId) {
      const cartState = localStorage.getItem('cartState');
      if (cartState) {
        const parsed = JSON.parse(cartState);
        return parsed[productId] === true;
      }
      return false;
    },
    loadCartState() {
      const cartState = localStorage.getItem('cartState');
      if (cartState) {
        const parsed = JSON.parse(cartState);
        this.products = products.map(p => ({
          ...p,
          inCart: parsed[p.id] === true,
          buttonState: parsed[p.id] === true ? 'in-cart' : 'buy'
        }));
      }
    },
    saveCartState() {
      const cartState = {};
      this.products.forEach(p => {
        cartState[p.id] = p.inCart;
      });
      localStorage.setItem('cartState', JSON.stringify(cartState));
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
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

      setTimeout(() => {
        product.buttonState = 'in-cart';
        product.inCart = true;
        this.saveCartState();
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f8f9fa;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 0;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #e63946;
  margin: 0;
  white-space: nowrap;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #e63946;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
}

.main {
  flex: 1;
  padding: 32px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    align-items: stretch;
  }

  .logo {
    text-align: center;
  }

  .search-container {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 12px 0;
  }

  .logo {
    font-size: 20px;
  }

  .search-input {
    padding: 10px 36px 10px 12px;
    font-size: 13px;
  }

  .main {
    padding: 20px 0;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .container {
    padding: 0 16px;
  }
}

@media (max-width: 360px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
