
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CommissionData {
  year: number;
  insurer_code: string;
  value: number;
}

const CommissionsTable: React.FC = () => {
  const [data, setData] = useState<CommissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('insurance_data_points')
          .select('year, insurer_code, value')
          .eq('sheet_code', '8010')
          .order('year', { ascending: false })
          .order('insurer_code', { ascending: true });

        if (error) {
          throw error;
        }

        setData(data || []);
      } catch (err: any) {
        console.error('Error fetching commission data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-10 text-center">Loading commission data...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error loading data: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="py-10 text-center">No commission data available. Please upload data first.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurer</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.insurer_code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionsTable;
