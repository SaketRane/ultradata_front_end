
import React from "react";

export const Sheet2012SecondaryHeader: React.FC = () => (
  <tr className="h-6">
    <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="02">Expected Present Value of Future Cash Flows</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="06">Risk Adjustment</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={3}>Contractual Service Margin (CSM)</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="29">TOTAL</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="32">Expected Present Value of Future Cash Flows</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="36">Risk Adjustment</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={3}>Contractual Service Margin (CSM)</th>
    <th className="text-xs font-semibold text-center py-0 px-1" data-column-code="59">TOTAL</th>
  </tr>
);

export const Sheet2012ThirdHeader: React.FC = () => (
  <tr className="h-6">
    <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="10">Modified Retro</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="14">Fair Value</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="18">Other</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r"></th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="40">Modified Retro</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="44">Fair Value</th>
    <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="48">Other</th>
    <th className="text-xs font-semibold text-center py-0 px-1"></th>
  </tr>
);

export const Sheet2012Header: React.FC = () => (
  <>
    <Sheet2012SecondaryHeader />
    <Sheet2012ThirdHeader />
  </>
);
