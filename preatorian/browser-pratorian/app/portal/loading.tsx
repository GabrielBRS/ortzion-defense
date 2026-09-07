export default function PortalLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-5 animate-pulse motion-reduce:animate-none"
    >
      <span className="sr-only">Loading portal data</span>
      <div className="h-10 w-72 bg-white/6" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-40 border border-white/8 bg-white/3" />
        ))}
      </div>
    </div>
  );
}
