document.addEventListener('DOMContentLoaded', function() {
  // Main initialization function
  initSite();
});

/**
 * Initialize all site components
 */
function initSite() {
  // Load header and footer
  loadHeaderAndFooter();

  // Initialize page-specific elements
  if (document.querySelector('.champions-carousel')) {
    initChampionsCarousel();
  }

  if (document.getElementById('playersGrid')) {
    initPlayersSection();
  }

  // Initialize common elements and effects
  addParallaxEffect();
  addGoldParticles();
  createScrollIndicator();
}

/**
 * Load header and footer from external files
 */
function loadHeaderAndFooter() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      initializeNavigation();
    })
    .catch(err => console.error('Failed to load header:', err));

  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(err => console.error('Failed to load footer:', err));
}

/**
 * Initialize navigation menu
 */
function initializeNavigation() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage ||
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      link.style.borderBottom = '2px solid var(--gold-bright)';
      link.style.color = 'var(--gold-bright)';
    }

    // Add subtle hover effect
    link.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseout', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
}

/**
 * Add parallax effect to hero section
 */
function addParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
    });
  }

  // Add subtle texture to page background on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    document.body.style.backgroundPosition = `0 ${scrollPosition * 0.1}px`;
  });
}

/**
 * Initialize champions carousel
 */
function initChampionsCarousel() {
  const carousel = document.querySelector('.champions-carousel');
  const cards = document.querySelectorAll('.champion-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 32; // 32px for gap

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        carousel.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    });

    nextBtn.addEventListener('click', function() {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        carousel.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    });
  }

  // Add 3D tilt effect to champion cards
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Create embossed gold badges for champions
  createChampionBadges();
}

/**
 * Create embossed gold badges for Champions
 */
function createChampionBadges() {
  const champions = document.querySelectorAll('.defending-champion');

  champions.forEach(champion => {
    // Create badge container
    const badgeContainer = document.createElement('div');
    badgeContainer.classList.add('gold-foil-badge');
    badgeContainer.style.position = 'absolute';
    badgeContainer.style.top = '-15px';
    badgeContainer.style.right = '-15px';
    badgeContainer.style.width = '80px';
    badgeContainer.style.height = '80px';
    badgeContainer.style.borderRadius = '50%';
    badgeContainer.style.background = 'radial-gradient(circle, var(--gold-pale) 0%, var(--gold-rich) 70%)';
    badgeContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    badgeContainer.style.display = 'flex';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.justifyContent = 'center';
    badgeContainer.style.zIndex = '10';
    badgeContainer.style.transform = 'rotate(15deg)';
    badgeContainer.style.border = '1px solid var(--gold-shine)';

    // Add embossed effect
    const embossEffect = document.createElement('div');
    embossEffect.style.position = 'absolute';
    embossEffect.style.top = '2px';
    embossEffect.style.left = '2px';
    embossEffect.style.right = '2px';
    embossEffect.style.bottom = '2px';
    embossEffect.style.borderRadius = '50%';
    embossEffect.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7) 0%, transparent 60%)';
    embossEffect.style.pointerEvents = 'none';

    // Add text
    const badgeText = document.createElement('div');
    badgeText.textContent = 'CHAMPION';
    badgeText.style.fontFamily = 'var(--sans)';
    badgeText.style.fontSize = '0.6rem';
    badgeText.style.fontWeight = '700';
    badgeText.style.textAlign = 'center';
    badgeText.style.lineHeight = '1';
    badgeText.style.color = 'var(--black-rich)';
    badgeText.style.textTransform = 'uppercase';
    badgeText.style.letterSpacing = '0.05em';
    badgeText.style.transform = 'rotate(-15deg)';
    badgeText.style.textShadow = '0 1px 1px rgba(255, 255, 255, 0.3)';

    badgeContainer.appendChild(embossEffect);
    badgeContainer.appendChild(badgeText);

    if (champion.style.position !== 'relative') {
      champion.style.position = 'relative';
    }

    champion.appendChild(badgeContainer);
  });
}

/**
 * Create gold particles for hero section
 */
function createGoldParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('gold-particles');
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '1';

  hero.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    createParticle(particlesContainer);
  }
}

/**
 * Create individual gold particle
 */
