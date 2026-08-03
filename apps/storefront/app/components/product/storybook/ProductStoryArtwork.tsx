import {cn} from '~/lib/utils';

interface ProductStoryArtworkProps {
  accentColor?: string;
  className?: string;
  color: string;
  kind: 'bag' | 'cap' | 'mug' | 'shirt' | 'tote';
  label: string;
}

export function ProductStoryArtwork({
  accentColor = '#f5ead8',
  className,
  color,
  kind,
  label,
}: ProductStoryArtworkProps) {
  switch (kind) {
    case 'bag':
      return (
        <svg
          aria-label={label}
          className={cn(
            'w-full max-w-60 drop-shadow-[0_20px_16px_rgb(46_43_37/0.2)]',
            className,
          )}
          role="img"
          viewBox="0 0 240 300"
        >
          <path
            d="M44 25h152l-9 250H53L44 25Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path d="M44 72h152" stroke="#2e2b25" strokeWidth="4" />
          <circle cx="120" cy="164" fill={accentColor} r="58" />
          <text
            fill="#2e2b25"
            fontFamily="Archivo, sans-serif"
            fontSize="17"
            fontWeight="800"
            textAnchor="middle"
            x="120"
            y="158"
          >
            JUST PLAIN
          </text>
          <text
            fill="#2e2b25"
            fontFamily="Archivo, sans-serif"
            fontSize="17"
            fontWeight="800"
            textAnchor="middle"
            x="120"
            y="180"
          >
            COFFEE
          </text>
        </svg>
      );
    case 'cap':
      return (
        <svg
          aria-label={label}
          className={cn(
            'w-full max-w-60 drop-shadow-[0_20px_16px_rgb(46_43_37/0.2)]',
            className,
          )}
          role="img"
          viewBox="0 0 280 240"
        >
          <path
            d="M55 139c0-65 34-103 88-103 54 0 83 39 83 103H55Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path
            d="M56 138c64-2 129 8 177 40-72 31-149 24-198-4-13-8-2-33 21-36Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <text
            fill={accentColor}
            fontFamily="Archivo, sans-serif"
            fontSize="17"
            fontWeight="800"
            textAnchor="middle"
            x="142"
            y="105"
          >
            PLAIN.
          </text>
        </svg>
      );
    case 'mug':
      return (
        <svg
          aria-label={label}
          className={cn(
            'w-full max-w-58 drop-shadow-[0_20px_16px_rgb(46_43_37/0.2)]',
            className,
          )}
          role="img"
          viewBox="0 0 260 240"
        >
          <path
            d="M44 49h151v160c0 16-13 29-29 29H73c-16 0-29-13-29-29V49Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path
            d="M193 84h23c33 0 44 23 44 49s-14 48-46 48h-21"
            fill="none"
            stroke="#2e2b25"
            strokeWidth="15"
          />
          <text
            fill={accentColor}
            fontFamily="Archivo, sans-serif"
            fontSize="23"
            fontWeight="800"
            textAnchor="middle"
            x="120"
            y="144"
          >
            GOOD MUG.
          </text>
        </svg>
      );
    case 'shirt':
      return (
        <svg
          aria-label={label}
          className={cn(
            'w-full max-w-[470px] drop-shadow-[0_24px_20px_rgb(46_43_37/0.18)]',
            className,
          )}
          role="img"
          viewBox="0 0 480 540"
        >
          <path
            d="M154 68 64 121l43 119 56-24v260h154V216l56 24 43-119-90-53c-13 24-43 40-86 40s-73-16-86-40Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d="M188 75c10 27 27 41 52 41s42-14 52-41"
            fill="none"
            stroke="#2e2b25"
            strokeWidth="5"
          />
          <text
            fill={accentColor}
            fontFamily="Archivo, sans-serif"
            fontSize="22"
            fontWeight="800"
            textAnchor="middle"
            x="240"
            y="242"
          >
            JUST PLAIN
          </text>
          <text
            fill={accentColor}
            fontFamily="Archivo, sans-serif"
            fontSize="22"
            fontWeight="800"
            textAnchor="middle"
            x="240"
            y="270"
          >
            COFFEE
          </text>
        </svg>
      );
    case 'tote':
      return (
        <svg
          aria-label={label}
          className={cn(
            'w-full max-w-55 drop-shadow-[0_20px_16px_rgb(46_43_37/0.2)]',
            className,
          )}
          role="img"
          viewBox="0 0 240 280"
        >
          <path
            d="M45 80h150l-13 174H58L45 80Z"
            fill={color}
            stroke="#2e2b25"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path
            d="M82 88c0-47 11-66 38-66s38 19 38 66"
            fill="none"
            stroke="#2e2b25"
            strokeWidth="9"
          />
          <text
            fill={accentColor}
            fontFamily="Archivo, sans-serif"
            fontSize="24"
            fontWeight="800"
            textAnchor="middle"
            x="120"
            y="166"
          >
            JUST PLAIN
          </text>
        </svg>
      );
    default: {
      const exhaustiveKind: never = kind;
      return exhaustiveKind;
    }
  }
}
