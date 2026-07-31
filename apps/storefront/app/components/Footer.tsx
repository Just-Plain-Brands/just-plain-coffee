import {Link} from 'react-router';

export function Footer() {
  return (
    <footer className="rounded-t-3xl bg-neutral-900 px-5 py-14 text-neutral-100 md:px-10 md:pt-16 md:pb-9">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
        <div>
          <div className="font-display text-3xl">Just Plain Coffee</div>
          <p className="mt-3 max-w-[32ch] text-neutral-300">
            Specialty-grade organic coffee with nothing added, nothing
            performed, in a carton.
          </p>
        </div>
        <FooterColumn title="Shop">
          <Link to="/collections/all">Light</Link>
          <Link to="/collections/all">Medium</Link>
          <Link to="/collections/all">Dark</Link>
          <Link to="/collections/all">Decaf</Link>
        </FooterColumn>
        <FooterColumn title="Company">
          <Link to="/#sourcing">Sourcing documentation</Link>
          <Link to="/policies">Organic certification</Link>
          <Link to="/policies">Shipping and returns</Link>
          <Link to="/pages/contact">Contact</Link>
        </FooterColumn>
        <FooterColumn title="Certification">
          <span className="w-max rounded-full border border-neutral-100/35 px-4 py-2 text-xs font-bold">
            USDA Organic
          </span>
          <span className="text-xs text-neutral-300">
            Certifier and cert number listed at launch.
          </span>
        </FooterColumn>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1240px] flex-col justify-between gap-2 border-t border-neutral-100/15 pt-5 text-xs text-neutral-300 sm:flex-row">
        <span>© 2026 Just Plain Coffee</span>
        <span>It is coffee. You make it hot.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <strong className="text-xs text-neutral-300">{title}</strong>
      {children}
    </div>
  );
}
