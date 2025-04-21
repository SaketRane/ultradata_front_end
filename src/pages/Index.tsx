
import React, { useEffect, useState, useRef } from "react";
import { PageLayout } from "@/components/Layout/PageLayout";
import { useNavigate } from "react-router-dom";

const IndexHeader: React.FC = () => (
  <header className="container mx-auto py-8 flex justify-between items-center">
    <div className="text-3xl font-bold text-center flex-grow">Welcome!</div>
    <Dropdown />
  </header>
);

// Dropdown component for navigation
const Dropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Navigate
        <svg
          className="w-4 h-4 ml-2 -mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            <li>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleNavigate("/dashboard")}
              >
                Dashboard
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const IndexContent: React.FC = () => (
  <main className="flex-1 flex items-center justify-center p-6">
    <div className="w-full max-w-md text-center text-lg">
      Login & signup are currently disabled. Use the dropdowns on /dashboard to build your
      application.
    </div>
  </main>
);

/**
 * Index page component serving as the entry point of the application
 */
const Index: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | App";
  }, []);

  return (
    <PageLayout
      header={<IndexHeader />}
      content={<IndexContent />}
      footer={
        <footer className="container mx-auto py-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} UltraData. All rights reserved.</p>
        </footer>
      }
      bgClass="bg-gradient-to-br from-blue-50 to-indigo-50"
    />
  );
};

export default Index;

