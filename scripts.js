document.addEventListener('DOMContentLoaded', function() {
  initSite();
});

function initSite() {
  loadHeaderAndFooter();

  if (document.querySelector('.champions-carousel')) {
    initChampionsCarousel();
  }

  if (document.getElementById('playersGrid')) {
    initPlayersSection();
  }

  createScrollIndicator();
}

function loadHeaderAndFooter() {
  fetch('header.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      initializeNavigation();
    })
    .catch(err => console.error('Failed to load header:', err));

  fetch('footer.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(err => console.error('Failed to load footer:', err));
}

function initializeNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
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

function initPlayersSection() {
  // Updated 2025 player roster from screenshot
  const players = [
    { name: "AJ Meyer",        joined: 2018 },
    { name: "Andrew Meyer",    joined: 2017 },
    { name: "Brad Minges",     joined: 2015 },
    { name: "Brian Creelman",  joined: 2016 },
    { name: "Bruce Tedesco",   joined: 2014 },
    { name: "Christian Tracy", joined: 2024 },
    { name: "Cody Vatter",     joined: 2019 },
    { name: "Dan Heitman",     joined: 2016 },
    { name: "Dan Hirsch",      joined: 2024 },
    { name: "Daniel Tracy",    joined: 2015 },
    { name: "Dave Eads",       joined: 2014 },
    { name: "Dave Tracy",      joined: 2013 },
    { name: "Hobie Bolton",    joined: 2017 },
    { name: "James Nelson",    joined: 2018 },
    { name: "Joe McConnell",   joined: 2016 },
    { name: "Joey Jacobs",     joined: 2020 },
    { name: "Josh McConnell",  joined: 2016 },
    { name: "Mike Tracy",      joined: 2013 },
    { name: "Randy Bulach",    joined: 2014 },
    { name: "Steve Griffin",   joined: 2015 },
    { name: "Tony Bulach",     joined: 2014 },
    { name: "Zak Curry",       joined: 2020 }
  ];

  function getInitials(name) {
    return name.split(' ').map(p => p[0]).join('');
  }

  // Deterministic pastel color from name
  function getProfileBg(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0;
    }
    const hues = [35, 42, 28, 48, 38]; // warm gold tones
    const hue = hues[Math.abs(hash) % hues.length];
    const sat = 55 + (Math.abs(hash >> 4) % 20);
    const light = 38 + (Math.abs(hash >> 8) % 24);
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  }

  function populatePlayers(list) {
    const grid = document.getElementById('playersGrid');
    const noResults = document.getElementById('noResults');
    grid.innerHTML = '';

    if (list.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';

    list.forEach((player, i) => {
      const card = document.createElement('div');
      card.className = 'player-card';
      const bg = getProfileBg(player.name);
      card.innerHTML = `
        <div class="player-profile" style="background:${bg}">
          <span class="player-initials">${getInitials(player.name)}</span>
        </div>
        <div class="player-info">
          <h3 class="player-name">${player.name}</h3>
          <div class="player-details">
            <div class="player-detail">
              <span class="detail-label">Member Since</span>
              <span class="detail-value">${player.joined}</span>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
      setTimeout(() => card.classList.add('show'), 40 * i);
    });

    const countEl = document.getElementById('playerCount');
    if (countEl) countEl.textContent = list.length;
  }

  function sortPlayers(list, opt) {
    const s = [...list];
    if (opt === 'nameAsc') s.sort((a, b) => a.name.localeCompare(b.name));
    if (opt === 'nameDesc') s.sort((a, b) => b.name.localeCompare(a.name));
    return s;
  }

  function searchPlayers(list, term) {
    if (!term) return list;
    term = term.toLowerCase();
    return list.filter(p => p.name.toLowerCase().includes(term));
  }

  let searchTerm = '';
  let sortOpt = 'nameAsc';

  populatePlayers(sortPlayers(players, sortOpt));

  const searchInput = document.getElementById('playerSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      searchTerm = this.value;
      populatePlayers(sortPlayers(searchPlayers(players, searchTerm), sortOpt));
    });
  }

  const sortSelect = document.getElementById('playerSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortOpt = this.value;
      populatePlayers(sortPlayers(searchPlayers(players, searchTerm), sortOpt));
    });
  }
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
