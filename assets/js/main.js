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
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const email = window.DEB_CREATIVES_CONFIG?.contactEmail?.trim();
      if (!email) {
        status.textContent = 'Please add your project inquiry email before publishing this form.';
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent(`Project inquiry — ${data.get('name')}`);
      const body = encodeURIComponent([
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Business/project: ${data.get('business') || 'Not provided'}`,
        `Country/time zone: ${data.get('country') || 'Not provided'}`,
        `Service: ${data.get('service')}`,
        `Budget: ${data.get('budget') || 'Not provided'}`,
        '',
        'Project details:',
        data.get('details')
      ].join('\n'));
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      status.textContent = 'Your email app should open with the project brief ready to send.';
    });
  }
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
})();
