"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import TopicSuggestions from "@/components/TopicSuggestions";

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Function to reset the search state
  const resetSearch = () => {
    setHasSearched(false);
    setResetTrigger(prev => prev + 1); // Increment to trigger the useEffect in SearchBar
  };

  return (
    <div className="flex min-h-screen text-white bg-[#191A1A] relative">
      <Sidebar onNavigate={resetSearch} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-16 sm:pt-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">
          What do you want to know?
        </h1>
        <SearchBar 
          onSearch={() => setHasSearched(true)} 
          resetTrigger={resetTrigger}
        />
        
        {!hasSearched && <TopicSuggestions />}
      </main>
    </div>
  );
}