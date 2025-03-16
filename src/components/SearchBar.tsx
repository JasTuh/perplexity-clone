"use client";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: () => void;
  resetTrigger?: number; // A value that changes when reset is needed
}

export default function SearchBar({ onSearch, resetTrigger = 0 }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Reset search when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setQuery("");
      setResults([]);
      setLoading(false);
      setHasSearched(false);
    }
  }, [resetTrigger]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);
    onSearch();
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Ask anything..."
          className="w-full bg-[#2b2b2b] px-6 py-4 rounded-full placeholder-gray-400 outline-none border border-transparent focus:border-[#3a3a3a] transition-colors text-lg"
          spellCheck={false}
          data-ms-editor="true"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSearch}
          disabled={!query.trim()}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
            query.trim() ? 'text-blue-400 hover:bg-[#3a3a3a]' : 'text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
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

      {loading && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">Searching...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 bg-[#2b2b2b] rounded-lg p-4 border border-[#3a3a3a]">
          {results.map((result, index) => (
            <div key={index} className="border-b border-[#3a3a3a] py-3 last:border-0">
              <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {result.title}
              </a>
              <p className="text-gray-300 text-sm mt-1">{result.snippet}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && hasSearched && results.length === 0 && query.trim() !== "" && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">No results found</p>
        </div>
      )}
    </div>
  );
} 