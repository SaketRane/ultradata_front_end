
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PremiumsTable: React.FC = () => {
  return (
    <div className="overflow-auto max-h-[70vh] rounded-md border bg-white/80 backdrop-blur-sm">
      <Table className="min-w-[1200px]">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[250px] font-semibold text-left">Class of Insurance</TableHead>
            <TableHead className="font-semibold text-center">NL</TableHead>
            <TableHead className="font-semibold text-center">PE</TableHead>
            <TableHead className="font-semibold text-center">NS</TableHead>
            <TableHead className="font-semibold text-center">NB</TableHead>
            <TableHead className="font-semibold text-center">QC</TableHead>
            <TableHead className="font-semibold text-center">ON</TableHead>
            <TableHead className="font-semibold text-center">MB</TableHead>
            <TableHead className="font-semibold text-center">SK</TableHead>
            <TableHead className="font-semibold text-center">AB</TableHead>
            <TableHead className="font-semibold text-center">BC</TableHead>
            <TableHead className="font-semibold text-center">YK</TableHead>
            <TableHead className="font-semibold text-center">NW</TableHead>
            <TableHead className="font-semibold text-center">NU</TableHead>
            <TableHead className="font-semibold text-center">OUT</TableHead>
            <TableHead className="font-semibold text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Property */}
          <TableRow>
            <TableCell className="font-medium">Property</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Personal excluding Home and Product Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Home Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Product Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium">Subtotal - Personal</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Commercial</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium">Property - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium"></TableCell>
            ))}
          </TableRow>

          {/* Aircraft */}
          <TableRow>
            <TableCell className="font-medium">Aircraft</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>

          {/* Automobile */}
          <TableRow>
            <TableCell className="font-medium">Automobile:</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">Private Passenger</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium">Subtotal - Private Passenger</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8">Other than Private Passenger</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium">Subtotal - Other than Private Passenger</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8">Facility Assoc. Residual Market</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8 font-medium">Subtotal - Facility Assoc. Residual Market</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="pl-8">Automobile - Subtotal</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Personal Accident</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-16">- Other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium">Automobile - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium"></TableCell>
            ))}
          </TableRow>
          
          {/* Boiler and Machinery */}
          <TableRow>
            <TableCell className="font-medium">Boiler and Machinery excluding Equipment Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Equipment Warranty</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          {/* Credit and others */}
          <TableRow>
            <TableCell className="font-medium">Credit</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Credit Protection</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Fidelity</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Hail</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Legal Expense</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          {/* Liability */}
          <TableRow>
            <TableCell className="font-medium">Liability:</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Comprehensive General Liability (with products)</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Comprehensive General Liability (without products)</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Cyber Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Directors and Officers Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Excess Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Professional Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Umbrella Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Pollution Liability</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- All other</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium">Liability - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium"></TableCell>
            ))}
          </TableRow>
          
          {/* Mortgage and others */}
          <TableRow>
            <TableCell className="font-medium">Mortgage</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Other Approved Products</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          {/* Surety */}
          <TableRow>
            <TableCell className="font-medium">Surety:</TableCell>
            <TableCell colSpan={14}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- Contract Surety</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-8">- All Other Surety</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="font-medium">Surety - total</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-medium"></TableCell>
            ))}
          </TableRow>
          
          {/* Remaining categories */}
          <TableRow>
            <TableCell className="font-medium">Title</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Marine</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Accident and Sickness</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          
          {/* Totals */}
          <TableRow className="bg-gray-100">
            <TableCell className="font-semibold">Total - direct</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-semibold"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Reinsurance assumed</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Reinsurance ceded</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-primary-50">
            <TableCell className="font-bold">TOTAL - NET</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center font-bold"></TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Dividends - direct</TableCell>
            {Array(15).fill(0).map((_, i) => (
              <TableCell key={i} className="text-center"></TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PremiumsTable;
