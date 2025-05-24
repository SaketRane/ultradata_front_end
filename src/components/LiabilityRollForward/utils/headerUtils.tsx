
import React from "react";
import { Sheet2012Header } from "../headers/Sheet2012Header";
import { Sheet2014Header } from "../headers/Sheet2014Header";

export const getCustomHeader = (sheetCode: string): React.ReactNode => {
  switch (sheetCode) {
    case "2012":
      return <Sheet2012Header />;
    case "2014":
      return <Sheet2014Header />;
    default:
      return null;
  }
};
