"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);

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
    <div className="flex flex-col w-full max-w-xl">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Ask anything..."
          className="w-full bg-[#2b2b2b] px-4 py-3 rounded-full placeholder-gray-400 outline-none border border-transparent focus:border-[#3a3a3a] transition-colors"
          spellCheck={false}
          data-ms-editor="true"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="absolute right-3 top-[50%] -translate-y-1/2 px-3 py-1 bg-[#2b2b2b] rounded text-sm border border-white/10 hover:bg-[#3a3a3a]"
          onClick={handleSearch}
        >
          Auto
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