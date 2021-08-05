import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import Avatar from '../Avatar'


const Menu = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">

                <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                    <Link className="dropdown-item" to="/"
                    onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
    </div>

    )
}

export default Menu
