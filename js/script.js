document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü işlevselliği
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // İletişim formu WhatsApp entegrasyonu
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Form verilerini al
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim() || 'Belirtilmedi';
    const subject = document.getElementById('subject');
    const subjectText = subject.options[subject.selectedIndex] ? subject.options[subject.selectedIndex].text : 'Belirtilmedi';
    const message = document.getElementById('message').value.trim();
    // Satır bazlı WhatsApp mesajı oluştur
    const lines = [
        '*İletişim Formu Mesajı*',
        `İsim: ${name}`,
        `Telefon: ${phone}`,
        `E-posta: ${email}`,
        `Konu: ${subjectText}`,
        `Mesaj: ${message}`
    ];
    const whatsappMessage = encodeURIComponent(lines.join('\n'));
    const whatsappNumber = '905355029257';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    // Başarı mesajı göster
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız WhatsApp üzerinden gönderiliyor...';
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    contactForm.reset();
    // WhatsApp'a yönlendir
    window.location.href = whatsappURL;
    // 5 saniye sonra başarı mesajını kaldır
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});
    }
    
    // Sayfa dışı tıklamada menüyü kapat
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });
    
    // Kaydırma animasyonu
    const scrollElements = document.querySelectorAll('.service-card, .feature, .testimonial');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Sayfa yüklendiğinde görünür elemanları kontrol et
    handleScrollAnimation();
    
    // Yumuşak kaydırma
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Mobil menüyü kapat
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Sayfa yüklendiğinde hero bölümüne animasyon ekle
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 300);
    }
    
    // Telefon numarası formatı kontrolü
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Telefon numarası tıklama analitikleri burada eklenebilir
            console.log('Telefon numarası tıklandı: ' + this.getAttribute('href'));
        });
    });
    
    // WhatsApp bağlantısı kontrolü
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // WhatsApp tıklama analitikleri burada eklenebilir
            console.log('WhatsApp bağlantısı tıklandı: ' + this.getAttribute('href'));
        });
    });
});

// Sayfa yüklenme hızını artırmak için resimleri lazy load ile yükle
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Intersection Observer desteklenmiyor, tüm resimleri normal yükle
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Sayfa yükleme performansı ölçümü
window.addEventListener('load', function() {
    setTimeout(function() {
        const performanceData = window.performance.timing;
        const pageLoadTime = performanceData.loadEventEnd - performanceData.navigationStart;
        console.log('Sayfa yükleme süresi: ' + pageLoadTime + 'ms');
    }, 0);
});

document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('.villa-slider');
    if (!root) return;
  
    const sliderContainer = root.querySelector('.slider-container');
    // Aynı slider'a ikinci kez init etmeyi engelle (main.js vs. çakışmasın)
    if (sliderContainer.dataset.sliderInit === '1') return;
    sliderContainer.dataset.sliderInit = '1';
  
    const sliderWrapper   = root.querySelector('.slider-wrapper');
    const slides          = root.querySelectorAll('.slider-slide');
    const thumbs          = root.querySelectorAll('.thumb');
    const dots            = root.querySelectorAll('.dot');
    const thumbsContainer = root.querySelector('.thumbs-container');
  
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    // ---- Yardımcı: aktif thumb'ı yatayda merkezle (scrollIntoView YOK) ----
    function centerActiveThumb() {
      const active = root.querySelector('.thumb.active');
      if (!active || !thumbsContainer) return;
  
      const cRect = thumbsContainer.getBoundingClientRect();
      const tRect = active.getBoundingClientRect();
      const targetLeft =
        thumbsContainer.scrollLeft +
        (tRect.left - cRect.left) -
        (cRect.width / 2 - tRect.width / 2);
  
      thumbsContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  
    // ---- Slide değiştir ----
    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
  
      currentIndex = index;
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  
      thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  
      // scrollIntoView yerine güvenli yatay kaydırma
      centerActiveThumb();
    }
  
    // ---- Auto slide kontrol ----
    let autoSlideInterval = null;
    let resumeTimeout = null;
  
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    }
    function stopAutoSlide() {
      if (autoSlideInterval) { clearInterval(autoSlideInterval); autoSlideInterval = null; }
    }
    function pauseThenResume(delay = 3000) {
      stopAutoSlide();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(startAutoSlide, delay);
    }
  
    // ---- Etkileşimler ----
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => { goToSlide(i); pauseThenResume(); });
    });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); pauseThenResume(); });
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); // sayfanın ok tuşuyla kaymasını engelle
        goToSlide(currentIndex + (e.key === 'ArrowRight' ? 1 : -1));
        pauseThenResume();
      }
    });
  
    // ---- Touch swipe ----
    let startX = 0, startY = 0, swiping = false;
  
    sliderContainer.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY;
      swiping = true;
      stopAutoSlide(); // etkileşimde dur
    }, { passive: true });
  
    sliderContainer.addEventListener('touchmove', (e) => {
      if (!swiping) return;
      const t = e.touches[0];
      const diffX = t.clientX - startX;
      const diffY = t.clientY - startY;
  
      // yatay hareket dikeyden büyükse sayfa kaymasın
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    }, { passive: false });
  
    sliderContainer.addEventListener('touchend', (e) => {
      if (!swiping) return;
      swiping = false;
  
      const t = e.changedTouches[0];
      const diffX = t.clientX - startX;
      const threshold = 50;
  
      if (diffX > threshold)      goToSlide(currentIndex - 1);
      else if (diffX < -threshold) goToSlide(currentIndex + 1);
  
      pauseThenResume(); // 3 sn sonra otomatik devam et
    });
  
    // Hover'da durdur (masaüstü)
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', () => pauseThenResume(1000));
  
    // Başlat
    startAutoSlide();
  });
