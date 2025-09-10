import React from 'react';
import { useFinancialData } from '@/hooks/useApiData';
import { Loader2 } from 'lucide-react';

interface DataCellProps {
  code: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * DataCell component that fetches and displays financial data
 */
const DataCell: React.FC<DataCellProps> = ({ code, className = "", children }) => {
  const { data, isLoading, error } = useFinancialData(code);

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center text-red-500 text-xs ${className}`}>
        Error
      </div>
    );
  }

  if (!data || data.notExists) {
    return (
      <div className={`text-center text-gray-400 text-xs ${className}`}>
        -
      </div>
    );
  }

  // Format the number with commas and handle null values
  const formatValue = (value: number | null) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className={`text-center text-xs ${className}`}>
      {formatValue(data.value)}
    </div>
  );
};

export default React.memo(DataCell);
