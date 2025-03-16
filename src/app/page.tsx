import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import TopicSuggestions from "@/components/TopicSuggestions";

export default function Home() {
  return (
    <div className="flex min-h-screen text-white bg-[#181818] relative">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-16 sm:pt-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">
          What do you want to know?
        </h1>
        <SearchBar />
        <TopicSuggestions />
      </main>
    </div>
  );
}