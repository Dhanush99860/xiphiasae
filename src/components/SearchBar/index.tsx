// 'use client';
// import * as React from 'react';
// import Link from 'next/link';

// export default function SearchBar() {
//   const [q, setQ] = React.useState('');
//   const [open, setOpen] = React.useState(false);
//   const [results, setResults] = React.useState<any[]>([]);

//   async function onChange(v: string) {
//     setQ(v);
//     if (!v.trim()) { setOpen(false); setResults([]); return; }
//     const res = await fetch(`/api/search?q=${encodeURIComponent(v)}`);
//     const data = await res.json();
//     setResults(data.results);
//     setOpen(true);
//   }

//   return (
//     <div className="relative w-full">
//       <input
//         value={q}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Search programs, countries, blog, news..."
//         className="w-full rounded-2xl border border-gold/45 bg-white p-3 text-ink placeholder:text-ink/40 outline-none focus:border-gold"
//       />
//       {open && results.length > 0 && (
//         <div className="absolute mt-2 w-full rounded-2xl border border-gold/45 bg-white shadow-lg z-50 max-h-96 overflow-auto">
//           {results.map((r, i) => (
//             <Link key={i} href={r.url} className="block p-3 text-ink hover:bg-white/[0.03]">
//               <div className="text-[11px] uppercase tracking-wide opacity-60">{r.kind}</div>
//               <div className="font-medium">{r.title}</div>
//               {r.summary && <div className="text-sm opacity-80 line-clamp-2">{r.summary}</div>}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
