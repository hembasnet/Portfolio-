import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectById?: (id: string) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestedAction?: {
    label: string;
    projectId?: string;
  };
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProjectById,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I am Sidil's portfolio AI assistant. Ask me anything regarding Sidil's expertise in NLP, Computer Vision, MLOps, or specific production benchmarks.",
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How did Sidil reduce RAG latency to 42ms?',
    'Explain the 120 FPS edge Vision Transformer setup',
    'What is Sidil\'s experience with PyTorch and CUDA?',
    'What roles is Sidil open to hiring for?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let suggestedAction: Message['suggestedAction'] | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('rag') || lower.includes('latency') || lower.includes('42ms') || lower.includes('neurolex')) {
        reply =
          'In the NeuroLex project at Nexus AI Labs, Sidil solved the 3.2s enterprise retrieval latency bottleneck by implementing a dual-stage architecture. He decoupled sparse token drafting from late-interaction cross-encoders (ColBERTv2 + Qdrant), paired with asynchronous speculative decoding in vLLM. This slashed P95 latency down to 42ms while dropping hallucinations by 64%.';
        suggestedAction = { label: 'Inspect NeuroLex Case Study', projectId: 'neurolex-multilingual-rag' };
      } else if (lower.includes('vision') || lower.includes('120 fps') || lower.includes('defect') || lower.includes('cv')) {
        reply =
          'At VisionCraft Systems, Sidil engineered an edge optical defect inspection system sustaining 120 FPS on embedded NVIDIA Jetson Orin 45W hardware. He used progressive knowledge distillation to compress a Vision Transformer down to INT8 via TensorRT, coupled with zero-copy pinned memory in CUDA C++ and synthetic diffusion augmentation for rare micro-fractures.';
        suggestedAction = { label: 'Inspect OmniVision Case Study', projectId: 'omnivision-edge-defect' };
      } else if (lower.includes('cuda') || lower.includes('pytorch') || lower.includes('stack') || lower.includes('code')) {
        reply =
          'Sidil has 5+ years of production experience in PyTorch, CUDA C++, and Triton. He writes custom CUDA kernels for zero-copy memory ingestion, fast NMS, and KV cache eviction, and has orchestrated multi-node distributed training using DeepSpeed ZeRO-3 and Ray on clusters up to 128 GPUs.';
      } else if (lower.includes('hire') || lower.includes('role') || lower.includes('contact') || lower.includes('salary') || lower.includes('available')) {
        reply =
          'Sidil is actively open to Senior / Staff AI Engineer roles, Machine Learning Tech Lead positions, and selective high-impact consulting in foundation models and edge perception. You can reach him directly at sidilbasnet885@gmail.com.';
      } else {
        reply =
          `Sidil specializes in production-scale AI across Natural Language Processing (LLM fine-tuning, speculative RAG), Computer Vision (real-time edge ViT, TensorRT), and MLOps (Ray, Kubernetes, Triton). In his work across Nexus AI Labs and VisionCraft Systems, he has deployed models processing over 12 million inferences daily. Feel free to explore his projects or review his ATS resume!`;
      }

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-950 dark:text-white">
                Sidil's AI Explorer
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Grounded in Production Work & Publications
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Strip */}
        <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40">
          <div className="text-[11px] font-mono text-zinc-400 mb-2">QUICK TECHNICAL INQUIRIES</div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-amber-400 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-400 text-zinc-950 font-medium'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/80'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.suggestedAction && (
                    <button
                      onClick={() => {
                        if (m.suggestedAction?.projectId && onSelectProjectById) {
                          onSelectProjectById(m.suggestedAction.projectId);
                          onClose();
                        }
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-xs hover:border-amber-400 transition-colors"
                    >
                      <span>{m.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono mt-1 px-1">
                  {m.time}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-400 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Querying technical knowledge graph...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Sidil's architectures or experience..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-zinc-950 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
