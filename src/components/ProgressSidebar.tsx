import React from 'react';
import {
  MessageSquare,
  Layout,
  FileText,
  Plus,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewResume: () => void;
  onSelectChat: () => void;
  onOpenTemplates: () => void;
  onOpenMyResumes: () => void;
  activeTab: 'chat' | 'templates' | 'resumes';
  hasResumeData: boolean;
}

export const ProgressSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onNewResume,
  onSelectChat,
  onOpenTemplates,
  onOpenMyResumes,
  activeTab,
  hasResumeData,
}) => {
  if (isCollapsed) {
    return (
      <aside className="w-16 h-full bg-[#E9EAF2] border-r border-[#C8CAD4]/40 flex flex-col items-center py-4 select-none shrink-0 transition-all duration-200">
        <button
          onClick={onToggleCollapse}
          title="Expand sidebar"
          className="w-10 h-10 rounded-xl neu-button-secondary flex items-center justify-center text-[#34364A] hover:text-[#7776B8] mb-6 cursor-pointer"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onNewResume}
          title="New Resume"
          className="w-10 h-10 rounded-xl neu-button-primary flex items-center justify-center text-white mb-4 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="space-y-3 flex flex-col items-center">
          <button
            onClick={onSelectChat}
            title="Chat with ResumeCraft"
            className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
              activeTab === 'chat'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-button-secondary text-[#7E8494] hover:text-[#34364A]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTemplates}
            title="Resume Templates"
            className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
              activeTab === 'templates'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-button-secondary text-[#7E8494] hover:text-[#34364A]'
            }`}
          >
            <Layout className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMyResumes}
            title="My Resumes"
            className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
              activeTab === 'resumes'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-button-secondary text-[#7E8494] hover:text-[#34364A]'
            }`}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 h-full bg-[#E9EAF2] border-r border-[#C8CAD4]/40 flex flex-col justify-between p-4 select-none shrink-0 transition-all duration-200">
      <div>
        {/* Top Header with Logo and Collapse Button */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl neu-raised flex items-center justify-center text-[#7776B8] font-bold text-xs">
              RC
            </div>
            <span className="font-bold text-base text-[#34364A] tracking-tight">
              ResumeCraft
            </span>
          </div>

          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="p-2 rounded-xl neu-button-secondary text-[#7E8494] hover:text-[#34364A] cursor-pointer"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* New Resume Button */}
        <button
          onClick={onNewResume}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl neu-button-primary text-xs font-semibold text-white mb-6 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Resume</span>
        </button>

        {/* Clean Navigation Items */}
        <div className="space-y-2">
          <button
            onClick={onSelectChat}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-subtle text-[#34364A] hover:text-[#7776B8]'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Chat with ResumeCraft</span>
          </button>

          <button
            onClick={onOpenTemplates}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-subtle text-[#34364A] hover:text-[#7776B8]'
            }`}
          >
            <Layout className="w-4 h-4 shrink-0" />
            <span>Resume Templates</span>
          </button>

          <button
            onClick={onOpenMyResumes}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'resumes'
                ? 'neu-pressed text-[#7776B8]'
                : 'neu-subtle text-[#34364A] hover:text-[#7776B8]'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 shrink-0" />
              <span>My Resumes</span>
            </div>
            {hasResumeData && (
              <span className="w-2 h-2 rounded-full bg-[#6D9B83]" title="Active resume available" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle footer */}
      <div className="px-2 text-[11px] text-[#7E8494] font-medium">
        <span>ResumeCraft v2.0 • Soft UI</span>
      </div>
    </aside>
  );
};
