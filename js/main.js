/**
 * SHARANYA MARBLES - JAVASCRIPT ENGINE
 * "QUALITY YOU SEE, SERVICE YOU TRUST"
 * 
 * Modular Vanilla JavaScript Implementation
 */

// ==========================================
// 1. BUSINESS CONFIGURATION (Easy to edit)
// ==========================================
const CONFIG = {
  // Sharanya Marbles WhatsApp & Phone Number
  whatsappNumber: "917981478570",
  phoneNumber: "+91 79814 78570",
  emailAddress: "info@sharanyamarbles.com",
  businessLocation: "Madhapur, Hyderabad, Telangana, India",
  
  // Default WhatsApp Inquire Message
  defaultMessage: "Hello Sharanya Marbles, I would like to enquire about your services."
};

// ==========================================
// 2. DOM CONTENT LOADED ENTRY POINT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBeforeAfterSlider();
  initGalleryFilter();
  initLightbox();
  initTestimonialSlider();
  initFaqAccordion();
  initFormValidation();
  initWhatsAppIntegration();
  initQuoteModal();
  initScrollToTop();
  initScrollAnimations();
});

// ==========================================
// 3. NAVBAR & MOBILE NAVIGATION
// ==========================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-drawer-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  if (navToggle && mobileDrawer && mobileOverlay) {
    const toggleDrawer = () => {
      navToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleDrawer);
    mobileOverlay.addEventListener('click', toggleDrawer);

    // Close mobile drawer when clicking a navigation link
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('open')) {
          toggleDrawer();
        }
      });
    });
  }

  // Active Link Highlighter based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ==========================================
// 4. BEFORE / AFTER COMPARISON SLIDER
// ==========================================
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-slider-container');
  const afterWrapper = document.querySelector('.after-img-wrapper');
  const handle = document.querySelector('.slider-handle');

  if (!container || !afterWrapper || !handle) return;

  let isDragging = false;

  const setSliderPosition = (x) => {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    
    // Constrain to container boundaries
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events (Mobile)
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

// ==========================================
// 5. GALLERY FILTERING
// ==========================================
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

// ==========================================
// 6. GALLERY LIGHTBOX MODAL
// ==========================================
let currentLightboxIndex = 0;
let visibleGalleryItems = [];

function initLightbox() {
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImg) return;

  const updateLightboxContent = () => {
    visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
    if (!visibleGalleryItems.length) return;

    if (currentLightboxIndex < 0) currentLightboxIndex = visibleGalleryItems.length - 1;
    if (currentLightboxIndex >= visibleGalleryItems.length) currentLightboxIndex = 0;

    const currentItem = visibleGalleryItems[currentLightboxIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-item-title')?.textContent || 'Project View';
    const tag = currentItem.querySelector('.gallery-item-tag')?.textContent || 'Sharanya Marbles';

    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
    if (lightboxCounter) lightboxCounter.textContent = `${tag} • ${currentLightboxIndex + 1} / ${visibleGalleryItems.length}`;
  };

  const openLightbox = (index) => {
    visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
      const clickedIndex = visibleGalleryItems.indexOf(item);
      if (clickedIndex !== -1) {
        openLightbox(clickedIndex);
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => {
    currentLightboxIndex--;
    updateLightboxContent();
  });
  nextBtn?.addEventListener('click', () => {
    currentLightboxIndex++;
    updateLightboxContent();
  });

  // Close lightbox on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentLightboxIndex--;
      updateLightboxContent();
    }
    if (e.key === 'ArrowRight') {
      currentLightboxIndex++;
      updateLightboxContent();
    }
  });
}

// ==========================================
// 7. TESTIMONIALS CAROUSEL
// ==========================================
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.testimonial-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Generate Pagination Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5500);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  };

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentIndex - 1);
    }
    startAutoplay();
  }, { passive: true });

  startAutoplay();
}

// ==========================================
// 8. FAQ ACCORDION (Single Open Behavior)
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all items first (Single open constraint)
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // If clicked item was not open, open it
      if (!isOpen && answer) {
        item.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

// ==========================================
// 9. FORM VALIDATION & INTERACTIVE TOAST
// ==========================================
function initFormValidation() {
  const forms = document.querySelectorAll('form.needs-validation');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Text & Select Inputs
      const inputs = form.querySelectorAll('.form-control[required]');
      inputs.forEach(input => {
        const value = input.value.trim();

        if (!value) {
          setFieldInvalid(input, 'This field is required.');
          isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
          setFieldInvalid(input, 'Please enter a valid email address.');
          isValid = false;
        } else if (input.type === 'tel' && !isValidPhone(value)) {
          setFieldInvalid(input, 'Please enter a valid 10-digit phone number.');
          isValid = false;
        } else {
          setFieldValid(input);
        }
      });

      if (isValid) {
        // Show Success Toast
        showToast('Thank you! Your quotation request has been sent to Sharanya Marbles. We will contact you shortly.');
        form.reset();
        
        // Remove valid classes after submit
        inputs.forEach(input => {
          input.classList.remove('is-valid');
        });

        // Close Quote Modal if open
        const modal = document.querySelector('.quote-modal');
        if (modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  function setFieldInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    let feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = message;
    }
  }

  function setFieldValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s+\-()]{8,16}$/.test(phone);
  }
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <div>
      <strong>Success</strong>
      <p style="margin: 0; font-size: 0.85rem; color: rgba(255,255,255,0.85);">${message}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ==========================================
// 10. WHATSAPP DIRECT INTEGRATION
// ==========================================
function initWhatsAppIntegration() {
  const whatsappTriggers = document.querySelectorAll('.whatsapp-trigger');

  whatsappTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customMessage = btn.getAttribute('data-message') || CONFIG.defaultMessage;
      const cleanPhone = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
      
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}

// ==========================================
// 11. QUICK QUOTE MODAL SYSTEM
// ==========================================
function initQuoteModal() {
  const modal = document.querySelector('.quote-modal');
  const openBtns = document.querySelectorAll('.open-quote-modal');
  const closeBtn = document.querySelector('.quote-modal-close');

  if (!modal) return;

  const openModal = (serviceName = '') => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-select service in modal dropdown if specified
    if (serviceName) {
      const select = modal.querySelector('select[name="service"]');
      if (select) select.value = serviceName;
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// ==========================================
// 12. SCROLL TO TOP BUTTON
// ==========================================
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('active');
    } else {
      scrollBtn.classList.remove('active');
    }
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// 13. SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
}
