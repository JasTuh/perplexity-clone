"use client"
import { Home, Compass, Layout, BookOpen, LogIn, Menu, X, ArrowLeft, ArrowRight} from "lucide-react";
import { LoginForm } from "@/components/login-form"
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLoginClick = () => setShowLoginForm(true);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <>
      {!isCollapsed && <CollapseButton toggleSidebar={toggleSidebar} />}
      <aside
        className={`fixed md:relative z-40 flex flex-col h-screen bg-[#202222] p-4 transition-all duration-300 ${
          isCollapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "translate-x-0 w-64"
        } md:translate-x-0`}
      >

        <div className="mb-6 flex">
          {isCollapsed ? (
            <div className="w-10 h-10 flex items-center justify-center ml-1">
              <img
                src="/perplexity_brand/collapsed.png"
                alt="Perplexity"
                className="max-h-full max-w-full object-contain cursor-pointer"
                onClick={handleClick}
              />
            </div>
          ) : (
            <img
              src="/perplexity_brand/perplexity_sidebar_full_logo.png"
              alt="Perplexity"
              className="h-10 cursor-pointer"
              onClick={handleClick}
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 text-left hover:bg-[#2a2a2a] px-3 py-2 rounded-md" onClick={handleClick}>
            <Home size={isCollapsed ? 24 : 20} className="min-w-5" /> {isCollapsed ? "" : "Home"}
          </button>
          <button className="flex items-center gap-3 text-left hover:bg-[#2a2a2a] px-3 py-2 rounded-md" onClick={handleClick}>
            <Compass size={isCollapsed ? 24 : 20} className="min-w-5" /> {isCollapsed ? "" : "Discover"}
          </button>
          <button className="flex items-center gap-3 text-left hover:bg-[#2a2a2a] px-3 py-2 rounded-md" onClick={handleClick}>
            <Layout size={isCollapsed ? 24 : 20} className="min-w-5" /> {isCollapsed ? "" : "Spaces"}
          </button>
          <button className="flex items-center gap-3 text-left hover:bg-[#2a2a2a] px-3 py-2 rounded-md" onClick={handleClick}>
            <BookOpen size={isCollapsed ? 24 : 20} className="min-w-5" /> {isCollapsed ? "" : "Library"}
          </button>
        </nav>

        {/* Auth Buttons */}
        {!isCollapsed && <div className="mt-auto flex flex-col gap-2">
          <button className="bg-[#4CC9F0] text-black font-medium py-2 rounded-md hover:bg-[#3DBAE0]" onClick={handleLoginClick}>
            Sign Up
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-[#2a2a2a] py-2 rounded-md hover:bg-[#333]"
            onClick={handleLoginClick}
          >
            Log in
          </button>
        </div>}
      </aside>

      {isCollapsed && (
        <ExpandButton toggleSidebar={toggleSidebar} />
      )}

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
            <button
              className="ml-auto block text-gray-400 hover:text-white mb-4"
              onClick={() => setShowLoginForm(false)}
            >
              Close
            </button>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}

const ExpandButton = ({toggleSidebar}: {toggleSidebar: () => void}) => ( 
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild> 
        <button
          className="fixed bottom-40 left-5 z-50 p-2 bg-[#2a2a2a] rounded-full hover:bg-[#333]"
          onClick={toggleSidebar}
        >
          <ArrowRight size={24} className="text-white" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Expand</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider> 
)

const CollapseButton = ({toggleSidebar}: {toggleSidebar: () => void}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="fixed top-4 left-50 z-50 p-2 bg-[#2a2a2a] rounded-full hover:bg-[#333]"
          onClick={toggleSidebar}
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Collapse</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)