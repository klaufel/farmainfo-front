import Link from 'next/link';

import Logo from '../logo';

import { useUserContext } from '../../contexts/user';

export default function Header() {
  const user = useUserContext();

  return (
    <div className="h-16 sm:h-20 px-4 sm:px-6 sm:py-4 w-full sticky top-0 left-0 bg-white border-b border-gray-100 flex items-center justify-between z-20">
      <div>
        <Link href="/" passHref>
          <a className="flex">
            <Logo />
          </a>
        </Link>
      </div>
      <div className="flex gap-6">
        {!user.state.email ? (
          <Link href="/login" passHref>
            <a className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary/55">
              Iniciar sesión
            </a>
          </Link>
        ) : (
          <>
            <button
              onClick={() => {
                user.dispatch({ type: 'LOGOUT' });
              }}
              className="text-dark "
            >
              Cerrar sesión
            </button>
            <Link href="/dashboard" passHref>
              <a className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary/55">
                Dashboard
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
