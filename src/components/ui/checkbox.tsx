'use client';

import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface CheckboxProps {
  children?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  [key: string]: any;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, onChange, ...rest } = props;

  return (
    <ChakraCheckbox.Root
      ref={ref}
      onCheckedChange={onChange}
      {...rest}
    >
      <ChakraCheckbox.Control>
        <ChakraCheckbox.Indicator />
      </ChakraCheckbox.Control>
      {children && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
    </ChakraCheckbox.Root>
  );
});
