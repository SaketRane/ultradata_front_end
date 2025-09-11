/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { InsuranceRowDefinition, ClaimColumnDefinition } from './types';
import { generateDataCellCode, getRowClasses } from './utils';
import useCode from '@/hooks/use-code';

interface TableRowProps {
  row: InsuranceRowDefinition;
  index: number;
  columns: ClaimColumnDefinition[];
  values?: any;
}

/**
 * Table row component for UndiscountedClaimsTable
 */
const TableRowComponent: React.FC<TableRowProps> = ({
  row,
  index,
  columns,
  values,
}) => {
  const { paddingClass, bgClass, fontClass, sizeClass } = getRowClasses(
    row.indent,
    row.isTotal,
    row.isSubtotal,
  );

  const { parseCode } = useCode();

  return (
    <TableRow key={index} className={bgClass} data-row-code={row.rowCode}>
      <TableCell
        className={`${paddingClass} ${fontClass} py-1 px-2 ${sizeClass}`}
      >
        {row.name}
      </TableCell>

      {columns.map((column) => {
        const dataCode = generateDataCellCode(row.rowCode, column.colCode);

        const parsedCode = parseCode(dataCode);

        return (
          <TableCell
            key={`${row.rowCode || index}-${column.colCode}`}
            className={`text-center py-1 px-2 ${sizeClass} ${fontClass}`}
            data-code={dataCode}
          >
            {values ? values[parsedCode] : null}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default React.memo(TableRowComponent);
