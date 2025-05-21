// вывод id коммита в html для определения актуальности контента на сайте
// для CI-сборки: выгрузка из JSON-файла
fetch('data/commit-info.json')
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