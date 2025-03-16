"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import SearchResults from "@/components/SearchResults";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resetTrigger?: number; // A value that changes when reset is needed
  initialQuery?: string; // Initial query value
  compact?: boolean; // Whether to show a compact version
  showResultsInline?: boolean; // Whether to show results inline with the search bar
}

const SearchBar = forwardRef<
  { handleSearch: (query: string) => void },
  SearchBarProps
>(({ 
  onSearch, 
  resetTrigger = 0, 
  initialQuery = "", 
  compact = false,
  showResultsInline = true
}, ref) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Expose handleSearch method to parent components
  useImperativeHandle(ref, () => ({
    handleSearch: (searchQuery: string) => {
      setQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }));

  // Run search when initialQuery changes or component mounts with initialQuery
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== "") {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]); // Don't include query in dependency array to avoid loops

  useEffect(() => {
    if (resetTrigger > 0) {
      setQuery("");
      setResults([]);
      setAiSummary("");
      setLoading(false);
      setHasSearched(false);
    }
  }, [resetTrigger]);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery || searchQuery.trim() === "") return;
    
    // Clear previous results and set loading state
    setResults([]);
    setAiSummary("");
    setLoading(true);
    setHasSearched(true);
    onSearch(searchQuery);
    
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!res.ok) {
        throw new Error(`Search request failed with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Search results:", data);
      
      if (data.searchResults) {
        setResults(data.searchResults);
      }
      
      if (data.aiSummary) {
        setAiSummary(data.aiSummary);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex flex-col w-full ${compact ? 'max-w-full' : 'max-w-3xl'}`}>
      {(
        <div className="w-full max-w-3xl mb-80">
          <SearchResults 
            results={results}
            aiSummary={aiSummary}
            loading={loading}
            hasSearched={hasSearched}
            query={query}
          />
        </div>
      )}

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Ask anything..."
          className={`w-full bg-[#2b2b2b] px-6 ${compact ? 'py-3' : 'py-4'} rounded-full placeholder-gray-400 outline-none border border-transparent focus:border-[#3a3a3a] transition-colors ${compact ? 'text-base' : 'text-lg'}`}
          spellCheck={false}
          data-ms-editor="true"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={() => handleSearch()}
          disabled={!query.trim()}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
            query.trim() ? 'text-blue-400 hover:bg-[#3a3a3a]' : 'text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={compact ? "18" : "22"} 
            height={compact ? "18" : "22"} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar; 