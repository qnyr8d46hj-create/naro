'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  label: string
}

export function ScrollIndicator({ label }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="flex flex-col items-center gap-2 text-naro-muted"
    >
      <span className="text-xs tracking-widest uppercase">{label}</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-8 bg-gradient-to-b from-naro-muted to-transparent"
      />
    </motion.div>
  )
}
