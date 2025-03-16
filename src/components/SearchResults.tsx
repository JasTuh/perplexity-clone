"use client";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  results: any[];
  aiSummary?: string;
  loading: boolean;
  hasSearched: boolean;
  query: string;
}

export default function SearchResults({ 
  results, 
  aiSummary = "",
  loading, 
  hasSearched, 
  query 
}: SearchResultsProps) {
  return (
    <>
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="text-gray-400 mt-2">Searching...</p>
        </div>
      )}

      {!loading && aiSummary && (
        <div className="mt-4 bg-[#2b2b2b] rounded-lg p-4 border border-[#3a3a3a] mb-4">
          <h3 className="text-lg font-medium text-white mb-2">AI Summary</h3>
          <div className="text-gray-200 text-sm whitespace-pre-line">
            {aiSummary}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 bg-[#2b2b2b] rounded-lg p-4 border border-[#3a3a3a]">
          <h3 className="text-lg font-medium text-white mb-2">Search Results</h3>
          {results.map((result, index) => (
            <SearchResultItem 
              key={index}
              title={result.title}
              snippet={result.snippet}
              link={result.link}
            />
          ))}
        </div>
      )}

      {!loading && hasSearched && results.length === 0 && query.trim() !== "" && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">No results found</p>
        </div>
      )}
    </>
  );
} 