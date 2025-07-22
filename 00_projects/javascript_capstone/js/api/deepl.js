"use strict"

export async function translateToGerman(text) {
  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "de",
      format: "text"
    })
  });

  const json = await res.json();
  console.log(json.translatedText);
  return json.translatedText;
}