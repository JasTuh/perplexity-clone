"use client";

interface SearchResultItemProps {
  title: string;
  snippet: string;
  link: string;
}

export default function SearchResultItem({ title, snippet, link }: SearchResultItemProps) {
  return (
    <div className="border-b border-[#3a3a3a] py-3 last:border-0">
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-400 hover:text-blue-300 font-medium"
      >
        {title}
      </a>
      <p className="text-gray-300 text-sm mt-1">{snippet}</p>
    </div>
  );
} 