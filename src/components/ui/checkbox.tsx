'use client';

import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface CheckboxProps {
  children?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  // 允许透传到 Chakra Checkbox.Root 的通用 props
  id?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  // 兜底：保留极少量未覆盖的 DOM 属性，但避免使用 any
  style?: React.CSSProperties;
  className?: string;
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
