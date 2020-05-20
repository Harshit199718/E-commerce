import React from 'react'
import './header.styles.scss'

import {ReactComponent as LOGO} from '../../assets/crown.svg'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.components'
import {cartHiddenToggler} from '../../redux/cart/cart.action'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'

function Header(props) {

    const cartClickHandler = e =>{
        const {cartHiddenToggler} = props
        cartHiddenToggler();
    }

    return (
        <div className='header'>
            <Link to='/' className='logo-container'>
                <LOGO className='logo' />
            </Link>

            <div className="options">
                <Link to='/shop' className='option' >SHOP</Link>
                <Link to='/contact' className='option' >CONTACT</Link>
                {
                    props.user ?(
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    ): 
                    <Link to='/signin' className='option'>SIGN IN</Link>
                }
                <CartIcon cartClickHandler={cartClickHandler}/>
            </div>
            {
                props.cartHidden ? (
                    null
                    ):<CartDropdown/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    cartHidden: selectCartHidden
})

const mapDispatchToProps = dispatch =>({
    cartHiddenToggler: () => dispatch(cartHiddenToggler())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)
