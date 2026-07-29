const ANNOUNCEMENTS = [
  'FREE SHIPPING OVER $40',
  'SPECIALTY-GRADE ORGANIC',
  'SUBSCRIBE & SAVE 15%',
  'ONE INGREDIENT: COFFEE',
  'ROASTED TO ORDER',
  'THE CARTON IS A FLEX',
] as const;

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-neutral-900 text-neutral-100">
      <div
        aria-label="Store announcements"
        className="flex w-max animate-marquee motion-reduce:animate-none"
      >
        <AnnouncementSet />
        <div aria-hidden="true">
          <AnnouncementSet />
        </div>
      </div>
    </div>
  );
}

function AnnouncementSet() {
  return (
    <div className="flex items-center gap-6 px-3 py-2 text-xs font-bold tracking-[0.07em] whitespace-nowrap">
      {ANNOUNCEMENTS.map((announcement, index) => (
        <span className="contents" key={announcement}>
          <span>{announcement}</span>
          <span
            className={
              index % 2 === 0
                ? 'size-1.5 rounded-full bg-primary'
                : 'size-1.5 rounded-full bg-green-300'
            }
          />
        </span>
      ))}
    </div>
  );
}
