// src/themes/textarea.ts
import { defineRecipe } from "@chakra-ui/react";

export const textareaRecipe = defineRecipe({
  base: {
    borderRadius: "xl",
    borderWidth: "1px",
    borderColor: "gray.200",
    bg: "red",
    color: "gray.900",
    _hover: { borderColor: "gray.300" },
    _focusVisible: {
      borderColor: "black",
      boxShadow: "0 0 0 2px #000",
      outline: "none",
    },
  },

  variants: {
    variant: {
      outline: {
        borderColor: "gray.200",
      },
      filled: {
        bg: "#F2F2F2",
        borderWidth: "1px",
        borderColor: "gray.200",
        _hover: { borderColor: "gray.200" },
        _focusVisible: {
          borderColor: "black",
          boxShadow: "0 0 0 2px #000",
          bg: "white",
        },
      },
    },
  },

  defaultVariants: { variant: "outline" },
});
