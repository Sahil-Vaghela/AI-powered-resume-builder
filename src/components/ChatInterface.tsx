import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  Layout,
  FileText,
  FilePlus2,
  Lightbulb,
  Eye,
  PanelLeft,
} from 'lucide-react';
import { ChatMessageItem } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage } from '../engine/conversationEngine';
import { QuestionDef } from '../engine/questionEngine';
import { ResumeData } from '../engine/resumeEngine';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  currentQuestion: QuestionDef;
  resume: ResumeData;
  isTyping: boolean;
  onAnswer: (answer: any) => void;
  onSkip: () => void;
  onPrevious?: () => void;
  onEditMessage: (message: ChatMessage) => void;
  onOpenTemplates: () => void;
  onOpenPreview: () => void;
  onStartNewResume: () => void;
  onContinuePrevious: () => void;
  hasStarted: boolean;
  setHasStarted: (val: boolean) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  currentQuestion,
  resume,
  isTyping,
  onAnswer,
  onSkip,
  onPrevious,
  onEditMessage,
  onOpenTemplates,
  onOpenPreview,
  onStartNewResume,
  onContinuePrevious,
  hasStarted,
  setHasStarted,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasStarted) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, currentQuestion.id, hasStarted]);

  // Handler for action cards
  const handleActionClick = (action: string) => {
    if (action === 'new') {
      onStartNewResume();
      setHasStarted(true);
    } else if (action === 'templates') {
      onOpenTemplates();
    } else if (action === 'continue') {
      onContinuePrevious();
      setHasStarted(true);
    } else if (action === 'tips') {
      setHasStarted(true);
      onAnswer("Tell me the top ATS resume tips to get interviews");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#E9EAF2] overflow-hidden relative">
      {/* Top Header: Simple header with ResumeCraft Assistant and Templates button */}
      <header className="h-16 px-6 border-b border-[#C8CAD4]/30 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          {isSidebarCollapsed && (
            <button
              onClick={onToggleSidebar}
              title="Expand sidebar"
              className="p-2 rounded-xl neu-button-secondary text-[#7E8494] hover:text-[#34364A] cursor-pointer"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-sm font-bold text-[#34364A] tracking-tight">
            ResumeCraft Assistant
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {hasStarted && (
            <button
              onClick={onOpenPreview}
              title="View full resume document"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl neu-button-secondary text-[#34364A] hover:text-[#7776B8] flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#7776B8]" />
              <span>View Resume</span>
            </button>
          )}

          <button
            onClick={onOpenTemplates}
            title="Browse resume templates"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-xl neu-button-secondary text-[#34364A] hover:text-[#7776B8] flex items-center gap-1.5 cursor-pointer"
          >
            <Layout className="w-3.5 h-3.5 text-[#7776B8]" />
            <span>Templates</span>
          </button>
        </div>
      </header>

      {/* Main Center Area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {!hasStarted ? (
          /* Welcome Screen (ChatGPT-style center view) */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto my-auto animate-fadeIn select-none">
            {/* Logo Icon */}
            <div className="w-16 h-16 rounded-2xl neu-raised flex items-center justify-center text-[#7776B8] font-black text-2xl mb-6 shadow-sm">
              RC
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#34364A] tracking-tight mb-2">
              How can I help you build your resume today?
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[#7E8494] max-w-lg mb-8 leading-relaxed font-normal">
              A guided, step-by-step conversation to create your professional resume.
            </p>

            {/* Four Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              <button
                onClick={() => handleActionClick('new')}
                className="p-4 rounded-2xl neu-raised hover:neu-raised-hover active:neu-pressed text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl neu-inset text-[#7776B8] flex items-center justify-center">
                    <FilePlus2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#34364A] group-hover:text-[#7776B8]">
                    Create a New Resume
                  </span>
                </div>
                <p className="text-xs text-[#7E8494] pl-10 leading-snug">
                  Start fresh with guided questions tailored to your experience.
                </p>
              </button>

              <button
                onClick={() => handleActionClick('templates')}
                className="p-4 rounded-2xl neu-raised hover:neu-raised-hover active:neu-pressed text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl neu-inset text-[#7776B8] flex items-center justify-center">
                    <Layout className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#34364A] group-hover:text-[#7776B8]">
                    Browse Templates
                  </span>
                </div>
                <p className="text-xs text-[#7E8494] pl-10 leading-snug">
                  Explore 6 modern, ATS-friendly document formats.
                </p>
              </button>

              <button
                onClick={() => handleActionClick('continue')}
                className="p-4 rounded-2xl neu-raised hover:neu-raised-hover active:neu-pressed text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl neu-inset text-[#7776B8] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#34364A] group-hover:text-[#7776B8]">
                    Continue Previous Resume
                  </span>
                </div>
                <p className="text-xs text-[#7E8494] pl-10 leading-snug">
                  Resume from where you left off or inspect existing data.
                </p>
              </button>

              <button
                onClick={() => handleActionClick('tips')}
                className="p-4 rounded-2xl neu-raised hover:neu-raised-hover active:neu-pressed text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl neu-inset text-[#7776B8] flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#34364A] group-hover:text-[#7776B8]">
                    Resume Tips
                  </span>
                </div>
                <p className="text-xs text-[#7E8494] pl-10 leading-snug">
                  Action verbs, keywords, and recruiter-approved formatting advice.
                </p>
              </button>
            </div>
          </div>
        ) : (
          /* Chat Mode: Conversation Messages with comfortable spacing */
          <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} onEdit={onEditMessage} />
            ))}

            {/* Current Active Bot Question */}
            {!isTyping && currentQuestion && (
              <div className="flex items-start gap-3 my-3 justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-xl neu-raised text-[#7776B8] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold">RC</span>
                </div>

                <div className="max-w-[85%] sm:max-w-[78%] flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-bold text-[#7E8494] uppercase tracking-wider">
                      ResumeCraft
                    </span>
                  </div>

                  <div className="px-4 py-3 rounded-2xl neu-raised text-xs sm:text-sm leading-relaxed text-[#34364A]">
                    <div className="font-semibold whitespace-pre-line text-[#34364A]">
                      {currentQuestion.question}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#7E8494] py-2 animate-fadeIn">
                <div className="w-7 h-7 rounded-xl neu-raised text-[#7776B8] flex items-center justify-center text-xs font-bold">
                  RC
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl neu-inset">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7776B8] animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#7776B8] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#7776B8] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Chat Input Fixed at Bottom */}
      <div className="shrink-0">
        <ChatInput
          question={hasStarted ? currentQuestion : undefined}
          resume={resume}
          onSubmit={(answer) => {
            if (!hasStarted) {
              setHasStarted(true);
            }
            onAnswer(answer);
          }}
          onSkip={hasStarted && currentQuestion?.skipAllowed ? onSkip : undefined}
          onPrevious={hasStarted ? onPrevious : undefined}
          isSubmitting={isTyping}
        />
      </div>
    </div>
  );
};
