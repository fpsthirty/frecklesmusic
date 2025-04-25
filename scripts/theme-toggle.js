// Функция для применения сохранённой темы при загрузке страницы
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const commandBlockList = document.querySelectorAll('.command');
  const footer = document.querySelector('footer');
  const filtersContainer = document.querySelector('.emoji-filters-container');

  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    footer.classList.add('light-theme');
    commandBlockList.forEach(command => {
      command.classList.add('light-theme');
    });
    if (filtersContainer) filtersContainer.classList.add('light-theme');
  }

  updateThemeButton();
}

// Функция для обновления кнопки темы
function updateThemeButton() {
  const body = document.body;
  const themeToggleButton = document.querySelector('.theme-toggle');
  const themeTextSpan = document.querySelector('.theme-text');

  if (body.classList.contains('light-theme')) {
    if (window.innerWidth >= 768) {
      themeToggleButton.innerHTML = '<span class="theme-text">🌙 Тёмная тема</span>';
    } else {
      themeToggleButton.textContent = "🌙";
    }
    themeToggleButton.setAttribute('aria-label', 'Переключить на темную тему');
  } else {
    if (window.innerWidth >= 768) {
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
  const filtersContainer = document.querySelector('.emoji-filters-container');

  body.classList.toggle('light-theme');
  footer.classList.toggle('light-theme');
  commandBlockList.forEach(command => {
    command.classList.toggle('light-theme');
  });
  if (filtersContainer) filtersContainer.classList.toggle('light-theme');

  // Сохраняем выбранную тему
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);

  updateThemeButton();
}

// Обработчик изменения размера окна (для адаптации иконки)
window.addEventListener('resize', function() {
  updateThemeButton();
});

// Применяем сохранённую тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  applySavedTheme();

    // Проверяем, есть ли контейнер фильтров на странице
  const filtersContainer = document.querySelector('.emoji-filters-container');
  if (filtersContainer) {
    // Применяем тему к фильтрам
    if (document.body.classList.contains('light-theme')) {
      filtersContainer.classList.add('light-theme');
    }
  }
});

/* десктоп: спустя 10сек после открытия сайта скрываем кнопку до тех пор, пока пользователь не наведёт курсор на хеадер */

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const header = document.querySelector('header');
  const isDesktop = window.innerWidth >= 1024;
  const INITIAL_DELAY = 10000; // 10 секунд

  let initialTimer;
  let isInitialPeriod = true;

  function showButton() {
    themeToggle.classList.add('visible');
  }

  function hideButton() {
    if (!isHovered() && !isInitialPeriod) {
      themeToggle.classList.remove('visible');
    }
  }

  function isHovered() {
    return header.matches(':hover') || themeToggle.matches(':hover');
  }

  // Только для планшетов и десктопов
  if (isDesktop) {
    showButton();

    initialTimer = setTimeout(function() {
      isInitialPeriod = false;
      hideButton();
    }, INITIAL_DELAY);

    // Обработчики для header
    header.addEventListener('mouseenter', showButton);
    header.addEventListener('mouseleave', hideButton);

    // Обработчики для самой кнопки
    themeToggle.addEventListener('mouseenter', showButton);
    themeToggle.addEventListener('mouseleave', function() {
      if (!isInitialPeriod && !header.matches(':hover')) {
        hideButton();
      }
    });
  }

  // Реакция на ресайз
  window.addEventListener('resize', function() {
    if (window.innerWidth < 1024) {
      clearTimeout(initialTimer);
      showButton();
    } else if (window.innerWidth >= 1024 && !initialTimer) {
      isInitialPeriod = true;
      showButton();
      initialTimer = setTimeout(function() {
        isInitialPeriod = false;
        hideButton();
      }, INITIAL_DELAY);
    }
  });
});
