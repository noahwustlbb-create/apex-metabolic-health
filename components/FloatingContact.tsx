'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ACTIONS = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/61400000000?text=Hi%2C+I%27m+interested+in+Apex+Metabolic+Health',
    iconColor: '#25D366',
    external: true,
  },
  {
    id: 'call',
    icon: Phone,
    label: 'Call Us',
    href: 'tel:+611300000000',
    iconColor: '#4DB8E8',
    external: false,
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3"
      aria-label="Contact options"
    >
      <AnimatePresence>
        {open && ACTIONS.map((action, i) => {
          const Icon = action.icon
          return (
            <motion.a
              key={action.id}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.88 }}
              transition={{ duration: 0.2, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 bg-[#111111] border border-[#1E1E1E]
                         rounded-full pl-4 pr-5 py-2.5 text-white text-sm font-semibold
                         hover:border-[#2E2E2E] hover:scale-105 transition-all duration-200
                         shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <Icon size={16} style={{ color: action.iconColor }} />
              {action.label}
            </motion.a>
          )
        })}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white
                   bg-gradient-to-br from-[#005F8E] to-[#0A3D8F]
                   shadow-blue-md hover:shadow-blue-lg
                   transition-all duration-200"
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -80, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 80, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 80, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -80, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
