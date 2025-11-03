import { defineSlotRecipe } from '@chakra-ui/react';

export const Checkbox = defineSlotRecipe({
  slots: ['root', 'control', 'label', 'indicator'],
  base: {
    root: {
      padding: 0,
      _focusVisible: {
        outline: '2px solid colorPalette.500',
        outlineOffset: '2px',
      },
    },
    control: {
      padding: 3,
      borderRadius: '8px',
    },
    label: {},
    indicator: {},
  },
});
