// src/components/LanguageSelector/LanguageSelector.tsx
"use client";

import { useLanguageContext } from "@/app/providers/language-provider/language-provider";
import { ILanguage, languages as i18nLanguages } from "@/lib/i18n";
import { HStack, Select, createListCollection } from "@chakra-ui/react";
import { IconWorld } from "@tabler/icons-react";

// Rename to avoid confusion with i18n's `languages`
const languageOptions = createListCollection({
  items: [
    { label: "Magyar", value: "hu" },
    { label: "English", value: "en" },
  ],
});

export default function LanguageSelector() {
  const { selectedLanguage, changeLanguage } = useLanguageContext();

  const commitLanguageChange = (code: string) => {
    const lang: ILanguage | undefined = i18nLanguages.find((l) => l.value === code);
    if (lang) changeLanguage(lang);
  };

  return (
    <HStack>
      <Select.Root
        value={[selectedLanguage.value]}
        onValueChange={(val) => {
          console.log("onValueChange ->", val);
          if (val.value) commitLanguageChange(val.value[0]);
        }}
        collection={languageOptions}
        size="sm"
      >
        <Select.Trigger
          rounded="full"
          px="3"
          bg="whiteAlpha.100"
          color="white"
          borderColor="whiteAlpha.300"
          _hover={{ borderColor: "whiteAlpha.500" }}
        >
          <IconWorld />
          <Select.ValueText placeholder="Nyelv" />
        </Select.Trigger>

        <Select.Content bg="blackAlpha.800" color="white">
          {languageOptions.items.map((lang) => (
            <Select.Item key={lang.value} item={lang}>
              {lang.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </HStack>
  );
}
