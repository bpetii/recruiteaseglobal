// src/themes/input.ts

import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    borderRadius: "xl",
    borderWidth: "1px",
    borderColor: "gray.200",
    bg: "red",
    _hover: { borderColor: "gray.300" },
    color: "gray.900",
    _focusVisible: {
      borderColor: "black",
      boxShadow: "0 0 0 2px #000",
      outline: "none",
    },
  },

  variants: {
    variant: {
      outline: {
        field: {
          borderColor: "gray.200",
        },
      },
      filled: {
        field: {
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
  },

  defaultVariants: { variant: "outline" },
});
