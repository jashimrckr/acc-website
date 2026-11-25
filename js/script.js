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

function enhanceNewWindowLinks(root = document) {
    root.querySelectorAll('a[target="_blank"]').forEach((link) => {
        const relTokens = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        relTokens.add('noopener');
        relTokens.add('noreferrer');
        link.setAttribute('rel', Array.from(relTokens).join(' '));

        const existingLabel = (link.getAttribute('aria-label') || '').trim();
        if (existingLabel) {
            if (!/opens in a new (tab|window)/i.test(existingLabel)) {
                link.setAttribute('aria-label', `${existingLabel} (opens in a new tab)`);
            }
            return;
        }

        if (link.querySelector('.opens-new-window')) return;
        const hint = document.createElement('span');
        hint.className = 'visually-hidden opens-new-window';
        hint.textContent = ' (opens in a new tab)';
        link.appendChild(hint);
    });
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 1.99707C8.61346 1.99707 5.6175 3.69095 3.80957 6.2334C3.74852 6.31338 3.70418 6.40483 3.6792 6.50231C3.65422 6.59978 3.64911 6.70129 3.66417 6.80078C3.67923 6.90027 3.71415 6.99571 3.76686 7.08142C3.81957 7.16714 3.88899 7.24137 3.97098 7.2997C4.05297 7.35803 4.14586 7.39927 4.24412 7.42096C4.34238 7.44265 4.44399 7.44435 4.54292 7.42595C4.64185 7.40755 4.73607 7.36944 4.81996 7.31388C4.90385 7.25832 4.97571 7.18645 5.03125 7.10254C6.56832 4.94099 9.11354 3.49707 12 3.49707C16.5891 3.49707 20.2823 7.07711 20.4834 11.6143L20.0518 11.1914C19.9811 11.1202 19.8969 11.0639 19.8042 11.0259C19.7114 10.9878 19.612 10.9687 19.5117 10.9697C19.3625 10.9713 19.2171 11.0173 19.0942 11.1019C18.9713 11.1865 18.8764 11.3058 18.8217 11.4446C18.767 11.5835 18.7549 11.7355 18.787 11.8812C18.8191 12.0269 18.8939 12.1597 19.002 12.2627L20.7451 13.9707C20.8863 14.109 21.0765 14.186 21.2742 14.1849C21.4718 14.1838 21.6611 14.1047 21.8008 13.9648L23.5078 12.2578C23.5775 12.1882 23.6328 12.1055 23.6706 12.0145C23.7083 11.9235 23.7278 11.8259 23.7278 11.7274C23.7279 11.6289 23.7085 11.5313 23.6708 11.4402C23.6332 11.3492 23.578 11.2665 23.5083 11.1968C23.4387 11.1271 23.356 11.0718 23.265 11.034C23.174 10.9963 23.0764 10.9768 22.9779 10.9768C22.8794 10.9767 22.7818 10.9961 22.6907 11.0338C22.5997 11.0714 22.517 11.1266 22.4473 11.1963L21.9941 11.6494C21.8091 6.28621 17.4079 1.99707 12 1.99707ZM12.0498 6.5C11.6498 6.5 11.3496 6.8002 11.3496 7.2002V7.90039C10.0996 8.00039 9.09961 9.0498 9.09961 10.2998C9.09961 11.5998 10.15 12.7002 11.5 12.7002H12.6504C13.2504 12.7002 13.7002 13.15 13.7002 13.75C13.7002 14.35 13.2004 14.7998 12.6504 14.7998H11.2998C10.6498 14.7998 10.2498 14.4998 10.0498 14.2998C9.79981 14.0498 9.34961 14.0498 9.09961 14.2998C8.84961 14.5498 8.84961 15 9.09961 15.25C9.64961 15.85 10.4498 16.1504 11.2998 16.1504V16.8496C11.2998 17.2496 11.6 17.5498 12 17.5498C12.4 17.5498 12.7002 17.2496 12.7002 16.8496V16.1504C14.0002 16.1504 15.0996 15.0998 15.0996 13.7998C15.0996 12.4998 14.0502 11.4004 12.7002 11.4004H11.5C10.9 11.4004 10.4502 10.9496 10.4502 10.3496C10.4502 9.74961 10.95 9.2998 11.5 9.2998H12.5996C13.2496 9.2998 13.5498 9.65039 13.5498 9.65039C13.7498 9.95039 14.2 10.0496 14.5 9.84961C14.8 9.64961 14.9002 9.20039 14.7002 8.90039C14.5002 8.55039 13.8 7.95039 12.75 7.90039V7.2002C12.75 6.8002 12.4498 6.5 12.0498 6.5ZM2.80664 10.0254C2.61433 10.0282 2.43044 10.1047 2.29297 10.2393L0.549807 11.9463C0.47744 12.0147 0.419434 12.0969 0.379174 12.188C0.338915 12.2792 0.317207 12.3774 0.31532 12.477C0.313433 12.5766 0.331403 12.6756 0.368182 12.7681C0.404961 12.8607 0.459812 12.945 0.529533 13.0162C0.599254 13.0873 0.682448 13.1439 0.774261 13.1825C0.866073 13.2212 0.964664 13.2411 1.06428 13.2413C1.16389 13.2414 1.26254 13.2217 1.35445 13.1833C1.44636 13.1449 1.5297 13.0885 1.59961 13.0176L2.0166 12.6094C2.33177 17.8507 6.67925 22.0029 12 22.0029C13.734 22.0029 15.3685 21.558 16.79 20.7832C16.8765 20.7361 16.9529 20.6724 17.0148 20.5957C17.0767 20.5191 17.1229 20.431 17.1507 20.3365C17.1786 20.242 17.1875 20.143 17.1771 20.045C17.1666 19.9471 17.137 19.8521 17.0899 19.7656C17.0427 19.6791 16.979 19.6027 16.9024 19.5409C16.8257 19.479 16.7377 19.4328 16.6432 19.405C16.5487 19.3771 16.4496 19.3682 16.3517 19.3786C16.2537 19.389 16.1588 19.4187 16.0723 19.4658C14.8628 20.125 13.478 20.5029 12 20.5029C7.46374 20.5029 3.80251 17.0043 3.52442 12.542L3.99512 13.0127C4.06481 13.0824 4.14755 13.1376 4.2386 13.1753C4.32965 13.213 4.42723 13.2324 4.52577 13.2323C4.62432 13.2323 4.72189 13.2128 4.81291 13.1751C4.90393 13.1374 4.98663 13.082 5.05628 13.0123C5.12593 12.9426 5.18116 12.8599 5.21882 12.7688C5.25648 12.6778 5.27584 12.5802 5.27578 12.4816C5.27573 12.3831 5.25626 12.2855 5.21849 12.1945C5.18072 12.1035 5.12539 12.0208 5.05567 11.9512L3.34766 10.2441C3.27667 10.1734 3.19222 10.1176 3.0993 10.08C3.00637 10.0424 2.90686 10.0239 2.80664 10.0254ZM19.5879 16.5732C19.466 16.5728 19.3458 16.6021 19.2377 16.6586C19.1297 16.7151 19.037 16.7971 18.9678 16.8975C18.6899 17.2883 18.3794 17.6558 18.0391 17.9961C17.9671 18.0652 17.9096 18.148 17.87 18.2396C17.8304 18.3312 17.8095 18.4297 17.8085 18.5295C17.8075 18.6293 17.8264 18.7283 17.8641 18.8207C17.9018 18.9131 17.9576 18.997 18.0282 19.0675C18.0987 19.1381 18.1827 19.1939 18.275 19.2316C18.3674 19.2693 18.4664 19.2882 18.5662 19.2872C18.666 19.2862 18.7645 19.2653 18.8561 19.2257C18.9477 19.1861 19.0305 19.1286 19.0996 19.0566C19.4983 18.658 19.8633 18.2268 20.1904 17.7666C20.2722 17.655 20.3215 17.5229 20.3329 17.385C20.3443 17.2471 20.3173 17.1088 20.2549 16.9852C20.1926 16.8617 20.0972 16.7579 19.9795 16.6852C19.8618 16.6124 19.7263 16.5737 19.5879 16.5732Z" fill="white"/>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M14.4844 5.22655C14.0684 5.22948 13.6553 5.24999 13.2188 5.36718C12.7822 5.48436 12.3457 5.67186 11.8828 5.97655C11.3086 5.63964 10.752 5.36132 10.2188 5.29686C9.55664 5.21483 8.94141 5.25878 8.22656 5.27343C7.37988 5.29101 6.82617 5.7246 5.92969 6.0703C5.0332 6.41601 3.87891 6.74999 2.25 6.74999H1.5V13.9687L1.92188 14.1797L3.30469 14.8594L8.22656 20.3437L8.25 20.3672C8.8125 20.9238 9.57129 21.0615 10.2422 21.0234C10.9131 20.9853 11.543 20.7891 12.0469 20.4844C13.1543 19.8164 16.1719 17.7187 16.1719 17.7187L16.2422 17.6719L16.2891 17.625C16.6465 17.2705 16.8252 16.8369 16.9453 16.3828L19.8281 14.9297L21.9844 14.2031L22.5 14.0391V6.74999H21.75C20.124 6.74999 18.9668 6.39843 18.0703 6.04686C17.1738 5.6953 16.6289 5.26757 15.7734 5.24999C15.3164 5.2412 14.9004 5.22362 14.4844 5.22655ZM14.5078 6.72655C14.8447 6.72362 15.2344 6.7412 15.7266 6.74999C15.8057 6.75292 16.5264 7.06054 17.5312 7.45311C18.3809 7.7871 19.5615 8.083 21 8.17968V12.9609L19.2656 13.5469H19.2188L19.1719 13.5703L16.8984 14.7187C16.7725 14.376 16.5996 14.0596 16.3359 13.7812L16.2891 13.7109L13.1016 9.79686L12.6328 9.21093L12.0469 9.67968L10.0312 11.3203C9.35449 11.7891 8.80664 11.6543 8.25 11.3906C8.08887 11.3144 8.09766 11.291 7.96875 11.2031L11.3906 8.36718L11.4375 8.3203C12.4541 7.31249 13.0781 6.96386 13.6172 6.8203C13.8867 6.74706 14.1709 6.72948 14.5078 6.72655ZM9.28125 6.74999C9.56836 6.74413 9.80859 6.74706 10.0312 6.77343C10.2275 6.79686 10.4502 6.96386 10.6406 7.03124C10.5645 7.10155 10.5088 7.14257 10.4297 7.21874C10.4121 7.23632 10.4004 7.24804 10.3828 7.26561L6.28125 10.6641L5.64844 11.1797L6.21094 11.7656C6.21094 11.7656 6.75293 12.3516 7.59375 12.75C8.43457 13.1484 9.73242 13.374 10.8984 12.5625L10.9453 12.5156L12.3984 11.3203L15.1641 14.7187L15.1875 14.7656L15.2109 14.7891C15.7061 15.2783 15.6943 16.0488 15.2109 16.5469C15.2051 16.5527 15.2168 16.5644 15.2109 16.5703C15.2051 16.5732 15.1055 16.6318 15.0938 16.6406L14.1094 15.3047L12.8906 16.1953L13.8516 17.4844C13.4619 17.748 13.2861 17.8857 12.8672 18.1641L11.8594 16.8047L10.6406 17.6953L11.6016 18.9844C11.5166 19.0371 11.3408 19.1543 11.2734 19.1953C11.0361 19.3389 10.5791 19.5 10.1719 19.5234C9.78809 19.5439 9.49512 19.456 9.35156 19.3359L9.32812 19.3125L4.3125 13.7578L4.21875 13.6406L3 13.0312V8.17968C4.43262 8.08593 5.62207 7.80175 6.46875 7.47655C7.4707 7.09276 8.18555 6.77636 8.27344 6.77343C8.65723 6.76464 8.99414 6.75585 9.28125 6.74999Z" fill="white"/>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_7_195)">
                                            <path d="M14.4491 0.50041C13.8187 0.550225 13.2024 0.81614 12.7223 1.29623L11.8379 2.18067C10.7677 3.25086 10.7677 4.99914 11.8379 6.06934L13.1314 7.36198L13.1574 7.38884L14.0186 8.25H12.9417L11.205 7.38168C11.1351 7.34674 11.0575 7.33025 10.9794 7.33377C10.9014 7.33729 10.8255 7.3607 10.7591 7.40177C10.6926 7.44285 10.6377 7.50023 10.5997 7.56847C10.5616 7.63671 10.5417 7.71354 10.5417 7.79167V11.4583C10.5417 11.5365 10.5616 11.6133 10.5997 11.6815C10.6377 11.7498 10.6926 11.8072 10.7591 11.8482C10.8255 11.8893 10.9014 11.9127 10.9794 11.9162C11.0575 11.9198 11.1351 11.9033 11.205 11.8683L12.922 11.0098L16.8948 11.3599L16.8455 11.3536C17.2957 11.4435 17.7632 11.3015 18.0881 10.9767L21.2176 7.84717C21.7507 7.3141 21.7507 6.43591 21.2176 5.90283L17.9305 2.61573C17.664 2.34919 17.3112 2.21558 16.9583 2.21558C16.6055 2.21558 16.2527 2.34919 15.9862 2.61573L13.8941 4.70777C13.8501 4.75 13.815 4.80059 13.7908 4.85656C13.7666 4.91254 13.7539 4.97277 13.7532 5.03375C13.7526 5.09473 13.7642 5.15521 13.7872 5.21167C13.8103 5.26812 13.8444 5.31941 13.8875 5.36253C13.9306 5.40565 13.9819 5.43973 14.0383 5.46278C14.0948 5.48583 14.1553 5.49738 14.2163 5.49676C14.2772 5.49614 14.3375 5.48336 14.3934 5.45917C14.4494 5.43498 14.5 5.39986 14.5422 5.35588L16.6343 3.26384C16.8171 3.081 17.0996 3.081 17.2824 3.26384L20.5695 6.55095C20.7523 6.73379 20.7523 7.01622 20.5695 7.19906L17.4399 10.3286C17.3312 10.4374 17.1766 10.4841 17.0255 10.4539C17.0089 10.4506 16.9922 10.4482 16.9753 10.4468L12.8736 10.0851C12.7891 10.0777 12.7042 10.0938 12.6283 10.1317L11.4583 10.7171V8.53288L12.6283 9.11833C12.692 9.15014 12.7622 9.16669 12.8333 9.16667H15.125C15.2156 9.16663 15.3042 9.13973 15.3796 9.08937C15.4549 9.039 15.5136 8.96743 15.5483 8.88369C15.583 8.79996 15.5921 8.70783 15.5744 8.61894C15.5567 8.53005 15.5131 8.44839 15.4491 8.38428L13.8198 6.75505C13.8155 6.75018 13.811 6.7454 13.8064 6.74073H13.8055L12.486 5.42123C11.766 4.70117 11.766 3.54883 12.486 2.82878L13.3705 1.94434C14.0163 1.29851 15.0137 1.23609 15.7293 1.7465C15.7783 1.78148 15.8337 1.80645 15.8924 1.82C15.9511 1.83355 16.0118 1.83542 16.0712 1.82548C16.1306 1.81555 16.1875 1.79402 16.2385 1.76211C16.2896 1.7302 16.3339 1.68855 16.3689 1.63953C16.4038 1.59051 16.4288 1.53508 16.4424 1.4764C16.4559 1.41773 16.4578 1.35696 16.4478 1.29757C16.4379 1.23818 16.4164 1.18132 16.3845 1.13025C16.3526 1.07918 16.3109 1.03489 16.2619 0.999921C15.7246 0.616668 15.0796 0.450595 14.4491 0.50041ZM1.1718 8.2697C1.03764 8.26807 0.952445 8.27156 0.930102 8.27328C0.687185 8.28244 0.495258 8.47448 0.486091 8.71281C0.481508 8.89156 0.376091 13.0668 3.23609 14.6022C3.76776 14.891 4.62441 15.1984 5.43108 15.1984C5.52733 15.1984 5.62397 15.1939 5.72022 15.1939C5.09231 13.6585 4.26677 13.0538 4.25302 13.0446C4.04677 12.8979 3.99624 12.609 4.14291 12.4028C4.28958 12.1965 4.57851 12.1459 4.78476 12.2971L4.78923 12.2998C4.80501 12.3104 5.38415 12.7022 6.01921 13.7545C6.66303 14.8213 7.32349 16.5345 7.32349 19.1318V21.0833C7.32263 21.1441 7.33386 21.2044 7.3565 21.2607C7.37915 21.3171 7.41278 21.3684 7.45542 21.4116C7.49807 21.4549 7.54888 21.4892 7.60492 21.5127C7.66095 21.5361 7.72109 21.5482 7.78183 21.5482C7.84257 21.5482 7.9027 21.5361 7.95874 21.5127C8.01477 21.4892 8.06559 21.4549 8.10823 21.4116C8.15088 21.3684 8.1845 21.3171 8.20715 21.2607C8.2298 21.2044 8.24102 21.1441 8.24016 21.0833V18.4041C8.35912 17.2626 9.397 15.6898 11.8997 14.894C12.1394 14.817 12.3983 14.9506 12.4753 15.1921C12.5518 15.4332 12.4183 15.6912 12.1772 15.7677C11.2353 16.067 10.5485 16.4816 10.0663 16.9234C10.5517 17.2993 11.0445 17.4167 11.9167 17.4167C13.6794 17.4167 15.3333 15.944 16.0327 13.7518C16.0992 13.5451 16.0116 13.3201 15.8224 13.2129C13.9308 12.1459 11.8818 12.1031 10.6017 13.1055C10.1429 13.4649 9.6574 14.2459 9.47999 15.0534C8.8437 15.496 8.35358 16.0018 8.00115 16.5295C7.84968 15.7398 7.63731 15.0577 7.396 14.4724C7.40337 14.0558 7.41122 13.6404 7.41122 13.2227C7.41122 12.4161 7.10457 11.5542 6.8204 11.0179C5.4729 8.51942 2.11093 8.2811 1.1718 8.2697Z" fill="white"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_7_195">
                                            <rect width="22" height="22" fill="white"/>
                                            </clipPath>
                                            </defs>
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

    enhanceNewWindowLinks();

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

    {
        route: "about.html#audited-financial-statements",
        title: "Audited Financial Statements",
        category: "About",
        keywords: "annual audits financial documents reports archive governance pdf",
        desc: "Browse ACC’s audited financial statements and single audit reports by year."
    },
    ...[
        { title: "Audited Financial Statements", slug: "audited-financial-statements", years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014] },
        { title: "Single Audit", slug: "single-audit", years: [2025, 2024, 2023, 2022, 2021, 2020] },
        { title: "Restated Single Audit Report", slug: "restated-single-audit", years: [2023] }
    ].flatMap(({ title, slug, years }) => years.map(year => ({
        route: `docs/ACC-${year}-${slug}.pdf`,
        title: `${year} ${title}`,
        category: "About",
        keywords: "annual financial documents audit reports pdf",
        desc: "ACC financial reporting archive · PDF opens in a new tab."
    }))),

    {
        route: "about.html#yearend-letters-to-investors",
        title: "Year-End Letters to Investors",
        category: "About",
        keywords: "yearend year end annual investor letters updates year in review",
        desc: "Browse ACC’s annual letters to investors by year."
    },
    ...[2024, 2023, 2022, 2021].map(year => ({
        route: `docs/ACC-${year}-year-end-letter-to-investors.pdf`,
        title: `${year} Year-End Letter to Investors`,
        category: "About",
        keywords: "yearend year end annual investor letters updates year in review",
        desc: "ACC’s annual investor update · PDF opens in a new tab."
    })),

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
        route: "2025-opportunity-appalachia-investor-convening-photos.html",
        title: "2025 Opportunity Appalachia Investor Convening Photos",
        category: "News & Media",
        keywords: "oa photo album gallery pictures event photos Asheville NC North Carolina August 2025",
        desc: "Browse 289 photos from the August 2025 investor convening in Asheville, including project pitches, panel discussions and site visits."
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
        route: "our-network.html#directory",
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
                const linkTarget = item.route.endsWith('.pdf') ? ' target="_blank" rel="noopener noreferrer"' : '';

                return `
                    <a href="${escapeHtml(item.route)}"${linkTarget} class="search-result-row${isSelected}" data-index="${idx}" data-route="${escapeHtml(item.route)}" role="option">
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
                    if (row.target === '_blank') return;
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
                const selectedRow = resultsList.querySelector('.search-result-row.is-selected');
                if (selectedRow) selectedRow.click();
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

function setSubscribeStatus(form, message) {
    const status = form.querySelector('.subscribe-status');
    if (!status) return;
    status.textContent = '';
    if (message) {
        requestAnimationFrame(() => {
            status.textContent = message;
        });
    }
}

function restoreSubscribeButton(submitBtn, originalBtnHTML) {
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
    submitBtn.style.backgroundColor = '';
    submitBtn.style.borderColor = '';
    submitBtn.innerHTML = originalBtnHTML;
}

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

            if (!name || !email) {
                setSubscribeStatus(form, 'Please enter your name and email address.');
                return;
            }

            const payload = {
                name: name,
                email: email,
                website: honeypotInput ? honeypotInput.value : ""
            };

            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            setSubscribeStatus(form, 'Subscribing to the newsletter.');
            submitBtn.innerHTML = `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="captcha-spin" style="animation: captchaSpin 0.7s linear infinite; display: inline-block; vertical-align: middle; margin-right: 6px;" aria-hidden="true">
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
                submitBtn.removeAttribute('aria-busy');
                submitBtn.innerHTML = '<span>Subscribed!</span>';
                submitBtn.style.backgroundColor = '#026836';
                submitBtn.style.borderColor = '#026836';
                setSubscribeStatus(form, 'You are subscribed to the ACC newsletter.');
                form.reset();

                setTimeout(() => {
                    restoreSubscribeButton(submitBtn, originalBtnHTML);
                }, 4000);

            } catch (error) {
                console.error("Newsletter subscription error:", error);
                submitBtn.removeAttribute('aria-busy');
                submitBtn.innerHTML = '<span>Error. Try again</span>';
                submitBtn.style.backgroundColor = '#b91c1c';
                submitBtn.style.borderColor = '#b91c1c';
                setSubscribeStatus(form, 'Subscription failed. Please try again.');

                setTimeout(() => {
                    restoreSubscribeButton(submitBtn, originalBtnHTML);
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
