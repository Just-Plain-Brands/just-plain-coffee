import {cn} from '~/lib/utils';

interface CartonIllustrationProps {
  className?: string;
}

export function CartonIllustration({className}: CartonIllustrationProps) {
  return (
    <img
      alt="Just Plain Coffee carton"
      className={cn('jpc-carton', className)}
      height="484"
      src="/Carton 1.svg"
      width="234"
    />
  );
}
