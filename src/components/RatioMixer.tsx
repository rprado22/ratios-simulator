import { motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'

function mixColors(ratioA: number, ratioB: number, colorA: string, colorB: string) {
  const total = ratioA + ratioB
  const wa = total === 0 ? 0.5 : ratioA / total
  const wb = 1 - wa
  const pa = hexToRgb(colorA)
  const pb = hexToRgb(colorB)
  const r = Math.round(pa.r * wa + pb.r * wb)
  const g = Math.round(pa.g * wa + pb.g * wb)
  const b = Math.round(pa.b * wa + pb.b * wb)
  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const bigint = parseInt(full, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

export default function RatioMixer() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [colorA, setColorA] = useState('#60a5fa')
  const [colorB, setColorB] = useState('#f472b6')

  const total = a + b
  const mix = useMemo(() => mixColors(a, b, colorA, colorB), [a, b, colorA, colorB])

  const simplified = useMemo(() => {
    const g = gcd(a, b)
    return { sa: a / g, sb: b / g }
  }, [a, b])

  const percentA = total === 0 ? 0 : Math.round((a / total) * 100)
  const percentB = 100 - percentA
  const gradient = `linear-gradient(135deg, ${colorA}, ${mix}, ${colorB})`

  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold">Ratio Mixer / Mezclador de Razones</h2>
          <p className="text-slate-600">
            <span className="badge mr-2">7.RP.A.1</span>
            Mix two quantities and see equivalent ratios.
            <span className="ml-2 italic">Mezcla dos cantidades y observa razones equivalentes.</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4">
              <label className="label">A (parts / partes)</label>
              <input
                type="range"
                min={0}
                max={12}
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="input w-24"
                  type="number"
                  value={a}
                  min={0}
                  max={99}
                  onChange={(e) => setA(Math.max(0, Number(e.target.value) || 0))}
                />
                <input
                  className="input w-10 h-10 cursor-pointer"
                  type="color"
                  value={colorA}
                  onChange={(e) => setColorA(e.target.value)}
                  title="Color A"
                />
              </div>
            </div>
            <div className="card p-4">
              <label className="label">B (parts / partes)</label>
              <input
                type="range"
                min={0}
                max={12}
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="input w-24"
                  type="number"
                  value={b}
                  min={0}
                  max={99}
                  onChange={(e) => setB(Math.max(0, Number(e.target.value) || 0))}
                />
                <input
                  className="input w-10 h-10 cursor-pointer"
                  type="color"
                  value={colorB}
                  onChange={(e) => setColorB(e.target.value)}
                  title="Color B"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="label">Ratio A:B / Razón A:B</p>
              <p className="text-2xl font-extrabold">
                {a}:{b} <span className="text-slate-500">(simplified / simplificada)</span> {simplified.sa}:{simplified.sb}
              </p>
              <p className="mt-1 text-slate-600">Total = {total} parts / partes</p>
            </div>
            <div className="card p-4">
              <p className="label">Percentages / Porcentajes</p>
              <div className="flex gap-3 items-center">
                <span className="font-bold" style={{ color: colorA }}>A {percentA}%</span>
                <span className="font-bold" style={{ color: colorB }}>B {percentB}%</span>
              </div>
              <div className="mt-3 h-4 w-full rounded-full overflow-hidden bg-white/70 border border-white">
                <div className="h-full" style={{ width: `${percentA}%`, background: colorA }} />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <p className="label">WIDA Sentence Frames / Marcos de oraciones</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>English: <em>"The ratio of A to B is __ to __ because ___."</em></li>
              <li>Español: <em>"La razón de A a B es __ a __ porque ___."</em></li>
              <li>English: <em>"When I multiply both parts by __, I get the equivalent ratio __:__."</em></li>
              <li>Español: <em>"Cuando multiplico ambas partes por __, obtengo la razón equivalente __:__."</em></li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="card p-4 h-full flex flex-col items-center justify-center">
            <p className="label mb-3">Visual Mix / Mezcla visual</p>
            <motion.div
              className="w-full max-w-md h-64 rounded-2xl border border-white/50 shadow-soft"
              style={{ background: gradient }}
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            />
            <div className="mt-4 grid grid-cols-12 gap-1 w-full max-w-md" aria-label="Tape Diagram">
              {Array.from({ length: Math.max(total, 1) }).map((_, i) => {
                const bg = i < a ? colorA : colorB
                return (
                  <div key={i} className="h-8 rounded-md border border-white/60" style={{ background: bg }} />
                )
              })}
            </div>
            <p className="mt-2 text-slate-600 text-sm">Tape Diagram / Diagrama de cinta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function gcd(x: number, y: number): number {
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x || 1
}
```tsx
import { motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'

function mixColors(ratioA: number, ratioB: number, colorA: string, colorB: string) {
  const total = ratioA + ratioB
  const wa = total === 0 ? 0.5 : ratioA / total
  const wb = 1 - wa
  const pa = hexToRgb(colorA)
  const pb = hexToRgb(colorB)
  const r = Math.round(pa.r * wa + pb.r * wb)
  const g = Math.round(pa.g * wa + pb.g * wb)
  const b = Math.round(pa.b * wa + pb.b * wb)
  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

export default function RatioMixer() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [colorA, setColorA] = useState('#60a5fa') // blue
  const [colorB, setColorB] = useState('#f472b6') // pink

  const total = a + b
  const mix = useMemo(() => mixColors(a, b, colorA, colorB), [a, b, colorA, colorB])

  const simplified = useMemo(() => {
    const g = gcd(a, b)
    return { sa: a / g, sb: b / g }
  }, [a, b])

  const percentA = total === 0 ? 0 : Math.round((a / total) * 100)
  const percentB = 100 - percentA

  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold">Ratio Mixer / Mezclador de Razones</h2>
          <p className="text-slate-600">
            <span className="badge mr-2">7.RP.A.1</span>
            Mix two quantities and see equivalent ratios.
            <span className="ml-2 italic">Mezcla dos cantidades y observa razones equivalentes.</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4">
              <label className="label">A (parts / partes)</label>
              <input type="range" min={0} max={12} value={a} onChange={(e) => setA(+e.target.value)} className="w-full" />
              <div className="mt-2 flex items-center gap-2">
                <input className="input w-24" type="number" value={a} min={0} max={99} onChange={(e) => setA(Math.max(0, +e.target.value || 0))} />
                <input className="input w-10 h-10 cursor-pointer" type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} title="Color A" />
              </div>
            </div>
            <div className="card p-4">
              <label className="label">B (parts / partes)</label>
              <input type="range" min={0} max={12} value={b} onChange={(e) => setB(+e.target.value)} className="w-full" />
              <div className="mt-2 flex items-center gap-2">
                <input className="input w-24" type="number" value={b} min={0} max={99} onChange={(e) => setB(Math.max(0, +e.target.value || 0))} />
                <input className="input w-10 h-10 cursor-pointer" type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} title="Color B" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="label">Ratio A:B / Razón A:B</p>
              <p className="text-2xl font-extrabold">{a}:{b} <span className="text-slate-500">(simplified / simplificada)</span> {simplified.sa}:{simplified.sb}</p>
              <p className="mt-1 text-slate-600">Total = {total} parts / partes</p>
            </div>
            <div className="card p-4">
              <p className="label">Percentages / Porcentajes</p>
              <div className="flex gap-3 items-center">
                <span className="font-bold" style={{ color: colorA }}>A {percentA}%</span>
                <span className="font-bold" style={{ color: colorB }}>B {percentB}%</span>
              </div>
              <div className="mt-3 h-4 w-full rounded-full overflow-hidden bg-white/70 border border-white">
                <div className="h-full" style={{ width: `${percentA}%`, background: colorA }} />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <p className="label">WIDA Sentence Frames / Marcos de oraciones</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>English: <em>"The ratio of A to B is __ to __ because ___."</em></li>
              <li>Español: <em>"La razón de A a B es __ a __ porque ___."</em></li>
              <li>English: <em>"When I multiply both parts by __, I get the equivalent ratio __:__."</em></li>
              <li>Español: <em>"Cuando multiplico ambas partes por __, obtengo la razón equivalente __:__."</em></li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="card p-4 h-full flex flex-col items-center justify-center">
            <p className="label mb-3">Visual Mix / Mezcla visual</p>
            <motion.div
              className="w-full max-w-md h-64 rounded-2xl border border-white/50 shadow-soft"
              style={{ background: `linear-gradient(135deg, ${colorA}, ${mix}, ${colorB})` }}
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            />
            <div className="mt-4 grid grid-cols-12 gap-1 w-full max-w-md" aria-label="Tape Diagram">
              {Array.from({ length: total || 1 }).map((_, i) => (
                <div key={i} className="h-8 rounded-md border border-white/60" style={{ background: i < a ? colorA : colorB }} />
              ))}
            </div>
            <p className="mt-2 text-slate-600 text-sm">Tape Diagram / Diagrama de cinta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function gcd(x: number, y: number): number {
  x = Math.abs(x); y = Math.abs(y)
  while (y) [x, y] = [y, x % y]
  return x || 1
}
