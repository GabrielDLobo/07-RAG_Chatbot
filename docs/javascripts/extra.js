window.addEventListener('DOMContentLoaded', () => {
  const externalLinks = document.querySelectorAll('a[href^="http"]');

  externalLinks.forEach((link) => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});