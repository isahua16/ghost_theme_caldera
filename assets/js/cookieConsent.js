const ANALYTICS_ID = 'G-EPJGY7Z30R';
const CONSENT_COOKIE = 'caldera_cookie_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

function getCookie(name) {
    return document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith(`${name}=`))
        ?.split('=')[1];
}

function setConsentCookie(value) {
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
}

function setupGtagDefaults() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    window.gtag('consent', 'default', {
        ad_personalization: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
    });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', false);
}

function loadAnalytics() {
    if (document.getElementById('ga-script')) {
        return;
    }

    window.gtag('consent', 'update', {
        analytics_storage: 'granted',
    });
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID);

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
    document.head.append(script);
}

function disableAnalytics() {
    window.gtag('consent', 'update', {
        analytics_storage: 'denied',
    });
}

function createBanner() {
    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
        <div class="cookie-consent__content">
            <p>We use essential cookies to keep this site working. Analytics cookies help us understand visits and are only enabled if you accept.</p>
            <div class="cookie-consent__actions">
                <button class="gh-button gh-button-primary" type="button" data-cookie-consent="accept">Accept analytics</button>
                <button class="gh-button" type="button" data-cookie-consent="reject">Essential only</button>
            </div>
        </div>
    `;

    return banner;
}

export default function cookieConsent() {
    setupGtagDefaults();

    function showBanner() {
        const existingBanner = document.querySelector('.cookie-consent');

        if (existingBanner) {
            return;
        }

        const banner = createBanner();
        document.body.append(banner);

        banner.addEventListener('click', event => {
            const button = event.target.closest('[data-cookie-consent]');

            if (!button) {
                return;
            }

            const choice = button.dataset.cookieConsent;
            setConsentCookie(choice === 'accept' ? 'analytics' : 'essential');

            if (choice === 'accept') {
                loadAnalytics();
            } else {
                disableAnalytics();
            }

            banner.remove();
        });
    }

    document.addEventListener('click', event => {
        const settingsButton = event.target.closest('[data-cookie-settings]');

        if (!settingsButton) {
            return;
        }

        showBanner();
    });

    const consent = getCookie(CONSENT_COOKIE);

    if (consent === 'analytics') {
        loadAnalytics();
    } else if (!consent) {
        showBanner();
    }
}
