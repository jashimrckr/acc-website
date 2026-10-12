// We store the header HTML in a template string so it works locally without a server (no CORS issues).
const headerHTML = `
     <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="logo">
                <img src="images/ACC-Logo-800x618.png" alt="ACC Logo">
            </a>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link" aria-label="Home">
                            <svg class="home-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path  d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="currentColor" stroke-width="1.5"></path> <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                            <span class="home-text">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="about.html" class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a href="what-we-do.html" class="nav-link">What We Do</a>
                    </li>
                    <li class="nav-item">
                        <a href="our-network.html" class="nav-link">Our Network</a>
                    </li>
                    <li class="nav-item">
                        <a href="impact-insights.html" class="nav-link">Impact & Insights</a>
                    </li>
                    <li class="nav-item hide">
                        <a href="impact-insights.html#invest" class="nav-link">Invest</a>
                    </li>
                </ul>
            </nav>
            <div class="header-actions">
                <a href="impact-insights.html#invest" class="btn-primary">Invest in ACC <span><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px" fill="currentColor">    <path d="M 24 4 C 22.891 4 21.931109 4.6117656 21.412109 5.5097656 C 23.183109 6.2907656 24.507719 7.9035625 24.886719 9.8515625 C 26.106719 9.4705625 27 8.344 27 7 C 27 5.346 25.654 4 24 4 z M 19 7 A 4 4 0 0 0 15 11 A 4 4 0 0 0 19 15 A 4 4 0 0 0 23 11 A 4 4 0 0 0 19 7 z M 8 14 A 3 3 0 0 0 6.8828125 14.216797 L 2 16 L 2 24 L 6.2207031 22.166016 C 6.7187031 21.950016 7.2821563 21.942438 7.7851562 22.148438 L 16.849609 25.851562 C 16.849609 25.851562 16.853494 25.851563 16.853516 25.851562 A 1.5 1.5 0 0 0 17.5 26 A 1.5 1.5 0 0 0 18.238281 25.802734 C 18.238413 25.802691 18.244057 25.802776 18.244141 25.802734 L 27.230469 20.810547 L 27.228516 20.808594 A 1.5 1.5 0 0 0 28 19.5 A 1.5 1.5 0 0 0 26.5 18 A 1.5 1.5 0 0 0 25.863281 18.144531 L 25.863281 18.142578 L 19 21 L 17.5 21 A 1.5 1.5 0 0 0 19 19.5 A 1.5 1.5 0 0 0 17.964844 18.074219 L 17.964844 18.072266 L 9.2714844 14.28125 L 9.2597656 14.28125 A 3 3 0 0 0 8 14 z"/></svg> </span> </a>
                <button class="mobile-menu-btn" aria-label="Toggle Menu">
                    <svg class="hamburger-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                        stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <svg class="close-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                        stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                        style="display: none;">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </header>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject the header HTML into the placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }

    // Set active link in header based on URL
    const currentPath = window.location.pathname.toLowerCase();
    const navItems = document.querySelectorAll('.site-header .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (currentPath.includes('about.html')) {
        const link = document.querySelector('.site-header .nav-link[href="about.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('what-we-do.html')) {
        const link = document.querySelector('.site-header .nav-link[href="what-we-do.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('our-network.html')) {
        const link = document.querySelector('.site-header .nav-link[href="our-network.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('impact-insights.html')) {
        const link = document.querySelector('.site-header .nav-link[href="impact-insights.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else {
        const homeLink = document.querySelector('.site-header .nav-link[aria-label="Home"]');
        if (homeLink) homeLink.closest('.nav-item').classList.add('active');
    }

    // Initialize header interactions
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const siteHeader = document.querySelector('.site-header');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');

    // Toggle Mobile Menu
    if (mobileMenuBtn && siteHeader) {
        mobileMenuBtn.addEventListener('click', () => {
            siteHeader.classList.toggle('menu-open');

            if (siteHeader.classList.contains('menu-open')) {
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Parallax background effect for hero section (on home page)
    const heroSection = document.querySelector('.appalachia-bg-hero');
    if (heroSection) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const moveX = (0.5 - x) * 10;
            const moveY = (0.5 - y) * 10;
            heroSection.style.setProperty('--bg-x', `${moveX}px`);
            heroSection.style.setProperty('--bg-y', `${moveY}px`);
        });
    }

    // Header scroll behavior
    if (siteHeader) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 10, 10) : 0;

            if (heroSection) {
                heroSection.style.setProperty('--scroll-p', `${scrollPercent}%`);
                heroSection.style.setProperty('--scroll-y', `${scrollY}px`);
            }

            // Header hide/show logic
            if (scrollY > lastScrollY && scrollY > 100) {
                siteHeader.classList.add('header-hidden');
                document.body.classList.add('header-hidden');
            } else {
                siteHeader.classList.remove('header-hidden');
                document.body.classList.remove('header-hidden');
            }

            // Header shadow logic
            if (scrollY > 0) {
                siteHeader.classList.add('header-scrolled');
            } else {
                siteHeader.classList.remove('header-scrolled');
            }

            lastScrollY = scrollY;
        });

        window.dispatchEvent(new Event('scroll'));
    }

    // ----------------------------------------------------
    // Interactive Network Explorer (Our Network page)
    // ----------------------------------------------------
    const stateFilterBtns = document.querySelectorAll('.state-btn');
    const memberCards = document.querySelectorAll('.member-card');
    const searchInput = document.getElementById('network-search');
    const memberCountSpan = document.getElementById('active-member-count');

    function filterNetworkCards() {
        const activeStateBtn = document.querySelector('.state-btn.active');
        const selectedState = activeStateBtn ? activeStateBtn.getAttribute('data-state') : 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let visibleCount = 0;

        memberCards.forEach(card => {
            const cardState = (card.getAttribute('data-state') || '').toLowerCase();
            const cardText = card.textContent.toLowerCase();

            const matchesState = (selectedState === 'all' || cardState.includes(selectedState.toLowerCase()));
            const matchesQuery = !query || cardText.includes(query);

            if (matchesState && matchesQuery) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (memberCountSpan) {
            memberCountSpan.textContent = visibleCount;
        }
    }

    if (stateFilterBtns.length > 0) {
        stateFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                stateFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterNetworkCards();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterNetworkCards);
    }

    // ----------------------------------------------------
    // Impact & Insights Tabs Filter (Impact & Insights page)
    // ----------------------------------------------------
    const tabPills = document.querySelectorAll('.tab-pill');
    const insightSections = document.querySelectorAll('.insight-filterable-section');

    if (tabPills.length > 0) {
        tabPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const targetCategory = pill.getAttribute('data-tab');

                tabPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                insightSections.forEach(section => {
                    const secCat = section.getAttribute('data-category');
                    if (targetCategory === 'all' || secCat === targetCategory) {
                        section.style.display = '';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });

        // Check if hash matches a tab (e.g., #news, #stories, #events)
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash) {
            const matchingTab = document.querySelector(`.tab-pill[data-tab="${hash}"]`);
            if (matchingTab) {
                matchingTab.click();
            }
        }
    }
});
