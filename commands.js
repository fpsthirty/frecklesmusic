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
function generateCommandBlocks(commands) {
  const commandList = document.querySelector(".command-list");
  commandList.innerHTML = ""; // Очищаем контейнер

  commands.forEach((cmd) => {
    const block = document.createElement("div");
    block.className = "command";
    block.onclick = () => copyToClipboard(cmd.command.split(" ")[0]);
    block.innerHTML = `
      <button class="copy-icon">🗎</button>
      <h3>${cmd.command}</h3>
      <p>${cmd.description}</p>
    `;

    commandList.appendChild(block);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    toast.classList.add("show"); // Показываем уведомление

    // Через 2 секунды начинаем скрывать
    setTimeout(() => {
      toast.style.opacity = "0"; // Плавно уменьшаем прозрачность

      // Ждём окончания анимации (300ms = 0.3s, как в CSS)
      setTimeout(() => {
        toast.classList.remove("show"); // Убираем класс
        toast.style.opacity = "1"; // Возвращаем прозрачность для следующего показа
      }, 300);
    }, 2000);
  });
}

// Запускаем генерацию при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  generateCommandBlocks(commands);
});