<template>
  <footer class="footer">
    <div class="container footer-inner">
      <nav class="nav footer-nav">
        <a href="#" class="nav-link">Каталог</a>
        <a href="#" class="nav-link">Доставка</a>
        <a href="#" class="nav-link">Оплата</a>
        <a href="#" class="nav-link">Контакты</a>
        <a href="#" class="nav-link">О компании</a>
      </nav>
      <div class="footer-contacts">
        <span class="contact-item">
          <svg class="contact-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +7 (812) 555-55-55
        </span>
        <span class="contact-item">
          <svg class="contact-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          г. Санкт-Петербург, ул. Ефимова, 3
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer {
  background: var(--color-footer-bg);
  border-top: 1px solid #d8d5cf;
  height: 96px;
  padding: 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 16px;
  height: 100%;
  padding-left: 140px;
}

/* Inherits gap: 36px from base .nav to match header */

.footer-contacts {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-dark);
  white-space: nowrap;
}

.contact-icon {
  flex-shrink: 0;
}

@media (max-width: 1100px) {
  .footer-inner {
    padding-left: 40px;
  }
}

@media (max-width: 768px) {
  .footer {
    height: auto;
    min-height: 96px;
  }

  .footer-inner {
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    padding: 20px 24px;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 16px;
  }

  .footer-nav {
    gap: 12px;
  }

  .footer-contacts {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
