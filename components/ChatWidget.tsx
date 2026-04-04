'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'Which program is right for me?',
  'How much does a consultation cost?',
  'Do I need blood tests first?',
  'How does telehealth work?',
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: '#4a5a6a' }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setLoading(true)
    setStarted(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (!res.ok || !res.body) throw new Error('Failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantText }
          return updated
        })
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again or book a free discovery call.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 left-5 sm:left-8 z-50" style={{ width: 'min(400px, calc(100vw - 32px))' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mb-3 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0e1520',
              border: '1px solid rgba(44,116,232,0.18)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(44,116,232,0.08)',
              height: '480px',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(44,116,232,0.15)', border: '1px solid rgba(44,116,232,0.3)' }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M18 10c0 4.418-3.582 8-8 8a7.96 7.96 0 01-4-.107L2 19l1.107-4A7.96 7.96 0 012 10c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke="#2C74E8" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>
                    Apex Clinical Advisor
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px]" style={{ color: '#8899aa' }}>Online now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-150"
                style={{ color: '#4a5a6a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f4f8' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
                aria-label="Close chat"
              >
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
              {/* Greeting */}
              {!started && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm leading-relaxed"
                    style={{ backgroundColor: '#19202c', color: '#f0f4f8' }}
                  >
                    Hi — I&apos;m the Apex clinical advisor. I can help you find the right program, explain how our process works, or answer any questions before you book.
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left px-3 py-2 rounded-lg text-[12px] transition-all duration-150"
                        style={{
                          border: '1px solid rgba(44,116,232,0.2)',
                          color: '#7AB8FF',
                          backgroundColor: 'rgba(44,116,232,0.05)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(44,116,232,0.12)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(44,116,232,0.05)' }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message thread */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="rounded-xl px-4 py-3 max-w-[85%] text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { backgroundColor: '#2C74E8', color: '#ffffff', borderRadius: '12px 12px 2px 12px' }
                        : { backgroundColor: '#19202c', color: '#f0f4f8', borderRadius: '12px 12px 12px 2px' }
                    }
                  >
                    {msg.content || (msg.role === 'assistant' && loading && i === messages.length - 1
                      ? <TypingIndicator />
                      : null
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div
                    className="rounded-xl px-2 py-1"
                    style={{ backgroundColor: '#19202c', borderRadius: '12px 12px 12px 2px' }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: '#f0f4f8' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  backgroundColor: input.trim() && !loading ? '#2C74E8' : 'rgba(44,116,232,0.2)',
                }}
                aria-label="Send message"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M14 8H2M9 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-6 py-3.5 transition-all duration-200"
        style={{
          background: '#0e1520',
          border: '1px solid rgba(44,116,232,0.28)',
          borderRadius: '999px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(44,116,232,0.06)',
          color: '#ffffff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(44,116,232,0.55)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(44,116,232,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(44,116,232,0.28)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(44,116,232,0.06)'
        }}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 12 12" fill="none" className="w-4 h-4" aria-hidden="true"
            >
              <path d="M1 1l10 10M11 1L1 11" stroke="#2C74E8" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true"
            >
              <path d="M18 10c0 4.418-3.582 8-8 8a7.96 7.96 0 01-4-.107L2 19l1.107-4A7.96 7.96 0 012 10c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke="#2C74E8" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              <path d="M6.5 10h.01M10 10h.01M13.5 10h.01" stroke="#2C74E8" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
          {open ? 'Close' : 'Ask Us Anything'}
        </span>
        {!open && (
          <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#2C74E8' }} />
        )}
      </motion.button>
    </div>
  )
}
