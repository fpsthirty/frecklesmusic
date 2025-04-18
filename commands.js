// ----------------------
// набор данных
// ----------------------

// Массив команд
const commandList = [
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
    command: "!party 🪩",
    description: "Включает диско-режим с цветными огнями",
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
    description: "Шутливый 'game over' эффект с шумом",
  },
];

// ----------------------
// набор функций
// ----------------------

// генерация HTML-блоков с командами
function generateCommandBlocks(commandList) {
  const commandList = document.querySelector(".command-list");
  commandList.innerHTML = "";

  commandList.forEach((cmd) => {
    const block = document.createElement("div");
    block.className = "command";
    
    block.innerHTML = `
      <button class="copy-icon">🗎</button>
      <h3>${cmd.command}</h3>
      <p>${cmd.description}</p>
    `;

    // Обработчик клика
    block.addEventListener("click", function() {
      // Анимация фона
      this.style.transition = "background-color 1s ease";
      this.style.backgroundColor = "#880000";
      
      // Возвращаем исходный цвет через 1 секунду
      setTimeout(() => {
        this.style.backgroundColor = "";
      }, 1000);
      
      // Копирование текста
      copyToClipboard(cmd.command.split(" ")[0]);
    });

    commandList.appendChild(block);
  });
}

// копирование команды в буфер обмена
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
  generateCommandBlocks(commandList);
});