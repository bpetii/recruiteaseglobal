// src/lib/i18n.ts
"use client";

import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsHu from "../../../locales/hu/translation.json";
import translationsEn from "../../../locales/en/translation.json";

export interface ILanguage {
  value: string;
  translation: Record<string, any>;
  name: string;
  flag: string;
  default?: boolean;
}

export const languages: ILanguage[] = [
  { value: "hu", name: "HU", flag: "/flags/hu.webp", translation: translationsHu, default: true },
  { value: "en", name: "EN", flag: "/flags/en.webp", translation: translationsEn },
];

const languageResources = (langs: ILanguage[]): Resource =>
  langs.reduce<Resource>((acc, lng) => {
    acc[lng.value] = { translation: lng.translation };
    return acc;
  }, {});

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: languageResources(languages),
      lng: languages.find((l) => l.default)?.value,
      fallbackLng: languages.find((l) => l.default)?.value,
      supportedLngs: languages.map((l) => l.value),
      detection: {
        order: ["querystring", "localStorage", "navigator", "cookie", "htmlTag"],
        caches: ["localStorage"],
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      debug: false,
    });
}

export default i18n;
