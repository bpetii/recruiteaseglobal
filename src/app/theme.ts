// src/app/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";
import { inputRecipe } from "@/themes/input";

export const system = createSystem(defaultConfig, {
  theme: {
    recipes: {
      Input: inputRecipe, // 🔑 attach recipe to Input
    },
  },
});

export default system;
