function trackClarityEvent(eventName) {
    if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
    }
}

document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[data-clarity-event]');
    if (link) {
        trackClarityEvent(link.dataset.clarityEvent);
    }
});

// We store the header HTML in a template string so it works locally without a server (no CORS issues).
const headerHTML = `
     <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="logo" aria-label="Appalachian Community Capital Home">
                <img src="images/ACC-Logo-header.png" alt="Appalachian Community Capital">
            </a>
            <nav class="main-nav">
                <div class="mobile-search-banner">
                    <button type="button" class="mobile-search-input-btn" id="mobileSearchTriggerBtn" aria-label="Search site routes and topics">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>Search routes across site...</span>
                        <kbd class="mobile-search-kbd">Search</kbd>
                    </button>
                </div>
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
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="news-events.html" class="nav-link">
                            News &amp; Media
                            <svg class="dropdown-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div class="nav-dropdown-menu">
                            <ul class="nav-dropdown-list">
                                <li>
                                    <a href="news-events.html#publications" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Publications</span>
                                        <span class="dropdown-item-desc">Impact reports, research &amp; playbooks</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#press" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">News &amp; Press Releases</span>
                                        <span class="dropdown-item-desc">Official announcements &amp; press releases</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#events" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Upcoming Events</span>
                                        <span class="dropdown-item-desc">Lunch &amp; Learn webinars</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#newsletters" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">ACC Newsletters</span>
                                        <span class="dropdown-item-desc">Monthly updates &amp; regional lending news</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#podcasts" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Podcasts</span>
                                        <span class="dropdown-item-desc">Audio features &amp; community discussions</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="news-events.html#videos" class="nav-dropdown-item">
                                        <span class="dropdown-item-title">Videos</span>
                                        <span class="dropdown-item-desc">Succession series &amp; initiative spotlights</span>
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
                <div class="mobile-drawer-invest-card">
                    <div class="drawer-invest-header">
                        <span class="drawer-invest-badge">
                            <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor">
                                <circle cx="18" cy="8" r="4.5" />
                                <path d="M 8 14 A 3 3 0 0 0 6.88 14.22 L 2 16 L 2 24 L 6.22 22.17 C 6.72 21.95 7.28 21.94 7.79 22.15 L 16.85 25.85 A 1.5 1.5 0 0 0 17.5 26 A 1.5 1.5 0 0 0 18.24 25.8 L 27.23 20.81 A 1.5 1.5 0 0 0 28 19.5 A 1.5 1.5 0 0 0 26.5 18 L 19 21 L 17.5 21 A 1.5 1.5 0 0 0 19 19.5 A 1.5 1.5 0 0 0 17.96 18.07 L 9.27 14.28 A 3 3 0 0 0 8 14 z"/>
                            </svg>
                        </span>
                        <div>
                            <span class="drawer-invest-title">Invest in Our Work</span>
                            <span class="drawer-invest-sub">Support Appalachia's small businesses &amp; clean energy</span>
                        </div>
                    </div>
                    <div class="drawer-invest-actions">
                        <a href="invest.html" class="drawer-invest-action-btn primary">
                            <span>Invest Capital</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                        <a href="invest.html#contact" class="drawer-invest-action-btn secondary">
                            <span>Partner With Us</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                        <a href="donate.html" class="drawer-invest-action-btn secondary">
                            <span>Donate</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>
                </div>
            </nav>
                        <div class="header-actions">
                <button type="button" class="header-search-icon-btn" id="siteSearchTrigger" aria-label="Search site routes (Ctrl+K)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span class="search-tooltip">Search site <kbd>Ctrl K</kbd></span>
                </button>
                <div class="invest-dropdown-wrapper">
                    <!-- Mobile Backdrop Overlay -->
                    <div class="invest-popup-backdrop" id="investPopupBackdrop"></div>
                    <!-- Popup Button (Collapsed State) -->
                    <button class="invest-trigger-btn" id="investTriggerBtn" aria-expanded="false" aria-haspopup="true" aria-label="Invest in Our Work Menu">
                        <span class="invest-btn-icon">
                            <svg width="22" height="22" viewBox="0 0 30 30" fill="currentColor">
                                <circle cx="18" cy="8" r="4.5" />
                                <path d="M 8 14 A 3 3 0 0 0 6.88 14.22 L 2 16 L 2 24 L 6.22 22.17 C 6.72 21.95 7.28 21.94 7.79 22.15 L 16.85 25.85 A 1.5 1.5 0 0 0 17.5 26 A 1.5 1.5 0 0 0 18.24 25.8 L 27.23 20.81 A 1.5 1.5 0 0 0 28 19.5 A 1.5 1.5 0 0 0 26.5 18 L 19 21 L 17.5 21 A 1.5 1.5 0 0 0 19 19.5 A 1.5 1.5 0 0 0 17.96 18.07 L 9.27 14.28 A 3 3 0 0 0 8 14 z"/>
                            </svg>
                        </span>
                        <span class="invest-btn-text">
                            <span class="invest-text-full">Invest in Our Work</span>
                            <span class="invest-text-short">Invest</span>
                        </span>
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
    <!-- Site-Wide Search Modal & Route Navigator (Spotlight Command Palette) -->
    <div class="site-search-modal" id="siteSearchModal" role="dialog" aria-modal="true" aria-label="Site Search and Route Navigator" hidden>
        <div class="search-modal-backdrop" id="searchModalBackdrop"></div>
        <div class="search-modal-dialog">
            <div class="search-modal-header">
                <div class="search-input-field-wrap">
                    <span class="search-field-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    <input type="text" id="siteSearchInput" class="search-field-input" placeholder="Search pages, topics, or programs..." autocomplete="off" spellcheck="false" aria-label="Search anything on the site">
                    <button type="button" class="search-field-clear" id="searchBoxClear" aria-label="Clear search input" style="display: none;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <button type="button" class="search-field-close" id="searchModalCloseBtn" aria-label="Close search (Esc)">
                        <svg class="search-mobile-close-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <!-- Minimalist Category Filter Strip -->
                <div class="search-filter-tabs" id="searchCategoriesBar">
                    <button type="button" class="search-tab-pill active" data-cat="all">All</button>
                    <button type="button" class="search-tab-pill" data-cat="Main Pages">Pages</button>
                    <button type="button" class="search-tab-pill" data-cat="Programs &amp; Services">Programs</button>
                    <button type="button" class="search-tab-pill" data-cat="Network &amp; Members">Network</button>
                    <button type="button" class="search-tab-pill" data-cat="Impact &amp; Stories">Impact</button>
                    <button type="button" class="search-tab-pill" data-cat="News &amp; Media">News</button>
                    <button type="button" class="search-tab-pill" data-cat="About">About</button>
                    <button type="button" class="search-tab-pill" data-cat="Invest &amp; Donate">Invest</button>
                </div>
            </div>

            <div class="search-results-wrapper">
                <div class="search-results-meta" id="searchResultsHeader">
                    <span class="search-results-label" id="searchResultsCount">Suggested Pages &amp; Sections</span>
                    <span class="search-results-tip">Press ↵ or click to open</span>
                </div>
                <div class="search-results-list" id="searchResultsList" role="listbox">
                    <!-- Populated dynamically -->
                </div>
            </div>

            <div class="search-modal-footer">
                <div class="search-footer-preview" id="searchFooterRouteInfo">
                    <span class="footer-preview-icon">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </span>
                    <span class="footer-preview-text">Search across all pages, programs, and reports</span>
                </div>
                <div class="search-footer-hints">
                    <span class="hint-item"><kbd class="kbd-hint">&uarr;</kbd><kbd class="kbd-hint">&darr;</kbd> navigate</span>
                    <span class="hint-item"><kbd class="kbd-hint">&crarr;</kbd> select</span>
                    <span class="hint-item"><kbd class="kbd-hint">esc</kbd> close</span>
                </div>
            </div>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject the header HTML into the placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }

    // Initialize Site Search and Route Navigator
    initSiteSearch();

    // Handle deep anchor navigation (e.g. from search navigation)
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const targetElement = document.getElementById(hashId);
        if (targetElement) {
            const parentDetails = targetElement.closest('details');
            if (parentDetails && !parentDetails.open) {
                parentDetails.open = true;
            }
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.classList.add('search-target-highlight');
                setTimeout(() => targetElement.classList.remove('search-target-highlight'), 2500);
            }, 350);
        }
    }

    // Set active link in header based on URL
    const currentPath = window.location.pathname.toLowerCase();
    const navItems = document.querySelectorAll('.site-header .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (currentPath.includes('404') || document.body.classList.contains('error-404-page')) {
        // Error 404 page: leave nav links unselected
    } else if (currentPath.includes('about.html')) {
        const link = document.querySelector('.site-header .nav-link[href="about.html"]');
        if (link) link.closest('.nav-item').classList.add('active');
    } else if (currentPath.includes('what-we-do.html') || currentPath.includes('opportunity-appalachia.html') ||
        /\/green-bank-financing(?:\.html)?$/.test(currentPath)) {
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

    // 404 Page: Dynamic URL Path Display
    const displayUrlEl = document.getElementById('displayUrlPath');
    if (displayUrlEl) {
        const pathToShow = window.location.pathname + (window.location.search || '');
        if (pathToShow && pathToShow !== '/' && !pathToShow.endsWith('404.html')) {
            displayUrlEl.textContent = pathToShow;
        } else {
            displayUrlEl.textContent = pathToShow.endsWith('404.html') ? 'The requested page URL' : '/requested-address';
        }
    }

    // Invest In Our Work dropdown popup toggle
    const investWrapper = document.querySelector('.invest-dropdown-wrapper');
    const investTriggerBtn = document.getElementById('investTriggerBtn');
    const investPopupCloseBtn = document.getElementById('investPopupCloseBtn');
    const investPopupBackdrop = document.getElementById('investPopupBackdrop');

    // Initialize header interactions
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const siteHeader = document.querySelector('.site-header');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');

    const closeMobileMenu = () => {
        if (siteHeader && siteHeader.classList.contains('menu-open')) {
            siteHeader.classList.remove('menu-open');
            if (hamburgerIcon) hamburgerIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    const closeInvestPopup = () => {
        if (investWrapper) {
            investWrapper.classList.remove('is-open');
            if (investTriggerBtn) investTriggerBtn.setAttribute('aria-expanded', 'false');
        }
    };

    if (investWrapper && investTriggerBtn) {
        investTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
            const isOpen = investWrapper.classList.toggle('is-open');
            investTriggerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        if (investPopupCloseBtn) {
            investPopupCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeInvestPopup();
            });
        }

        if (investPopupBackdrop) {
            investPopupBackdrop.addEventListener('click', (e) => {
                e.stopPropagation();
                closeInvestPopup();
            });
        }

        const investPopupItems = investWrapper.querySelectorAll('.invest-popup-item');
        investPopupItems.forEach(item => {
            item.addEventListener('click', () => {
                closeInvestPopup();
            });
        });
    }

    // Toggle Mobile Menu
    if (mobileMenuBtn && siteHeader) {
        mobileMenuBtn.addEventListener('click', () => {
            closeInvestPopup();
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

    // Drawer Invest Card Links
    const drawerInvestLinks = document.querySelectorAll('.drawer-invest-action-btn');
    drawerInvestLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

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

    // Initialize leader bio modals (About page)
    initLeaderBioModals();

    // Initialize story modals (Impact page)
    initStoryModals();

    // Initialize upcoming events calendar sync (News & Media page)
    initUpcomingEvents();

    // Initialize Opportunity Appalachia popups (Opportunity Appalachia page)
    initOAModals();
});

/**
 * Site-Wide Search Bar & Route Navigator
 * Allows searching across all pages, subroutes, anchors, programs, members, and resources
 */
const siteRoutes = [
    // --- Main Pages ---
    {
        route: "index.html",
        title: "Home – Appalachian Community Capital",
        category: "Main Pages",
        keywords: "home main appalachia region of possibility cdfi small business lenders debt financing capital partners economic opportunity",
        desc: "ACC connects community development financial institutions with capital and partners to expand economic opportunity across Appalachia."
    },
    {
        route: "about.html",
        title: "About Us – Organization Overview",
        category: "Main Pages",
        keywords: "about us organization rooted in community connected for regional scale mission history leadership team board governance",
        desc: "Learn about Appalachian Community Capital, our mission, 13-state footprint, place-based investment strategy, and leadership."
    },
    {
        route: "what-we-do.html",
        title: "What We Do – Capital, Capacity, Collaboration",
        category: "Main Pages",
        keywords: "what we do services wholesale lending debt facilities capacity building technical assistance collaboration clean energy",
        desc: "How ACC delivers impact through wholesale capital deployment, capacity building, underwriting support, and ecosystem collaboration."
    },
    {
        route: "our-network.html",
        title: "Our Network – 46 Member CDFIs",
        category: "Main Pages",
        keywords: "our network 46 member cdfis 13 states 423 counties directory partners ecosystem deeproots lenders",
        desc: "Explore ACC's 46 certified member CDFIs serving 423 counties across 13 Appalachian states."
    },
    {
        route: "impact-insights.html",
        title: "Impact & Insights – Data & Stories",
        category: "Main Pages",
        keywords: "impact insights verified metrics data member survey findings stories of impact community spotlights reports",
        desc: "Quantitative survey findings, verified jobs numbers, and real stories of impact from entrepreneurs and community lenders."
    },
    {
        route: "news-events.html",
        title: "News & Media – Publications & Events",
        category: "Main Pages",
        keywords: "news media announcements press releases publications research reports newsletters podcasts videos multimedia",
        desc: "Latest news, official press releases, research publications, monthly newsletters, audio podcasts, and video series."
    },
    {
        route: "invest.html",
        title: "Community Investment Notes – Invest in ACC",
        category: "Main Pages",
        keywords: "invest investment notes community investment notes impact investing fixed income notes terms prospectus vision 2030",
        desc: "Invest in ACC Community Investment Notes to fuel small business lending and local community growth across Appalachia."
    },
    {
        route: "donate.html",
        title: "Donate – Gambrell Fund for Strategic Initiatives",
        category: "Main Pages",
        keywords: "donate donation gambrell fund strategic initiatives donna gambrell legacy give endowment philanthropy wire check online",
        desc: "Support high-impact community solutions by donating to the Donna Gambrell Fund for Strategic Initiatives."
    },
    {
        route: "contact.html",
        title: "Contact Us – Headquarters & Inquiries",
        category: "Main Pages",
        keywords: "contact us get in touch headquarters offices phone email address christiansburg virginia washington dc inquiry form",
        desc: "Contact the ACC team, find office addresses, send an inquiry, or explore membership and partnership opportunities."
    },
    {
        route: "non-discrimination-policy.html",
        title: "Non-Discrimination Statement & Policy",
        category: "About",
        keywords: "non-discrimination statement policy civil rights equal opportunity lender usda accessibility complaint compliance",
        desc: "Official statement and policies regarding equal opportunity lending, civil rights compliance, and accessibility."
    },

    // --- About Us Subroutes ---
    {
        route: "about.html#who-we-are",
        title: "Who We Are – Network for Collaboration",
        category: "About",
        keywords: "who we are regional intermediary mission-aligned cdfi collaboration catalytic capital scale",
        desc: "ACC serves as a regional financial intermediary and collaborative platform for community development lenders."
    },
    {
        route: "about.html#mission",
        title: "Our Mission & Core Strategy",
        category: "About",
        keywords: "mission strategy purpose core values regional scale local decision making small business underinvested",
        desc: "Connecting member CDFIs to high-impact capital, shared expertise, and collaborative regional solutions."
    },
    {
        route: "about.html#history",
        title: "History & Milestones",
        category: "About",
        keywords: "history milestones founding 2013 arc appalachian regional commission donna gambrell launch evolution",
        desc: "How an innovative pilot launched in partnership with the Appalachian Regional Commission grew into a national model."
    },
    {
        route: "about.html#leadership",
        title: "Executive Leadership & Staff Bios",
        category: "About",
        keywords: "leadership daniel wallace president ceo shauna yeldell kelli bryant osayamen bartholomew jesse fripp john mclean pam porter liz rogers staff bios team",
        desc: "Meet President & CEO Daniel Wallace and ACC's experienced executive leadership team dedicated to Appalachia."
    },
    {
        route: "about.html#board",
        title: "Board of Directors",
        category: "About",
        keywords: "board of directors clinton b gwin matt raker marten jenkins neill wright henry golatt clyde cornett ray christman robin gabbard tj bogdewic khaliff davis governance trustees",
        desc: "Governed by seasoned leaders from across Appalachia's community development finance and banking sectors."
    },
    {
        route: "about.html#governance",
        title: "Strategic Governance & Committees",
        category: "About",
        keywords: "governance accountability credit committee audit committee risk management oversight community needs",
        desc: "Robust committee structures and governance frameworks ensuring transparency and sound underwriting practices."
    },

    // --- What We Do Subroutes ---
    {
        route: "what-we-do.html#pillars",
        title: "Three Pillars of Impact: Capital, Capacity, Collaboration",
        category: "Programs & Services",
        keywords: "pillars core methodology deliver impact capital capacity building collaboration wholesale debt",
        desc: "A balanced three-pillar approach providing low-cost capital, operational technical assistance, and ecosystem synergy."
    },
    {
        route: "what-we-do.html#capital",
        title: "Capital Deployment & Debt Facilities",
        category: "Programs & Services",
        keywords: "capital access to capital debt facilities secondary loans liquidity wholesale lending loan syndication funding",
        desc: "Supplying wholesale debt and risk-sharing loan facilities so community lenders can meet growing credit demand."
    },
    {
        route: "what-we-do.html#capacity",
        title: "Capacity Building & Technical Assistance",
        category: "Programs & Services",
        keywords: "capacity building technical assistance training underwriting support deeproots data hub technology tools peer learning",
        desc: "Equipping CDFI lenders with specialized analytics, underwriting guidance, and executive leadership development."
    },
    {
        route: "what-we-do.html#collaboration",
        title: "Regional CDFI Ecosystem Collaboration",
        category: "Programs & Services",
        keywords: "collaboration cdfi coalition working groups knowledge sharing collective scale regional solutions",
        desc: "Uniting independent CDFIs across 13 states to advocate, co-invest, and tackle regional economic challenges together."
    },
    {
        route: "what-we-do.html#programs",
        title: "Flagship Programs & Strategic Initiatives",
        category: "Programs & Services",
        keywords: "programs green bank clean energy epa greenhouse gas reduction fund climate finance solar energy soar small farms",
        desc: "Transformative climate finance, clean energy lending for rural communities, and strategic small business partnerships."
    },
    {
        route: "opportunity-appalachia.html",
        title: "Opportunity Appalachia – Regional Economic Restructuring",
        category: "Programs & Services",
        keywords: "opportunity appalachia oa real estate downtown revitalization technical assistance investor convening opportunity zones project pipeline portfolio central appalachia",
        desc: "Brings investment to Central Appalachian communities, creating jobs and businesses that support sustainable growth through technical assistance and investor matchmaking."
    },
    {
        route: "green-bank-financing.html",
        title: "Green Bank for Rural America",
        category: "Programs & Services",
        keywords: "green bank financing clean energy renewable energy rural solar community lenders technical assistance",
        desc: "Explore the Green Bank's financing priorities, target communities, and resources for community lenders."
    },

    // --- Our Network Subroutes ---
    {
        route: "our-network.html#directory",
        title: "Interactive Member Directory (46 CDFIs)",
        category: "Network & Members",
        keywords: "directory member directory cdfi search ace mountain bizworks fahe natural capital liftfund iff pathway lending invest pgh progress fund deeproots search lenders",
        desc: "Search and filter all 46 certified member CDFIs by state, specialty, and DeepRoots provider participation."
    },
    {
        route: "our-network.html#states-reach",
        title: "Geographic Reach Across 13 States & 423 Counties",
        category: "Network & Members",
        keywords: "13 states 423 counties footprint alabama georgia kentucky maryland mississippi new york north carolina ohio pennsylvania south carolina tennessee virginia west virginia arc",
        desc: "Serving 423 counties across all 13 states in the Appalachian Regional Commission (ARC) footprint."
    },
    {
        route: "our-network.html#membership",
        title: "Why Join ACC – Member Value & Advantages",
        category: "Network & Members",
        keywords: "why join acc membership benefits wholesale debt participation loans syndication peer network liquidity",
        desc: "Explore the capital, syndication, and peer advantages available exclusively to certified ACC member lenders."
    },
    {
        route: "our-network.html#benefits-criteria",
        title: "Membership Criteria & Qualifications",
        category: "Network & Members",
        keywords: "membership criteria eligibility cdfi loan funds credit unions underwriting standards qualifications",
        desc: "Review institutional requirements and eligibility criteria for community development financial institutions."
    },
    {
        route: "our-network.html#become-a-member",
        title: "How to Become an ACC Member",
        category: "Network & Members",
        keywords: "become a member application process apply onboarding board review join network",
        desc: "Step-by-step onboarding guide for CDFIs interested in joining Appalachian Community Capital."
    },

    // --- Impact & Insights Subroutes ---
    {
        route: "impact-insights.html#metrics",
        title: "Verified Impact Metrics & Annual Survey",
        category: "Impact & Stories",
        keywords: "impact metrics verified data member survey jobs created leverage ratio small business loans women minority entrepreneurs",
        desc: "Quantitative results tracking capital leverage, jobs created or retained, and financing delivered to underserved communities."
    },
    {
        route: "impact-insights.html#stories",
        title: "Stories of Impact – Real Voices & Spotlights",
        category: "Impact & Stories",
        keywords: "stories of impact success stories entrepreneur spotlights handinhand counseling cakes boutique future focus child care tantrum brewing blue firefly inn horizon adult health secure futures solar shipley farms",
        desc: "Profiles of entrepreneurs, family businesses, and community facilities strengthened by ACC and member CDFI financing."
    },
    {
        route: "news-events.html#publications",
        title: "Reports & Resources – Annual Impact Publications",
        category: "Impact & Stories",
        keywords: "reports resources annual report impact reports publications research papers regional data",
        desc: "Download comprehensive annual impact reports, research studies, and regional analysis publications."
    },

    // --- News & Media Subroutes ---
    {
        route: "news-events.html#publications",
        title: "Publications & Regional Research",
        category: "News & Media",
        keywords: "publications research reports 2025 impact report truist foundation report soar small farms opportunity zone playbook succession experience",
        desc: "In-depth publications covering Appalachian economic trends, CDFI leadership succession, and small farm finance."
    },
    {
        route: "news-events.html#press",
        title: "News & Official Press Releases",
        category: "News & Media",
        keywords: "press releases news announcements media coverage grant awards leadership statements media releases",
        desc: "Official announcements, major capital awards, program launches, and press releases."
    },
    {
        route: "news-events.html#events",
        title: "Upcoming Events – Lunch & Learn Series (2027)",
        category: "News & Media",
        keywords: "upcoming events lunch learn dates calendar rural opportunity zones c-pace ted kowalsky cohnreznick data centers broadband brian vo connect humanity rural healthcare paul rosen mission mobile medical project equity amanda calder registration",
        desc: "Quarterly peer-learning convenings covering clean energy, rural broadband, healthcare, and employee ownership."
    },
    {
        route: "news-events.html#newsletters",
        title: "Monthly Newsletters Archive",
        category: "News & Media",
        keywords: "newsletters monthly updates email newsletters regional lending news newsletter archive",
        desc: "Browse archive of monthly newsletters featuring member spotlights, event recaps, and lending updates."
    },
    {
        route: "news-events.html#podcasts",
        title: "Podcasts & Audio Series",
        category: "News & Media",
        keywords: "podcasts audio interviews audio series community discussions cdfi conversations appalachian voices",
        desc: "Audio interviews and discussions highlighting community lending pioneers and local leaders across the region."
    },
    {
        route: "news-events.html#videos",
        title: "Videos & Story Spotlights",
        category: "News & Media",
        keywords: "videos multimedia story spotlights succession series documentary videos",
        desc: "Watch video features highlighting succession planning, entrepreneur spotlights, and community impact."
    },

    // --- Invest Subroutes ---
    {
        route: "invest.html#notes",
        title: "Community Investment Note Parameters & Terms",
        category: "Invest & Donate",
        keywords: "notes parameters terms interest rates maturities minimum investment fixed income impact investing prospectus",
        desc: "Key terms, maturity options, and financial profile for institutional and accredited investors."
    },
    {
        route: "invest.html#vision",
        title: "ACC Vision 2030 ($250 Million Mobilization)",
        category: "Invest & Donate",
        keywords: "vision 2030 250 million scale capital mobilization strategic horizon economic resilience",
        desc: "ACC's ambitious blueprint to mobilize $250 million in catalytic capital for Appalachia by 2030."
    },
    {
        route: "invest.html#contact",
        title: "Investor & Partner Relations Inquiries",
        category: "Invest & Donate",
        keywords: "investor contact partner relations connect with leadership prospectus subscription",
        desc: "Get in touch with ACC investment leadership to discuss terms, subscription documents, and partnership opportunities."
    },

    // --- Donate Subroutes ---
    {
        route: "donate.html#ways-to-give",
        title: "Ways to Give – Online, Check, Wire Transfer",
        category: "Invest & Donate",
        keywords: "ways to give how to donate online donation check wire transfer 501c3 tax deductible endowment",
        desc: "Detailed instructions for contributing to the Gambrell Fund via secure online portal, check, or wire transfer."
    },

    // --- Contact Subroutes ---
    {
        route: "contact.html#contact-form-section",
        title: "Send a Message – Inquiry Form",
        category: "Contact & Inquiries",
        keywords: "contact form send message inquiry membership question partnership question form",
        desc: "Send a direct message to the Appalachian Community Capital team for fast follow-up."
    },
    {
        route: "contact.html#office-info",
        title: "ACC Headquarters & Office Directory",
        category: "Contact & Inquiries",
        keywords: "office locations headquarters christiansburg virginia washington dc phone email address",
        desc: "Physical addresses, mailing details, and contact directory for ACC's Virginia headquarters and Washington DC presence."
    },
    // --- Publications & Research Studies ---
    {
        route: "news-events.html#pub-impact-report-2025",
        title: "2025 Impact Report: Capital, Community, and Resilience Across Appalachia",
        category: "Publications",
        keywords: "2025 impact report capital community resilience helene recovery 55m grants jobs 275m campaign",
        desc: "Annual report detailing $55M deployed, 8,000+ jobs sustained, and 4,800+ small businesses connected to capital."
    },
    {
        route: "news-events.html#pub-truist-report",
        title: "Appalachian Community Capital (ACC) Truist Foundation Report",
        category: "Publications",
        keywords: "truist foundation report small business data analytics hub diverse businesses grant capital",
        desc: "Special report on flexible grant capital deployment and the launch of ACC's regional Data Analytics Hub."
    },
    {
        route: "news-events.html#pub-soar-farms-khic",
        title: "Assisting Diverse Small Farms and Non-Profits Under Kentucky's SOAR Program",
        category: "Publications",
        keywords: "soar program khic kentucky highlands small farms agriculture microloans non-profits minority farmers",
        desc: "Report on $50,000 grant supporting the SOAR Small Farm Loan Fund for rural Kentucky agricultural enterprises."
    },
    {
        route: "news-events.html#pub-diverse-small-businesses",
        title: "Supporting Diverse Small Businesses in the Appalachian Region",
        category: "Publications",
        keywords: "supporting diverse small businesses member survey truist foundation underrepresented borrowers 13 states",
        desc: "Member survey evaluating how CDFI members deployed grant capital to assist diverse and rural entrepreneurs."
    },
    {
        route: "news-events.html#pub-investing-in-investors",
        title: "Appalachian Community Capital: Investing in the Investors",
        category: "Publications",
        keywords: "investing in the investors arc appalachian regional commission wholesale model intermediary scale",
        desc: "Appalachian Regional Commission feature analyzing ACC's wholesale intermediary financing model."
    },
    {
        route: "news-events.html#pub-oz-playbook",
        title: "Rural Opportunity Zone and Recovery Playbook",
        category: "Publications",
        keywords: "rural opportunity zone recovery playbook economic developers community champions private capital central appalachia",
        desc: "Practical playbook for structuring financings with social returns and attracting private capital to Opportunity Zones."
    },
    {
        route: "news-events.html#pub-bar-evaluation",
        title: "Evaluation Report: ACC Business Assistance Response (BAR) Program",
        category: "Publications",
        keywords: "bar program evaluation business assistance response arc emergency pandemic relief 3.56m",
        desc: "Evaluation report examining the $3.56M emergency COVID-19 relief program supporting 31 CDFI lenders."
    },
    {
        route: "news-events.html#pub-cdfi-ceo-succession",
        title: "Interviews with Former CDFI CEOs: Reflections on the Succession Experience",
        category: "Publications",
        keywords: "cdfi ceo succession study stepping stone partners leadership transition board readiness executive legacy",
        desc: "In-depth study featuring interviews with retired CDFI executives on leadership transition and institutional legacy."
    },
    {
        route: "news-events.html#pub-getting-rural-projects-ready",
        title: "Getting Rural Projects Ready for Investment (Opportunity Appalachia)",
        category: "Publications",
        keywords: "getting rural projects ready opportunity appalachia pre-development prospectus financing 100m oh va wv",
        desc: "Overview of pre-development technical support preparing 16 rural community projects for over $100M in investment."
    },
    // --- Press Releases & Milestones ---
    {
        route: "news-events.html#press-henry-golatt",
        title: "Appalachian Community Capital Welcomes Henry A. Golatt to Its Board of Directors",
        category: "Press Releases",
        keywords: "henry golatt board of directors loan committee chair hg consulting growth advantedge credit underwriting",
        desc: "October 2026: Announcement of Henry A. Golatt joining ACC's Board of Directors as Loan Committee Chair."
    },
    {
        route: "news-events.html#press-cin-3-4m",
        title: "ACC Community Investment Notes Surpasses $3.4 Million",
        category: "Press Releases",
        keywords: "community investment notes 3.4 million heron obran trillium brown advisory impact investing",
        desc: "September 2026: Milestone capital milestone as Community Investment Notes expand funding for rural community lenders."
    },
    {
        route: "news-events.html#press-three-new-board-members",
        title: "Appalachian Community Capital Welcomes Three New Members to Board of Directors",
        category: "Press Releases",
        keywords: "three new board members robin gabbard khaliff davis tj bogdewic mountain association reinvestment fund bridgeway capital",
        desc: "August 2026: Robin Gabbard, Khaliff Davis, and T.J. Bogdewic appointed to ACC Board of Directors."
    },
    {
        route: "news-events.html#press-donna-gambrell-legacy",
        title: "Honoring Donna Gambrell’s Legacy — and Investing in What Comes Next",
        category: "Press Releases",
        keywords: "donna gambrell legacy fund strategic initiatives retirement philanthropy endowment",
        desc: "February 2026: Establishment of the Gambrell Fund for Strategic Initiatives honoring Donna Gambrell's career."
    },
    {
        route: "news-events.html#press-four-new-members-dec-2025",
        title: "ACC Welcomes Four New Members (December 2025)",
        category: "Press Releases",
        keywords: "four new members community ventures virginia community development fund disability opportunity fund unified trust",
        desc: "December 2025: ACC expands network welcoming Community Ventures, VCDF, DOF, and Unified Trust."
    },
    {
        route: "news-events.html#press-ned-gramlich-award",
        title: "Donna Gambrell Receives 2025 Ned Gramlich Lifetime Achievement Award",
        category: "Press Releases",
        keywords: "ned gramlich lifetime achievement award ofn opportunity finance network donna gambrell responsible finance",
        desc: "October 2025: Opportunity Finance Network honors Donna Gambrell with national Lifetime Achievement Award."
    },
    {
        route: "news-events.html#press-oa-convening-recap",
        title: "Opportunity Appalachia 2025 Investor Convening Recap",
        category: "Press Releases",
        keywords: "opportunity appalachia 2025 investor convening recap downtown revitalization charleston wv",
        desc: "September 2025: Key outcomes from the 2025 Convening advancing downtown catalyst projects."
    },
    {
        route: "news-events.html#press-oa-convening-photos",
        title: "2025 Opportunity Appalachia Investor Convening Photos",
        category: "Press Releases",
        keywords: "opportunity appalachia convening photos photo gallery charleston west virginia",
        desc: "August 2025: Visual gallery and highlights from the annual Opportunity Appalachia Investor Convening."
    },
    {
        route: "news-events.html#press-ceo-search",
        title: "Position Announcement: ACC President and Chief Executive Officer",
        category: "Press Releases",
        keywords: "position announcement ceo search president chief executive officer executive transition",
        desc: "August 2025: Executive search launch for ACC's next President & Chief Executive Officer."
    },
    {
        route: "news-events.html#press-donna-gambrell-retirement",
        title: "Donna Gambrell, President & CEO of Appalachian Community Capital, Announces Retirement",
        category: "Press Releases",
        keywords: "donna gambrell retirement ceo transition 41 cdfi members 3.5 billion assets",
        desc: "July 2025: Donna Gambrell announces retirement after leading ACC's expansion from 12 to 41 CDFI members."
    },
    {
        route: "news-events.html#press-four-new-members-mar-2025",
        title: "ACC Welcomes Four New Members (March 2025)",
        category: "Press Releases",
        keywords: "four new members crf usa community works wv ecdi iff network growth",
        desc: "March 2025: Network expansion welcoming CRF USA, Community Works WV, ECDI, and IFF."
    },
    {
        route: "news-events.html#press-240m-requests",
        title: "$240M in Requests Received for Game-Changing Investment in Rural America",
        category: "Press Releases",
        keywords: "240m requests green bank rural america epa clean energy renewable financing preliminary demand",
        desc: "February 2025: Green Bank for Rural America receives over $240M in preliminary rural clean energy financing requests."
    },
    {
        route: "news-events.html#press-goldman-sachs",
        title: "Goldman Sachs Invests in Appalachian Community Capital and Regional Small Businesses",
        category: "Press Releases",
        keywords: "goldman sachs investment 10000 small businesses west virginia catalytic capital",
        desc: "December 2024: Goldman Sachs commits catalytic capital supporting West Virginia and regional small businesses."
    },
    {
        route: "news-events.html#press-daniel-wallace-gbra",
        title: "ACC Names Daniel Wallace as President and CEO of Green Bank for Rural America",
        category: "Press Releases",
        keywords: "daniel wallace president ceo green bank for rural america 500 million subsidiary appointment",
        desc: "November 2024: Announcement of Daniel Wallace leading the $500 million Green Bank for Rural America."
    },
    {
        route: "news-events.html#press-wncsbi-dogwood",
        title: "ACC Launches Western North Carolina Small Business Initiative with Dogwood Health Trust",
        category: "Press Releases",
        keywords: "western north carolina small business initiative wncsbi dogwood health trust hurricane helene emergency relief",
        desc: "October 2024: Rollout of $10M relief initiative providing emergency recovery grants to small businesses."
    },
    {
        route: "news-events.html#press-cdfi-fund-800k",
        title: "ACC Receives $800,000 Financial Assistance Grant from CDFI Fund",
        category: "Press Releases",
        keywords: "cdfi fund 800000 financial assistance treasury grant small business lending",
        desc: "September 2024: U.S. Treasury's CDFI Fund awards ACC $800,000 to expand small business financing."
    },
    {
        route: "news-events.html#press-truist-1-3m",
        title: "Appalachian Community Capital Awarded $1.3 Million Grant from Truist Foundation",
        category: "Press Releases",
        keywords: "truist foundation 1.3 million grant diverse small businesses technical assistance",
        desc: "August 2024: Major foundation grant accelerating capital access and tech assistance for diverse enterprises."
    },
    {
        route: "news-events.html#press-epa-500m-gbra",
        title: "ACC Formally Announces $500 Million Award from EPA Greenhouse Gas Reduction Fund",
        category: "Press Releases",
        keywords: "epa greenhouse gas reduction fund 500 million gbra green bank rural america 2.25 billion",
        desc: "August 2024: Formal rollout of the Green Bank for Rural America to finance $2.25 billion in clean energy."
    },
    {
        route: "news-events.html#press-oa-coaching-rfp",
        title: "ACC Seeks Coaching and Conference Management Services for Opportunity Appalachia",
        category: "Press Releases",
        keywords: "opportunity appalachia coaching rfp conference management technical support",
        desc: "May 2024: RFP solicitation for technical coaching and event management for Opportunity Appalachia."
    },
    {
        route: "news-events.html#press-gbra-comms-rfp",
        title: "ACC Seeks Communications Support Services for Green Bank for Rural America",
        category: "Press Releases",
        keywords: "green bank communications rfp public relations media support gbra",
        desc: "May 2024: RFP solicitation for strategic communications services for the Green Bank for Rural America."
    },
    {
        route: "news-events.html#press-epa-ccia-500m",
        title: "Appalachian Community Capital Selected for $500M Award from EPA's CCIA",
        category: "Press Releases",
        keywords: "epa ccia selection 500 million clean communities investment accelerator 18000 jobs",
        desc: "April 2024: Historic EPA CCIA grant selection creating an estimated 18,000 rural clean energy jobs."
    },
    {
        route: "news-events.html#press-truist-350k-match",
        title: "ACC Receives $350,000 Matching Grant from Truist Charitable Fund",
        category: "Press Releases",
        keywords: "truist charitable fund 350000 matching grant opportunity appalachia nc oh tn va wv ky",
        desc: "February 2024: Matching grant supporting Opportunity Appalachia community redevelopment projects across 6 states."
    },
    {
        route: "news-events.html#press-wnc-tech-transformation",
        title: "ACC Launches Technology Transformation Project for CDFI Members in Western NC",
        category: "Press Releases",
        keywords: "technology transformation project dogwood health trust cdfi infrastructure western nc",
        desc: "August 2023: Technology grant modernizing digital infrastructure and underwriting tools for member CDFIs."
    },
    {
        route: "news-events.html#press-connect-humanity-25m",
        title: "Connect Humanity Partners with ACC to Raise $25M to Bridge the Digital Divide",
        category: "Press Releases",
        keywords: "connect humanity 25m digital divide high-speed broadband idea equity",
        desc: "July 2023: Joint campaign funding community broadband infrastructure in underserved rural areas."
    },
    {
        route: "news-events.html#press-oa-convening-252m",
        title: "Opportunity Appalachia Investor Convening Showcases 33 Projects Seeking $252M",
        category: "Press Releases",
        keywords: "opportunity appalachia 33 projects 252m 3000 jobs coal-impacted downtowns",
        desc: "May 2023: Virtual convening showcasing 33 rural development projects anticipated to create 3,000 jobs."
    },
    {
        route: "news-events.html#press-cdfi-erp-600k",
        title: "ACC Receives Over $600,000 from CDFI Fund's Equitable Recovery Program",
        category: "Press Releases",
        keywords: "equitable recovery program erp 600000 treasury cdfi fund pandemic relief",
        desc: "April 2023: Federal grant expanding credit for businesses in pandemic-impacted communities."
    },
    {
        route: "news-events.html#press-va-cdfi-coalition",
        title: "Virginia CDFI Coalition Celebrates Win For Virginia",
        category: "Press Releases",
        keywords: "virginia cdfi coalition win sb 1320 hb 1411 youngkin state fund legislation",
        desc: "March 2023: Passage and signing into law of landmark legislation codifying the Virginia CDFI Fund."
    },
    // --- Upcoming Events & Convenings ---
    {
        route: "news-events.html#event-oz-cpace",
        title: "Lunch & Learn: Rural Opportunity Zones / C-PACE (Jan 12, 2027)",
        category: "Upcoming Events",
        keywords: "lunch learn rural opportunity zones c-pace clean energy ted kowalsky cohnreznick webinar",
        desc: "Exploring Commercial Property Assessed Clean Energy (C-PACE) and Rural Opportunity Zones with Ted Kowalsky."
    },
    {
        route: "news-events.html#event-data-centers-broadband",
        title: "Lunch & Learn: Data Centers & Rural Broadband (Feb 16, 2027)",
        category: "Upcoming Events",
        keywords: "lunch learn data centers rural broadband digital equity brian vo connect humanity webinar",
        desc: "Evaluating community broadband connectivity and regional data center energy needs with Brian Vo."
    },
    {
        route: "news-events.html#event-rural-healthcare",
        title: "Lunch & Learn: Rural Healthcare (Mar 16, 2027)",
        category: "Upcoming Events",
        keywords: "lunch learn rural healthcare mobile clinics clinic deserts dr paul rosen mission mobile medical webinar",
        desc: "Overcoming healthcare deserts through mobile clinic deployments and CDFI capital with Dr. Paul Rosen."
    },
    {
        route: "news-events.html#event-project-equity",
        title: "Lunch & Learn: Project Equity & Employee Ownership (Apr 13, 2027)",
        category: "Upcoming Events",
        keywords: "lunch learn project equity employee ownership worker co-ops amanda calder wealth building webinar",
        desc: "Preserving cornerstone small businesses through employee ownership and worker trusts with Amanda Calder."
    },
    // --- Podcasts & Audio Series ---
    {
        route: "news-events.html#podcast-appalachian-impact",
        title: "Appalachian Impact Podcast (ACC Limited Series)",
        category: "Podcasts & Media",
        keywords: "appalachian impact podcast apple podcasts acc limited series audio interviews",
        desc: "ACC's original limited podcast series exploring high-impact community investments and dedicated local lenders."
    },
    {
        route: "news-events.html#podcast-nyfed-missing-markets",
        title: "CDFIs: Serving the Underserved and Making Missing Markets (NY Fed)",
        category: "Podcasts & Media",
        keywords: "serving the underserved missing markets federal reserve bank new york ny fed podcast",
        desc: "Produced by the Federal Reserve Bank of New York: how CDFIs fill critical lending gaps in overlooked markets."
    },
    {
        route: "news-events.html#podcast-community-health-prosperity",
        title: "Why CDFIs are Essential for Community Health and Prosperity",
        category: "Podcasts & Media",
        keywords: "community health and prosperity build healthy places network video audio snapshots",
        desc: "Build Healthy Places Network feature exploring how mission-driven CDFI capital strengthens community wellness."
    },
    {
        route: "news-events.html#podcast-appalachia-meets-world",
        title: "Appalachia Meets World – Ep. 92: Access to Capital in Appalachia",
        category: "Podcasts & Media",
        keywords: "appalachia meets world episode 92 access to capital credit disparities regional innovation",
        desc: "In-depth podcast episode on addressing credit disparities and economic resilience across coal-impacted counties."
    },
    {
        route: "news-events.html#podcast-renegade-capital",
        title: "Are CDFIs the Original Capital Renegades? (Renegade Capital)",
        category: "Podcasts & Media",
        keywords: "capital renegades renegade capital buzzsprout barrier to credit equity in finance",
        desc: "Candid conversation on how mission lenders rewrite finance rules and dismantle credit barriers."
    },
    {
        route: "news-events.html#podcast-banking-rural-america",
        title: "Banking in Rural America (FDIC Podcast)",
        category: "Podcasts & Media",
        keywords: "banking in rural america fdic podcast anchor fm community bank partnerships",
        desc: "Federal Deposit Insurance Corporation feature discussing rural banking ecosystems and CDFI partnerships."
    },
    {
        route: "news-events.html#podcast-closing-broadband-gap",
        title: "Closing the Broadband Gap in Appalachia (FDIC Feature)",
        category: "Podcasts & Media",
        keywords: "closing the broadband gap fdic infrastructure digital divide loan capital",
        desc: "Insights into closing the regional digital divide through catalytic loan capital and collaborative initiatives."
    },
    // --- Videos & Multimedia Features ---
    {
        route: "news-events.html#video-wncsbi",
        title: "Western North Carolina Small Business Initiative (WNCSBI Video)",
        category: "Videos",
        keywords: "wncsbi video western north carolina small business initiative disaster recovery dogwood youtube",
        desc: "Video profile showing how emergency grant capital and CDFI support fueled small business recovery after Hurricane Helene."
    },
    {
        route: "news-events.html#video-oa-pre-development",
        title: "Opportunity Appalachia: Pre-Development Stage Support (Video)",
        category: "Videos",
        keywords: "opportunity appalachia video pre-development support financial structuring prospectus youtube",
        desc: "Program video explaining pre-development support connecting sponsors to architects, tax credits, and investors."
    },
    {
        route: "news-events.html#video-khic-kelly-upchurch",
        title: "Kentucky Highlands & American Health Management (Partner Spotlight Video)",
        category: "Videos",
        keywords: "kentucky highlands american health management kelly upchurch khic healthcare video youtube",
        desc: "How Kentucky Highlands and ACC financed healthcare justice and change with Kelly Upchurch in Southeastern Kentucky."
    },
    {
        route: "news-events.html#video-ft-bankless-america",
        title: "“Bankless in America” – Financial Times Documentary",
        category: "Videos",
        keywords: "bankless in america financial times documentary ft banking deserts rural cdfi youtube",
        desc: "Financial Times documentary highlighting rural banking deserts and the essential role played by community lenders."
    },
    {
        route: "news-events.html#video-lenwood-long",
        title: "Lenwood Long – CSBDF (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "lenwood long csbdf cdfi ceo succession planning video series leadership",
        desc: "Reflections from former CSBDF CEO Lenwood Long on executive succession, mission continuity, and board readiness."
    },
    {
        route: "news-events.html#video-ron-phillips",
        title: "Ron Phillips – CEI (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "ron phillips cei coastal enterprises cdfi ceo succession planning video series",
        desc: "CEI founder and former CEO Ron Phillips discusses leadership transition and organizational longevity."
    },
    {
        route: "news-events.html#video-gary-lindner",
        title: "Gary Lindner – PeopleFund (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "gary lindner peoplefund cdfi ceo succession video series transition",
        desc: "Former PeopleFund CEO Gary Lindner on navigating executive transitions and preparing future leaders."
    },
    {
        route: "news-events.html#video-deborah-mcketty",
        title: "Deborah McKetty – CommunityWorks (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "deborah mcketty communityworks cdfi ceo succession video series",
        desc: "CommunityWorks former CEO Deborah McKetty shares insights on succession planning and board engagement."
    },
    {
        route: "news-events.html#video-mark-peterson",
        title: "Mark Peterson – Bridgeway Capital (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "mark peterson bridgeway capital cdfi ceo succession video series",
        desc: "Former Bridgeway Capital CEO Mark Peterson on institutional readiness and executive succession."
    },
    {
        route: "news-events.html#video-nancy-andrews",
        title: "Nancy Andrews – LIIF (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "nancy andrews liif low income investment fund cdfi ceo succession video series",
        desc: "Former LIIF CEO Nancy Andrews shares perspectives on executive transitions in community development finance."
    },
    {
        route: "news-events.html#video-eric-weaver",
        title: "Eric Weaver – Opportunity Fund (CDFI Succession Video Series)",
        category: "Videos",
        keywords: "eric weaver opportunity fund cdfi ceo succession video series leadership",
        desc: "Opportunity Fund founder and former CEO Eric Weaver reflects on founder transition and leadership evolution."
    },
    // --- Impact Stories & Spotlights ---
    {
        route: "impact-insights.html#story-handinhand",
        title: "Small Business Spotlight – HandinHand Counseling Services",
        category: "Impact Stories",
        keywords: "handinhand counseling services tess kenney neighborhood community development fund ncdf mental health therapy",
        desc: "How Tess Kenney expanded trauma-informed, culturally responsive therapy in Pennsylvania with NCDF financing."
    },
    {
        route: "impact-insights.html#story-cakes-boutique",
        title: "Small Business Spotlight – Cakes Designer Boutique & Academy",
        category: "Impact Stories",
        keywords: "cakes designer boutique academy guadalupe quaranta ace access to capital for entrepreneurs atlanta bakery hispanic",
        desc: "Guadalupe Quaranta expanded her commercial bakery and academy in Atlanta with financing from ACE."
    },
    {
        route: "impact-insights.html#story-future-focus",
        title: "Small Business Spotlight – Future Focus Child Care",
        category: "Impact Stories",
        keywords: "future focus child care dejuana smith pittsburgh ncdf daycare building purchase 10000 sq ft",
        desc: "Dejuana Smith grew an in-home daycare into a 10,000 sq ft facility serving 70 children in Pittsburgh with NCDF support."
    },
    {
        route: "impact-insights.html#story-foundations-care",
        title: "Small Business Spotlight – Foundations Total Care",
        category: "Impact Stories",
        keywords: "foundations total care te'aira mallory union ohio ecdi home healthcare idd community",
        desc: "Te'Aira Mallory expanded personalized healthcare and IDD care across all 88 Ohio counties with ECDI financing."
    },
    {
        route: "impact-insights.html#story-acoustic-corner",
        title: "Small Business Spotlight – Acoustic Corner (David Zoll)",
        category: "Impact Stories",
        keywords: "acoustic corner david zoll black mountain north carolina mountain bizworks music shop building ownership",
        desc: "David Zoll transitioned from part-time employee to building and business owner in Black Mountain with Mountain BizWorks."
    },
    {
        route: "impact-insights.html#story-winston-brett",
        title: "Business Growth Spotlight – Winston, Brett & Eric",
        category: "Impact Stories",
        keywords: "winston brett eric small business growth entrepreneurs capital",
        desc: "Spotlight highlighting entrepreneur growth and local employment created through member CDFI partnership."
    },
    {
        route: "impact-insights.html#story-tantrum-brewing",
        title: "Impact Story – Tantrum Brewing Company",
        category: "Impact Stories",
        keywords: "tantrum brewing company cleveland georgia craft brewery tourism agriculture",
        desc: "Family-owned craft brewery and agri-tourism destination created in North Georgia with member CDFI loan support."
    },
    {
        route: "impact-insights.html#story-blue-firefly",
        title: "Impact Story – Blue Firefly Inn (Saluda, NC)",
        category: "Impact Stories",
        keywords: "blue firefly inn alexis deal saluda north carolina natural capital investment fund cycling bed and breakfast",
        desc: "Alexis Deal turned a historic vacant property into Saluda's first cycling-focused bed & breakfast with NCIF financing."
    },
    {
        route: "impact-insights.html#story-shipley-farms",
        title: "Impact Story – Shipley Farms (Vilas, NC)",
        category: "Impact Stories",
        keywords: "shipley farms gray shipley vilas north carolina ncif sustainable cattle pasture-raised beef",
        desc: "Multi-generation farm in NC built a premium sustainable beef brand supporting local farmers with NCIF and ACC financing."
    },
    {
        route: "impact-insights.html#story-horizon-health",
        title: "Impact Story – Horizon Adult Health Care",
        category: "Impact Stories",
        keywords: "horizon adult health care kentucky rural elderly day care medical clinics khic",
        desc: "Financing community-based adult day care and health services for seniors in rural Kentucky."
    },
    {
        route: "impact-insights.html#story-secure-futures",
        title: "Impact Story – Secure Futures LLC (Solar Energy)",
        category: "Impact Stories",
        keywords: "secure futures solar clean energy commercial solar arrays rural virginia schools universities",
        desc: "Deploying commercial and public solar power arrays across rural Virginia schools and municipalities."
    },
    {
        route: "impact-insights.html#story-vanhooseco",
        title: "Impact Story – VANHOOSECO™ Precast Concrete",
        category: "Impact Stories",
        keywords: "vanhooseco precast concrete jeff vanhoose manufacturing infrastructure tennessee",
        desc: "Expanding specialized precast concrete manufacturing and infrastructure jobs in Eastern Tennessee."
    },
    {
        route: "impact-insights.html#story-enjoy-entertainment",
        title: "Impact Story – enJOY Entertainment, LLC",
        category: "Impact Stories",
        keywords: "enjoy entertainment community gathering family entertainment rural appalachia",
        desc: "Providing family entertainment and community gathering space in underserved Appalachian communities."
    },
    {
        route: "impact-insights.html#story-tim-tam",
        title: "Impact Story – Tim Tam Logistics",
        category: "Impact Stories",
        keywords: "tim tam logistics trucking freight transport jobs rural enterprise",
        desc: "Growing a regional freight and logistics transport business supporting local supply chains and jobs."
    },
    {
        route: "impact-insights.html#story-sound-space",
        title: "Impact Story – Sound Space",
        category: "Impact Stories",
        keywords: "sound space music studio rehearsal creative economy arts",
        desc: "Investing in community music rehearsal and recording studios anchoring the regional creative economy."
    },
    {
        route: "impact-insights.html#story-kay-fch",
        title: "Impact Story – Kay FCH, LLC",
        category: "Impact Stories",
        keywords: "kay fch residential care assisted living rural community facility",
        desc: "Supporting specialized community-based residential and adult care facilities in rural Appalachia."
    }
];

function initSiteSearch() {
    const triggerBtn = document.getElementById('siteSearchTrigger');
    const mobileTriggerBtn = document.getElementById('mobileSearchTriggerBtn');
    const modal = document.getElementById('siteSearchModal');
    if (!modal) return;

    // Relocate modal directly under <body> to prevent stacking context or layout issues
    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    const backdrop = document.getElementById('searchModalBackdrop');
    const input = document.getElementById('siteSearchInput');
    const clearBtn = document.getElementById('searchBoxClear');
    const closeBtn = document.getElementById('searchModalCloseBtn');
    const categoryBar = document.getElementById('searchCategoriesBar');
    const resultsList = document.getElementById('searchResultsList');
    const resultsCount = document.getElementById('searchResultsCount');
    const footerRouteInfo = document.getElementById('searchFooterRouteInfo');

    const categoryIcons = {
        'Main Pages': {
            class: 'cat-pages',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
        },
        'Programs & Services': {
            class: 'cat-programs',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>'
        },
        'Network & Members': {
            class: 'cat-network',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
        },
        'Impact & Stories': {
            class: 'cat-impact',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'
        },
        'News & Media': {
            class: 'cat-news',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>'
        },
        'About': {
            class: 'cat-about',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        },
        'Invest & Donate': {
            class: 'cat-invest',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
        },
        'Contact & Inquiries': {
            class: 'cat-contact',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
        },
        'Publications': {
            class: 'cat-news',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
        },
        'Press Releases': {
            class: 'cat-news',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>'
        },
        'Upcoming Events': {
            class: 'cat-programs',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
        },
        'Podcasts & Media': {
            class: 'cat-about',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'
        },
        'Videos': {
            class: 'cat-invest',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'
        },
        'Impact Stories': {
            class: 'cat-impact',
            svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
        }
    };

    // Adapt shortcut text for macOS vs Windows/Linux
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const tooltipKbd = document.querySelector('.header-search-icon-btn .search-tooltip kbd');
    if (tooltipKbd) {
        tooltipKbd.textContent = isMac ? '⌘K' : 'Ctrl K';
    }

    let activeCategory = 'all';
    let currentResults = [];
    let selectedIndex = -1;

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function highlightMatch(text, tokens) {
        if (!tokens || tokens.length === 0) return escapeHtml(text);
        const safeTokens = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean);
        if (!safeTokens.length) return escapeHtml(text);
        const regex = new RegExp(`(${safeTokens.join('|')})`, 'gi');
        const parts = String(text).split(regex);
        return parts.map(part => {
            if (safeTokens.some(t => new RegExp(`^${t}$`, 'i').test(part))) {
                return `<mark class="search-highlight">${escapeHtml(part)}</mark>`;
            }
            return escapeHtml(part);
        }).join('');
    }

    function openSearchModal() {
        // If mobile nav is open, close it
        const siteHeader = document.querySelector('.site-header');
        if (siteHeader && siteHeader.classList.contains('menu-open')) {
            siteHeader.classList.remove('menu-open');
            const hamburgerIcon = document.querySelector('.hamburger-icon');
            const closeIcon = document.querySelector('.close-icon');
            if (hamburgerIcon) hamburgerIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        }

        modal.hidden = false;
        // Trigger reflow for transition
        void modal.offsetWidth;
        modal.classList.add('is-open');
        document.body.classList.add('search-modal-open');

        // Focus search input
        setTimeout(() => {
            if (input) {
                input.focus();
                input.select();
            }
        }, 60);

        renderResults(input ? input.value : '');
    }

    function closeSearchModal() {
        modal.classList.remove('is-open');
        document.body.classList.remove('search-modal-open');
        setTimeout(() => {
            modal.hidden = true;
        }, 220);
    }

    function highlightCard(el) {
        if (!el) return;
        el.classList.add('search-target-highlight');
        setTimeout(() => {
            el.classList.remove('search-target-highlight');
        }, 2500);
    }

    function navigateToRoute(targetRoute) {
        if (!targetRoute) return;
        closeSearchModal();

        // Check if route has an anchor and points to the current page
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const [routeFile, routeHash] = targetRoute.split('#');

        const isCurrentPage = (!routeFile || routeFile === currentFile || (currentFile === '' && routeFile === 'index.html'));

        if (isCurrentPage && routeHash) {
            const targetEl = document.getElementById(routeHash);
            if (targetEl) {
                const detailsParent = targetEl.closest('details');
                if (detailsParent && !detailsParent.open) {
                    detailsParent.open = true;
                }
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                history.pushState(null, '', '#' + routeHash);
                highlightCard(targetEl);
                return;
            }
        }

        window.location.href = targetRoute;
    }

    function updateSelection() {
        if (!resultsList) return;
        const items = resultsList.querySelectorAll('.search-result-row');
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('is-selected');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                if (footerRouteInfo && currentResults[idx]) {
                    footerRouteInfo.innerHTML = `
                        <span class="footer-preview-icon">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </span>
                        <span class="footer-preview-text">Selected: <strong>${escapeHtml(currentResults[idx].title)}</strong></span>
                    `;
                }
            } else {
                item.classList.remove('is-selected');
            }
        });

        if (selectedIndex === -1 && footerRouteInfo) {
            footerRouteInfo.innerHTML = `
                <span class="footer-preview-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <span class="footer-preview-text">Search across all pages, programs, and reports</span>
            `;
        }
    }

    function renderResults(query) {
        if (!resultsList) return;
        const rawTokens = (query || '').toLowerCase().trim().split(/\s+/).filter(Boolean);
        let filtered = siteRoutes;

        if (activeCategory !== 'all') {
            filtered = filtered.filter(item => {
                if (activeCategory === 'Main Pages') return item.category === 'Main Pages';
                if (activeCategory === 'Programs & Services') return item.category.includes('Programs');
                if (activeCategory === 'Network & Members') return item.category.includes('Network');
                if (activeCategory === 'Impact & Stories') return item.category.includes('Impact') || item.category.includes('Stories');
                if (activeCategory === 'News & Media') return item.category.includes('News') || item.category.includes('Press') || item.category.includes('Publication') || item.category.includes('Podcast') || item.category.includes('Video') || item.category.includes('Event');
                if (activeCategory === 'Invest & Donate') return item.category.includes('Invest') || item.category.includes('Donate');
                return item.category === activeCategory;
            });
        }

        if (rawTokens.length > 0) {
            const scored = [];
            filtered.forEach(item => {
                const titleLower = item.title.toLowerCase();
                const routeLower = item.route.toLowerCase();
                const kwLower = (item.keywords || '').toLowerCase();
                const descLower = (item.desc || '').toLowerCase();
                const catLower = item.category.toLowerCase();

                let matchesAll = true;
                let score = 0;

                for (const token of rawTokens) {
                    let matchedToken = false;
                    if (routeLower.includes(token)) {
                        score += 35;
                        matchedToken = true;
                    }
                    if (titleLower.includes(token)) {
                        score += 30;
                        matchedToken = true;
                    }
                    if (kwLower.includes(token)) {
                        score += 20;
                        matchedToken = true;
                    }
                    if (descLower.includes(token)) {
                        score += 15;
                        matchedToken = true;
                    }
                    if (catLower.includes(token)) {
                        score += 10;
                        matchedToken = true;
                    }

                    if (!matchedToken) {
                        matchesAll = false;
                        break;
                    }
                }

                if (matchesAll) {
                    scored.push({ item, score });
                }
            });

            scored.sort((a, b) => b.score - a.score);
            currentResults = scored.map(s => s.item);
        } else {
            // Default list: if all categories, show top quick routes; if specific category, show all in category
            if (activeCategory === 'all') {
                currentResults = filtered.slice(0, 10);
            } else {
                currentResults = filtered;
            }
        }

        selectedIndex = currentResults.length > 0 ? 0 : -1;

        // Render counts and header
        if (resultsCount) {
            if (rawTokens.length > 0) {
                resultsCount.textContent = `Found ${currentResults.length} matching result${currentResults.length === 1 ? '' : 's'}`;
            } else {
                resultsCount.textContent = activeCategory === 'all'
                    ? 'Suggested Pages & Sections'
                    : `${activeCategory} (${currentResults.length})`;
            }
        }

        // Render card items
        if (currentResults.length === 0) {
            resultsList.innerHTML = `
                <div class="search-empty-state">
                    <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <h3 class="empty-state-title">No results found for "${escapeHtml(query)}"</h3>
                    <p class="empty-state-desc">Try a different keyword or explore popular site topics below:</p>
                    <div class="search-suggestion-pills">
                        <button type="button" class="search-suggestion-pill" data-suggest="lending">Lending &amp; Capital</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="directory">CDFI Directory</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="green bank">Green Bank</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="stories">Stories of Impact</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="board">Board &amp; Leadership</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="reports">Impact Reports</button>
                        <button type="button" class="search-suggestion-pill" data-suggest="contact">Contact Us</button>
                    </div>
                </div>
            `;

            // Hook up suggestion pills
            const suggestionPills = resultsList.querySelectorAll('.search-suggestion-pill');
            suggestionPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    const term = pill.getAttribute('data-suggest');
                    if (input) {
                        input.value = term;
                        if (clearBtn) clearBtn.style.display = 'flex';
                        renderResults(term);
                        input.focus();
                    }
                });
            });
        } else {
            resultsList.innerHTML = currentResults.map((item, idx) => {
                const highlightedTitle = highlightMatch(item.title, rawTokens);
                const highlightedDesc = highlightMatch(item.desc, rawTokens);
                const isSelected = idx === selectedIndex ? ' is-selected' : '';
                const iconInfo = categoryIcons[item.category] || categoryIcons['Main Pages'];

                return `
                    <a href="${escapeHtml(item.route)}" class="search-result-row${isSelected}" data-index="${idx}" data-route="${escapeHtml(item.route)}" role="option">
                        <div class="result-leading-icon ${iconInfo.class}">
                            ${iconInfo.svg}
                        </div>
                        <div class="result-body">
                            <div class="result-headline">
                                <span class="result-title">${highlightedTitle}</span>
                                <span class="result-category-tag">${escapeHtml(item.category)}</span>
                            </div>
                            <p class="result-snippet">${highlightedDesc}</p>
                        </div>
                        <div class="result-trailing">
                            <span class="result-open-pill">
                                <span>Open</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </span>
                        </div>
                    </a>
                `;
            }).join('');

            // Hook up click & hover listeners for rows
            const rows = resultsList.querySelectorAll('.search-result-row');
            rows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    const idx = parseInt(row.getAttribute('data-index'), 10);
                    if (!isNaN(idx)) {
                        selectedIndex = idx;
                        updateSelection();
                    }
                });

                row.addEventListener('click', (e) => {
                    e.preventDefault();
                    const route = row.getAttribute('data-route');
                    navigateToRoute(route);
                });
            });
        }

        updateSelection();
    }

    // Event Listeners for trigger buttons
    if (triggerBtn) {
        triggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSearchModal();
        });
    }

    if (mobileTriggerBtn) {
        mobileTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSearchModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSearchModal);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeSearchModal);
    }

    if (clearBtn && input) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.style.display = 'none';
            renderResults('');
            input.focus();
        });
    }

    if (input) {
        input.addEventListener('input', () => {
            const query = input.value;
            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
            }
            renderResults(query);
        });
    }

    // Category Tabs filter
    if (categoryBar) {
        const catPills = categoryBar.querySelectorAll('.search-tab-pill');
        catPills.forEach(pill => {
            pill.addEventListener('click', () => {
                catPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategory = pill.getAttribute('data-cat') || 'all';
                renderResults(input ? input.value : '');
            });
        });
    }

    // Keyboard Shortcuts and Navigation
    document.addEventListener('keydown', (e) => {
        // Open with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modal.classList.contains('is-open')) {
                closeSearchModal();
            } else {
                openSearchModal();
            }
            return;
        }

        // Open with '/' if not already typing in another input
        if (e.key === '/' && !modal.classList.contains('is-open')) {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select' && !document.activeElement.isContentEditable) {
                e.preventDefault();
                openSearchModal();
                return;
            }
        }

        // Handle keys when search modal is open
        if (modal.classList.contains('is-open')) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeSearchModal();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex + 1) % currentResults.length;
                    updateSelection();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
                    updateSelection();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
                    navigateToRoute(currentResults[selectedIndex].route);
                } else if (currentResults.length > 0) {
                    navigateToRoute(currentResults[0].route);
                }
            }
        }
    });
}

/**
 * Leader Bio Modal Functionality
 * Opens accessible modal popup displaying the full biography of executive leaders
 */
function initLeaderBioModals() {
    const modal = document.getElementById('leaderBioModal');
    if (!modal) return;

    const modalPhoto = document.getElementById('leaderModalPhoto');
    const modalTitle = document.getElementById('leaderModalTitle');
    const modalRole = document.getElementById('leaderModalRole');
    const modalBody = document.getElementById('leaderModalBody');
    const closeBtn = document.getElementById('leaderModalCloseBtn');
    const footerCloseBtn = document.getElementById('leaderModalFooterCloseBtn');
    let lastFocusedElement = null;

    function openModal(card) {
        if (!card) return;
        lastFocusedElement = document.activeElement;

        const photoImg = card.querySelector('.leader-photo img');
        const nameEl = card.querySelector('.leader-name');
        const titleEl = card.querySelector('.leader-title');
        const fullBioEl = card.querySelector('.leader-full-bio');

        if (modalPhoto && photoImg) {
            modalPhoto.src = photoImg.src;
            modalPhoto.alt = photoImg.alt || (nameEl ? nameEl.textContent.trim() : '');
        }
        if (modalTitle && nameEl) {
            modalTitle.textContent = nameEl.textContent.trim();
        }
        if (modalRole && titleEl) {
            modalRole.textContent = titleEl.textContent.trim();
        }
        if (modalBody) {
            if (fullBioEl) {
                modalBody.innerHTML = fullBioEl.innerHTML;
            } else {
                const shortBio = card.querySelector('.leader-bio');
                modalBody.innerHTML = shortBio ? `<p>${shortBio.textContent.trim()}</p>` : '';
            }
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 50);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    // Attach to all Bio buttons
    document.querySelectorAll('.leader-bio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.leader-card');
            openModal(card);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    if (footerCloseBtn) {
        footerCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Story Details Modal Functionality
 * Opens accessible modal popup displaying the full narrative and metadata of impact stories
 */
function initStoryModals() {
    const modal = document.getElementById('storyModal');
    if (!modal) return;

    const modalImgWrap = document.getElementById('storyModalHeroImgWrap');
    const modalImg = document.getElementById('storyModalImg');
    const modalCategory = document.getElementById('storyModalCategory');
    const modalDate = document.getElementById('storyModalDate');
    const modalTitle = document.getElementById('storyModalTitle');
    const modalMeta = document.getElementById('storyModalMeta');
    const modalBody = document.getElementById('storyModalBody');
    const closeBtn = document.getElementById('storyModalCloseBtn');
    const footerCloseBtn = document.getElementById('storyModalFooterCloseBtn');
    let lastFocusedElement = null;

    function openModal(card) {
        if (!card) return;
        lastFocusedElement = document.activeElement;

        const thumbImg = card.querySelector('.news-thumb img');
        const categoryEl = card.querySelector('.news-category');
        const dateEl = card.querySelector('.news-date');
        const titleEl = card.querySelector('h3');
        const metaEl = card.querySelector('.story-meta-badge');
        const fullContentEl = card.querySelector('.story-full-content');

        if (modalImg && thumbImg) {
            modalImg.src = thumbImg.src;
            modalImg.alt = thumbImg.alt || (titleEl ? titleEl.textContent.trim() : '');
            if (modalImgWrap) modalImgWrap.style.display = 'block';
        } else if (modalImgWrap) {
            modalImgWrap.style.display = 'none';
        }

        if (modalCategory && categoryEl) {
            modalCategory.textContent = categoryEl.textContent.trim();
        }
        if (modalDate && dateEl) {
            modalDate.textContent = dateEl.textContent.trim();
        }
        if (modalTitle && titleEl) {
            modalTitle.textContent = titleEl.textContent.trim();
        }
        if (modalMeta) {
            if (metaEl && metaEl.innerHTML.trim()) {
                modalMeta.innerHTML = metaEl.innerHTML.trim();
                modalMeta.style.display = 'flex';
            } else {
                modalMeta.innerHTML = '';
                modalMeta.style.display = 'none';
            }
        }
        if (modalBody) {
            if (fullContentEl && fullContentEl.innerHTML.trim()) {
                modalBody.innerHTML = fullContentEl.innerHTML.trim();
            } else {
                const excerpt = card.querySelector('.story-excerpt');
                modalBody.innerHTML = excerpt ? `<p>${excerpt.textContent.trim()}</p>` : '';
            }
        }

        const scrollContainer = modal.querySelector('.story-modal-scroll');
        if (scrollContainer) scrollContainer.scrollTop = 0;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 50);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    // Attach to all Read Full Story buttons
    document.querySelectorAll('.story-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.news-card');
            openModal(card);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    if (footerCloseBtn) {
        footerCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

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
            "https://func-accwebsite-prd-bacvcyekhtcmd6av.eastus-01.azurewebsites.net/api/contact/submit",
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
        trackClarityEvent('contact_form_submitted');
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

// Footer Newsletter Subscription Handler with Honeypot Anti-Bot Protection
function initFooterSubscribeForms() {
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach((form) => {
        if (form.dataset.hpInit) return;
        form.dataset.hpInit = "true";

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const honeypotInput = form.querySelector('input[name="website"]');
            const submitBtn = form.querySelector('.subscribe-btn');

            if (!nameInput || !emailInput || !submitBtn) return;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (!name || !email) return;

            const payload = {
                name: name,
                email: email,
                website: honeypotInput ? honeypotInput.value : ""
            };

            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="captcha-spin" style="animation: captchaSpin 0.7s linear infinite; display: inline-block; vertical-align: middle; margin-right: 6px;">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10"></path>
                </svg>
                <span>Subscribing...</span>
            `;

            try {
                const response = await fetch(
                    "https://func-accwebsite-prd-bacvcyekhtcmd6av.eastus-01.azurewebsites.net/api/newsletter/subscribe",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    }
                );

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.error || result.message || "Subscription failed");
                }

                // Success state
                if (!payload.website) {
                    trackClarityEvent('newsletter_signup_completed');
                }
                submitBtn.innerHTML = '<span>Subscribed!</span>';
                submitBtn.style.backgroundColor = '#026836';
                submitBtn.style.borderColor = '#026836';
                form.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.innerHTML = originalBtnHTML;
                }, 4000);

            } catch (error) {
                console.error("Newsletter subscription error:", error);
                submitBtn.innerHTML = '<span>Error. Try again</span>';
                submitBtn.style.backgroundColor = '#b91c1c';
                submitBtn.style.borderColor = '#b91c1c';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.innerHTML = originalBtnHTML;
                }, 4000);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterSubscribeForms);
} else {
    initFooterSubscribeForms();
}

