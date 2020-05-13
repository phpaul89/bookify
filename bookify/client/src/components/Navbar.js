import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

const handleLogout = props => {
    logout().then(() => {
        props.setUser(null);
    });
}

const Navbar = props => {

    return (
        <nav>
        {props.user && <nav>Hello {props.user.username}</nav>}
            {props.user ? (
                <>
                    <Link to='/profile'>My profile</Link>
                    <Link to='/' onClick={() => handleLogout(props)}>
                        Logout
                    </Link>
                </>
            ) : (
                <>          
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
                </>
                )}
        </nav>
    )
}

export default Navbar;