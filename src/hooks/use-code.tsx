import { baseURL } from '@/api/api';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useCode = () => {
  const [value, setValue] = useState(null);
  const [values, setValues] = useState(null);
  const [filters, setFilters] = useState(null);

  // Read filters from localStorage and update when they change
  useEffect(() => {
    const updateFilters = () => {
      const storedFilters = localStorage.getItem('filters');
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }
    };

    updateFilters();
    
    // Listen for localStorage changes
    window.addEventListener('storage', updateFilters);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(updateFilters, 100);

    return () => {
      window.removeEventListener('storage', updateFilters);
      clearInterval(interval);
    };
  }, []);

  // Clear values only when we start fetching new data, not when filters change
  // This prevents flickering while ensuring stale data is cleared

  const parseCode = useCallback((dataCode) => {
    if (!filters?.insurer?.code || !filters?.year) return '';
    
    const year = filters.year;
    const last2SymYear = year.toString().substring(2);
    let code = filters.insurer.code;
    
    // Handle total insurers based on year
    const isTotalInsurer = filters.insurer.name && (
      filters.insurer.name.includes('Total Canadian P&C') || 
      filters.insurer.name.includes('Total Foreign P&C')
    );
    
    if (isTotalInsurer) {
      const yearNum = parseInt(year);
      if (yearNum >= 2023) {
        // For 2023+, use "TOTAL" code
        code = "TOTAL";
      } else {
        // For 2022 and before, use the original codes (A999/D999)
        // But check if the insurer actually exists in the API response
        if (filters.insurer.name.includes('Total Canadian P&C')) {
          code = "A999";
        } else if (filters.insurer.name.includes('Total Foreign P&C')) {
          code = "D999";
        }
      }
    }
    
    const query = last2SymYear + code + dataCode;
    return query;
  }, [filters]);

  const handleGetCode = (dataCode) => async () => {
    const countryCode = filters?.insurer?.countryCode;
    const code = filters?.insurer?.code;
    const year = filters?.year;
    const last2SymYear = year.toString().substring(2);
    const query = last2SymYear + code + dataCode;

    await axios.post(baseURL + '/data', { code: query }).then((response) => {
      const data = response.data;
      setValue(data?.value);
    });
  };

  const handleBatchCode = useCallback(async (arrayCodes) => {
    if (!filters?.insurer?.code || !filters?.year) {
      setValues(null);
      return;
    }

    const batch = [];
    const year = filters.year;
    const last2SymYear = year.toString().substring(2);
    let code = filters.insurer.code;
    
    // Handle total insurers based on year (same logic as parseCode)
    const isTotalInsurer = filters.insurer.name && (
      filters.insurer.name.includes('Total Canadian P&C') || 
      filters.insurer.name.includes('Total Foreign P&C')
    );
    
    if (isTotalInsurer) {
      const yearNum = parseInt(year);
      if (yearNum >= 2023) {
        // For 2023+, use "TOTAL" code
        code = "TOTAL";
      } else {
        // For 2022 and before, use the original codes (A999/D999)
        if (filters.insurer.name.includes('Total Canadian P&C')) {
          code = "A999";
        } else if (filters.insurer.name.includes('Total Foreign P&C')) {
          code = "D999";
        }
      }
    }

    arrayCodes.forEach((codeItem) => {
      const query = last2SymYear + code + codeItem;
      batch.push(query);
    });

    try {
      const response = await axios.post(baseURL + '/data/batch', {
        codeList: [...batch],
      });
      const data = response.data;
      setValues(data?.values);
    } catch (error) {
      console.error('Error fetching batch data:', error);
      setValues(null);
    }
  }, [filters]);

  return { value, handleGetCode, parseCode, handleBatchCode, filters, values };
};

export default useCode;
