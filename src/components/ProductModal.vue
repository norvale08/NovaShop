<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">×</button>
      
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
        
        <div class="slider-dots">
          <span 
            v-for="(image, index) in product.images" 
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
      
      <div class="modal-info">
        <h2 class="modal-title">{{ product.name }}</h2>
        <p class="modal-description">{{ product.description }}</p>
        <p class="modal-price">{{ formatPrice(product.price) }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

.modal-slider {
  position: relative;
  width: 100%;
  height: 300px;
  background: #f5f5f5;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
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
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 5;
}

.slider-arrow:hover:not(:disabled) {
  background: white;
}

.slider-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slider-prev {
  left: 12px;
}

.slider-next {
  right: 12px;
}

.slider-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.2s;
}

.dot.active {
  background: white;
}

.modal-info {
  padding: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.modal-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.modal-price {
  font-size: 28px;
  font-weight: 700;
  color: #e63946;
  margin: 0;
}

@media (max-width: 480px) {
  .modal-content {
    max-height: 95vh;
  }

  .modal-slider {
    height: 250px;
  }

  .modal-info {
    padding: 16px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-description {
    font-size: 14px;
  }

  .modal-price {
    font-size: 24px;
  }

  .slider-arrow {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
}
</style>
