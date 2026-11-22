(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  const form = document.querySelector('#project-inquiry');
  if (form) {
    const status = form.querySelector('.form-status');
    const result = new URLSearchParams(window.location.search).get('status');
    const messages = {
      sent: 'Thanks — your project inquiry has been sent.',
      failed: 'We could not send your inquiry just now. Please try again later.',
      invalid: 'Please check the required fields and try again.'
    };
    if (status && messages[result]) {
      status.textContent = messages[result];
    }
  }

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = new Date().getFullYear();
  });
})();
