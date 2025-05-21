// вывод id коммита в html для определения актуальности контента на сайте
// для CI-сборки: выгрузка из JSON-файла
/*fetch('data/commit-info.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('commit-info').innerHTML = `
      Версия: ${data.commit} | ${data.date}
    `;
  })
  .catch(() => {
    // для локальной разработки
    fetch('.git/refs/heads/main')
      .then(r => r.text())
      .then(sha => {
        document.getElementById('commit-info').textContent = 
          `Локальная сборка: ${sha.trim().substring(0, 7)}`;
      })
      .catch(e => console.error('Не удалось получить commit SHA:', e));
  });
  */

/* eslint-env node */
const fs = require('fs');
const express = require('express');

const app = express(); // Инициализация app, если ещё не сделано
const commitHash = fs.readFileSync('version.log', 'utf-8').trim();

app.use((req, res, next) => {
  res.setHeader('X-Git-Commit', commitHash);
  next();
});