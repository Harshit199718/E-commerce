import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import { connect } from 'react-redux'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import { withRouter } from 'react-router-dom'
import { cartHiddenToggler } from '../../redux/cart/cart.action'

function CartDropdown({cartItems,history,dispatch}) {

    const checkOutHandler = e =>{
        e.preventDefault()
        history.push('/checkout')
        dispatch(cartHiddenToggler())
    }
    return (
        <div className='cart-dropdown'>
            <div className="cart-items">
                {
                    cartItems.length?
                    cartItems.map(cartItem=>(
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    :(
                     <span className="empty-message">Your cart is empty</span>   
                    )}
            </div>
                <CustomButton onClick={(e)=> checkOutHandler(e)}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
}) 

export default withRouter(connect(mapStateToProps)(CartDropdown))
