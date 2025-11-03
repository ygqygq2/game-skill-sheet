'use client';

import { Checkbox, Table, TableProps, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import * as React from 'react';

export interface ColumnDef<TRowModel> {
  align?: 'left' | 'right' | 'center';
  field?: keyof TRowModel;
  formatter?: (row: TRowModel, index: number) => React.ReactNode;
  hideName?: boolean;
  name: string;
  width?: number | string;
}

type RowId = number | string;

export interface DataTableProps<TRowModel> extends Omit<TableProps, 'onClick'> {
  columns: ColumnDef<TRowModel>[];
  hideHead?: boolean;
  hover?: boolean;
  onClick?: (event: React.MouseEvent, row: TRowModel) => void;
  onDeselectAll?: (event: React.ChangeEvent) => void;
  onDeselectOne?: (event: React.ChangeEvent, row: TRowModel) => void;
  onSelectAll?: (event: React.ChangeEvent) => void;
  onSelectOne?: (event: React.ChangeEvent, row: TRowModel) => void;
  rows: TRowModel[];
  selectable?: boolean;
  selected?: Set<RowId>;
  uniqueRowId?: (row: TRowModel) => RowId;
}

// ... 其他类型定义保持不变 ...

export function DataTable<TRowModel extends object & { id?: RowId | null }>({
  columns,
  hideHead,
  hover,
  onClick,
  onDeselectAll,
  onDeselectOne,
  onSelectOne,
  onSelectAll,
  rows,
  selectable,
  selected,
  uniqueRowId,
  ...props
}: DataTableProps<TRowModel>): React.JSX.Element {
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Table {...props}>
      <Thead visibility={hideHead ? 'collapse' : 'visible'}>
        <Tr>
          {selectable ? (
            <Th>
              <Checkbox
                isChecked={selectedAll}
                isIndeterminate={selectedSome}
                onChange={(event: React.ChangeEvent) => {
                  if (selectedAll) {
                    onDeselectAll?.(event);
                  } else {
                    onSelectAll?.(event);
                  }
                }}
              />
            </Th>
          ) : null}
          {columns.map(
            (column): React.JSX.Element => (
              <Th
                key={column.name}
                textAlign={column.align}
              >
                {column.hideName ? null : column.name}
              </Th>
            )
          )}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, index): React.JSX.Element => {
          const rowId = row.id ? row.id : uniqueRowId?.(row);
          const rowSelected = rowId ? selected?.has(rowId) : false;

          return (
            <Tr
              key={rowId ?? index}
              isHovered={hover}
              isSelected={rowSelected}
              onClick={
                onClick
                  ? (event: React.MouseEvent) => {
                      onClick(event, row);
                    }
                  : undefined
              }
              cursor={onClick ? 'pointer' : undefined}
            >
              {selectable ? (
                <Td>
                  <Checkbox
                    isChecked={rowId ? rowSelected : false}
                    onChange={(event: React.ChangeEvent) => {
                      if (rowSelected) {
                        onDeselectOne?.(event, row);
                      } else {
                        onSelectOne?.(event, row);
                      }
                    }}
                    onClick={(event: React.MouseEvent) => {
                      if (onClick) {
                        event.stopPropagation();
                      }
                    }}
                  />
                </Td>
              ) : null}
              {columns.map(
                (column): React.JSX.Element => (
                  <Td
                    key={column.name}
                    textAlign={column.align}
                  >
                    {
                      (column.formatter
                        ? column.formatter(row, index)
                        : column.field
                          ? row[column.field]
                          : null) as React.ReactNode
                    }
                  </Td>
                )
              )}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
