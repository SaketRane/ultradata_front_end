
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
            <TableHead className="w-[40%] whitespace-nowrap font-medium">
              Performance Analysis
            </TableHead>
            <TableHead className="text-right whitespace-nowrap font-medium" data-column-code="01">
              Current<br />Year
              <span className="text-orange-500 mt-1 block text-xs">01</span>
            </TableHead>
            <TableHead className="text-right whitespace-nowrap font-medium" data-column-code="03">
              Prior<br />Year
              <span className="text-orange-500 mt-1 block text-xs">03</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-6">
              Underwriting Income (Loss)
              <span className="text-orange-500 ml-2 text-xs">90</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("90", "01")}>
              <span className="text-green-600">{generateDataCode("90", "01")}</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("90", "03")}>
              <span className="text-green-600">{generateDataCode("90", "03")}</span>
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-10">
              Impact of Change in Claims Net Discount Rate
              <span className="text-orange-500 ml-2 text-xs">91</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("91", "01")}>
              <span className="text-green-600">{generateDataCode("91", "01")}</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("91", "03")}>
              <span className="text-green-600">{generateDataCode("91", "03")}</span>
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white">
            <TableCell className="font-medium pl-10">
              Impact of Unrealized Foreign Exchange Gains/Losses 
              <span className="text-orange-500 ml-2 text-xs">92</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("92", "01")}>
              <span className="text-green-600">{generateDataCode("92", "01")}</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("92", "03")}>
              <span className="text-green-600">{generateDataCode("92", "03")}</span>
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-muted/30 bg-white font-semibold">
            <TableCell className="font-medium pl-6">
              Underwriting Income (Loss) Before Changes 
              <span className="text-orange-500 ml-2 text-xs">93</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("93", "01")}>
              <span className="text-green-600">{generateDataCode("93", "01")}</span>
            </TableCell>
            <TableCell className="text-right" data-code={generateDataCode("93", "03")}>
              <span className="text-green-600">{generateDataCode("93", "03")}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscountedAmountsForexTable;
