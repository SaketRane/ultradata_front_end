
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ClaimsIncurredTable: React.FC = () => {
  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px] text-xs dropdown-data">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] text-xs font-semibold text-left py-2 px-4">Class of Insurance</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">NL</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">PE</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">NS</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">NB</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">QC</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">ON</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">MB</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">SK</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">AB</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">BC</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">YK</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">NW</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">NU</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">OUT</TableHead>
            <TableHead className="text-xs font-semibold text-center py-2 px-4">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[10px]">
          {/* Property */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Property</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Personal excluding Home and Product Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Home Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Product Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium py-1 px-4">Subtotal - Personal</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Commercial</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium py-1 px-4">Property - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium py-1 px-4"></TableCell>
            ))}
          </TableRow>

          {/* Aircraft */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Aircraft</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>

          {/* Automobile */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Automobile:</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">Private Passenger</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium py-1 px-4">Subtotal - Private Passenger</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">Other than Private Passenger</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium py-1 px-4">Subtotal - Other than Private Passenger</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">Facility Assoc. Residual Market</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium py-1 px-4">Subtotal - Facility Assoc. Residual Market</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">Automobile - Subtotal</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16 py-1 px-4 text-[9px]">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium py-1 px-4">Automobile - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Boiler and Machinery */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Boiler and Machinery excluding Equipment Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Equipment Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          
          {/* Credit and others */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Credit</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Credit Protection</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Fidelity</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Hail</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Legal Expense</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Liability */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Liability:</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Comprehensive General Liability (with products)</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Comprehensive General Liability (without products)</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Cyber Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Directors and Officers Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Excess Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Professional Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Umbrella Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Pollution Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- All other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium py-1 px-4">Liability - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Mortgage and others */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Mortgage</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Other Approved Products</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Surety */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Surety:</TableCell>
            <TableCell colSpan={14} className="py-1 px-4"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- Contract Surety</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 py-1 px-4 text-[9px]">- All Other Surety</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium py-1 px-4">Surety - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Remaining categories */}
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Title</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Marine</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-1 px-4">Accident and Sickness</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4"></TableCell>
            ))}
          </TableRow>
          
          {/* Totals */}
          <TableRow className="bg-gray-100">
            <TableCell className="font-semibold py-1 px-4">Total - direct</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-semibold py-1 px-4"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-4 py-1 px-4 text-[9px]">Reinsurance assumed</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-4 py-1 px-4 text-[9px]">Reinsurance ceded</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center py-1 px-4 text-[9px]"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-primary-50">
            <TableCell className="font-bold py-1 px-4">TOTAL - NET</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-bold py-1 px-4"></TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ClaimsIncurredTable;
