// ----------------------
// набор данных
// ----------------------

// Массив команд
const commands = [
{
    command: "!clap 👏",
  },
  {
    command: "!clap1 👏",
  },
  {
    command: "!clap2 👏",
  },
  {
    command: "!clap3 👏",
  },
  {
    command: "!clap4 👏",
  },
  {
    command: "!clap5 👏",
  },
  {
    command: "!clap6 👏",
  },
  {
    command: "!clap7 👏",
  },
  {
    command: "!clap8 👏",
  },
  {
    command: "!clap9 👏",
  },
  {
    command: "!clap10 👏",
  },
  {
    command: "!clap11 👏",
  },
  {
    command: "!clap12 👏",
  },
  {
    command: "!вжух 🎉",
  },
  {
    command: "!вжух2 🎉",
  },
  {
    command: "!вжух3 🎉",
  },
  {
    command: "!вжух4 🎉",
  },
  {
    command: "!вжух5 🎉",
  },
  {
    command: "!вжух6 🎉",
  },
  {
    command: "!вжух7 🎉",
  },
  {
    command: "!вжух8 🎉",
  },
  {
    command: "!вжух9 🎉",
  },
  {
    command: "!вжух10 🎉",
  },
  {
    command: "!вжух11 🎉",
  },
  {
    command: "!паук 🕷️",
  },
  {
    command: "!паук1 🕷️",
  },
  {
    command: "!паук2 🕷️",
  },
  {
    command: "!паук3 🕷️",
  },
  {
    command: "!паук4 🕷️",
  },
  {
    command: "!паук5 🕷️",
  },
  {
    command: "!паучок 🕷️",
  },
  {
    command: "!цветы 💐",
  },
  {
    command: "!цветы1 💐",
  },
  {
    command: "!цветы2 💐",
  },
  {
    command: "!цветы3 💐",
  },
  {
    command: "!розы 💐",
  },
  {
    command: "!клубника 💐",
  },
  {
    command: "!ромашки 💐",
  },
  {
    command: "!ромашка 💐",
  },
  {
    command: "!весна 💐",
  },
  {
    command: "!цветок 💐",
  },
  {
    command: "!цветочек 💐",
  },
  {
    command: "!осенний 🍁",
  },
  {
    command: "!осень1 🍁",
  },
  {
    command: "!fall1 🍁",
  },
  {
    command: "!листья 🍁",
  },
  {
    command: "!leaves 🍁",
  },
  {
    command: "!autumn 🍁",
  },
  {
    command: "!осень 🍁",
  },
  {
    command: "!fall 🍁",
  },
  {
    command: "!бан/ban 🍲",
  },
  {
    command: "!hearts/heart/сердце 🍲",
  },
  {
    command: "!снег 🍲",
  },
  {
    command: "!упёрдывай 🍲",
  },
  {
    command: "!фигвам/figvam 🍲",
  },
  {
    command: "!bass 📽️",
  },
  {
    command: "!cartoon 📽️",
  },
  {
    command: "!colors 📽️",
  },
  {
    command: "!duhota/духота 📽️",
  },
  {
    command: "!goodnight 📽️",
  },
  {
    command: "!horror/страшно/ужас 📽️",
  },
  {
    command: "!minecraft 📽️",
  },
  {
    command: "!munch 📽️",
  },
  {
    command: "!sunshine 📽️",
  },
  {
    command: "!predator 📽️",
  },
  {
    command: "!pulse/пульс 📽️",
  },
  {
    command: "!дождь/боль/rain 📽️",
  },
  {
    command: "!tv 📽️",
  },
  {
    command: "!грибы 📽️",
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
      copyToClipboard(commandText.split('/')[0].split(" ")[0]);
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