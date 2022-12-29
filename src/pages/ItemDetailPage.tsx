import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UPDATE_CART_ACTION_TYPE } from '../utilities/constants';
import { AppStateContext, DispatchContext } from '../utilities/Contexts';

import tieBomber from '../assets/tiebomber.png';


export default function ItemDetailPage() {
  const items = useContext(AppStateContext).items;
  const params = useParams();
  const item = params.itemId ? items.get(params.itemId) : null;
  const dispatch = useContext(DispatchContext);
  const applicationState = useContext(AppStateContext);
  const cart = applicationState.cart;

  function handleAddToCart() {
    const newCart = new Map(cart);
    if (item) newCart.set(item, 1);
    dispatch({ type: UPDATE_CART_ACTION_TYPE, newCart });
  }

  return (
    <div className='bg-slate-900 p-5 rounded-lg'>
      {
        item ?
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-4xl'>{item.name}</h1>
          <div className='text-lg'>{item.description}</div>
          <img
            className='w-3/4 bg-slate-600 p-1 rounded-xl'
            src={item.imgUrl ? item.imgUrl : tieBomber }
            alt={`${item.name} ${item.description}`}
          />
          
          <div>MSRP: {item.msrp}</div>
          <div>Current Price: {item.currentPrice}</div>
          <button
            className={`${cart.has(item) ? 'bg-slate-600 text-white' : 'bg-emerald-600'} rounded-md p-4 w-fit`}
            onClick={handleAddToCart}
            disabled={cart.has(item)}
          >
            {
              cart.has(item) ? 'Item in Cart' : 'Add to Cart'
            }
          </button>
        </div>
      :
        <div>Loading...</div>
      }
    </div>
  )
}