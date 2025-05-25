document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('mode-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  });
});
