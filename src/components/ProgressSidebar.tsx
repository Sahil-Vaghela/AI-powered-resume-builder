import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Layout,
  FileText,
  Plus,
  PanelLeftClose,
  PanelLeft,
  X,
  MoreVertical,
  Pencil,
  Trash2,
  Check,
  FileSpreadsheet,
  Settings,
  User,
  Sparkles,
} from 'lucide-react';
import { ChatSession } from '../engine/storageEngine';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onNewResume: () => void;
  onSelectChat: () => void;
  onOpenTemplates: () => void;
  onOpenMyResumes: () => void;
  activeTab: 'chat' | 'templates' | 'resumes';
  hasResumeData: boolean;
  // Chat History Props
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChatSession: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ProgressSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onNewResume,
  onSelectChat,
  onOpenTemplates,
  onOpenMyResumes,
  activeTab,
  hasResumeData,
  chats,
  activeChatId,
  onSelectChatSession,
  onRenameChat,
  onDeleteChat,
}) => {
  // Menu state: which chat ID has its 3-dot dropdown open
  const [openMenuChatId, setOpenMenuChatId] = useState<string | null>(null);

  // Rename state
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState<string>('');

  // Delete confirmation state
  const [confirmDeleteChatId, setConfirmDeleteChatId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuChatId(null);
      }
    };
    if (openMenuChatId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuChatId]);

  const handleStartRename = (chat: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitleInput(chat.title);
    setOpenMenuChatId(null);
  };

  const handleSaveRename = (chatId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editTitleInput.trim()) {
      onRenameChat(chatId, editTitleInput.trim());
    }
    setEditingChatId(null);
    setEditTitleInput('');
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(null);
    setEditTitleInput('');
  };

  const handleTriggerDelete = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteChatId(chatId);
    setOpenMenuChatId(null);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteChatId) {
      onDeleteChat(confirmDeleteChatId);
      setConfirmDeleteChatId(null);
    }
  };

  const handleItemClick = (callback: () => void) => {
    callback();
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-white select-none relative">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header with Logo and Close/Collapse */}
        <div className="flex items-center justify-between mb-4 px-1 min-h-[44px] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DDF2E8] border border-[#087A50]/20 flex items-center justify-center text-[#087A50] font-bold text-xs shrink-0 shadow-xs">
              <FileSpreadsheet className="w-5 h-5 text-[#087A50]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base text-[#202923] tracking-tight truncate leading-tight">
                ResumeCraft
              </span>
              <span className="text-[10px] text-[#78847D] font-medium leading-none">
                AI Resume Builder
              </span>
            </div>
          </div>

          {/* Desktop/Tablet collapse button */}
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="hidden md:flex p-1.5 rounded-lg border border-[#E9EDE9] text-[#78847D] hover:text-[#202923] hover:bg-[#FAFAF8] cursor-pointer transition"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            title="Close menu"
            className="flex md:hidden p-1.5 rounded-lg border border-[#E9EDE9] text-[#78847D] hover:text-[#202923] hover:bg-[#FAFAF8] cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Emerald "New Chat" Button */}
        <button
          onClick={() => handleItemClick(onNewResume)}
          className="w-full min-h-[42px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#087A50] hover:bg-[#065F46] active:bg-[#054835] text-xs font-bold text-white mb-4 cursor-pointer transition shadow-xs active:scale-[0.99] shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Chat</span>
        </button>

        {/* Top Navigation Items */}
        <div className="space-y-1 shrink-0 mb-4">
          <button
            onClick={() => handleItemClick(onSelectChat)}
            className={`w-full min-h-[36px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#DDF2E8] text-[#087A50] font-bold'
                : 'text-[#4B5750] hover:bg-[#FAFAF8] hover:text-[#202923]'
            }`}
          >
            <MessageSquare className={`w-4 h-4 shrink-0 ${activeTab === 'chat' ? 'text-[#087A50]' : 'text-[#78847D]'}`} />
            <span className="truncate">Chat Assistant</span>
          </button>

          <button
            onClick={() => handleItemClick(onOpenTemplates)}
            className={`w-full min-h-[36px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-[#DDF2E8] text-[#087A50] font-bold'
                : 'text-[#4B5750] hover:bg-[#FAFAF8] hover:text-[#202923]'
            }`}
          >
            <Layout className={`w-4 h-4 shrink-0 ${activeTab === 'templates' ? 'text-[#087A50]' : 'text-[#78847D]'}`} />
            <span className="truncate">Resume Templates</span>
          </button>

          <button
            onClick={() => handleItemClick(onOpenMyResumes)}
            className={`w-full min-h-[36px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
              activeTab === 'resumes'
                ? 'bg-[#DDF2E8] text-[#087A50] font-bold'
                : 'text-[#4B5750] hover:bg-[#FAFAF8] hover:text-[#202923]'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <FileText className={`w-4 h-4 shrink-0 ${activeTab === 'resumes' ? 'text-[#087A50]' : 'text-[#78847D]'}`} />
              <span className="truncate">My Resumes</span>
            </div>
            {hasResumeData && (
              <span className="w-2 h-2 rounded-full bg-[#087A50] shrink-0" title="Active resume available" />
            )}
          </button>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 flex flex-col min-h-0 border-t border-[#E9EDE9] pt-3">
          <div className="flex items-center justify-between px-2 mb-2 shrink-0">
            <span className="text-[11px] font-bold text-[#78847D] uppercase tracking-wider">
              Recent Chats
            </span>
            <span className="text-[11px] text-[#78847D] font-medium tabular-nums">
              {chats.length}
            </span>
          </div>

          {/* Scrollable Chat History List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1 min-h-0">
            {chats.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#78847D] italic">
                No conversations yet
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = activeTab === 'chat' && activeChatId === chat.id;
                const isEditing = editingChatId === chat.id;

                if (isEditing) {
                  return (
                    <div
                      key={chat.id}
                      className="p-1.5 rounded-xl border border-[#087A50] bg-[#FAFAF8] flex items-center gap-1.5"
                    >
                      <input
                        type="text"
                        value={editTitleInput}
                        onChange={(e) => setEditTitleInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(chat.id);
                          if (e.key === 'Escape') setEditingChatId(null);
                        }}
                        autoFocus
                        className="flex-1 text-xs px-2 py-1 bg-transparent text-[#202923] focus:outline-none"
                      />
                      <button
                        onClick={() => handleSaveRename(chat.id)}
                        className="p-1 text-[#087A50] hover:opacity-80 cursor-pointer"
                        title="Save title"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleCancelRename}
                        className="p-1 text-[#78847D] hover:text-[#C77D86] cursor-pointer"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleItemClick(() => onSelectChatSession(chat.id))}
                    className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#DDF2E8] text-[#087A50] font-semibold border border-[#087A50]/20'
                        : 'text-[#4B5750] hover:bg-[#FAFAF8] hover:text-[#202923] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-1">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#087A50]' : 'text-[#78847D]'}`} />
                      <span className="truncate">{chat.title}</span>
                    </div>

                    {/* Three-Dot Menu Button */}
                    <div className="relative shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuChatId(openMenuChatId === chat.id ? null : chat.id);
                        }}
                        title="Chat options"
                        className={`p-1 rounded-md text-[#78847D] hover:text-[#202923] cursor-pointer transition ${
                          openMenuChatId === chat.id ? 'opacity-100 bg-white shadow-xs' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuChatId === chat.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-7 z-50 w-32 bg-white rounded-xl border border-[#E9EDE9] py-1 shadow-lg animate-fadeIn"
                        >
                          <button
                            onClick={(e) => handleStartRename(chat, e)}
                            className="w-full px-3 py-1.5 text-xs font-medium text-[#202923] hover:text-[#087A50] hover:bg-[#FAFAF8] flex items-center gap-2 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Rename</span>
                          </button>
                          <button
                            onClick={(e) => handleTriggerDelete(chat.id, e)}
                            className="w-full px-3 py-1.5 text-xs font-medium text-[#C77D86] hover:bg-[#FFF5F5] flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="pt-3 pb-1 safe-pb shrink-0 border-t border-[#E9EDE9] mt-2">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAFAF8] transition cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#087A50] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              S
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#202923] truncate leading-tight">
                Sahil
              </span>
              <span className="text-[10px] text-[#78847D] truncate leading-tight">
                heybudysahilincode@gmail.com
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDF2E8] text-[#087A50] font-bold shrink-0">
            Pro
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteChatId && (
        <div className="fixed inset-0 z-50 bg-[#202923]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full border border-[#E9EDE9] shadow-xl space-y-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#FFF1F2] text-[#C77D86] flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#202923]">Delete conversation?</h3>
              <p className="text-xs text-[#78847D] mt-1.5 leading-relaxed">
                Are you sure you want to delete this conversation? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmDeleteChatId(null)}
                className="flex-1 py-2 rounded-xl border border-[#E9EDE9] text-xs font-semibold text-[#4B5750] hover:bg-[#FAFAF8] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-[#C77D86] hover:bg-[#b56d76] text-white text-xs font-bold cursor-pointer transition shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#202923]/30 backdrop-blur-xs md:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* 2. Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[300px] max-w-[85vw] bg-white border-r border-[#E9EDE9] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>

      {/* 3. Desktop / Tablet In-Flow Sidebar */}
      {isCollapsed ? (
        <aside className="hidden md:flex w-16 h-full bg-white border-r border-[#E9EDE9] flex-col items-center py-4 select-none shrink-0 transition-all duration-200">
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="w-10 h-10 rounded-xl border border-[#E9EDE9] flex items-center justify-center text-[#78847D] hover:text-[#202923] hover:bg-[#FAFAF8] mb-5 cursor-pointer"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onNewResume}
            title="New Chat"
            className="w-10 h-10 rounded-xl bg-[#087A50] hover:bg-[#065F46] flex items-center justify-center text-white mb-4 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="space-y-2 flex flex-col items-center">
            <button
              onClick={onSelectChat}
              title="Chat Assistant"
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#DDF2E8] text-[#087A50]'
                  : 'text-[#78847D] hover:bg-[#FAFAF8] hover:text-[#202923]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTemplates}
              title="Resume Templates"
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                activeTab === 'templates'
                  ? 'bg-[#DDF2E8] text-[#087A50]'
                  : 'text-[#78847D] hover:bg-[#FAFAF8] hover:text-[#202923]'
              }`}
            >
              <Layout className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenMyResumes}
              title="My Resumes"
              className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                activeTab === 'resumes'
                  ? 'bg-[#DDF2E8] text-[#087A50]'
                  : 'text-[#78847D] hover:bg-[#FAFAF8] hover:text-[#202923]'
              }`}
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </aside>
      ) : (
        <aside className="hidden md:flex md:w-[280px] lg:w-[300px] xl:w-[320px] h-full bg-white border-r border-[#E9EDE9] flex-col select-none shrink-0 transition-all duration-200 overflow-hidden">
          {navContent}
        </aside>
      )}
    </>
  );
};
