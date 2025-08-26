import React, { useMemo, useState } from 'react'


function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }


export default function ProportionTable() {
const [a, setA] = useState(2)
const [b, setB] = useState(3)
const [scale, setScale] = useState(1)


const simplified = useMemo(() => {
const g = gcd(a, b)
return { sa: a / g, sb: b / g }
}, [a, b])


const rows = Array.from({ length: 6 }).map((_, i) => ({
k: (i + 1) * scale,
A: (i + 1) * scale * simplified.sa,
B: (i + 1) * scale * simplified.sb,
}))


return (
<div className="card p-4">
<h2 className="text-xl font-bold">Proportion Table / Tabla de proporcionalidad</h2>
<p className="text-slate-600">Generate equivalent ratios by scaling. / Genera razones equivalentes escalando.</p>


<div className="grid md:grid-cols-3 gap-4 mt-4">
<div className="card p-4">
<label className="label">A</label>
<input type="number" className="input" value={a} min={0} onChange={(e) => setA(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<label className="label">B</label>
<input type="number" className="input" value={b} min={0} onChange={(e) => setB(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<label className="label">Scale factor / Factor de escala</label>
<input type="number" className="input" value={scale} min={1} onChange={(e) => setScale(Math.max(1, +e.target.value || 1))} />
</div>
</div>


<p className="mt-3 text-slate-700">Simplified / Simplificada: <b>{simplified.sa}:{simplified.sb}</b></p>


<div className="mt-4 overflow-auto">
<table className="w-full text-left">
<thead>
<tr className="text-slate-600">
<th className="py-2">k</th>
<th className="py-2">A</th>
<th className="py-2">B</th>
<th className="py-2">A:B</th>
</tr>
</thead>
<tbody>
{rows.map((r, idx) => (
<tr key={idx} className="odd:bg-white/60 even:bg-white/30">
<td className="py-2 px-2">{r.k}</td>
<td className="py-2 px-2 font-semibold">{r.A}</td>
<td className="py-2 px-2 font-semibold">{r.B}</td>
<td className="py-2 px-2">{r.A}:{r.B}</td>
</tr>
))}
</tbody>
</table>
</div>


<div className="card p-4 mt-4">
<p className="label">Sentence Frames / Marcos</p>
<ul className="list-disc pl-6 text-slate-700">
<li>English: <em>"If the ratio is __:__, multiplying by __ gives __:__."</em></li>
<li>Español: <em>"Si la razón es __:__, al multiplicar por __ se obtiene __:__."</em></li>
</ul>
</div>
</div>
)
}
