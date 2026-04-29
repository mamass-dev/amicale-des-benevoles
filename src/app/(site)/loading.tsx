// Loading state global pour les pages publiques.
// Affiché brièvement pendant la transition entre 2 pages SSG/ISR.
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-6 animate-pulse">
        <div className="h-12 w-3/4 rounded-lg bg-card" />
        <div className="h-6 w-1/2 rounded-lg bg-card" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border overflow-hidden">
              <div className="aspect-[16/9] bg-card" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-card" />
                <div className="h-4 w-full rounded bg-card" />
                <div className="h-4 w-2/3 rounded bg-card" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
