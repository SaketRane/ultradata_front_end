/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardFooter from '@/components/DashboardFooter';
import DataFilterSelector from '@/components/DataFilterSelector';
import DataVisualization from '@/components/DataVisualization';
import { sectionSheetsMapping } from '@/constants/sectionSheets';
import { apiClient } from '@/integrations/database/client';
import { baseURLApi } from '@/api/api';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<string>('');
  const [insurer, setInsurer] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [sheet, setSheet] = useState<string>('');

  const [yearOptions, setYearOptions] = useState([]);
  const [insurerOptions, setInsurerOptions] = useState([]);

  // Track previous year group to detect cross-group changes
  const [previousYearGroup, setPreviousYearGroup] = useState<
    'pre-2023' | '2023+' | null
  >(null);

  // Helper function to determine year group
  const getYearGroup = useCallback(
    (yearValue: string): 'pre-2023' | '2023+' | null => {
      if (!yearValue) return null;
      return parseInt(yearValue) < 2023 ? 'pre-2023' : '2023+';
    },
    [],
  );

  const availableSections2024 = useMemo(
    () => [
      'Financial Statements',
      'Investments',
      'Insurance Results & Onerous Contracts',
      'Provincial Stats',
      'Commissions & Expenses',
      'Reinsurance',
    ],
    [],
  );

  const availableSections2015 = useMemo(
    () => [
      'Financial Statements',
      'Investments',
      'Premiums, Claims, & LAE',
      'Provincial Stats',
      'Commissions & Expenses',
      'Reinsurance',
    ],
    [],
  );

  const currentSections = useMemo(() => {
    return +year < 2023 ? availableSections2015 : availableSections2024;
  }, [year, availableSections2015, availableSections2024]);

  const availableSheets = useMemo(() => {
    if (!section) return [];

    const ifrs17Sheets = [
      '2010',
      '2011',
      '2012',
      '2014',
      '2016',
      '2018',
      '2022',
      '2041',
      '2042',
      '2045',
      '2054',
      '4008',
      '6025',
      '6080',
      '6740',
      '6750',
      '6760',
      '6770',
      '8015',
      '8025',
      '7050',
      '7060',
    ];

    const ifrs17SheetsTo2023 = [
      '2010',
      '2020',
      '2030',
      '2042',
      '2045',
      '2054',
      '4007',
      '6020',
      '6030',
      '6710',
      '6720',
      '6730',
      '8010',
      '7050',
      '7060',
    ];

    const selectYearArray =
      +year < 2023 ? [...ifrs17SheetsTo2023] : [...ifrs17Sheets];

    return (
      sectionSheetsMapping[section]?.sheets.filter((sheet) =>
        selectYearArray.includes(sheet.code),
      ) || []
    );
  }, [section, year]);

  const handleYearChange = useCallback(
    (value: string) => {
      const newYearGroup = getYearGroup(value);
      const currentYearGroup = getYearGroup(year);

      setYear(value);

      // Only reset section and sheet if crossing between year groups
      if (
        previousYearGroup &&
        newYearGroup &&
        previousYearGroup !== newYearGroup
      ) {
        setSection('');
        setSheet('');
      }

      // Update the previous year group for next comparison
      setPreviousYearGroup(newYearGroup);
    },
    [year, getYearGroup, previousYearGroup],
  );

  const handleInsurerChange = useCallback((value: string) => {
    setInsurer(value);
    // Don't reset section and sheet when changing insurer
  }, []);

  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
    setSheet('');
  }, []);

  const handleSheetChange = useCallback((value: string) => setSheet(value), []);

  useEffect(() => {
    document.title = 'UltraData | Dashboard';
  }, []);

  // Initialize previousYearGroup when year is first set
  useEffect(() => {
    if (year && !previousYearGroup) {
      setPreviousYearGroup(getYearGroup(year));
    }
  }, [year, previousYearGroup, getYearGroup]);

  // Handle sheet availability when year changes within the same group
  useEffect(() => {
    if (year && section && sheet && availableSheets.length > 0) {
      // Check if current sheet is still available
      const isCurrentSheetAvailable = availableSheets.some(
        (s) => s.code === sheet,
      );

      if (!isCurrentSheetAvailable) {
        // If current sheet is not available, select the first available sheet
        setSheet(availableSheets[0].code);
      }
    }
  }, [year, section, sheet, availableSheets]);

  // useEffect(() => {
  //   apiClient.post('/insurer/get/insurer', {year: 2024}).then((response) => {
  //     console.log(response)
  //   })
  // }, [])

  useEffect(() => {
    axios
      .post(baseURLApi + '/insurer/get/year', {
        insurerName: insurer,
      })
      .then((response) => {
        const data = response.data;
        const list = data?.yearList;

        if (list) {
          const parseArray = list.map((item) => {
            return {
              value: item.year,
              label: item.year,
            };
          });
          setYearOptions(parseArray);
          return;
        }

        setYearOptions([]);
      });
  }, [insurer]);

  useEffect(() => {
    console.log(`🔍 Fetching insurers for year: ${year}`);
    axios
      .post(baseURLApi + '/insurer/get/insurer', { year })
      .then((response) => {
        const data = response.data;
        const list = data?.insurerList;
        console.log(
          `📊 API returned ${list?.length || 0} insurers for year ${year}`,
        );

        if (list) {
          const parseArray = list.map((item) => {
            return {
              name: item.name,
              code: item.code,
              countryCode: item?.countryCode,
              ...item,
            };
          });

          // Check specifically for "Total Canadian P&C" in the response
          const totalCanadian = parseArray.find(
            (ins) =>
              ins.name && ins.name.toLowerCase().includes('total canadian'),
          );

          // Also check for any variations of the name
          const totalCanadianVariations = parseArray.filter(
            (ins) =>
              ins.name &&
              (ins.name.toLowerCase().includes('total canadian') ||
                ins.name.toLowerCase().includes('total canadian p&c') ||
                ins.name.toLowerCase().includes('total canadian p and c')),
          );

          if (totalCanadian) {
            console.log(
              `✅ Found Total Canadian P&C for year ${year}:`,
              totalCanadian,
            );
            console.log(`🏷️ Company Code: ${totalCanadian.code}`);
            console.log(`🌍 Country Code: ${totalCanadian.countryCode}`);
          } else if (totalCanadianVariations.length > 0) {
            console.log(
              `🔍 Found variations for year ${year}:`,
              totalCanadianVariations,
            );
            totalCanadianVariations.forEach((variation, index) => {
              console.log(`Variation ${index + 1}:`, {
                name: variation.name,
                code: variation.code,
                countryCode: variation.countryCode,
              });
            });
          } else {
            console.log(`❌ Total Canadian P&C NOT found for year ${year}`);
            console.log(
              `Available insurers for ${year}:`,
              parseArray.map((ins) => ins.name),
            );
          }

          setInsurerOptions(parseArray);
          return;
        }

        console.log(`❌ No insurer list returned for year ${year}`);
        setInsurerOptions([]);
      })
      .catch((error) => {
        console.error(`🚨 Error fetching insurers for year ${year}:`, error);
        setInsurerOptions([]);
      });
  }, [year]);

  useEffect(() => {
    const filterInsurer = insurerOptions.filter(
      (item) => item?.name === insurer,
    );

    if (filterInsurer.length > 0) {
      const elemInsurer = filterInsurer[0];
      localStorage.setItem(
        'filters',
        JSON.stringify({ year, insurer: elemInsurer }),
      );
    }
  }, [year, insurer, insurerOptions]);

  const isFiltering: boolean = useMemo(() => {
    return !!(section && sheet && year && insurer);
  }, [section, sheet, year, insurer]);

  const handleResetFilters = () => {
    setYear('');
    setInsurer('');
    setSection('');
    setSheet('');
  };

  // Calculate insurer type based on selected insurer
  const insurerType = useMemo(() => {
    if (!insurer) {
      return null;
    }

    // First try exact match
    let selectedInsurer = insurerOptions.find((ins) => ins.name === insurer);

    // If no exact match, try finding by clean name (in case clean name was stored)
    if (!selectedInsurer) {
      selectedInsurer = insurerOptions.find((ins) => {
        const cleanName = ins.name.replace(/\s*\([A-Z0-9]+\)_[DF]$/, '');
        return cleanName === insurer;
      });
    }

    if (!selectedInsurer?.code) {
      return null;
    }

    // Check if name ends with _D (Domestic) or _F (Foreign)
    if (selectedInsurer.name.endsWith('_D')) {
      return 'Domestic Insurer';
    } else if (selectedInsurer.name.endsWith('_F')) {
      return 'Foreign Insurer';
    }
    return null;
  }, [insurer, insurerOptions]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 w-full max-w-full pt-2 pb-2 px-5 page-transition data-container flex flex-col overflow-hidden">
        <section className="mb-2 flex-shrink-0">
          <DataFilterSelector
            year={year}
            setYear={handleYearChange}
            insurer={insurer}
            setInsurer={handleInsurerChange}
            section={section}
            setSection={handleSectionChange}
            sheet={sheet}
            setSheet={handleSheetChange}
            availableSheets={availableSheets}
            sectionSheetsMapping={sectionSheetsMapping}
            availableSections={currentSections}
            yearOptions={yearOptions}
            insurerOptions={insurerOptions}
            onReset={handleResetFilters}
            isFiltering={isFiltering}
          />
        </section>

        <div className="flex-1 overflow-hidden">
          <DataVisualization
            section={section}
            sheet={sheet}
            availableSheets={availableSheets}
            insurerType={insurerType}
            year={year}
          />
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
