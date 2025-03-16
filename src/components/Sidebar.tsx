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

export default function Sidebar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLoginClick = () => setShowLoginForm(true);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {!isCollapsed && <CollapseButton toggleSidebar={toggleSidebar} />}
      <aside
        className={`fixed md:relative z-40 flex flex-col h-screen bg-[#202222] p-4 transition-all duration-300 ${
          isCollapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "translate-x-0 w-64"
        } md:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 block md:hidden"
          onClick={toggleSidebar}
        >
          <X size={24} className="text-white" />
        </button>

        <div className="mb-8">
          {isCollapsed ? (
            <img
              src="/perplexity_brand/collapsed.png"
              alt="Perplexity"
              className="h-8 mx-auto"
            />
          ) : (
            <img
              src="/perplexity_brand/perplexity_sidebar_full_logo.png"
              alt="Perplexity"
              className="h-8"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 text-left hover:bg-[#2a2a2a] px-2 py-2 rounded">
            <Home size={18} /> {isCollapsed ? "" : "Home"}
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-[#2a2a2a] px-2 py-2 rounded">
            <Compass size={18} /> {isCollapsed ? "" : "Discover"}
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-[#2a2a2a] px-2 py-2 rounded">
            <Layout size={18} /> {isCollapsed ? "" : "Spaces"}
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-[#2a2a2a] px-2 py-2 rounded">
            <BookOpen size={18} /> {isCollapsed ? "" : "Library"}
          </button>
        </nav>

        {/* Auth Buttons */}
        {!isCollapsed && <div className="mt-auto flex flex-col gap-2">
          <button className="bg-blue-600 py-2 rounded hover:bg-blue-500" onClick={handleLoginClick}>
            Sign Up
          </button>
          <button
            className="flex items-center justify-center gap-2 border border-white/[0.2] py-2 rounded hover:bg-[#2a2a2a]"
            onClick={handleLoginClick}
          >
            <LogIn size={18} /> Log in
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
          className="fixed bottom-40 left-5 z-50"
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
          className="fixed top-4 left-55 z-50"
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