<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-body">
        <div class="modal-left">
          <div class="modal-slider">
            <div class="slider-container">
              <div class="slider-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <img 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  :src="image" 
                  :alt="product.name"
                  class="slider-image"
                />
              </div>
            </div>
            
            <button 
              class="slider-arrow slider-prev" 
              @click="prevSlide"
              :disabled="currentIndex === 0"
            >
              ‹
            </button>
            <button 
              class="slider-arrow slider-next" 
              @click="nextSlide"
              :disabled="currentIndex === product.images.length - 1"
            >
              ›
            </button>
          </div>
          
          <div class="modal-thumbnails">
            <img 
              v-for="(image, index) in product.images" 
              :key="index"
              :src="image" 
              :alt="product.name"
              class="thumbnail"
              :class="{ active: index === currentIndex }"
              @click="goToSlide(index)"
            />
          </div>
        </div>
        
        <div class="modal-right">
          <h2 class="modal-title">{{ product.name }}</h2>
          <p class="modal-author">{{ product.author }}</p>
          <p class="modal-description">{{ product.description }}</p>
          
          <div v-if="product.buttonState === 'sold'" class="sold-row">
            <span class="sold-label">Продана на аукционе</span>
          </div>
          <div v-else class="modal-price-row">
            <div class="modal-price-block">
              <span v-if="product.oldPrice" class="modal-price-old">{{ formatPrice(product.oldPrice) }} $</span>
              <span class="modal-price-current">{{ formatPrice(product.price) }} $</span>
            </div>
            <ProductBuyButton 
              :product="product" 
              @buy="$emit('buy', $event)"
              @remove-from-cart="$emit('remove-from-cart', $event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBuyButton from './ProductBuyButton.vue';

export default {
  name: 'ProductModal',
  components: {
    ProductBuyButton
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  computed: {
    currentImage() {
      return this.product.images[this.currentIndex];
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ru-RU');
    },
    closeModal() {
      this.$emit('close');
      this.currentIndex = 0;
    },
    nextSlide() {
      if (this.currentIndex < this.product.images.length - 1) {
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    goToSlide(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(43, 36, 32, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  font-family: var(--font-serif, Georgia, serif);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.35);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  color: var(--color-dark, #2b2420);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.modal-close:hover {
  background: var(--color-dark, #2b2420);
  color: white;
  transform: rotate(90deg);
}

.modal-body {
  display: flex;
  min-height: 500px;
}

.modal-left {
  width: 55%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background: #f9f8f6;
  border-radius: 16px 0 0 16px;
}

.modal-right {
  width: 45%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-slider {
  position: relative;
  width: 100%;
  height: 380px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.slider-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
  height: 100%;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 5;
  color: var(--color-dark, #2b2420);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.slider-arrow:hover:not(:disabled) {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

.slider-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.slider-prev {
  left: 12px;
}

.slider-next {
  right: 12px;
}

.modal-thumbnails {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding: 0 4px;
}

.thumbnail {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.thumbnail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.thumbnail.active {
  border-color: var(--color-dark, #2b2420);
  box-shadow: 0 0 0 2px rgba(43, 36, 32, 0.1);
}

.modal-title {
  font-size: 30px;
  font-weight: 700;
  color: var(--color-dark, #2b2420);
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.modal-author {
  font-size: 18px;
  color: var(--color-muted, #6b6258);
  margin: 0 0 24px 0;
  font-style: italic;
}

.modal-description {
  font-size: 16px;
  color: var(--color-muted, #6b6258);
  line-height: 1.7;
  margin: 0 0 32px 0;
}

.modal-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
}

.modal-price-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-price-current {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-dark, #2b2420);
}

.modal-price-old {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-muted, #9a938a);
  text-decoration: line-through;
}

.sold-row {
  margin-top: auto;
  padding: 16px 0;
}

.sold-label {
  font-size: 16px;
  color: var(--color-muted);
  font-style: italic;
}

@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
    min-height: auto;
  }

  .modal-left {
    width: 100%;
    border-radius: 16px 16px 0 0;
  }

  .modal-right {
    width: 100%;
    padding: 28px;
  }

  .modal-slider {
    height: 300px;
  }

  .modal-title {
    font-size: 26px;
  }

  .modal-description {
    font-size: 15px;
  }

  .modal-price-row {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .modal-content {
    max-height: 95vh;
    border-radius: 12px;
  }

  .modal-left {
    padding: 16px;
  }

  .modal-right {
    padding: 20px;
  }

  .modal-slider {
    height: 240px;
  }

  .thumbnail {
    width: 56px;
    height: 56px;
  }

  .modal-title {
    font-size: 22px;
  }

  .modal-author {
    font-size: 16px;
  }

  .modal-description {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .modal-price-current {
    font-size: 24px;
  }

  .slider-arrow {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    top: 12px;
    right: 12px;
  }
}
</style>
