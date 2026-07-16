* ==========================================================
   GLADEATS — custom JavaScript
   Vanilla JS only (no framework). Handles:
   1. Reveal-on-scroll for the woven signature divider
   2. Back-to-top button show/hide + scroll action
   3. Bootstrap-based custom form validation on the feedback page
   4. Highlighting the active nav link based on current page
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Reveal the woven divider once it scrolls into view */
  const weaveEls = document.querySelectorAll('.gd-weave');
  if (weaveEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    weaveEls.forEach(el => io.observe(el));
  }

  /* 2. Back-to-top button */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = (window.scrollY > 400) ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 3. Bootstrap custom form validation (feedback / contact form) */
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const successBox = document.getElementById('formSuccess');
        if (successBox) {
          successBox.classList.remove('d-none');
          form.reset();
          form.classList.remove('was-validated');
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  /* 4. Highlight active nav link based on the current page URL */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-gladeats .nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

});
