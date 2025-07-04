import React from 'react';
import SummaryOfInvestmentsTable from '@/components/SummaryOfInvestmentsTable';
import SummaryOfInvestmentsTable2015 from '@/components/SummaryOfInvestmentsTable2015';

interface CategoryMapperProps {
  sheetCode: string;
}

const InvestmentsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case '4008':
      return <SummaryOfInvestmentsTable />;
    case '4007':
      return <SummaryOfInvestmentsTable2015 />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default InvestmentsMapper;
