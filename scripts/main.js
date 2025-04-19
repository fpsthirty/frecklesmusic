// Проверяем сохраненное состояние закрытие меню смены темы при загрузке страницы
      /*document.addEventListener('DOMContentLoaded', function() {
        if(localStorage.getItem('hideThemeButton') === 'true') {
          document.querySelector('.theme-toggle').style.display = 'none';
        }
      });*/

      // Функция скрытия кнопки
      function hideThemeButton(event) {
        event.stopPropagation(); // Предотвращаем срабатывание toggleTheme
        const button = document.querySelector('.theme-toggle');
        button.style.display = 'none';
        localStorage.setItem('hideThemeButton', 'true');
      }