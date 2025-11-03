import { defineRecipe } from '@chakra-ui/react';

export const Link = defineRecipe({
  base: {
    _hover: {
      textDecoration: 'underline',
    },
  },
});
