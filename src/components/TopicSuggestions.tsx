"use client";

interface TopicSuggestionsProps {
  onTopicSelect: (topic: string) => void;
}

export default function TopicSuggestions({ onTopicSelect }: TopicSuggestionsProps) {
  const topics = [
    "Manus AI Claims",
    "Autonomous Agents",
    "Anthropic's Blind Audit Game",
    "Bitcoin",
    "NVDA"
  ];

  return (
    <div className="mt-6 flex gap-4 flex-wrap justify-center">
      {topics.map((topic, index) => (
        <div 
          key={index} 
          className="bg-[#2b2b2b] px-4 py-2 rounded-md hover:bg-[#333] cursor-pointer transition-colors"
          onClick={() => onTopicSelect(topic)}
        >
          {topic}
        </div>
      ))}
    </div>
  );
} 