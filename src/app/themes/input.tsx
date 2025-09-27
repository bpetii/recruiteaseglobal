// theme/input.ts
import { defineSlotRecipe } from "@chakra-ui/react";

export const inputRecipe = defineSlotRecipe({
  className: "input",
  slots: ["root", "field", "addon", "element"],
  base: {
    field: {
      borderRadius: "xl",
      border: "1px solid",
      borderColor: "gray.200",
      bg: "white",
      _hover: { borderColor: "gray.300" },
      color: "gray.900",
      _focus: {
        borderColor: "black",
        boxShadow: "0 0 0 2px #000",
        outline: "none",
      },
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
          _focus: {
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
