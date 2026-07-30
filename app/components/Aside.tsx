import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import { Button } from './ui/button';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  footer,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  return (
    <Sheet
      open={expanded}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <SheetContent className="w-full max-w-[430px] gap-0 border-0 bg-transparent p-0 sm:max-w-[430px] p-4 border-none shadow-none" showCloseButton={false}>
        <div className='bg-background rounded-lg h-full shadow-md flex flex-col overflow-hidden'>
        <SheetHeader className="border-b border-border px-7 py-6">
          <div className='flex'>
            <div className='flex-1'>
          <SheetTitle className="font-display text-2xl font-normal">
            {heading}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {type === 'cart'
              ? 'Review and update your shopping cart.'
              : `Just Plain Coffee ${type}.`}
          </SheetDescription>
          </div>
          <SheetClose render={<Button variant="ghost">Close</Button>} />
          </div>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
          {children}
        </div>
        {footer ? (
          <SheetFooter>
            {footer}
        </SheetFooter>
      ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');
  const close = useCallback(() => setType('closed'), []);
  const contextValue = useMemo(
    () => ({type, open: setType, close}),
    [close, type],
  );

  return (
    <AsideContext.Provider value={contextValue}>
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
