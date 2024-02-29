import { useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import { sidebarLinks } from '@/lib/context/NavLinks';

function Bottombar() {
  const { pathname } = useLocation(); 

  return (
    <section className="fixed bottom-0 z-[100] w-full rounded-t-3xl bg-[#05121B] p-4 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-3 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              to={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-primary-500"
              }`}
            >
              <link.Icon size={24} />
              <p className="text-sm text-white">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
