import { motion } from 'framer-motion'
import React from 'react'


type Tab = {
id: string
label: string
es: string
}


export const Tabs: React.FC<{
tabs: Tab[]
active: string
onChange: (id: string) => void
}> = ({ tabs, active, onChange }) => {
return (
<div className="flex gap-2 bg-white/60 p-2 rounded-2xl shadow-soft border border-white/40">
{tabs.map((t) => (
<button
key={t.id}
onClick={() => onChange(t.id)}
className={`relative px-4 py-2 rounded-xl font-semibold transition-colors ${
active === t.id ? 'text-white' : 'text-slate-700 hover:text-slate-900'
}`}
>
{active === t.id && (
<motion.span
layoutId="pill"
className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500"
transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
/>
)}
<span className="relative z-10">{t.label} / {t.es}</span>
</button>
))}
</div>
)
}
