document.addEventListener('DOMContentLoaded', function() {
  initSite();
});

function initSite() {
  initializeNavigation();

  if (document.querySelector('.champions-carousel')) {
    initChampionsCarousel();
  }

  createScrollIndicator();
}

function initializeNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hamburger menu
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      const icon = toggle.querySelector('i');
      icon.classList.toggle('fa-bars', !isOpen);
      icon.classList.toggle('fa-times', isOpen);
    });

    // Close when a nav link is tapped
    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
        const icon = toggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });
  }
}

function initChampionsCarousel() {
  const carousel = document.querySelector('.champions-carousel');
  const cards = document.querySelectorAll('.champion-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;

  function scrollTo(index) {
    if (!cards[index]) return;
    const cardWidth = cards[0].offsetWidth + 24;
    carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) scrollTo(--currentIndex); });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < cards.length - 1) scrollTo(++currentIndex); });
}

function createScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  indicator.innerHTML = '<i class="fas fa-arrow-up"></i>';
  indicator.style.opacity = '0';
  indicator.style.pointerEvents = 'none';
  document.body.appendChild(indicator);

  window.addEventListener('scroll', function() {
    const show = window.scrollY > 400;
    indicator.style.opacity = show ? '1' : '0';
    indicator.style.pointerEvents = show ? 'all' : 'none';
  });

  indicator.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
