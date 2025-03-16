"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import TopicSuggestions from "@/components/TopicSuggestions";

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [__, setSearchResults] = useState<any[]>([]);
  const [_, setAiSummary] = useState("");

  // Function to reset the search state
  const resetSearch = () => {
    setHasSearched(false);
    setSearchQuery("");
    setSearchResults([]);
    setAiSummary("");
    setResetTrigger(prev => prev + 1); // Increment to trigger the useEffect in SearchBar
  };

  return (
    <div className="flex min-h-screen text-white bg-[#191A1A] relative">
      <Sidebar onNavigate={resetSearch} />

      {!hasSearched ? (
        // Landing page view with centered search bar
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-semibold text-center">
              What do you want to know?
            </h1>
            <SearchBar 
              onSearch={(query) => {
                setHasSearched(true);
                setSearchQuery(query);
              }} 
              resetTrigger={resetTrigger}
            />
            <div className="mt-8">
              <TopicSuggestions onTopicSelect={(topic) => {
                setHasSearched(true);
                setSearchQuery(topic);
              }} />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col px-4 py-8 pt-16 sm:pt-8">
          <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
              <h2 className="text-2xl font-medium mb-4">Results for "{searchQuery}"</h2>
            <div className="mt-auto mb-8 w-full">
              <SearchBar 
                onSearch={(query) => {
                  setSearchQuery(query);
                }} 
                resetTrigger={resetTrigger}
                initialQuery={searchQuery}
                compact={true}
                showResultsInline={false}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}