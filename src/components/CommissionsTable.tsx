
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CommissionsTable: React.FC = () => {
  // Mock data for demonstration purposes
  const mockData = [
    {
      classOfInsurance: "Property - total",
      code: "09",
      deferredCommissionsBeginning: 1250000,
      unearnedCommissionsBeginning: 980000,
      direct: 3500000,
      reinsuranceAssumed: 750000,
      reinsuranceCeded: 500000,
      net: 3750000,
      deferredCommissionsEnd: 1350000,
      unearnedCommissionsEnd: 1050000,
      netCommissions: 4050000,
    },
    {
      classOfInsurance: "Automobile - total",
      code: "29",
      deferredCommissionsBeginning: 2100000,
      unearnedCommissionsBeginning: 1850000,
      direct: 6300000,
      reinsuranceAssumed: 1200000,
      reinsuranceCeded: 850000,
      net: 6650000,
      deferredCommissionsEnd: 2250000,
      unearnedCommissionsEnd: 1950000,
      netCommissions: 7050000,
    },
    {
      classOfInsurance: "Liability",
      code: "59",
      deferredCommissionsBeginning: 980000,
      unearnedCommissionsBeginning: 760000,
      direct: 2850000,
      reinsuranceAssumed: 540000,
      reinsuranceCeded: 320000,
      net: 3070000,
      deferredCommissionsEnd: 1020000,
      unearnedCommissionsEnd: 800000,
      netCommissions: 3310000,
    },
    {
      classOfInsurance: "Marine",
      code: "68",
      deferredCommissionsBeginning: 450000,
      unearnedCommissionsBeginning: 320000,
      direct: 1250000,
      reinsuranceAssumed: 280000,
      reinsuranceCeded: 180000,
      net: 1350000,
      deferredCommissionsEnd: 480000,
      unearnedCommissionsEnd: 350000,
      netCommissions: 1510000,
    },
    {
      classOfInsurance: "Other",
      code: "75",
      deferredCommissionsBeginning: 320000,
      unearnedCommissionsBeginning: 250000,
      direct: 980000,
      reinsuranceAssumed: 180000,
      reinsuranceCeded: 120000,
      net: 1040000,
      deferredCommissionsEnd: 350000,
      unearnedCommissionsEnd: 270000,
      netCommissions: 1140000,
    },
    {
      classOfInsurance: "TOTAL",
      code: "79",
      deferredCommissionsBeginning: 5100000,
      unearnedCommissionsBeginning: 4160000,
      direct: 14880000,
      reinsuranceAssumed: 2950000,
      reinsuranceCeded: 1970000,
      net: 15860000,
      deferredCommissionsEnd: 5450000,
      unearnedCommissionsEnd: 4420000,
      netCommissions: 17060000,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Summary data calculated from the mockData
  const commissionExpense = mockData.find(item => item.code === "79")?.deferredCommissionsBeginning +
    mockData.find(item => item.code === "79")?.direct +
    mockData.find(item => item.code === "79")?.reinsuranceAssumed -
    mockData.find(item => item.code === "79")?.unearnedCommissionsEnd || 0;
  
  const contingentCommissionsGross = 750000; // Mock data
  const otherNonDeferrableCommissionsGross = 320000; // Mock data
  const totalGross = commissionExpense + contingentCommissionsGross + otherNonDeferrableCommissionsGross;

  const commissionIncome = mockData.find(item => item.code === "79")?.unearnedCommissionsBeginning +
    mockData.find(item => item.code === "79")?.reinsuranceCeded -
    mockData.find(item => item.code === "79")?.deferredCommissionsEnd || 0;
  
  const contingentCommissionsCeded = 380000; // Mock data
  const otherNonDeferrableCommissionsCeded = 170000; // Mock data
  const totalCeded = commissionIncome + contingentCommissionsCeded + otherNonDeferrableCommissionsCeded;

  const totalNetCommissions = totalGross - totalCeded;

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full text-xs">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="border px-2 py-1 font-semibold">Class of Insurance</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Deferred Commissions at beginning of year</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Unearned Commissions at beginning of year</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center" colSpan={3}>Commissions in respect of premiums written</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Net</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Deferred Commissions end of year</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Unearned Commissions end of year</TableHead>
            <TableHead className="border px-2 py-1 font-semibold text-center">Net Commissions attributable to the period (02+07+09)-(03+08)</TableHead>
          </TableRow>
          <TableRow className="bg-muted/30">
            <TableHead className="border px-2 py-1 text-center">(01)</TableHead>
            <TableHead className="border px-2 py-1 text-center">02</TableHead>
            <TableHead className="border px-2 py-1 text-center">03</TableHead>
            <TableHead className="border px-2 py-1 text-center">Direct<br/>04</TableHead>
            <TableHead className="border px-2 py-1 text-center">Reinsurance assumed<br/>05</TableHead>
            <TableHead className="border px-2 py-1 text-center">Reinsurance ceded<br/>06</TableHead>
            <TableHead className="border px-2 py-1 text-center">07</TableHead>
            <TableHead className="border px-2 py-1 text-center">08</TableHead>
            <TableHead className="border px-2 py-1 text-center">09</TableHead>
            <TableHead className="border px-2 py-1 text-center">10</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow key={index} className={row.classOfInsurance === "TOTAL" ? "font-semibold bg-muted/20" : ""}>
              <TableCell className="border px-2 py-1" data-code={row.code}>{row.classOfInsurance}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}902`}>{formatCurrency(row.deferredCommissionsBeginning)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}903`}>{formatCurrency(row.unearnedCommissionsBeginning)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}904`}>{formatCurrency(row.direct)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}905`}>{formatCurrency(row.reinsuranceAssumed)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}906`}>{formatCurrency(row.reinsuranceCeded)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}907`}>{formatCurrency(row.net)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}908`}>{formatCurrency(row.deferredCommissionsEnd)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}909`}>{formatCurrency(row.unearnedCommissionsEnd)}</TableCell>
              <TableCell className="border px-2 py-1 text-right" data-code={`80${row.code}910`}>{formatCurrency(row.netCommissions)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary Section */}
      <Table className="border-collapse w-full text-xs mt-6">
        <TableBody>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 font-semibold" colSpan={2}>Summary of Commissions</TableCell>
            <TableCell className="border px-2 py-1" colSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1" colSpan={2}>Gross:</TableCell>
            <TableCell className="border px-2 py-1" colSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Commission Expense (line 79, column 02+04+05-08)</TableCell>
            <TableCell className="border px-2 py-1 text-center">30</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80103010">{formatCurrency(commissionExpense)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Contingent Commissions</TableCell>
            <TableCell className="border px-2 py-1 text-center">33</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80103310">{formatCurrency(contingentCommissionsGross)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Other Non-Deferrable Commissions</TableCell>
            <TableCell className="border px-2 py-1 text-center">35</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80103510">{formatCurrency(otherNonDeferrableCommissionsGross)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-4 font-semibold" colSpan={2}>Total Gross (line 30+33+35)</TableCell>
            <TableCell className="border px-2 py-1 text-center font-semibold">39</TableCell>
            <TableCell className="border px-2 py-1 text-right font-semibold" data-code="80103910">{formatCurrency(totalGross)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1" colSpan={2}>Ceded:</TableCell>
            <TableCell className="border px-2 py-1" colSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Commission Income (line 79, column 03+06-09)</TableCell>
            <TableCell className="border px-2 py-1 text-center">40</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80104010">{formatCurrency(commissionIncome)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Contingent Commissions</TableCell>
            <TableCell className="border px-2 py-1 text-center">43</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80104310">{formatCurrency(contingentCommissionsCeded)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-8" colSpan={2}>Other Non-Deferrable Commissions</TableCell>
            <TableCell className="border px-2 py-1 text-center">45</TableCell>
            <TableCell className="border px-2 py-1 text-right" data-code="80104510">{formatCurrency(otherNonDeferrableCommissionsCeded)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-4 font-semibold" colSpan={2}>Total Ceded (line 40+43+45)</TableCell>
            <TableCell className="border px-2 py-1 text-center font-semibold">49</TableCell>
            <TableCell className="border px-2 py-1 text-right font-semibold" data-code="80104910">{formatCurrency(totalCeded)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border px-2 py-1" colSpan={6}></TableCell>
            <TableCell className="border px-2 py-1 pl-4 font-bold" colSpan={2}>TOTAL NET COMMISSIONS (line 39-49)</TableCell>
            <TableCell className="border px-2 py-1 text-center font-bold">89</TableCell>
            <TableCell className="border px-2 py-1 text-right font-bold" data-code="80108910">{formatCurrency(totalNetCommissions)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CommissionsTable;
