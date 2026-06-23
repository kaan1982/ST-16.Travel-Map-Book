export function ScreenshotPreviewGrid({ urls }: { urls: string[] }) {
  if (urls.length === 0) {
    return <p className="text-xs text-slate-400">No screenshots available.</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {urls.map((url, i) => (
        <div
          key={url + i}
          className="flex aspect-[9/19] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-[10px] text-slate-400"
        >
          Screenshot {i + 1}
        </div>
      ))}
    </div>
  );
}
