"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ILanguage, languages } from "@/lib/i18n/index";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  selectedLanguage: ILanguage;
  changeLanguage: (language: ILanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const defaultLanguage = languages.find((l) => l.default)!;

  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(defaultLanguage);

  useEffect(() => {
    // Load language from local storage
    const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("selectedLanguage") : null;

    const language = languages.find((l) => l.value === storedLanguage) ?? defaultLanguage;

    setSelectedLanguage(language);
    i18n.changeLanguage(language.value);
  }, [i18n, defaultLanguage]);

  const changeLanguage = (language: ILanguage) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.value);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", language.value);
    }
  };

  return <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  }
  return context;
};
