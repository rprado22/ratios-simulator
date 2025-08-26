import React, { useMemo, useState } from 'react'


export default function TapeDiagram() {
const [whole, setWhole] = useState(24)
const [a, setA] = useState(3)
const [b, setB] = useState(5)
const parts = a + b


const unit = useMemo(() => (parts === 0 ? 0 : whole / parts), [whole, parts])


return (
<div className="card p-4">
<h2 className="text-xl font-bold">Tape Diagram Builder / Constructor de diagramas de cinta</h2>
<p className="text-slate-600">Represents a whole divided into parts using a ratio. / Representa un todo dividido en partes usando una razón.</p>


<div className="grid md:grid-cols-3 gap-4 mt-4">
<div className="card p-4">
<label className="label">Whole (total) / Total</label>
<input type="number" className="input" value={whole} min={0} onChange={(e) => setWhole(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<label className="label">Ratio A / Razón A</label>
<input type="number" className="input" value={a} min={0} onChange={(e) => setA(Math.max(0, +e.target.value || 0))} />
</div>
<div className="card p-4">
<label className="label">Ratio B / Razón B</label>
<input type="number" className="input" value={b} min={0} onChange={(e) => setB(Math.max(0, +e.target.value || 0))} />
</div>
</div>


<div className="mt-4">
<p className="label">Unit value / Valor de la unidad</p>
<p className="text-lg font-bold">{unit.toFixed(2)}</p>
</div>


<div className="mt-4 grid grid-cols-12 gap-1">
{Array.from({ length: parts || 1 }).map((_, i) => (
<div key={i} className={`h-10 rounded-md ${i < a ? 'bg-indigo-300' : 'bg-rose-300'} border border-white`} />
))}
</div>


<div className="mt-2 text-slate-700">
<p>A portion / Una parte (A): <b>{(unit * a).toFixed(2)}</b></p>
<p>Another portion / Otra parte (B): <b>{(unit * b).toFixed(2)}</b></p>
</div>


<div className="card p-4 mt-4">
<p className="label">Sentence Frames / Marcos</p>
<ul className="list-disc pl-6 text-slate-700">
<li>English: <em>"The whole is partitioned into __ equal parts. Each part is worth __."</em></li>
<li>Español: <em>"El total se divide en __ partes iguales. Cada parte vale __."</em></li>
</ul>
</div>
</div>
)
}
