function openModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(projectId) {
    const modal = document.getElementById(projectId + '-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        
        // Change text color to dark when background is white
        logo.style.color = '#333';
        navLinks.forEach(link => {
            link.style.color = '#333';
        });
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
        
        // Keep text color white when background is transparent
        logo.style.color = 'white';
        navLinks.forEach(link => {
            link.style.color = 'white';
        });
    }
});

// Carousel logic for project screenshots
function carouselNext(id) {
    const track = document.querySelector(`#${id}-carousel .carousel-track`);
    const items = track.children;
    if (items.length > 1) {
        track.appendChild(items[0]);
        updateCarouselActive(id);
    }
}
function carouselPrev(id) {
    const track = document.querySelector(`#${id}-carousel .carousel-track`);
    const items = track.children;
    if (items.length > 1) {
        track.insertBefore(items[items.length - 1], items[0]);
        updateCarouselActive(id);
    }
}
function updateCarouselActive(id) {
    const track = document.querySelector(`#${id}-carousel .carousel-track`);
    Array.from(track.children).forEach((item, idx) => {
        item.classList.remove('active');
    });
    if (track.children.length > 0) {
        track.children[0].classList.add('active');
    }
}
// Initialize carousel active state on modal open
function observeDozerModal() {
    const dozerModal = document.getElementById('dozer-modal');
    if (!dozerModal) return;
    dozerModal.addEventListener('transitionend', () => updateCarouselActive('dozer'));
    // fallback for display:block
    dozerModal.addEventListener('click', () => updateCarouselActive('dozer'));
}
document.addEventListener('DOMContentLoaded', () => {
    updateCarouselActive('dozer');
    observeDozerModal();
});

// Animate carousel items on scroll into view
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.carousel-item').forEach(item => observer.observe(item));
}
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Animate screenshots on scroll (intersection observer) for all projects
function animateScreenshotsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(
        '.dozer-screenshots .screenshot, .supplier-screenshots .screenshot, .tripplanner-screenshots .screenshot'
    ).forEach(item => observer.observe(item));
}
window.addEventListener('DOMContentLoaded', animateScreenshotsOnScroll);

// Fullscreen image modal logic for dozer screenshots
(function() {
    let currentIdx = 0;
    let images = [];
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const modalClose = document.getElementById('image-modal-close');
    const modalPrev = document.getElementById('image-modal-prev');
    const modalNext = document.getElementById('image-modal-next');

    function openImageModal(idx) {
        images = Array.from(document.querySelectorAll('#dozer-screenshots .screenshot img'));
        if (!images[idx]) return;
        currentIdx = idx;
        modalImg.src = images[idx].src;
        modalImg.alt = images[idx].alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeImageModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    function showPrev() {
        if (!images.length) return;
        currentIdx = (currentIdx - 1 + images.length) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    function showNext() {
        if (!images.length) return;
        currentIdx = (currentIdx + 1) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('#dozer-screenshots .screenshot img').forEach((img, idx) => {
            img.addEventListener('click', () => openImageModal(idx));
        });
        modalClose.addEventListener('click', closeImageModal);
        modalPrev.addEventListener('click', showPrev);
        modalNext.addEventListener('click', showNext);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    });
})();

// Fullscreen image modal logic for supplier screenshots
(function() {
    let currentIdx = 0;
    let images = [];
    const modal = document.getElementById('supplier-image-modal');
    const modalImg = document.getElementById('supplier-image-modal-img');
    const modalClose = document.getElementById('supplier-image-modal-close');
    const modalPrev = document.getElementById('supplier-image-modal-prev');
    const modalNext = document.getElementById('supplier-image-modal-next');

    function openImageModal(idx) {
        images = Array.from(document.querySelectorAll('#supplier-screenshots .screenshot img'));
        if (!images[idx]) return;
        currentIdx = idx;
        modalImg.src = images[idx].src;
        modalImg.alt = images[idx].alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeImageModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    function showPrev() {
        if (!images.length) return;
        currentIdx = (currentIdx - 1 + images.length) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    function showNext() {
        if (!images.length) return;
        currentIdx = (currentIdx + 1) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('#supplier-screenshots .screenshot img').forEach((img, idx) => {
            img.addEventListener('click', () => openImageModal(idx));
        });
        modalClose.addEventListener('click', closeImageModal);
        modalPrev.addEventListener('click', showPrev);
        modalNext.addEventListener('click', showNext);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    });
})();

// Fullscreen image modal logic for tripplanner screenshots
(function() {
    let currentIdx = 0;
    let images = [];
    const modal = document.getElementById('tripplanner-image-modal');
    const modalImg = document.getElementById('tripplanner-image-modal-img');
    const modalClose = document.getElementById('tripplanner-image-modal-close');
    const modalPrev = document.getElementById('tripplanner-image-modal-prev');
    const modalNext = document.getElementById('tripplanner-image-modal-next');

    function openImageModal(idx) {
        images = Array.from(document.querySelectorAll('#tripplanner-screenshots .screenshot img'));
        if (!images[idx]) return;
        currentIdx = idx;
        modalImg.src = images[idx].src;
        modalImg.alt = images[idx].alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeImageModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    function showPrev() {
        if (!images.length) return;
        currentIdx = (currentIdx - 1 + images.length) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    function showNext() {
        if (!images.length) return;
        currentIdx = (currentIdx + 1) % images.length;
        modalImg.src = images[currentIdx].src;
        modalImg.alt = images[currentIdx].alt;
    }
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('#tripplanner-screenshots .screenshot img').forEach((img, idx) => {
            img.addEventListener('click', () => openImageModal(idx));
        });
        modalClose.addEventListener('click', closeImageModal);
        modalPrev.addEventListener('click', showPrev);
        modalNext.addEventListener('click', showNext);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    });
})();

// Animate profile photo and hero title on load, with typing effect for title
document.addEventListener('DOMContentLoaded', function() {
    var photo = document.querySelector('.profile-photo');
    if (photo) {
        setTimeout(function() {
            photo.classList.add('visible');
        }, 200);
    }
    var heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Typing animation
        var fullText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.width = '0ch';
        heroTitle.classList.add('animated');
        let i = 0;
        function typeChar() {
            if (i <= fullText.length) {
                heroTitle.textContent = fullText.substring(0, i);
                heroTitle.style.width = i + 'ch';
                i++;
                setTimeout(typeChar, 55);
            }
        }
        setTimeout(typeChar, 400);
    }
});

// Burger menu logic for mobile navigation
function closeMobileNav() {
    document.getElementById('mobile-nav').classList.remove('open');
    document.getElementById('burger-menu').classList.remove('open');
    document.body.classList.remove('mobile-nav-open');
    document.getElementById('burger-menu').setAttribute('aria-expanded', 'false');
}
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    burger && burger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobileNav.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        document.body.classList.toggle('mobile-nav-open', isOpen);
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (
            mobileNav.classList.contains('open') &&
            !mobileNav.contains(e.target) &&
            e.target !== burger
        ) {
            closeMobileNav();
        }
    });
    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMobileNav();
    });
});
