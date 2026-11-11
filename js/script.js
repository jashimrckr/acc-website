// We store the header HTML in a template string so it works locally without a server (no CORS issues).
const headerHTML = `
     <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="logo" aria-label="Appalachian Community Capital Home">
                <img src="images/ACC-Logo-header.png" alt="Appalachian Community Capital">
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
                    <li class="nav-item has-dropdown">
                        <a href="impact-insights.html" class="nav-link">
                            Impact &amp; Insights
                            <svg class="dropdown-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <ul class="nav-dropdown-list">
                                <li>
                                    <a href="impact-insights.html#metrics" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Impact Metrics</span>
                                        <span class="dropdown-item-desc">Verified data &amp; regional member survey</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="impact-insights.html#stories" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Stories of Impact</span>
                                        <span class="dropdown-item-desc">Community spotlights &amp; lender partnerships</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="impact-insights.html#reports" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Reports &amp; Resources</span>
                                        <span class="dropdown-item-desc">Annual impact reports &amp; publications</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="news-events.html" class="nav-link">
                            News &amp; Events
                            <svg class="dropdown-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <ul class="nav-dropdown-list">
                                <li>
                                    <a href="news-events.html#news" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">News</span>
                                        <span class="dropdown-item-desc">Press releases &amp; official announcements</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#media" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Media</span>
                                        <span class="dropdown-item-desc">Media coverage, press kit &amp; contacts</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#events" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Events</span>
                                        <span class="dropdown-item-desc">Summits, webinars &amp; convenings</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Contact</a>
                    </li>
                    <li class="nav-item hide">
                        <a href="invest.html" class="nav-link">Invest</a>
                    </li>
                </ul>
            </nav>
                        <div class="header-actions">
                <div class="invest-dropdown-wrapper">
                    <!-- Popup Button (Collapsed State) -->
                    <button class="invest-trigger-btn" id="investTriggerBtn" aria-expanded="false" aria-haspopup="true" aria-label="Invest in Our Work Menu">
                        <span class="invest-btn-icon">
                            <svg width="22" height="22" viewBox="0 0 30 30" fill="currentColor">
                                <circle cx="18" cy="8" r="4.5" />
                                <path d="M 8 14 A 3 3 0 0 0 6.88 14.22 L 2 16 L 2 24 L 6.22 22.17 C 6.72 21.95 7.28 21.94 7.79 22.15 L 16.85 25.85 A 1.5 1.5 0 0 0 17.5 26 A 1.5 1.5 0 0 0 18.24 25.8 L 27.23 20.81 A 1.5 1.5 0 0 0 28 19.5 A 1.5 1.5 0 0 0 26.5 18 L 19 21 L 17.5 21 A 1.5 1.5 0 0 0 19 19.5 A 1.5 1.5 0 0 0 17.96 18.07 L 9.27 14.28 A 3 3 0 0 0 8 14 z"/>
                            </svg>
                        </span>
                        <span class="invest-btn-text">Invest in Our Work</span>
                        <span class="invest-btn-chevron">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </span>
                    </button>

                    <!-- Popup Expand (Expanded State) -->
                    <div class="invest-popup-menu" id="investPopupMenu" role="menu">
                        <button class="invest-popup-header-pill" id="investPopupCloseBtn" aria-label="Collapse menu">
                            <span class="invest-btn-icon">
                                <svg width="22" height="22" viewBox="0 0 30 30" fill="currentColor">
                                    <circle cx="18" cy="8" r="4.5" />
                                    <path d="M 8 14 A 3 3 0 0 0 6.88 14.22 L 2 16 L 2 24 L 6.22 22.17 C 6.72 21.95 7.28 21.94 7.79 22.15 L 16.85 25.85 A 1.5 1.5 0 0 0 17.5 26 A 1.5 1.5 0 0 0 18.24 25.8 L 27.23 20.81 A 1.5 1.5 0 0 0 28 19.5 A 1.5 1.5 0 0 0 26.5 18 L 19 21 L 17.5 21 A 1.5 1.5 0 0 0 19 19.5 A 1.5 1.5 0 0 0 17.96 18.07 L 9.27 14.28 A 3 3 0 0 0 8 14 z"/>
                                </svg>
                            </span>
                            <span class="invest-btn-text">Invest in Our Work</span>
                            <span class="invest-btn-chevron">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                            </span>
                        </button>

                        <div class="invest-popup-list">
                            <a href="invest.html" class="invest-popup-item" role="menuitem">
                                <div class="item-main">
                                    <span class="item-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21.5 10A9 9 0 0 0 6 5.3L3 8"/>
                                            <polyline points="3 3 3 8 8 8"/>
                                            <path d="M2.5 14a9 9 0 0 0 15.5 4.7l3-2.7"/>
                                            <polyline points="21 21 21 16 16 16"/>
                                            <path d="M12 7.5v9"/>
                                            <path d="M14.5 9.5a2 2 0 0 0-2-1.5h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-1a2 2 0 0 1-2-1.5"/>
                                        </svg>
                                    </span>
                                    <span class="item-label">Invest</span>
                                </div>
                                <span class="item-arrow">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </span>
                            </a>

                            <a href="invest.html#contact" class="invest-popup-item" role="menuitem">
                                <div class="item-main">
                                    <span class="item-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13 11.6"/>
                                            <path d="m13 7-2-2a1 1 0 0 0-1.4 0L5.3 9.3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0L11 12.4"/>
                                            <path d="m8.5 8.5 7 7"/>
                                        </svg>
                                    </span>
                                    <span class="item-label">Partner With Us</span>
                                </div>
                                <span class="item-arrow">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </span>
                            </a>

                            <a href="donate.html" class="invest-popup-item" role="menuitem">
                                <div class="item-main">
                                    <span class="item-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M3 21c4-1 6-4 6-9"/>
                                            <path d="M9 12c-3 0-5.5-1.5-6-4 2.5-.5 5 1 6 4z"/>
                                            <path d="M9 14c2.5 0 4.5-1.5 5-3.5-2-.5-4 1-5 3.5z"/>
                                            <path d="M15 6l4-2"/>
                                            <path d="M19 4a1.5 1.5 0 0 1 2 2l-1 1"/>
                                            <path d="M14 6l3.5 3.5a1.5 1.5 0 0 1 .4 1.1l-.4 3.4a1.5 1.5 0 0 1-1.5 1.3l-2.5-.5a1.5 1.5 0 0 1-1.2-1.3L12 10.5 14 6z"/>
                                            <circle cx="11.5" cy="11.5" r="0.7" fill="currentColor"/>
                                            <circle cx="10" cy="14" r="0.7" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <span class="item-label">Donate</span>
                                </div>
                                <span class="item-arrow">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
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
    } else if (currentPath.includes('news-events.html')) {
        const link = document.querySelector('.site-header .nav-link[href="news-events.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('contact.html')) {
        const link = document.querySelector('.site-header .nav-link[href="contact.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('invest.html') || currentPath.includes('donate.html')) {
        const investBtn = document.querySelector('.site-header .invest-trigger-btn');
        if (investBtn) investBtn.style.boxShadow = '0 0 0 3px rgba(45, 154, 94, 0.4)';
    } else {
        const homeLink = document.querySelector('.site-header .nav-link[aria-label="Home"]');
        if (homeLink) homeLink.closest('.nav-item').classList.add('active');
    }

    // Invest In Our Work dropdown popup toggle
    const investWrapper = document.querySelector('.invest-dropdown-wrapper');
    const investTriggerBtn = document.getElementById('investTriggerBtn');
    const investPopupCloseBtn = document.getElementById('investPopupCloseBtn');

    if (investWrapper && investTriggerBtn) {
        investTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = investWrapper.classList.toggle('is-open');
            investTriggerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        if (investPopupCloseBtn) {
            investPopupCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                investWrapper.classList.remove('is-open');
                investTriggerBtn.setAttribute('aria-expanded', 'false');
            });

            const investPopupItems = investWrapper.querySelectorAll('.invest-popup-item');
            investPopupItems.forEach(item => {
                item.addEventListener('click', () => {
                    investWrapper.classList.remove('is-open');
                    investTriggerBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }
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

    // Initialize dropdowns & handle click-to-hide
    const dropdownItems = document.querySelectorAll('.site-header .has-dropdown');

    dropdownItems.forEach(dropdownItem => {
        const dropdownMenu = dropdownItem.querySelector('.nav-dropdown-menu');
        const dropdownLink = dropdownItem.querySelector('.nav-link');

        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    if (!dropdownItem.classList.contains('dropdown-open')) {
                        // Close any other open dropdowns
                        dropdownItems.forEach(other => {
                            if (other !== dropdownItem) {
                                other.classList.remove('dropdown-open');
                                other.classList.add('dropdown-hidden');
                                const otherMenu = other.querySelector('.nav-dropdown-menu');
                                if (otherMenu) otherMenu.classList.add('is-hidden');
                            }
                        });
                        dropdownItem.classList.remove('dropdown-hidden');
                        if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
                        dropdownItem.classList.add('dropdown-open');
                    } else {
                        dropdownItem.classList.remove('dropdown-open');
                        dropdownItem.classList.add('dropdown-hidden');
                        if (dropdownMenu) dropdownMenu.classList.add('is-hidden');
                    }
                } else {
                    dropdownItem.classList.remove('dropdown-hidden');
                    if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
                }
            });
        }

        // When clicking on any dropdown item, hide the menu immediately
        const dropdownLinks = dropdownItem.querySelectorAll('.nav-dropdown-item');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Immediately hide dropdown
                dropdownItem.classList.add('dropdown-hidden');
                dropdownItem.classList.remove('dropdown-open');
                if (dropdownMenu) dropdownMenu.classList.add('is-hidden');

                // If invest popup or mobile drawer is open, close them
                if (investWrapper) {
                    investWrapper.classList.remove('is-open');
                    if (investTriggerBtn) investTriggerBtn.setAttribute('aria-expanded', 'false');
                }

                if (siteHeader && siteHeader.classList.contains('menu-open')) {
                    siteHeader.classList.remove('menu-open');
                    if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                    if (closeIcon) closeIcon.style.display = 'none';
                    document.body.style.overflow = '';
                }

                // If clicking an anchor for the current page, scroll into view
                const href = link.getAttribute('href');
                if (href && href.includes('#')) {
                    const [page, hash] = href.split('#');
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    if (!page || page === currentPage) {
                        const targetEl = document.getElementById(hash);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }

                // Blur focused link
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            });
        });

        // Re-enable dropdown display when cursor enters or moves over dropdown container
        dropdownItem.addEventListener('mouseenter', () => {
            dropdownItem.classList.remove('dropdown-hidden');
            if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
        });

        dropdownItem.addEventListener('mousemove', () => {
            if (dropdownItem.classList.contains('dropdown-hidden')) {
                dropdownItem.classList.remove('dropdown-hidden');
                if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
            }
        });
    });

    // Close dropdowns and mobile menu when clicking outside
    const handleOutsideClick = (e) => {
        dropdownItems.forEach(dropdownItem => {
            if (!dropdownItem.contains(e.target)) {
                dropdownItem.classList.add('dropdown-hidden');
                dropdownItem.classList.remove('dropdown-open');
                const dropdownMenu = dropdownItem.querySelector('.nav-dropdown-menu');
                if (dropdownMenu) dropdownMenu.classList.add('is-hidden');
                if (document.activeElement && dropdownItem.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
            }
        });

        if (investWrapper && !investWrapper.contains(e.target)) {
            investWrapper.classList.remove('is-open');
            if (investTriggerBtn) investTriggerBtn.setAttribute('aria-expanded', 'false');
        }

        if (siteHeader && siteHeader.classList.contains('menu-open') && !siteHeader.contains(e.target)) {
            siteHeader.classList.remove('menu-open');
            if (hamburgerIcon) hamburgerIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (investWrapper && investWrapper.classList.contains('is-open')) {
                investWrapper.classList.remove('is-open');
                if (investTriggerBtn) investTriggerBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

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
            const isDeepRoots = card.getAttribute('data-deeproots') === 'true';
            const cardText = card.textContent.toLowerCase();

            const matchesState = selectedState === 'all'
                || (selectedState === 'deeproots' ? isDeepRoots : cardState.includes(selectedState.toLowerCase()));
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

        // Activate tab matching URL hash
        const activateTabFromHash = () => {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            if (hash) {
                const matchingTab = document.querySelector(`.tab-pill[data-tab="${hash}"]`);
                if (matchingTab) {
                    matchingTab.click();
                    const targetEl = document.getElementById(hash);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        activateTabFromHash();
        window.addEventListener('hashchange', activateTabFromHash);
    }

    // ----------------------------------------------------
    // ACC Contact Form Backend Integration & CAPTCHA
    // ----------------------------------------------------
    const contactForms = document.querySelectorAll('.acc-contact-form');

    contactForms.forEach(form => {
        const wrapper = form.closest('.acc-contact-form-wrapper');
        const successCard = wrapper ? wrapper.querySelector('.form-success-card') : null;
        const resetBtn = successCard ? successCard.querySelector('.btn-reset-form') : null;
        const phoneInput = form.querySelector('.input-phone');
        const firstNameInput = form.querySelector('.input-first-name');
        const lastNameInput = form.querySelector('.input-last-name');

        // Synchronize hidden name input
        const updateHiddenName = () => {
            const hiddenName = form.querySelector('#name') || form.querySelector('#homeName') || form.querySelector('input[name="name"]');
            if (hiddenName && firstNameInput && lastNameInput) {
                hiddenName.value = `${firstNameInput.value} ${lastNameInput.value}`.trim();
            }
        };
        if (firstNameInput) firstNameInput.addEventListener('input', updateHiddenName);
        if (lastNameInput) lastNameInput.addEventListener('input', updateHiddenName);

        // Phone number input formatter: (XXX) XXX-XXXX
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let numbers = e.target.value.replace(/\D/g, '').substring(0, 10);
                let formatted = '';
                if (numbers.length > 0) {
                    formatted = '(' + numbers.substring(0, 3);
                }
                if (numbers.length >= 4) {
                    formatted += ') ' + numbers.substring(3, 6);
                }
                if (numbers.length >= 7) {
                    formatted += '-' + numbers.substring(6, 10);
                }
                e.target.value = formatted;
            });
        }

        // Form submit listener
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitContactForm(form);
        });

        // Reset form handler
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                form.reset();
                if (typeof grecaptcha !== 'undefined') {
                    try { grecaptcha.reset(); } catch (err) {}
                }
                form.querySelectorAll('.acc-form-input, .acc-form-select, .acc-form-textarea').forEach(input => {
                    input.classList.remove('has-error');
                });
                form.querySelectorAll('.field-error-msg').forEach(msg => {
                    msg.classList.remove('visible');
                });

                const formError = wrapper ? wrapper.querySelector('.form-submission-error') : null;
                if (formError) {
                    formError.classList.remove('visible');
                    formError.textContent = '';
                }

                if (successCard) {
                    successCard.classList.remove('visible');
                }
                form.style.display = 'flex';
            });
        }
    });
});

/**
 * Submits the ACC contact form to the Azure Functions backend endpoint
 * http://localhost:7071/api/contact/submit
 */
async function submitContactForm(formElement) {
    const form = formElement instanceof HTMLFormElement 
        ? formElement 
        : (document.querySelector('.acc-contact-form') || document.querySelector('form'));
    
    if (!form) return;

    const firstNameInput = form.querySelector('.input-first-name');
    const lastNameInput = form.querySelector('.input-last-name');
    const emailInput = form.querySelector('.input-email');
    const phoneInput = form.querySelector('.input-phone');
    const subjectSelect = form.querySelector('.acc-form-select');
    const messageInput = form.querySelector('.acc-form-textarea');
    const submitBtn = form.querySelector('.btn-contact-submit');
    const captchaError = form.querySelector('.captcha-error');
    const wrapper = form.closest('.acc-contact-form-wrapper');
    const successCard = wrapper ? wrapper.querySelector('.form-success-card') : null;
    const formError = wrapper ? wrapper.querySelector('.form-submission-error') : null;

    // Reset error styling
    form.querySelectorAll('.acc-form-input, .acc-form-select, .acc-form-textarea').forEach(input => {
        input.classList.remove('has-error');
    });
    form.querySelectorAll('.field-error-msg').forEach(msg => {
        msg.classList.remove('visible');
    });
    if (formError) {
        formError.classList.remove('visible');
        formError.textContent = '';
    }

    let isValid = true;

    // Validate First Name
    if (firstNameInput && !firstNameInput.value.trim()) {
        isValid = false;
        firstNameInput.classList.add('has-error');
        const err = firstNameInput.parentElement.querySelector('.field-error-msg');
        if (err) err.classList.add('visible');
    }

    // Validate Last Name
    if (lastNameInput && !lastNameInput.value.trim()) {
        isValid = false;
        lastNameInput.classList.add('has-error');
        const err = lastNameInput.parentElement.querySelector('.field-error-msg');
        if (err) err.classList.add('visible');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add('has-error');
        const err = emailInput.parentElement.querySelector('.field-error-msg');
        if (err) err.classList.add('visible');
    }

    // Validate Message (required by backend)
    if (messageInput && !messageInput.value.trim()) {
        isValid = false;
        messageInput.classList.add('has-error');
        const err = messageInput.parentElement.querySelector('.field-error-msg');
        if (err) err.classList.add('visible');
    }

    if (!isValid) {
        const firstInvalid = form.querySelector('.has-error');
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    // Obtain real reCAPTCHA token
    let captchaToken = "";
    if (typeof grecaptcha !== 'undefined') {
        try {
            captchaToken = grecaptcha.getResponse();
        } catch (e) {
            console.warn("grecaptcha.getResponse error:", e);
        }
    }

    if (!captchaToken) {
        if (captchaError) {
            captchaError.textContent = "Please complete the CAPTCHA.";
            captchaError.classList.add('visible');
        }
        return;
    }

    const firstName = firstNameInput ? firstNameInput.value.trim() : "";
    const lastName = lastNameInput ? lastNameInput.value.trim() : "";
    const fullName = `${firstName} ${lastName}`.trim() || (document.getElementById("name") ? document.getElementById("name").value.trim() : "");
    const email = emailInput ? emailInput.value.trim() : (document.getElementById("email") ? document.getElementById("email").value.trim() : "");
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const subject = subjectSelect ? subjectSelect.value.trim() : (document.getElementById("subject") ? document.getElementById("subject").value.trim() : "");
    let rawMessage = messageInput ? messageInput.value.trim() : (document.getElementById("message") ? document.getElementById("message").value.trim() : "");

    const payload = {
        name: fullName,
        email: email,
        phone: phone,
        subject: subject,
        message: rawMessage,
        captchaToken: captchaToken
    };

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="captcha-spin" style="animation: captchaSpin 0.7s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            SUBMITTING...
        `;
    }

    try {
        const response = await fetch(
            "http://localhost:7071/api/contact/submit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Submission failed");
        }

        // Transition to success state
        form.style.display = 'none';
        if (successCard) {
            const userMsg = successCard.querySelector('.success-user-text');
            if (userMsg && fullName) {
                userMsg.textContent = `Thank you, ${fullName}! Your message has been sent to Appalachian Community Capital. A member of our team will follow up with you promptly.`;
            }
            successCard.classList.add('visible');
        }

    } catch (error) {
        console.error("Submission error:", error);
        if (formError) {
            formError.textContent = error.message || "Unable to submit message. Please try again.";
            formError.classList.add('visible');
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (captchaError) {
            captchaError.textContent = error.message;
            captchaError.classList.add('visible');
        }

    } finally {
        if (typeof grecaptcha !== 'undefined') {
            try { grecaptcha.reset(); } catch (e) {}
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT';
        }
    }
}

window.submitContactForm = submitContactForm;
