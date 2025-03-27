
import { useEffect, useState } from "react";
import { useDataFetching } from "./useDataFetching";

interface YearOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface InsurerData {
  insurer_code: string;
}

interface YearData {
  year: number;
}

export const useYearOptions = () => {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]);
  
  const { data: years, isLoading } = useDataFetching<YearData>({
    tableName: 'insurance_data_points',
    column: 'year',
    distinct: true,
    orderBy: { column: 'year', ascending: false }
  });

  useEffect(() => {
    if (!years.length) return;
    
    // Transform years into YearOption format
    const currentYear = new Date().getFullYear();
    const options: YearOption[] = [];
    
    // Add future years as disabled
    for (let i = 0; i < 2; i++) {
      const futureYear = currentYear + i + 1;
      options.push({
        value: futureYear.toString(),
        label: `${futureYear} (Coming Soon)`,
        disabled: true
      });
    }
    
    // Add available years from database
    const availableYears = [...new Set(years.map(y => y.year))].sort((a, b) => b - a);
    availableYears.forEach(year => {
      options.push({
        value: year.toString(),
        label: year.toString()
      });
    });
    
    setYearOptions(options);
  }, [years]);

  return { yearOptions, isLoading };
};

export const useInsurerOptions = () => {
  const { data: insurers, isLoading } = useDataFetching<InsurerData>({
    tableName: 'insurance_data_points',
    column: 'insurer_code',
    distinct: true,
    orderBy: { column: 'insurer_code', ascending: true }
  });

  // Get unique insurer codes
  const insurerOptions = [...new Set(insurers.map(i => i.insurer_code))];
  
  return { insurerOptions, isLoading };
};
