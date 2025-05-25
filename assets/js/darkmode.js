document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('mode-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  });
});
