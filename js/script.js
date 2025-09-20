const components = [
  "header",
  "hero",
  "about",
  "projects",
  "skills",
  "certifications",
  "internships",
  "contact",
  "footer"
];

// ==================== Load Components ==================== //
Promise.all(
  components.map(comp =>
    fetch(`components/${comp}.html`)
      .then(res => res.text())
      .then(data => {
        const el = document.getElementById(comp);
        if (el) el.innerHTML = data;
      })
      .catch(err => console.error(`Error loading ${comp}:`, err))
  )
).then(() => {
  console.log("✅ All components loaded");
  initTypingAnimation();
  initSmoothScroll();
  initRevealAnimations();
  initActiveNav();
});

// ==================== Typing Animation ==================== //
function initTypingAnimation() {
  const textElement = document.getElementById("animatedText");
  if (!textElement) {
    console.warn("⚠️ #animatedText not found — skipping typing animation.");
    return;
  }

  const phrases = [
    "Engineering ideas into impact.",
    "From spark to software—watch it build.",
    "Inventing tomorrow, one line at a time.",
    "Fueling tech dreams with caffeine and code.",
    "Student by day, developer by destiny.",
    "When APIs meet imagination.",
    "Not just building apps—building possibilities."
  ];

  let currentPhrase = 0;
  let currentChar = 0;

  function type() {
    if (currentChar < phrases[currentPhrase].length) {
      textElement.textContent += phrases[currentPhrase][currentChar];
      currentChar++;
      setTimeout(type, 70);
    } else {
      setTimeout(erase, 1800);
    }
  }

  function erase() {
    if (currentChar > 0) {
      textElement.textContent = phrases[currentPhrase].substring(0, currentChar - 1);
      currentChar--;
      setTimeout(erase, 40);
    } else {
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }

  type(); // Start typing after components are loaded
}

// ==================== Smooth Scroll ==================== //
function initSmoothScroll() {
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ==================== Reveal Animations ==================== //
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(
    ".skill-group, .reveal-left, .reveal-right, .project-card"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

// ==================== Active Nav Highlight ==================== //
function initActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });
}
