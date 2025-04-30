// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }

  // Certificate modal logic
  const certCard = document.querySelector('.certificate-hover');
  const certModal = document.getElementById('certificate-modal');
  const certModalClose = document.querySelector('.modal-close');

  function openCertModal() {
    certModal.classList.add('active');
    certModal.querySelector('.modal-img').focus();
  }
  function closeCertModal() {
    certModal.classList.remove('active');
  }
  if (certCard && certModal) {
    certCard.addEventListener('click', openCertModal);
    certCard.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openCertModal();
    });
  }
  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
    certModalClose.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') closeCertModal();
    });
  }
  certModal.addEventListener('click', e => {
    if (e.target === certModal) closeCertModal();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCertModal();
  });
});

// Smooth scrolling for navigation with sticky header offset
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerOffset = document.querySelector('header').offsetHeight + 10; // 10px extra space
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Immediately update scrollspy after scrollTo
      scrollSpy();
    }
  });
});

// Download PDF functionality using html2pdf.js
// Dynamically load html2pdf.js if not present
if (!window.html2pdf) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  script.onload = setupDownloadPDF;
  document.body.appendChild(script);
} else {
  setupDownloadPDF();
}

function setupDownloadPDF() {
  const downloadBtn = document.getElementById('download-pdf');
  if (!downloadBtn) return;
  downloadBtn.addEventListener('click', () => {
    console.log('Download PDF button clicked');
    if (!window.html2pdf) {
      alert('PDF generation library failed to load. Please check your internet connection and try again.');
      return;
    }
    const mainContent = document.querySelector('main');
    const opt = {
      margin:       0.2,
      filename:     'William_Kalogeropoulos_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(mainContent).save();
  });
}

// Animate skill bars on scroll
function animateSkillBars() {
  const skillsSection = document.getElementById('skills');
  const bars = document.querySelectorAll('.bar .fill');
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (sectionTop < windowHeight - 100) {
    bars.forEach(bar => {
      const width = bar.getAttribute('style').match(/width:([0-9]+)%/);
      if (width) {
        bar.style.width = width[1] + '%';
        bar.classList.add('animated');
      }
    });
    window.removeEventListener('scroll', animateSkillBars);
  }
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Parallax effect for blobs
function parallaxBlobs() {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax').forEach((blob, i) => {
    const speed = 0.15 + i * 0.07;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
}
window.addEventListener('scroll', parallaxBlobs);
window.addEventListener('DOMContentLoaded', parallaxBlobs);

// Fade-in animation for sections
function fadeInSections() {
  document.querySelectorAll('.fade-in-section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInSections);
window.addEventListener('DOMContentLoaded', fadeInSections);

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

function closeNavMenu() {
  navList.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navList.classList.contains('open'));
});

// Close menu when a nav link is clicked (on mobile)
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) closeNavMenu();
  });
});

// Close menu on outside click
window.addEventListener('click', (e) => {
  if (window.innerWidth > 700) return;
  if (!navList.contains(e.target) && e.target !== hamburger) {
    closeNavMenu();
  }
});

// Keyboard accessibility: close on Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNavMenu();
});

// Scrollspy for navbar active link
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href'));

function scrollSpy() {
  let current = '';
  const scrollY = window.scrollY + 120; // Offset for sticky header
  sectionIds.forEach(id => {
    const section = document.querySelector(id);
    if (section && section.offsetTop <= scrollY) {
      current = id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === current);
  });
}
window.addEventListener('scroll', scrollSpy);
window.addEventListener('DOMContentLoaded', scrollSpy); 