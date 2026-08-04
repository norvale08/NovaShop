<template>
  <header class="header">
    <div class="container header-inner">
      <nav class="nav">
        <a href="#" class="nav-link">Каталог</a>
        <a href="#" class="nav-link">Доставка</a>
        <a href="#" class="nav-link">Оплата</a>
        <a href="#" class="nav-link">Контакты</a>
        <a href="#" class="nav-link">О компании</a>
      </nav>
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Поиск по названию картины"
          v-model="query"
          @input="onInput"
        />
        <button class="search-button">Найти</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      query: ''
    };
  },
  methods: {
    onInput() {
      this.$emit('search', this.query.toLowerCase().trim());
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  box-sizing: border-box;
  height: 97px;
  margin-top: -1px;
  border: 1px solid hsla(0, 0%, 88%, 1);
  background: var(--color-surface);
}

.header-inner {
  height: 100%;
  padding-left: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.search-container {
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
}

.search-input {
  width: 200px;
  padding: 10px 14px;
  border: 1px solid #c9c5bd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-family: var(--font-serif);
  font-size: 14px;
  font-style: italic;
  background: var(--color-surface);
  color: var(--color-dark);
}

.search-input::placeholder {
  color: #b3aca2;
  font-style: italic;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-dark);
}

.search-button {
  padding: 10px 22px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: var(--color-btn-cart);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.search-button:hover {
  background: var(--color-btn-hover);
}

@media (max-width: 768px) {
  .header {
    height: auto;
  }

  .header-inner {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 24px;
    height: auto;
  }

  .nav {
    justify-content: center;
  }

  .search-container {
    width: 100%;
  }

  .search-input {
    flex: 1;
    width: auto;
  }
}

@media (max-width: 480px) {
  .header-inner {
    padding: 16px;
  }

  .nav {
    gap: 16px;
  }
}
</style>
