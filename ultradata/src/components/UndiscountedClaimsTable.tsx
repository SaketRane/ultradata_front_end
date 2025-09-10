import React, { useLayoutEffect, useMemo } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { TABLE_ROWS, CLAIM_COLUMNS } from './undiscounted-claims/constants';
import TableHeader from './undiscounted-claims/TableHeader';
import TableRowComponent from './undiscounted-claims/TableRow';
import { generateDataCellCode } from './claims-undiscounted/utils';
import useCode from '@/hooks/use-code';

/**
 * UndiscountedClaimsTable displays claims data in a structured table format
 * with columns for different types of claims and rows for insurance categories
 */
const UndiscountedClaimsTable: React.FC = () => {
  const { values, parseCode, handleGetCode, handleBatchCode } = useCode();

  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(
    () =>
      TABLE_ROWS.map((row, index) => (
        <TableRowComponent
          key={`${row.rowCode || 'row'}-${index}`}
          row={row}
          index={index}
          columns={CLAIM_COLUMNS}
          values={values}
        />
      )),
    [values],
  );

  useLayoutEffect(() => {
    const arrayOfCellCode = [];
    TABLE_ROWS.forEach((row) => {
      CLAIM_COLUMNS.forEach((col) => {
        arrayOfCellCode.push(generateDataCellCode(row.rowCode, col.colCode));
      });
    });
    handleBatchCode(arrayOfCellCode);
  }, []);

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-full text-xs dropdown-data">
        <TableHeader columns={CLAIM_COLUMNS} />
        <TableBody className="text-[10px]">{tableRows}</TableBody>
      </Table>
    </div>
  );
};

export default React.memo(UndiscountedClaimsTable);
