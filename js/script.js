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

const FOCUSABLE_SELECTOR = 'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => el.getClientRects().length > 0);
}

function trapFocus(event, container) {
    if (event.key !== 'Tab' || !container) return;
    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
        event.preventDefault();
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

// We store the header HTML in a template string so it works locally without a server (no CORS issues).
const headerHTML = `
     <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="logo" aria-label="Appalachian Community Capital Home">
                <img src="images/ACC-Logo-header.png" alt="Appalachian Community Capital">
            </a>
            <nav class="main-nav" id="site-main-nav">
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
                        <a href="impact-insights.html" class="nav-link" aria-haspopup="true" aria-expanded="false">
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
                        <a href="news-events.html" class="nav-link" aria-haspopup="true" aria-expanded="false">
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
                    <button type="button" class="invest-trigger-btn" id="investTriggerBtn" aria-expanded="false" aria-haspopup="true" aria-label="Invest in Our Work Menu">
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
                <button type="button" class="mobile-menu-btn" aria-label="Toggle Menu" aria-expanded="false" aria-controls="site-main-nav">
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

    const closeMobileMenu = (options = {}) => {
        if (siteHeader && siteHeader.classList.contains('menu-open')) {
            siteHeader.classList.remove('menu-open');
            if (hamburgerIcon) hamburgerIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
            document.body.style.overflow = '';
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (options.restoreFocus && mobileMenuBtn) mobileMenuBtn.focus();
        }
    };

    const closeInvestPopup = (options = {}) => {
        if (investWrapper && investWrapper.classList.contains('is-open')) {
            investWrapper.classList.remove('is-open');
            if (investTriggerBtn) {
                investTriggerBtn.setAttribute('aria-expanded', 'false');
                if (options.restoreFocus) investTriggerBtn.focus();
            }
        }
    };

    const setDropdownExpanded = (dropdownItem, expanded) => {
        const link = dropdownItem ? dropdownItem.querySelector('.nav-link') : null;
        if (link && link.hasAttribute('aria-haspopup')) {
            link.setAttribute('aria-expanded', expanded ? 'true' : 'false');
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

            const isOpen = siteHeader.classList.contains('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (isOpen) {
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
                                setDropdownExpanded(other, false);
                            }
                        });
                        dropdownItem.classList.remove('dropdown-hidden');
                        if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
                        dropdownItem.classList.add('dropdown-open');
                        setDropdownExpanded(dropdownItem, true);
                    } else {
                        dropdownItem.classList.remove('dropdown-open');
                        dropdownItem.classList.add('dropdown-hidden');
                        if (dropdownMenu) dropdownMenu.classList.add('is-hidden');
                        setDropdownExpanded(dropdownItem, false);
                    }
                } else {
                    dropdownItem.classList.remove('dropdown-hidden');
                    if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
                    setDropdownExpanded(dropdownItem, true);
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
                setDropdownExpanded(dropdownItem, false);
                closeInvestPopup();
                closeMobileMenu();

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
            });
        });

        // Re-enable dropdown display when cursor enters or moves over dropdown container
        dropdownItem.addEventListener('mouseenter', () => {
            dropdownItem.classList.remove('dropdown-hidden');
            if (dropdownMenu) dropdownMenu.classList.remove('is-hidden');
            if (window.innerWidth > 1024) setDropdownExpanded(dropdownItem, true);
        });

        dropdownItem.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) setDropdownExpanded(dropdownItem, false);
        });

        dropdownItem.addEventListener('focusin', () => {
            if (window.innerWidth > 1024) setDropdownExpanded(dropdownItem, true);
        });

        dropdownItem.addEventListener('focusout', (e) => {
            if (window.innerWidth > 1024 && !dropdownItem.contains(e.relatedTarget)) {
                setDropdownExpanded(dropdownItem, false);
            }
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
                setDropdownExpanded(dropdownItem, false);
            }
        });

        if (investWrapper && !investWrapper.contains(e.target)) {
            closeInvestPopup();
        }

        if (siteHeader && siteHeader.classList.contains('menu-open') && !siteHeader.contains(e.target)) {
            closeMobileMenu();
        }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (investWrapper && investWrapper.classList.contains('is-open')) {
                closeInvestPopup({ restoreFocus: true });
                return;
            }
            if (siteHeader && siteHeader.classList.contains('menu-open')) {
                closeMobileMenu({ restoreFocus: true });
            }
        }
        if (investWrapper && investWrapper.classList.contains('is-open')) {
            trapFocus(e, investWrapper);
        } else if (siteHeader && siteHeader.classList.contains('menu-open')) {
            trapFocus(e, siteHeader);
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
                    input.removeAttribute('aria-invalid');
                    input.removeAttribute('aria-describedby');
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
    let lastFocusedElement = null;

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
        lastFocusedElement = document.activeElement;

        // If mobile nav is open, close it
        const siteHeader = document.querySelector('.site-header');
        if (siteHeader && siteHeader.classList.contains('menu-open')) {
            siteHeader.classList.remove('menu-open');
            const hamburgerIcon = document.querySelector('.hamburger-icon');
            const closeIcon = document.querySelector('.close-icon');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (hamburgerIcon) hamburgerIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
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
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 220);
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
                targetEl.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', '#' + routeHash);
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
                if (activeCategory === 'Programs & Services') return item.category.includes('Programs');
                if (activeCategory === 'Network & Members') return item.category.includes('Network');
                if (activeCategory === 'Impact & Stories') return item.category.includes('Impact');
                if (activeCategory === 'News & Media') return item.category.includes('News');
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
            trapFocus(e, modal);
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

    modal.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) trapFocus(e, modal);
    });

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

    modal.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) trapFocus(e, modal);
    });

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

    const clearFieldError = (input) => {
        if (!input) return;
        input.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        const err = input.parentElement ? input.parentElement.querySelector('.field-error-msg') : null;
        if (err) err.classList.remove('visible');
    };

    const showFieldError = (input) => {
        if (!input) return;
        input.classList.add('has-error');
        input.setAttribute('aria-invalid', 'true');
        const err = input.parentElement ? input.parentElement.querySelector('.field-error-msg') : null;
        if (err) {
            if (!err.id && input.id) err.id = input.id + '-error';
            err.classList.add('visible');
            if (err.id) input.setAttribute('aria-describedby', err.id);
        }
    };

    // Reset error styling
    form.querySelectorAll('.acc-form-input, .acc-form-select, .acc-form-textarea').forEach(clearFieldError);
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
        showFieldError(firstNameInput);
    }

    // Validate Last Name
    if (lastNameInput && !lastNameInput.value.trim()) {
        isValid = false;
        showFieldError(lastNameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        showFieldError(emailInput);
    }

    // Validate Message (required by backend)
    if (messageInput && !messageInput.value.trim()) {
        isValid = false;
        showFieldError(messageInput);
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
            captchaError.setAttribute('role', 'alert');
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

        modal.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) trapFocus(e, modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) {
            closeOAModal();
        }
    });
}