function createParticle(container) {
  const particle = document.createElement('div');

  // Random position, size and animation duration
  const size = Math.random() * 5 + 1;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 10;

  // Style the gold particle
  particle.style.position = 'absolute';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.borderRadius = '50%';
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.opacity = '0';
  particle.style.background = `radial-gradient(circle at center,
                             rgba(230, 192, 104, 0.9) 0%,
                             rgba(184, 134, 11, 0.6) 70%,
                             rgba(0, 0, 0, 0) 100%)`;
  particle.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.7)';
  particle.style.animation = `goldParticleFloat ${duration}s ease-in-out ${delay}s infinite`;

  container.appendChild(particle);

  // Create keyframe animation
  if (!document.querySelector('#goldParticleAnimation')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'goldParticleAnimation';
    styleSheet.innerHTML = `
      @keyframes goldParticleFloat {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        50% {
          transform: translateY(-100px) rotate(180deg);
          opacity: 0.4;
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-200px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

/**
 * Create scroll to top indicator
 */
function createScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.classList.add('scroll-indicator');
  scrollIndicator.style.position = 'fixed';
  scrollIndicator.style.bottom = '30px';
  scrollIndicator.style.right = '30px';
  scrollIndicator.style.width = '50px';
  scrollIndicator.style.height = '50px';
  scrollIndicator.style.borderRadius = '50%';
  scrollIndicator.style.background = 'linear-gradient(135deg, var(--blue-rich) 0%, var(--blue-dark) 100%)';
  scrollIndicator.style.border = '1px solid var(--gold-rich)';
  scrollIndicator.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
  scrollIndicator.style.display = 'flex';
  scrollIndicator.style.alignItems = 'center';
  scrollIndicator.style.justifyContent = 'center';
  scrollIndicator.style.cursor = 'pointer';
  scrollIndicator.style.zIndex = '100';
  scrollIndicator.style.opacity = '0';
  scrollIndicator.style.transition = 'opacity 0.3s ease';

  // Add arrow icon
  scrollIndicator.innerHTML = '<i class="fas fa-arrow-up" style="color: var(--gold-bright); font-size: 1.2rem;"></i>';

  document.body.appendChild(scrollIndicator);

  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollIndicator.style.opacity = '1';
    } else {
      scrollIndicator.style.opacity = '0';
    }
  });

  // Scroll to top on click
  scrollIndicator.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize the players section with search and filtering functionality
 */
function initPlayersSection() {
  // Player data
  const players = [
    { name: "AJ Meyer", Avg: 8, joined: 2018 },
    { name: "Andrew Meyer", Avg: 10, joined: 2017 },
    { name: "Brad Minges", Avg: 12, joined: 2015 },
    { name: "Brian Creelman", Avg: 7, joined: 2016 },
    { name: "Bruce Tedesko", Avg: 14, joined: 2014 },
    { name: "Cody Vatter", Avg: 6, joined: 2019 },
    { name: "Dan Heitman", Avg: 9, joined: 2016 },
    { name: "Daniel Tracy", Avg: 11, joined: 2015 },
    { name: "Dave Eads", Avg: 13, joined: 2014 },
    { name: "Dave Tracy", Avg: 8, joined: 2013 },
    { name: "Hobie Bolton", Avg: 10, joined: 2017 },
    { name: "James Nelson", Avg: 7, joined: 2018 },
    { name: "Joe McConnell", Avg: 15, joined: 2016 },
    { name: "Joey Jacobs", Avg: 9, joined: 2020 },
    { name: "Josh McConnell", Avg: 11, joined: 2016 },
    { name: "JR Burns", Avg: 14, joined: 2015 },
    { name: "Mike Tracy", Avg: 6, joined: 2013 },
    { name: "Randy Bulach", Avg: 12, joined: 2014 },
    { name: "Steve Griffin", Avg: 10, joined: 2015 },
    { name: "Tony Bulach", Avg: 8, joined: 2014 },
    { name: "Zach Meister", Avg: 7, joined: 2019 },
    { name: "Zak Curry", Avg: 9, joined: 2020 }
  ];

  // Helper function to get initials
  function getInitials(name) {
    return name.split(' ').map(part => part.charAt(0)).join('');
  }

  // Generate random background variation for profile images
  function getProfileBackground(name) {
    // Create a simple hash from the name to get a consistent value
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    // Use the hash to pick a shade of gold
    const hue = 45; // Gold
    const saturation = 80 + (hash % 20); // 80-100%
    const lightness = 30 + (hash % 40); // 30-70%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  // Populate players grid
  function populatePlayers(playersList) {
    const playersGrid = document.getElementById('playersGrid');
    playersGrid.innerHTML = '';

    if (playersList.length === 0) {
      document.getElementById('noResults').style.display = 'block';
      return;
    }

    document.getElementById('noResults').style.display = 'none';

    playersList.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.className = 'player-card';

      const initials = getInitials(player.name);
      const profileBg = getProfileBackground(player.name);

      playerCard.innerHTML = `
        <div class="player-profile" style="background-color: ${profileBg}">
          <span class="player-initials">${initials}</span>
        </div>
        <div class="player-info">
          <h3 class="player-name">${player.name}</h3>
          <div class="player-details">
            <div class="player-detail">
              <span class="detail-label">Avg:</span>
              <span class="detail-value">${player.Avg}</span>
            </div>
            <div class="player-detail">
              <span class="detail-label">Member Since:</span>
              <span class="detail-value">${player.joined}</span>
            </div>
          </div>
        </div>
      `;

      playersGrid.appendChild(playerCard);
    });

    // Update player count
    document.getElementById('playerCount').textContent = playersList.length;

    // Add animation and hover effects to player cards
    addPlayerCardEffects();
  }

  // Sort players
  function sortPlayers(players, sortOption) {
    const sortedPlayers = [...players];

    switch (sortOption) {
      case 'nameAsc':
        sortedPlayers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedPlayers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // Add more sort options here if needed
    }

    return sortedPlayers;
  }

  // Search players
  function searchPlayers(players, searchTerm) {
    if (!searchTerm) return players;

    searchTerm = searchTerm.toLowerCase();
    return players.filter(player =>
      player.name.toLowerCase().includes(searchTerm)
    );
  }

  // Add animation and hover effects to player cards
  function addPlayerCardEffects() {
    const playerCards = document.querySelectorAll('.player-card');

    playerCards.forEach((card, index) => {
      // Staggered entrance animation
      setTimeout(() => {
        card.classList.add('show');
      }, 50 * index);

      // Hover effects
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6)';

        // Add gold shimmer effect
        const shimmer = document.createElement('div');
        shimmer.className = 'player-card-shimmer';
        this.appendChild(shimmer);

        setTimeout(() => {
          shimmer.style.left = '100%';
        }, 10);

        setTimeout(() => {
          shimmer.remove();
        }, 600);
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      });
    });
  }

  // Initialize
  let currentSearchTerm = '';
  let currentSortOption = 'nameAsc';

  // Initial population
  populatePlayers(sortPlayers(players, currentSortOption));

  // Search functionality
  const searchInput = document.getElementById('playerSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchTerm = this.value;
      const filteredPlayers = searchPlayers(players, currentSearchTerm);
      populatePlayers(sortPlayers(filteredPlayers, currentSortOption));
    });
  }

  // Sort functionality
  const sortSelect = document.getElementById('playerSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentSortOption = this.value;
      const filteredPlayers = searchPlayers(players, currentSearchTerm);
      populatePlayers(sortPlayers(filteredPlayers, currentSortOption));
    });
  }
}

/**
 * Add gold shimmer effect to elements with gold-shimmer class
 */
function addGoldShimmerEffect() {
  const goldElements = document.querySelectorAll('.gold-shimmer');
  goldElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 192, 104, 0.4) 0%, rgba(184, 134, 11, 0) 50%)`;
    });

    element.addEventListener('mouseleave', function() {
      this.style.background = 'none';
    });
  });

  // Add stitching to section headings
  const sectionHeadings = document.querySelectorAll('h2');

  sectionHeadings.forEach(heading => {
    // Create stitching container
    const stitchContainer = document.createElement('div');
    stitchContainer.classList.add('stitch-container');
    stitchContainer.style.position = 'relative';
    stitchContainer.style.width = '100%';
    stitchContainer.style.height = '1px';
    stitchContainer.style.marginTop = '15px';
    stitchContainer.style.overflow = 'hidden';

    // Create stitching pattern
    const stitchPattern = document.createElement('div');
    stitchPattern.style.width = '100%';
    stitchPattern.style.height = '1px';
    stitchPattern.style.background = `linear-gradient(90deg,
      transparent, transparent 6px,
      var(--gold-rich) 6px, var(--gold-rich) 8px,
      transparent 8px, transparent 14px)`;
    stitchPattern.style.backgroundSize = '14px 1px';
    stitchPattern.style.opacity = '0.4';

    stitchContainer.appendChild(stitchPattern);

    // Insert after the heading
    if (heading.nextSibling) {
      heading.parentNode.insertBefore(stitchContainer, heading.nextSibling);
    } else {
      heading.parentNode.appendChild(stitchContainer);
    }
  });
}