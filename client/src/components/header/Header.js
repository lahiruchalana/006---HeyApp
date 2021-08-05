import React from 'react'
import Menu from './Menu'

const Header = () => {

    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">
                <h1 className="navbar-brand text-uppercase p-0 m-0">
                    HeyApp
                </h1>
                <Menu />
            </nav>
        </div>
    )
}

export default Header
