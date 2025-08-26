import React, { useState } from 'react'
import { motion } from 'framer-motion'
import RatioMixer from './components/RatioMixer'
import TapeDiagram from './components/TapeDiagram'
import UnitRateExplorer from './components/UnitRateExplorer'
import ProportionTable from './components/ProportionTable'
import { Tabs } from './components/Tabs'


export default function App() {
const [tab, setTab] = useState('mixer')


return (
<div className="min-h-screen p-4 md:p-8">
<header className="max-w-6xl mx-auto mb-6">
<motion.div
className="card p-5 md:p-7 bg-white/80"
initial={{ y: -12, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ type: 'spring', duration: 0.6 }}
>
<div className="flex items-start justify-between gap-4">
<div>
<h1 className="text-2xl md:text-3xl font-black tracking-tight">Ratios Simulator / Simulador de razones</h1>
<p className="text-slate-600">Interactive tools for 7th grade proportional reasoning. / Herramientas interactivas para razón y proporcionalidad en 7º grado.</p>
</div>
<span className="badge">CCSS 7.RP</span>
</div>


<div className="mt-4">
<Tabs
active={tab}
onChange={setTab}
tabs={[
{ id: 'mixer', label: 'Mixer', es: 'Mezclador' },
{ id: 'tape', label: 'Tape Diagram', es: 'Diagrama de cinta' },
{ id: 'unit', label: 'Unit Rate', es: 'Tasa unitaria' },
{ id: 'table', label: 'Proportion Table', es: 'Tabla de proporción' },
]}
/>
</div>
</motion.div>
</header>


<main className="max-w-6xl mx-auto space-y-6">
{tab === 'mixer' && <RatioMixer />}
{tab === 'tape' && <TapeDiagram />}
{tab === 'unit' && <UnitRateExplorer />}
{tab === 'table' && <ProportionTable />}


<footer className="text-center text-slate-500 pt-4 pb-8">
<p>
© {new Date().getFullYear()} Ratios Simulator • English / Español • Built with React + Vite + Tailwind + Framer Motion.
</p>
</footer>
</main>
</div>
)
}
