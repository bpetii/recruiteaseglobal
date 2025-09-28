import englishTranslation from "./locales/strings.js";
import { promises as fs } from "node:fs";

const locales = ['en', 'hu']; 

async function generateTranslationMap(translationMapPath) {
  const keysMap = Object.keys(englishTranslation).reduce(
    (acc, cur) => ({ ...acc, [cur]: cur }),
    {},
  );

  await fs.writeFile(
    translationMapPath,
    JSON.stringify(keysMap, null, 4),
  );
  console.log('translation-map.json generated');
}

// Function to generate locale data based on the provided locale
function generateLocaleData(locale, existingData = {}) {
  return Object.entries(englishTranslation).reduce((acc, [key, value]) => {

    if (!existingData.hasOwnProperty(key)) {
      acc[key] = locale === 'en' ? value : ''; 
    } else {
      acc[key] = existingData[key]; 
    }
    return acc;
  }, { ...existingData });
}

async function readExistingLocaleData(locale) {
  const localeFilePath = `./locales/${locale}/translation.json`;
  try {
    const data = await fs.readFile(localeFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {};
    }
    throw err;
  }
}

async function generateLocaleTranslations() {
  for (const locale of locales) {

    const existingData = await readExistingLocaleData(locale);
    const localeData = generateLocaleData(locale, existingData);

		const localeFilePath = `./locales/${locale}/translation.json`;

		await fs.writeFile(
			localeFilePath,
			JSON.stringify(localeData, null, 4),
		);
		console.log(`${locale}/translation.json updated`);
  }
}

// Execution
(async () => {
  const translationMapPath = './locales/translation-map.json';

  // Generate the translation map
  await generateTranslationMap(translationMapPath);

  // Generate locale translations, preserving existing values
  await generateLocaleTranslations();
})();
