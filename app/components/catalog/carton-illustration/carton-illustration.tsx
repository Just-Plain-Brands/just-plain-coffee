import type {RoastPresentation} from '~/lib/coffee/presentation';
import {cn} from '~/lib/utils';

interface CartonIllustrationProps {
  presentation: RoastPresentation;
  className?: string;
  sideLabel?: string;
  pill?: string;
}

export function CartonIllustration({
  presentation,
  className,
  sideLabel = presentation.sideLabel,
  pill = '12 OZ · 340 G · WHOLE BEAN',
}: CartonIllustrationProps) {
  return (
    <div
      aria-label={`Just Plain ${presentation.shortName} coffee carton`}
      className={cn('jpc-carton', className)}
      role="img"
    >
      <div className="jpc-carton-shadow" />
      <div className="jpc-carton-body">
        <div className="jpc-carton-seam" />
        <div className="jpc-carton-roof">
          <span>ROAST DATE ON THE SEAM</span>
        </div>
        <div className="jpc-carton-gable" />
        <div className="jpc-carton-side">
          <div className="jpc-carton-side-word">{sideLabel}</div>
          <div className="jpc-carton-social">
            @JUSTPLAINCOFFEE
            <br />
            JUSTPLAINCOFFEE.COM
          </div>
        </div>
        <div className="jpc-carton-front">
          <div className="jpc-carton-name">
            JUST
            <br />
            PLAIN
            <br />
            COFFEE
            <span style={{color: presentation.capColor}}>.</span>
          </div>
          <div className="jpc-coffee-bean" />
          <div className="jpc-carton-label">
            <div className="jpc-carton-subline">{presentation.subline}</div>
            <div className="jpc-carton-pill">{pill}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
