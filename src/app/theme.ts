// app/theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { inputRecipe } from "./themes/recipes/input";
import { textareaRecipe } from "./themes/recipes/textarea";

const config = defineConfig({
  theme: {
    recipes: {
      input: inputRecipe,
      textarea: textareaRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
