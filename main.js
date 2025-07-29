let kuranData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    kuranData = data; // artık array
  });

function getRandomAyet() {
  const count = parseInt(document.getElementById("count").value);
  if (kuranData.length === 0) {
    document.getElementById("output").innerHTML = "Veri yüklenmedi.";
    return;
  }

  const randomSureIndex = Math.floor(Math.random() * kuranData.length);
  const sure = kuranData[randomSureIndex];
  const verses = sure.verses;
  const totalAyahs = verses.length;

  const maxStart = totalAyahs - count;
  const startIndex = maxStart > 0 ? Math.floor(Math.random() * (maxStart + 1)) : 0;

  let output = `<h2>${sure.translation}</h2>`;

  let lastTranslation = null;
  let displayedCount = 0;
  let i = startIndex;

  while (displayedCount < count && i < totalAyahs) {
    const currentTranslation = verses[i].translation.trim();

    if (currentTranslation !== lastTranslation) {
      output += `<p><b>${verses[i].id}.</b> ${currentTranslation}</p>`;
      displayedCount++;
      lastTranslation = currentTranslation;
    } else {
      // Tekrar eden ayet, atla
    }

    i++;
  }

  if (displayedCount === 0) {
    output += "<p>Gösterilecek ayet yok.</p>";
  }

  document.getElementById("output").innerHTML = output;
}

