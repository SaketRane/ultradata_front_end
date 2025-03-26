
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ComprehensiveIncomeTable = () => {
  return (
    <div className="overflow-auto">
      <Table className="border-collapse w-full text-xs">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="border p-2 text-left font-semibold w-6"></TableHead>
            <TableHead className="border p-2 text-left font-semibold"></TableHead>
            <TableHead className="border p-2 text-center font-semibold w-32">Current<br />Period</TableHead>
            <TableHead className="border p-2 text-center font-semibold w-32">Prior<br />Period</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Comprehensive Income (Loss) */}
          <TableRow className="font-bold">
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2">Comprehensive Income (Loss)</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">01</TableCell>
            <TableCell className="border p-2 pl-4" data-code="20420101">Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-4">Other Comprehensive Income (Loss):</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>

          {/* Items that may be reclassified */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-8 italic">Items that may be reclassified subsequently to Net Income:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">FVOCI:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-16">Change in Unrealized Gains and Losses:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">02</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20420201">- Loans</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">03</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20420301">- Bonds and Debentures</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">04</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20420401">- Equities (IAS 39)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">05</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20420501">Reclassification of (Gains) Losses to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Overlay approach */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">Overlay approach</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-16">Change in Unrealized Gains and Losses related to overlay approach for financial instruments</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">15</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20421501">Unrealized Gains and Losses</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">16</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20421601">Reclassification of (Gains) Losses from Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Derivatives */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">Derivatives Designated as Cash Flow Hedges</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">06</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20420601">Change in Unrealized Gains and Losses</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">07</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20420701">Reclassification of (Gains) Losses to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Foreign Currency */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">Foreign Currency Translation</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">08</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20420801">Change in Unrealized Gains and Losses</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">09</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20420901">Impact of Hedging</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Share of OCI */}
          <TableRow>
            <TableCell className="border p-2 text-center">14</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20421401">Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures (may be reclassified)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">18</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20421801">Other</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="border p-2 text-center">19</TableCell>
            <TableCell className="border p-2 pl-8 font-medium" data-code="20421901">Subtotal of items that may be reclassified subsequently to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Items that will not be reclassified */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-8 italic">Items that will not be reclassified subsequently to Net Income:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">FVOCI:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-16">Change in Unrealized Gains and Losses:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">25</TableCell>
            <TableCell className="border p-2 pl-20" data-code="20422501">- Equities (IFRS 9)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">31</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20423101">Revaluation Surplus</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">11</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20421101">Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">34</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20423401">Remeasurements of Defined Benefit Plans</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">12</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20421201">Other</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="border p-2 text-center">29</TableCell>
            <TableCell className="border p-2 pl-8 font-medium" data-code="20422901">Subtotal of items that will not be reclassified subsequently to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell className="border p-2 text-center">21</TableCell>
            <TableCell className="border p-2 pl-4 font-medium" data-code="20422101">Total Other Comprehensive Income (Loss)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="font-bold bg-gray-100">
            <TableCell className="border p-2 text-center">39</TableCell>
            <TableCell className="border p-2" data-code="20423901">Total Comprehensive Income (Loss)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Attributable to */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2">Attributable to:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">60</TableCell>
            <TableCell className="border p-2 pl-4" data-code="20426001">Non-controlling Interests</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">62</TableCell>
            <TableCell className="border p-2 pl-4" data-code="20426201">Equity Holders</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* Accumulated OCI */}
          <TableRow className="font-bold">
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2">Accumulated Other Comprehensive Income (Loss)</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-4">Accumulated Gains (Losses) on:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>

          {/* AOCI - Items that may be reclassified */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-8 italic">Items that may be reclassified subsequently to Net Income:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">FVOCI:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">42</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20424201">- Loans</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">43</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20424301">- Bonds and Debentures</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">44</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20424401">- Equities (IAS 39)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">55</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20425501">Overlay Approach</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">45</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20424501">Derivatives Designated as Cash Flow Hedges</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">46</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20424601">Foreign Currency (net of hedging activities)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">52</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20425201">Share of Other Comprehensive Income of Subsidiaries, Associates & Joint Ventures (may be reclassified)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">68</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20426801">Other</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="border p-2 text-center">69</TableCell>
            <TableCell className="border p-2 pl-8 font-medium" data-code="20426901">Subtotal of items that may be reclassified subsequently to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>

          {/* AOCI - Items that will not be reclassified */}
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-8 italic">Items that will not be reclassified subsequently to Net Income:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2 pl-12">FVOCI:</TableCell>
            <TableCell className="border p-2"></TableCell>
            <TableCell className="border p-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">65</TableCell>
            <TableCell className="border p-2 pl-16" data-code="20426501">- Equities (IFRS 9)</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">71</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20427101">Revaluation Surplus</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">51</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20425101">Share of OCI of Subsidiaries, Associates & Joint Ventures</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">74</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20427401">Remeasurements of Defined Benefit Plans</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border p-2 text-center">49</TableCell>
            <TableCell className="border p-2 pl-12" data-code="20424901">Other</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="border p-2 text-center">79</TableCell>
            <TableCell className="border p-2 pl-8 font-medium" data-code="20427901">Subtotal of items that will not be reclassified subsequently to Net Income</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
          <TableRow className="font-bold bg-gray-100">
            <TableCell className="border p-2 text-center">59</TableCell>
            <TableCell className="border p-2 pl-4" data-code="20425901">Balance at end of Year</TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
            <TableCell className="border p-2 text-right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComprehensiveIncomeTable;
