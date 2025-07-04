import React from 'react';
import {
  InsuranceServiceResultTable,
  ChangesInOnerousContractsTable,
} from '@/components/tables/insurance-results';
import PremiumsAndClaimsTable from '@/components/PremiumsAndClaimsTable';
import ClaimsAndAdjustmentExpensesTable from '@/components/ClaimsAndAdjustmentExpensesTable';
import UndiscountedClaimsTable from '@/components/UndiscountedClaimsTable';

interface CategoryMapperProps {
  sheetCode: string;
}

const PremiumsClaimsMapper: React.FC<CategoryMapperProps> = ({ sheetCode }) => {
  switch (sheetCode) {
    case '6020':
      return <PremiumsAndClaimsTable />;
    case '6021':
      return <UndiscountedClaimsTable />;
    case '6030':
      return <ClaimsAndAdjustmentExpensesTable />;
    case '6025':
      return <InsuranceServiceResultTable />;
    case '6080':
      return <ChangesInOnerousContractsTable />;
    default:
      return (
        <div className="flex justify-center items-center p-8 text-muted-foreground">
          <p>Table implementation coming soon...</p>
        </div>
      );
  }
};

export default PremiumsClaimsMapper;
