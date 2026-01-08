document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // NAVBAR: nasconde/mostra su scroll
    // ============================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 50) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = Math.max(scrollTop, 0);
        });
    }

    // ============================
    // MENU MOBILE: toggle animato
    // ============================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }


    // ============================
    // COOKIE BANNER
    // ============================
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (banner && acceptBtn) {
        // Controlla se il consenso è già stato dato
        if (localStorage.getItem('cookieAccepted') !== 'true') {
            // Mostra banner con animazione
            banner.style.display = 'flex';
            setTimeout(() => banner.classList.add('show'), 100);

            // Al click salva consenso e nasconde banner
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieAccepted', 'true');
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 500);
            });
        } else {
            // Se accettato, assicurati che il banner sia nascosto
            banner.style.display = 'none';
        }
    }

    // ============================
    // MAPPA (opzionale: attiva solo se esiste l’elemento)
    // ============================
    /*
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([44.42850, 8.74959], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([44.42850, 8.74959]).addTo(map)
            .bindPopup('Ferramenta Luxardo<br>Via Carlo Camozzini 51/R, Voltri, Genova')
            .openPopup();
    }
    */

    // ============================
    // BODY LOADED CLASS (per animazioni eventuali)
    // ============================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // === CAROSELLO ===
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;
        const slideInterval = 2500;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        if (slides.length > 0) {
            showSlide(currentSlide);
            setInterval(nextSlide, slideInterval);
        }

    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    // Mappa placeholder già esistente
    const mapContainer2 = document.getElementById("map-container-2");

    const MAP_IFRAME_2 = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2863.873418584938!2d8.2599499!3d44.127233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d2f7c72ce2e4bb%3A0x6446d6da999f8cba!2sLa%20Bottega%20del%20Mugugno!5e0!3m2!1sit!2sit!4v1753451058925!5m2!1sit!2sit"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;

    // Funzione per caricare Google Maps
    function loadMap2() {
        if (mapContainer2) {
            mapContainer2.innerHTML = MAP_IFRAME_2;
        }
    }

    // Funzione per caricare risorse esterne
    function loadExternalResources() {
        // Carica Google Fonts
        const googleFonts = document.createElement("link");
        googleFonts.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
        googleFonts.rel = "stylesheet";
        document.head.appendChild(googleFonts);

        // Carica Leaflet CSS
        const leafletCSS = document.createElement("link");
        leafletCSS.href = "https://unpkg.com/leaflet/dist/leaflet.css";
        leafletCSS.rel = "stylesheet";
        document.head.appendChild(leafletCSS);

        // Carica Leaflet JS
        const leafletJS = document.createElement("script");
        leafletJS.src = "https://unpkg.com/leaflet/dist/leaflet.js";
        document.body.appendChild(leafletJS);

        // Carica Google Maps
        loadMap2();
    }

    // Controllo se consenso già dato
    if (localStorage.getItem("cookiesAccepted") === "true") {
        loadExternalResources();
    } else {
        cookieBanner.classList.add("show");
    }

    // AOS JS
    const aosJS = document.createElement("script");
    aosJS.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
    aosJS.onload = function() {
        AOS.init(); // inizializza AOS solo dopo il caricamento
    };
    document.body.appendChild(aosJS);

    // Click su OK
    acceptBtn.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.remove("show");
        loadExternalResources();
    });
});