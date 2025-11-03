import { Box, Button, Popover, PopoverContent, PopoverTrigger, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

function noop(..._: unknown[]): void {
  // Do nothing
}

export interface FilterContextValue<T = unknown> {
  anchorEl: HTMLElement | null;
  onApply: (value: unknown) => void;
  onClose: () => void;
  open: boolean;
  value?: T;
}

export const FilterContext = React.createContext<FilterContextValue>({
  anchorEl: null,
  onApply: noop,
  onClose: noop,
  open: false,
  value: undefined,
});

export function useFilterContext(): FilterContextValue {
  const context = React.useContext(FilterContext);

  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }

  return context;
}

export interface FilterButtonProps {
  displayValue?: string;
  label: string;
  onFilterApply?: (value: unknown) => void;
  onFilterDelete?: () => void;
  popover: React.ReactNode;
  value?: unknown;
}

export function FilterButton({
  displayValue,
  label,
  onFilterApply,
  onFilterDelete,
  popover,
  value,
}: FilterButtonProps): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleApply = React.useCallback(
    (newValue: unknown) => {
      onClose();
      onFilterApply?.(newValue);
    },
    [onClose, onFilterApply]
  );

  return (
    <FilterContext.Provider value={{ anchorEl: btnRef.current, onApply: handleApply, onClose, open: isOpen, value }}>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom-start"
        matchWidth={true}
        trigger="click"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            colorPalette="teal"
            onClick={onOpen}
            ref={btnRef}
            leftIcon={
              value ? (
                <Box
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onFilterDelete?.();
                  }}
                  onKeyUp={(event) => {
                    event.stopPropagation();
                    event.preventDefault();

                    if (event.key === 'Enter' || event.key === ' ') {
                      onFilterDelete?.();
                    }
                  }}
                  role="button"
                  display="flex"
                  tabIndex={0}
                >
                  <Icon icon="ph:minus-circle" />
                </Box>
              ) : (
                <Icon icon="ph:plus-circle" />
              )
            }
            variant="outline"
          >
            <span>
              {label}
              {displayValue ? (
                <React.Fragment>
                  :{' '}
                  <Box
                    as="span"
                    color="teal.500"
                  >
                    {displayValue}
                  </Box>
                </React.Fragment>
              ) : null}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>{popover}</PopoverContent>
      </Popover>
    </FilterContext.Provider>
  );
}

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
}

export function FilterPopover({ children, title, onClose, anchorEl, open }: FilterPopoverProps): React.JSX.Element {
  return (
    <Popover
      isOpen={Boolean(anchorEl && open)}
      onClose={onClose}
      placement="bottom-start"
      matchWidth={true}
    >
      <PopoverContent>
        <VStack
          gap={2}
          p={2}
        >
          <Text fontSize="md">{title}</Text>
          {children}
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
