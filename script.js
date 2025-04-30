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

// Placeholder for PDF download
const downloadBtn = document.getElementById('download-pdf');
downloadBtn.addEventListener('click', () => {
  alert('PDF download feature coming soon!');
});

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