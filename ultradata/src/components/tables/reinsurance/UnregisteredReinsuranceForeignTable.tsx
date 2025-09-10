import React, { useLayoutEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useCode from '@/hooks/use-code';

// Define table rows with their codes and formatting
const reinsuranceTableRows = [
  { name: 'Total Associated', rowCode: '09', isBold: false, isTotal: false },
  {
    name: 'Total Non-associated',
    rowCode: '19',
    isBold: false,
    isTotal: false,
  },
  { name: 'TOTAL BUSINESS', rowCode: '29', isBold: true, isTotal: true },
];

// Define column structure
const tableColumns = [
  { name: 'Reinsurance Premiums Ceded', code: '18', width: '1fr' },
  { name: 'UEP ceded to assuming insurer', code: '20', width: '1fr' },
  {
    name: 'Outstanding losses recoverable from assuming insurer',
    code: '22',
    width: '1fr',
  },
  {
    name: 'Receivables',
    subColumns: [
      { name: 'Reinsurance Receivable', code: '24' },
      { name: 'Reinsurance Payable', code: '26' },
      { name: 'Net Receivable', code: '28' },
      { name: 'Aging of Reinsurance Asset', code: '30' },
    ],
    width: '4fr',
  },
  {
    name: 'Reinsurance Collateral',
    subColumns: [
      { name: 'Non-owned deposits - RSA', code: '32' },
      { name: 'Other acceptable non-owned deposits', code: '34' },
      { name: 'Reinsurance Collateral - Funds Held', code: '36' },
      { name: 'Letters of Credit', code: '38' },
      { name: 'Total', code: '39' },
    ],
    width: '5fr',
  },
  {
    name: 'Calculations for MCT purposes (where positive)',
    subColumns: [
      {
        name: '20% Margin on UEP and outstanding losses recoverable',
        code: '40',
      },
      { name: 'Recoverables in excess of acceptable collateral', code: '42' },
      { name: 'Acceptable collateral in excess of recoverables', code: '44' },
      { name: 'Margin Required', code: '46' },
      { name: 'Excess Collateral', code: '48' },
    ],
    width: '5fr',
  },
];

/**
 * UnregisteredReinsuranceForeignTable component
 * Displays reinsurance data for foreign/unregistered insurers
 * Uses sheet code 7061 for data integration
 */
const UnregisteredReinsuranceForeignTable: React.FC = () => {
  const { values, handleGetCode, parseCode, handleBatchCode } = useCode();
  // Function to generate data cell code
  const generateDataCode = (rowCode: string, columnCode: string) => {
    if (!rowCode) return '';
    return `7061${rowCode}${columnCode}`;
  };

  useLayoutEffect(() => {
    const arrayOfCellCode = [];
    reinsuranceTableRows.forEach((row) => {
      tableColumns.forEach((col) => {
        arrayOfCellCode.push(generateDataCode(row.rowCode, col.code));
      });
    });
    handleBatchCode(arrayOfCellCode);
  }, [reinsuranceTableRows, tableColumns]);

  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1000px] text-xs">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead
              className="w-[250px] text-xs font-semibold text-left py-2 px-4 border-r"
              rowSpan={2}
            ></TableHead>
            {tableColumns.map((column, index) => {
              if ('subColumns' in column && column.subColumns) {
                return (
                  <TableHead
                    key={index}
                    className="text-xs font-semibold text-center py-2 border-r"
                    colSpan={column.subColumns.length}
                  >
                    {column.name}
                  </TableHead>
                );
              } else {
                return (
                  <TableHead
                    key={index}
                    className="text-xs font-semibold text-center py-2 border-r"
                    rowSpan={2}
                    data-column-code={column.code}
                  >
                    {column.name}
                  </TableHead>
                );
              }
            })}
          </TableRow>
          <TableRow>
            {tableColumns.flatMap((column, index) => {
              if ('subColumns' in column && column.subColumns) {
                return column.subColumns.map((subColumn, subIndex) => (
                  <TableHead
                    key={`${index}-${subIndex}`}
                    className="text-xs font-semibold text-center py-2 border-r"
                    data-column-code={subColumn.code}
                  >
                    {subColumn.name}
                  </TableHead>
                ));
              }
              return [];
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {reinsuranceTableRows.map((row, index) => {
            const fontClass = row.isBold ? 'font-semibold' : 'font-normal';
            const bgClass = row.isTotal ? 'bg-gray-50' : '';

            return (
              <TableRow
                key={index}
                className={`${bgClass} h-8 border-b border-gray-300`}
                data-row-code={row.rowCode}
              >
                <TableCell
                  className={`${fontClass} py-1 px-2 border-r text-left`}
                >
                  {row.name}
                  {row.rowCode && (
                    <span className="text-orange-500 ml-2 text-[9px]">
                      {row.rowCode}
                    </span>
                  )}
                </TableCell>

                {tableColumns.flatMap((column) => {
                  if ('subColumns' in column && column.subColumns) {
                    return column.subColumns.map((subColumn, subIndex) => {
                      const dataCode = generateDataCode(
                        row.rowCode,
                        subColumn.code,
                      );
                      const parsedCode = parseCode(dataCode);
                      return (
                        <TableCell
                          key={`${row.rowCode}-${subColumn.code}`}
                          className="text-center py-1 px-2 border-r group"
                          data-code={dataCode}
                        >
                          {values ? values[parsedCode] : null}
                        </TableCell>
                      );
                    });
                  } else {
                    const dataCode = generateDataCode(row.rowCode, column.code);
                    const parsedCode = parseCode(dataCode);
                    return [
                      <TableCell
                        key={`${row.rowCode}-${column.code}`}
                        className="text-center py-1 px-2 border-r group"
                        data-code={dataCode}
                        onMouseEnter={handleGetCode(dataCode)}
                      >
                        {values ? values[parsedCode] : null}
                      </TableCell>,
                    ];
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(UnregisteredReinsuranceForeignTable);
