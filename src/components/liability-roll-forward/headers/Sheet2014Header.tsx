
import React from "react";

const Sheet2014Header: React.FC = () => {
  return (
    <>
      {/* Secondary header */}
      <tr className="h-6">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={8}>Current Period</th>
        <th className="text-xs font-semibold text-center py-0 px-1" colSpan={4}>Prior Period Restated</th>
      </tr>
      {/* Third header */}
      <tr className="h-6">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}>Liabilities for remaining coverage</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}>Liabilities for incurred claims not under PAA</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for incurred claims under PAA</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">TOTAL</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}>Liabilities for remaining coverage</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" colSpan={2}>Liabilities for incurred claims not under PAA</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r">Liabilities for incurred claims under PAA</th>
        <th className="text-xs font-semibold text-center py-0 px-1">TOTAL</th>
      </tr>
      {/* Fourth header */}
      <tr className="h-6">
        <th className="w-[350px] text-xs font-semibold text-left py-0 px-2 border-r"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="02">Excluding Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="06">Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="10">Expected Present Value of Future Cash Flows</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="12">Risk Adjustment</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="16"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="19"></th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="22">Excluding Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="26">Loss Component</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="30">Expected Present Value of Future Cash Flows</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="32">Risk Adjustment</th>
        <th className="text-xs font-semibold text-center py-0 px-1 border-r" data-column-code="36"></th>
        <th className="text-xs font-semibold text-center py-0 px-1" data-column-code="39"></th>
      </tr>
    </>
  );
};

export default Sheet2014Header;
