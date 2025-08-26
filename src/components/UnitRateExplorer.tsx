import React, { useMemo, useState } from 'react'


export default function UnitRateExplorer() {
const [x, setX] = useState(3) // quantity
const [y, setY] = useState(12) // value
const unitRate = useMemo(() => (x === 0 ? 0 : y / x), [x, y])


const multiples = Array.from({ length: 6 }).map((_, i) => ({
q: (i + 1) * x,
v: (i + 1) * y,
}))


return (
<div className="card p-4">
<h2 className="text-xl font-bold">Unit Rate Explorer / Explorador de tasa unitaria</h2>
<p className="text-slate-600">Find how much for 1 unit. / Encuentra cuánto por 1 unidad.</p>


<div className="grid md:grid-cols-3 gap-4 mt-4">
<div className="card p-4">
<label className="label">Quantity (x) / Cantidad</label>
<input type="number" className="input" value={x} min={0} onChange={(e) => setX(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<label className="label">Value (y) / Valor</label>
<input type="number" className="input" value={y} min={0} onChange={(e) => setY(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<p className="label">Unit Rate / Tasa unitaria</p>
<p className="text-2xl font-extrabold">{unitRate.toFixed(2)} per 1</p>
</div>
</div>


<div className="mt-4 overflow-auto">
<table className="w-full text-left">
<thead>
<tr className="text-slate-600">
<th className="py-2">x (quantity) / cantidad</th>
<th className="py-2">y (value) / valor</th>
<th className="py-2">y/x</th>
</tr>
</thead>
<tbody>
{multiples.map((m, idx) => (
<tr key={idx} className="odd:bg-white/60 even:bg-white/30">
<td className="py-2 px-2 font-semibold">{m.q}</td>
<td className="py-2 px-2">{m.v}</td>
<td className="py-2 px-2">{(m.v / m.q).toFixed(2)}</td>
</tr>
))}
</tbody>
</table>
</div>


<div className="card p-4 mt-4">
<p className="label">Sentence Frames / Marcos</p>
<ul className="list-disc pl-6 text-slate-700">
<li>English: <em>"For __ units, the value is __, so for 1 unit the rate is ___."</em></li>
<li>Español: <em>"Para __ unidades, el valor es __, así que para 1 unidad la tasa es ___."</em></li>
</ul>
</div>
</div>
)
}
