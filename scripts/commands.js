// ----------------------
// глобальные переменные
// ----------------------
let activeEmoji = null;
let commands = []; // заполняется на основе data/commands.json

// ----------------------
// загрузка данных
// ----------------------
async function loadCommands() {
  try {
    const response = await fetch('data/commands.json');
    if (!response.ok) throw new Error('Failed to load commands');
    commands = await response.json();
    initializeApp();
  } catch (error) {
    console.error('Error loading commands:', error);
    // fallback-команды, подгружаемые по умолчанию
    commands = [
      { command: "!bass 📽️" },
      { command: "!cartoon 📽️" },
      { command: "!colors 📽️" },
      { command: "!duhota/духота 📽️" },
      { command: "!goodnight 📽️" },
      { command: "!horror/страшно/ужас 📽️" },
      { command: "!minecraft 📽️" },
      { command: "!munch 📽️" },
      { command: "!sunshine 📽️" },
      { command: "!predator 📽️" },
      { command: "!pulse/пульс 📽️" },
      { command: "!дождь/боль/rain 📽️" },
      { command: "!tv 📽️" },
      { command: "!грибы 📽️" },
      { command: "!fire 📽️" },
      { command: "!stars/sky/добройночи/звёзды 📽️" }
    ];
    initializeApp();
  }
}

// ----------------------
// инициализация приложения
// ----------------------
function initializeApp() {
  const uniqueEmojis = getUniqueEmojis(commands);
  createFilterButtons(uniqueEmojis);
  generateCommandBlocks(commands);
}

// Получение команд при загрузке DOM
document.addEventListener("DOMContentLoaded", loadCommands);

// ----------------------
// набор функций
// ----------------------

// Функция для извлечения эмоджи из строки команды
function extractEmoji(commandText) {
  const emojiMatch = commandText.match(/[^\w\s!/-][\uFE0F]?/gu);
  return emojiMatch ? emojiMatch[emojiMatch.length - 1] : null;
}

// Функция для получения уникальных эмоджи из массива команд
function getUniqueEmojis(commands) {
  const emojis = new Set();
  commands.forEach(cmd => {
    const emoji = extractEmoji(cmd.command);
    if (emoji) emojis.add(emoji);
  });
  return Array.from(emojis);
}

// Функция для создания кнопок фильтрации
function createFilterButtons(emojis) {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'emoji-filters-container';

  // Добавляем класс темы (тёмная тема без класса)
  if (document.body.classList.contains('light-theme')) {
    filterContainer.classList.add('light-theme');
  }

  // Добавляем кнопку "Все"
  const allButton = document.createElement('button');
  allButton.className = 'emoji-filter active';
  allButton.textContent = 'Все';
  allButton.addEventListener('click', () => {
    activeEmoji = null;
    generateCommandBlocks(commands);
    updateActiveFilter();
  });
  filterContainer.appendChild(allButton);

  // Добавляем кнопки для каждого эмоджи
  emojis.forEach(emoji => {
    const button = document.createElement('button');
    button.className = 'emoji-filter';
    button.textContent = emoji;
    button.addEventListener('click', () => {
      if (activeEmoji === emoji) {
        activeEmoji = null; // Снимаем фильтр если кликаем на активное эмоджи
      } else {
        activeEmoji = emoji; // Устанавливаем новый фильтр
      }
      generateCommandBlocks(commands);
      updateActiveFilter();
      animateCommandListBackground(document.querySelector('.command-list'));
    });
    filterContainer.appendChild(button);
  });

  // Вставляем контейнер с кнопками перед списком команд
  const commandList = document.querySelector('.command-list');
  commandList.parentNode.insertBefore(filterContainer, commandList);
}

// Функция для обновления активного фильтра
function updateActiveFilter() {
  document.querySelectorAll('.emoji-filter').forEach(button => {
    if (button.textContent === 'Все' && !activeEmoji) {
      button.classList.add('active');
    } else if (button.textContent === activeEmoji) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// функция генерации блоков команд
function generateCommandBlocks(commands) {
  const commandList = document.querySelector(".command-list");
  animateCommandListBackground(commandList);
  commandList.innerHTML = "";

  const isLightTheme = document.body.classList.contains('light-theme');

  const filteredCommands = activeEmoji
    ? commands.filter(cmd => cmd.command.includes(activeEmoji))
    : commands;

  filteredCommands.forEach((cmd) => {
    const commandText = typeof cmd === 'string' ? cmd : cmd.command;
    const commandName = commandText.split('/')[0].split(" ")[0];
    const description = typeof cmd === 'string' ? '' : cmd.description || '';

    const block = document.createElement("div");
    block.className = "command";
    if (isLightTheme) block.classList.add('light-theme');

    const icon = document.createElement("button");
    icon.className = "copy-icon";
    // Добавляем ARIA-атрибуты
    icon.setAttribute('aria-label', `Копировать команду ${commandName}`);
    icon.setAttribute('title', `Копировать ${commandName}`); // Для тултипа
    
    // Создаем содержимое через DOM-методы вместо innerHTML
    const heading = document.createElement("h2");
    heading.textContent = commandText;
    
    block.appendChild(icon);
    block.appendChild(heading);
    
    if (description) {
      const desc = document.createElement("p");
      desc.textContent = description;
      block.appendChild(desc);
    }

    // Делаем весь блок доступным для навигации
    block.setAttribute('role', 'button');
    block.setAttribute('tabindex', '0');
    block.setAttribute('aria-label', `Команда: ${commandText}. ${description}`);

    block.addEventListener("click", function() {
      animateIcon(icon);
      animateBackground(this);
      copyToClipboard(commandName);
    });

    // Добавляем обработчик клавиатуры
    block.addEventListener("keydown", function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        animateIcon(icon);
        animateBackground(this);
        copyToClipboard(commandName);
      }
    });

    commandList.appendChild(block);
  });
}

// анимация иконки в блоке команды
function animateIcon(iconElement) {
  iconElement.style.transform = "scale(1.3)";
  setTimeout(() => {
    iconElement.style.transform = "";
  }, 300);
}

// анимация фона для блока команды
function animateBackground(element) {
  element.style.backgroundColor = "#888888";
  setTimeout(() => {
    element.style.backgroundColor = "";
  }, 300);
}

// анимация фона для списка команд (при применении фильтрации списка команд)
function animateCommandListBackground(element) {
  element.style.backgroundColor = "rgba(96, 96, 96, 0.6)";
  element.style.transition = "background-color 0.3s ease";

  setTimeout(() => {
    element.style.backgroundColor = "";
  }, 300);
}

// копирование в буфер обмена
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.classList.remove("show");
        toast.style.opacity = "1";
      }, 300);
    }, 2000);
  });
}
