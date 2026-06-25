export function ScreenshotPreviewGrid({ urls }: { urls: string[] }) {
  if (urls.length === 0) {
    return <p className="text-xs text-muted">No screenshots available.</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {urls.map((url, i) => (
        <div
          key={url + i}
          className="flex aspect-[9/19] items-center justify-center rounded-lg border border-border-subtle bg-surface-2 text-[10px] text-muted"
        >
          Screenshot {i + 1}
        </div>
      ))}
    </div>
  );
}
