import {cn} from '~/lib/utils';

interface JournalMastheadArtworkProps {
  className?: string;
}

export function JournalMastheadArtwork({
  className,
}: JournalMastheadArtworkProps) {
  return (
    <div
      aria-label="The Just Plain Coffee carton mascot gives a thumbs up"
      className={cn(
        'pointer-events-none relative isolate min-h-72 overflow-hidden select-none',
        className,
      )}
      role="img"
    >
      <div
        aria-hidden="true"
        className="absolute right-[16%] bottom-[4%] h-3 w-[54%] rounded-full bg-ink/15 blur-[3px]"
      />
      <img
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-[45%] h-full w-auto -translate-x-1/2 object-contain"
        src="/journal/masthead/carton-mascot-thumbs-up.svg"
      />
      <span
        aria-hidden="true"
        className="absolute right-[8%] bottom-[43%] flex rotate-[18deg] items-end gap-2"
      >
        <span className="h-4 w-0.5 rounded-full bg-orange-600" />
        <span className="mb-1 h-3 w-0.5 rounded-full bg-orange-600" />
        <span className="mb-2 h-2.5 w-0.5 rounded-full bg-orange-600" />
      </span>
      <span className="absolute right-[2%] bottom-[19%] -rotate-6 rounded-[50%] border-2 border-orange-900/30 bg-orange-600 px-5 py-3 text-center font-package text-xs leading-[1.05] font-bold tracking-[0.08em] text-neutral-100 uppercase shadow-soft md:right-[4%]">
        Freshly
        <br />
        printed
      </span>
    </div>
  );
}
