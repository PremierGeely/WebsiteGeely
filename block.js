// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const categories = document.querySelectorAll('.category');


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');


        // Filter categories
        const category = button.dataset.category;
        categories.forEach(cat => {
            if (category === 'all' || cat.dataset.category === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    });
});


// Helper: check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// DOM elements
const images = document.querySelectorAll('.item img');
const popupModal = document.getElementById('popupModal');
const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const popupNav = document.querySelector('.popup-nav');

let currentIndex = 0;
let imageList = Array.from(images);

function showPopup(index) {
    const img = imageList[index];
    popupImg.src = img.src;
    popupTitle.textContent = img.dataset.title || '';
    popupDesc.textContent = img.dataset.desc || '';
    popupModal.classList.add('active');
    currentIndex = index;
    // Show nav only on mobile
    popupNav.style.display = isMobile() ? 'flex' : 'none';
}

// Open popup on image click
images.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup(idx);
    });
});

// Close popup
closeBtn.onclick = () => popupModal.classList.remove('active');

// Only allow next/prev on mobile and when popup is open
prevBtn.onclick = () => {
    if (isMobile() && popupModal.classList.contains('active')) {
        currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
        showPopup(currentIndex);
    }
};
nextBtn.onclick = () => {
    if (isMobile() && popupModal.classList.contains('active')) {
        currentIndex = (currentIndex + 1) % imageList.length;
        showPopup(currentIndex);
    }
};

// Clicking outside image closes popup
popupModal.onclick = (e) => {
    if (e.target === popupModal) popupModal.classList.remove('active');
};

// Responsive: update nav visibility on resize
window.addEventListener('resize', () => {
    if (popupModal.classList.contains('active')) {
        popupNav.style.display = isMobile() ? 'flex' : 'none';
    }
});


// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
