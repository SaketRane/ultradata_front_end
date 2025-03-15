
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const DiscountedAmountsForexTable = () => {
  const generateDataCode = (rowCode: string, columnCode: string) => {
    return `6021${rowCode}${columnCode}`;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[40%] whitespace-nowrap font-medium" data-column-code="">
              Performance Analysis
            </TableHead>
            <TableHead className="text-right whitespace-nowrap font-medium" data-column-code="01">
              Current<br />Year
            </TableHead>
            <TableHead className="text-right whitespace-nowrap font-medium" data-column-code="03">
              Prior<br />Year
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-6" data-code={generateDataCode("90", "01")}>
              Underwriting Income (Loss)
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("90", "01")}>
              -
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("90", "03")}>
              -
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-10" data-code={generateDataCode("91", "01")}>
              Impact of Change in Claims Net Discount Rate
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("91", "01")}>
              -
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("91", "03")}>
              -
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-10" data-code={generateDataCode("92", "01")}>
              Impact of Unrealized Foreign Exchange Gains/Losses 
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("92", "01")}>
              -
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("92", "03")}>
              -
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white font-semibold">
            <TableCell className="font-medium pl-6" data-code={generateDataCode("93", "01")}>
              Underwriting Income (Loss) Before Changes 
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("93", "01")}>
              -
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("93", "03")}>
              -
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscountedAmountsForexTable;
