import React, { createContext, useContext, useState, useEffect } from "react";

interface DataContextType {
  insurers: string[];
  years: number[];
  sections: string[];
  sheets: Record<string, string[]>;
  selectedInsurer: string | null;
  selectedYear: number | null;
  selectedSection: string | null;
  selectedSheet: string | null;
  setSelectedInsurer: (insurer: string | null) => void;
  setSelectedYear: (year: number | null) => void;
  setSelectedSection: (section: string | null) => void;
  setSelectedSheet: (sheet: string | null) => void;
  dataIsLoading: boolean;
  dataPoints: any[];
  fetchDataPoints: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialContext: DataContextType = {
  insurers: [],
  years: [],
  sections: [],
  sheets: {},
  selectedInsurer: null,
  selectedYear: null,
  selectedSection: null,
  selectedSheet: null,
  setSelectedInsurer: () => {},
  setSelectedYear: () => {},
  setSelectedSection: () => {},
  setSelectedSheet: () => {},
  dataIsLoading: false,
  dataPoints: [],
  fetchDataPoints: async () => {},
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insurer, setInsurer] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [dataPoints, setDataPoints] = useState<any[]>([]);

  const [insurers, setInsurers] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [sheets, setSheets] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Mock data loading
    setInsurers(["Insurer A", "Insurer B", "Insurer C"]);
    setYears([2020, 2021, 2022, 2023]);
    setSections(["Section 1", "Section 2", "Section 3"]);
    setSheets({
      "Section 1": ["Sheet 1A", "Sheet 1B"],
      "Section 2": ["Sheet 2A", "Sheet 2B"],
      "Section 3": ["Sheet 3A", "Sheet 3B"],
    });
  }, []);

  const setSelectedYear = (year: number | null) => {
    setYear(year);
  };

  const setSelectedInsurer = (insurer: string | null) => {
    setInsurer(insurer);
  };

  const setSelectedSection = (section: string | null) => {
    setSection(section);
  };

  const setSelectedSheet = (sheet: string | null) => {
    setSheet(sheet);
  };

  const fetchDataPoints = async () => {
    setDataIsLoading(true);
    // Mock data loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDataPoints([
      { id: 1, value: Math.random() * 100 },
      { id: 2, value: Math.random() * 100 },
      { id: 3, value: Math.random() * 100 },
    ]);
    setDataIsLoading(false);
  };

  const value: DataContextType = {
    insurers,
    years,
    sections,
    sheets,
    selectedInsurer: insurer,
    selectedYear: year,
    selectedSection: section,
    selectedSheet: sheet,
    setSelectedInsurer,
    setSelectedYear,
    setSelectedSection,
    setSelectedSheet,
    dataIsLoading,
    dataPoints,
    fetchDataPoints,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
