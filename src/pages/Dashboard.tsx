import axios from 'axios'
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import DataFilterSelector from "@/components/DataFilterSelector";
import DataVisualization from "@/components/DataVisualization";
import { sectionSheetsMapping } from "@/constants/sectionSheets";
import { apiClient } from "@/integrations/database/client";

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<string>("");
  const [insurer, setInsurer] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [sheet, setSheet] = useState<string>("");

  const [yearOptions, setYearOptions] = useState([]);
    const [insurerOptions, setInsurerOptions] = useState([]);

  const availableSections = useMemo(() => [
    "Financial Statements",
    "Investments",
    "Insurance Results & Onerous Contracts",
    "Provincial Stats",
    "Commissions & Expenses",
    "Reinsurance"
  ], []);

  const availableSheets = useMemo(() => {
    if (!section) return [];
    
    const ifrs17Sheets = [
      "2010", "2011", "2012", "2014", "2016", "2018", "2022", "2041", "2042", "2045", "2054",
      "4008", "6025", "6080", "6740", "6750", "6760", "6770", "8015", "8025", "7050", "7060"
    ];
    
    return sectionSheetsMapping[section]?.sheets.filter(
      sheet => ifrs17Sheets.includes(sheet.code)
    ) || [];
  }, [section]);

  const handleYearChange = useCallback((value: string) => {
    setYear(value);
    setSection("");
    setSheet("");
  }, []);
  
  const handleInsurerChange = useCallback((value: string) => setInsurer(value), []);
  
  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
    setSheet("");
  }, []);
  
  const handleSheetChange = useCallback((value: string) => setSheet(value), []);

  useEffect(() => {
    document.title = "UltraData | Dashboard";
  }, []);

  // useEffect(() => {
  //   apiClient.post('/insurer/get/insurer', {year: 2024}).then((response) => {
  //     console.log(response)
  //   })
  // }, [])

  useEffect(() => {
    axios.post('http://194.163.164.118:8094/api/insurer/get/year', {}).then((response) => {
      const data = response.data;
      const list = data?.yearList;
      

      if(list) {
        const parseArray = list.map((item) => {
          return {
            value: item.year,
            label: item.year,
          }
        })
        setYearOptions(parseArray);
        return;
      }

      setYearOptions([])
    })
  }, [])

  useEffect(() => {
   if(year) {
     axios.post('http://194.163.164.118:8094/api/insurer/get/insurer', {year}).then((response) => {
      const data = response.data;
      const list = data?.insurerList;
      

      if(list) {
        const parseArray = list.map((item) => {
          return {
            name: item.name,
            code: item.code,
            countryCode: item?.countryCode,
          }
        })
        setInsurerOptions(parseArray);
        return;
      }

      setInsurerOptions([])
    })
   }
  }, [year])


  useEffect(() => {
    const filterInsurer = insurerOptions.filter((item) => item?.name === insurer);

    if(filterInsurer.length > 0) {
      const elemInsurer = filterInsurer[0];
      localStorage.setItem('filters', JSON.stringify({year, insurer: elemInsurer}))
    }
  }, [year, insurer,insurerOptions])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 w-full max-w-full py-4 px-1 page-transition data-container">
        <section className="mb-3">
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
            availableSections={availableSections}
            yearOptions={yearOptions}
            insurerOptions={insurerOptions}
          />
        </section>
        
        <DataVisualization 
          section={section}
          sheet={sheet}
          availableSheets={availableSheets}
        />
      </main>
      
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
