// --- CURSOR ---
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function updateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursor.style.background = 'var(--accent2)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--accent1)'; });
  });

  // --- THEME TOGGLE ---
  const toggle = document.getElementById('themeToggle');
  let dark = true;
  toggle.addEventListener('click', () => {
    dark = !dark;
    document.body.classList.toggle('light-mode', !dark);
  });

  // --- MOBILE MENU ---
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
  });
  document.getElementById('closeMenu').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
  function closeMob() { document.getElementById('mobileMenu').classList.remove('open'); }

  // --- SCROLL REVEAL ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate skill bars when card enters view
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => bar.classList.add('animated'));
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });

  // Observe skill cards separately for bar animations
  document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

  // --- PARTICLES ---
  function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        --dur: ${6 + Math.random() * 12}s;
        --delay: ${Math.random() * 10}s;
        --drift: ${(Math.random() - 0.5) * 200}px;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        background: ${Math.random() > 0.5 ? 'var(--accent1)' : 'var(--accent2)'};
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  // --- CONTACT FORM ---
   const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMsg');
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.opacity=0;
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showErrorMessage('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showErrorMessage('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link
            const subject = encodeURIComponent(`Message from ${name} - CSE Portfolio`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto: radhakrishna628191@gmail.com?subject=${subject}&body=${body}`;
            
            // Show loading state
            const submitButton = contactForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Open default email client
                window.open(mailtoLink, '_blank');
                
                // Show success message
                showSuccessMessage();
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
                
            } catch (error) {
                console.error('Error sending email:', error);
                showErrorMessage('Failed to open email client. Please copy the email address and send manually.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                errorMessage.style.opacity=1;
            }
        });

        function showSuccessMessage() {
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        function showErrorMessage(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }



  // --- NAV ACTIVE STATE ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent1)' : '';
    });
  });

  // --- GLITCH effect on hover ---
  document.querySelector('.hero-name .line2').addEventListener('mouseenter', function() {
    this.style.animation = 'none';
    setTimeout(() => this.style.animation = '', 50);
  });