// Theme management
const themeToggleButtons = document.querySelectorAll('.theme-toggle');
const switchLabels = document.querySelectorAll('.switch-label');

// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply the theme
const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    switchLabels.forEach(label => {
        label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
};

// Initialize theme
applyTheme(getPreferredTheme());

// Handle theme toggle
themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.querySelector('.mobile-menu');
const allMenuItems = document.querySelectorAll('.menu-item');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        mobileMenu.classList.remove('open');
    }
});

// Close mobile menu when clicking a menu item
allMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// IntersectionObserver for sections
const sections = document.querySelectorAll('.section');
const menuItems = {
    'introduction': document.querySelectorAll('a[href="#introduction"]'),
    'how-it-works': document.querySelectorAll('a[href="#how-it-works"]'),
    'use-cases': document.querySelectorAll('a[href="#use-cases"]'),
    'performance-benefits': document.querySelectorAll('a[href="#performance-benefits"]'),
    'browser-support': document.querySelectorAll('a[href="#browser-support"]'),
    'best-practices': document.querySelectorAll('a[href="#best-practices"]'),
    'implementation-details': document.querySelectorAll('a[href="#implementation-details"]')
};

const observerOptions = {
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], // Multiple thresholds for better accuracy
    rootMargin: '-20% 0px -20% 0px'
};

function clearAllMenuItems() {
    Object.values(menuItems).forEach(items => {
        items.forEach(item => item.classList.remove('active'));
    });
}

function updateMenuItems(id) {
    clearAllMenuItems();
    if (menuItems[id]) {
        menuItems[id].forEach(item => item.classList.add('active'));
    }
}

// Keep track of section visibility
const sectionVisibility = new Map();

const observer = new IntersectionObserver((entries) => {
    // Update visibility for each section
    entries.forEach(entry => {
        sectionVisibility.set(entry.target.id, {
            visible: entry.isIntersecting,
            ratio: entry.intersectionRatio
        });

        // Update section opacity
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });

    // Find the most visible section
    let maxRatio = 0;
    let mostVisibleSection = null;

    sectionVisibility.forEach((value, id) => {
        if (value.visible && value.ratio > maxRatio) {
            maxRatio = value.ratio;
            mostVisibleSection = id;
        }
    });

    // Update menu items for the most visible section
    if (mostVisibleSection) {
        updateMenuItems(mostVisibleSection);
    }
}, observerOptions);

// Start observing all sections
sections.forEach(section => {
    observer.observe(section);
});

// Handle click events on menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const targetId = item.getAttribute('href').substring(1);
        updateMenuItems(targetId);
    });
});
