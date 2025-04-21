// Функция для применения сохранённой темы при загрузке страницы
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const commandBlockList = document.querySelectorAll('.command');
  const footer = document.querySelector('footer');
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    footer.classList.add('light-theme');
    commandBlockList.forEach(command => {
      command.classList.add('light-theme');
    });
  }
  
  // Обновляем кнопку темы
  updateThemeButton();
}

// Функция для обновления кнопки темы
function updateThemeButton() {
  const body = document.body;
  const themeToggleButton = document.querySelector('.theme-toggle');
  const themeTextSpan = document.querySelector('.theme-text');
  
  if (body.classList.contains('light-theme')) {
    if (window.innerWidth > 768) {
      themeToggleButton.innerHTML = '<span class="theme-text">🌙 Тёмная тема</span>';
    } else {
      themeToggleButton.textContent = "🌙";
    }
    themeToggleButton.setAttribute('aria-label', 'Переключить на темную тему');
  } else {
    if (window.innerWidth > 768) {
      themeToggleButton.innerHTML = '<span class="theme-text">🌞 Светлая тема</span>';
    } else {
      themeToggleButton.textContent = "🌞";
    }
    themeToggleButton.setAttribute('aria-label', 'Переключить на светлую тему');
  }
}

function toggleTheme() {
  const body = document.body;
  const commandBlockList = document.querySelectorAll('.command');
  const footer = document.querySelector('footer');
  
  body.classList.toggle('light-theme');
  footer.classList.toggle('light-theme');
  commandBlockList.forEach(command => {
    command.classList.toggle('light-theme');
  });

  // Сохраняем выбранную тему в localStorage
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  
  // Обновляем кнопку темы
  updateThemeButton();
}

// Обработчик изменения размера окна (для адаптации иконки)
window.addEventListener('resize', function() {
  updateThemeButton();
});

// Применяем сохранённую тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  applySavedTheme();
});