/**
 * Upcoming Events & Media Subnav Scrollspy
 */
function initUpcomingEvents() {
    const eventsSection = document.getElementById('events');
    if (!eventsSection) return;

    // Sticky Subnav Scrollspy
    const subnavPills = document.querySelectorAll('.media-subnav-pill');
    if (subnavPills.length > 0) {
        const sections = [
            document.getElementById('publications'),
            document.getElementById('press'),
            document.getElementById('events'),
            document.getElementById('newsletters'),
            document.getElementById('podcasts'),
            document.getElementById('videos')
        ].filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    subnavPills.forEach(pill => {
                        const href = pill.getAttribute('href');
                        if (href === '#' + id) {
                            pill.classList.add('active');
                        } else {
                            pill.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        sections.forEach(sec => observer.observe(sec));
    }
}

/**
 * Opportunity Appalachia Modal Popups
 */
function initOAModals() {
    const modalTriggers = document.querySelectorAll('[data-oa-modal]');
    if (modalTriggers.length === 0) return;

    let activeModal = null;
    let lastFocusedElement = null;

    function openOAModal(modalId, triggerEl) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        lastFocusedElement = triggerEl;
        activeModal = modal;
        modal.removeAttribute('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.oa-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeOAModal() {
        if (!activeModal) return;

        activeModal.classList.remove('active');
        activeModal.setAttribute('hidden', '');
        document.body.style.overflow = '';

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
        activeModal = null;
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-oa-modal');
            if (targetId) openOAModal(targetId, btn);
        });
    });

    document.querySelectorAll('.oa-modal-backdrop').forEach(modal => {
        const closeBtns = modal.querySelectorAll('.oa-modal-close, .oa-modal-close-btn');
        closeBtns.forEach(b => {
            b.addEventListener('click', (e) => {
                e.preventDefault();
                closeOAModal();
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeOAModal();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeOAModal();
        }
    });
}
