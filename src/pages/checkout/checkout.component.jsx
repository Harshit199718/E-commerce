import React from "react";
import "./checkout.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe/stripe-button.component";

function CheckoutPage({ cartItems, cartTotal }) {
  return (
    <div className="checkout-page">

      {cartItems.length?
      (<>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Desciption</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
          return (
              <CheckoutItem key={cartItem.id} cartItem = {cartItem} />
          )
      })}
      <div className="total">
        <span>TOTAL: ${cartTotal}</span>
      </div>
      <div className="test-warning">
        *Please use the following credit card for payments*
        <br/>
        4242 4242 4242 4242 - Exp: Any Future date - CVV: 123
      </div>
      <StripeCheckoutButton price={cartTotal} />
      </>
      ):
      <span className="empty-message">Your cart is empty</span>
      }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
