import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import { UPDATE_CART_ACTION_TYPE } from "../utilities/constants";
import { AppStateContext, DispatchContext } from '../utilities/Contexts';
import { ItemType } from "../utilities/types";

import eCommerce_API from '../utilities/ApiConfig';

//CONSIDER ADDING A SAVE CHANGES OPTION
export default function CheckoutConfirmationPage(){
    const applicationState = useContext(AppStateContext);
    const dispatch = useContext(DispatchContext);
    const cart = applicationState.cart;
    const userData = applicationState.userData;
    const navigate = useNavigate();

    //Updates cart total price
    function assignCartTotalPrice(){
      let num = 0;
      cart.forEach((amount, item) => {
        if(item.currentPrice !== undefined){
          num += item.currentPrice * amount;
        }
      });
      return num;
    }

    //Removes an item from the cart
    function handleDelete(item: ItemType){
      const newCart = new Map(cart);
      newCart.delete(item);
      dispatch({ type: UPDATE_CART_ACTION_TYPE, newCart });
      if(userData?.token){
        eCommerce_API.delete("/cart", {
          params: { itemId:item.id },
          "headers" : {
            authorization:userData?.token
          }
        }).catch((e)=>console.log(e))
      }
    }

    //Updates the amount of an item in the cart
    //Currently doesn't recognize that a state has changed, so need to manually rerender the page
    function handleAmountChange(item: ItemType, newAmount : number){
      //Update the value (i.e the amount) of items based on the key, which is ItemType
      const newCart = new Map(cart);
      newCart.set(item, newAmount);
      dispatch({ type: UPDATE_CART_ACTION_TYPE, newCart });
      if(userData?.token){
        eCommerce_API.put("/cart", {
          "userId" : "FILLERTEXT",
          "itemId" : item?.id,
          "amount" : newAmount
        },{
          "headers": {
              authorization:userData?.token
          }
        }).catch((e)=>console.log(e))
      }
    }

    //Changes the current page checkout.
    function checkoutRouter(){
      const checkoutPath = "/cart/confirmation";
      //Make a POST request to update the user cart in database.
      navigate(checkoutPath);
    }
  
  //Check whether the cart is loaded
  return(
      <div>
          <div className="flex flex-col items-center">
              <h1 className="font-bold text-5xl bg-slate-600 border-t-2 border-l-2 border-r-2 border-slate-500 rounded-t-md px-4 py-2
                shadow-xl shadow-emerald-300 cursor-default">
                    Cart
            </h1>
              <h1 className="font-bold text-4xl bg-slate-600 border-2 border-slate-500 rounded-md px-4 py-2 
                shadow-xl shadow-emerald-300 cursor-default">
                    Total Price: {assignCartTotalPrice()}
            </h1>
              <div className="flex space-x-5">
                  <button className="bg-slate-500 text-white text-2xl my-3 font-bold rounded-md px-4 py-2 ease-out hover:scale-125 duration-300 hover:bg-green-500"
                      onClick={checkoutRouter}>Checkout
                  </button>
              </div>
          </div>
          {Array.from(cart.entries()).map(
              ([item, amount]) => {
                  return (
                    <CartCard
                      key={item.id}
                      amount={amount}
                      item={item}
                      onDelete={handleDelete}
                      onAmountChange={handleAmountChange}
                    />
                  )
              }
          )}
      </div>
  );
}