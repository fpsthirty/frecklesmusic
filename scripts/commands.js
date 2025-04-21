// ----------------------
// набор данных
// ----------------------

// Массив команд
const commands = [
  {
    command: "!cam1 🎥",
    description: "Переключить на основную камеру",
  },
  {
    command: "!cam2 🎹",
    description: "Вид с клавиш — идеально для музыкальных моментов",
  },
  {
    command: "!glitch 👾",
    description: "Добавляет глитч-эффект на видео",
  },
  {
    command: "!party",
  },
  {
    command: "!vhs 📼",
    description: "Старый VHS-фильтр — ностальгия",
  },
  {
    command: "!cat 😺",
    description: "Появляется рандомный котик на экране",
  },
  {
    command: "!rip 💀",
  },

    {
    command: "!cam1 🎥",
    description: "Переключить на основную камеру",
  },
  {
    command: "!cam2 🎹",
    description: "Вид с клавиш — идеально для музыкальных моментов",
  },
  {
    command: "!glitch 👾",
    description: "Добавляет глитч-эффект на видео",
  },
  {
    command: "!party",
  },
  {
    command: "!vhs 📼",
    description: "Старый VHS-фильтр — ностальгия",
  },
  {
    command: "!cat 😺",
    description: "Появляется рандомный котик на экране",
  },
  {
    command: "!rip 💀",
  },

    {
    command: "!cam1 🎥",
    description: "Переключить на основную камеру",
  },
  {
    command: "!cam2 🎹",
    description: "Вид с клавиш — идеально для музыкальных моментов",
  },
  {
    command: "!glitch 👾",
    description: "Добавляет глитч-эффект на видео",
  },
  {
    command: "!party",
  },
  {
    command: "!vhs 📼",
    description: "Старый VHS-фильтр — ностальгия",
  },
  {
    command: "!cat 😺",
    description: "Появляется рандомный котик на экране",
  },
  {
    command: "!rip 💀",
  },
];

// ----------------------
// набор функций
// ----------------------

// генерация HTML-блоков с командами
function generateCommandBlocks(commands) {
  const commandList = document.querySelector(".command-list");
  commandList.innerHTML = "";

  commands.forEach((cmd) => {
    // Обрабатываем оба варианта: строку и объект
    const commandText = typeof cmd === 'string' ? cmd : cmd.command;
    const description = typeof cmd === 'string' ? '' : cmd.description || '';

    const block = document.createElement("div");
    block.className = "command";
    
    const icon = document.createElement("button");
    icon.className = "copy-icon";
    icon.innerHTML = ""; // не нравятся универсальные иконки, решил вовсе удалить
    
    block.appendChild(icon);
    block.innerHTML += `
      <h3>${commandText}</h3>
      ${description ? `<p>${description}</p>` : ''}
    `;

    block.addEventListener("click", function() {
      animateIcon(icon);
      animateBackground(this);
      copyToClipboard(commandText.split(" ")[0]);
    });

    commandList.appendChild(block);
  });
}

// анимации иконки в блоке команды
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

// Запускаем генерацию при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  generateCommandBlocks(commands);
});