import { Link, Outlet, useNavigate } from 'react-router-dom';

import { UserIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { cartItemType } from '../utilities/types';

type LayoutType = {
  auth: any;
  cart: cartItemType[];
};
export default function Layout({ auth, cart }: LayoutType) {
  const navigate = useNavigate();

  return (
    <>
      <div className='bg-emerald-300'>
        <nav className="mx-auto container flex justify-between items-center px-10 py-5">
          <Link to="shop">Shop</Link>
          <Link to="/" className="font-bold text-3xl">Mos Espa Marketplace</Link>
          <div className='flex items-center'>
            <UserIcon
              onClick={() => navigate('/login')}
              className='w-14 h-14 mr-4 cursor-pointer'
            />
            <ShoppingCartIcon
              onClick={() => navigate('/cart')}
              className='cursor-pointer'
            />
            {cart.length}
          </div>
        </nav>
      </div>

      <main className="h-full pb-10 pt-7 container mx-auto bg-slate-50">
        <Outlet />
      </main>
      
      <footer className="p-8 container mx-auto bg-slate-50">
        <Link to="/team">Meet the Team</Link>
      </footer>
    </>
  )
}