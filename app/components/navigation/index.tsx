'use client'

import React from 'react';
import { generalContext } from "@/context/GlobalContext";
import Link from "next/link";
import './navigation.scss'

export const Navbar = () => {

    const {isAdmin, setIsAdmin, isUser, setIsUser} = React.useContext(generalContext);

    return (
        // If a user is an admin - show sign-in/sign-out links, otherwise show return home link
    <div className="nav__container">
    <nav className="navigation-menu">
        {!isAdmin && !isUser ? <Link href="/admin/books" onClick={() => setIsAdmin(!isAdmin)} className='nav-link'>Sign-in</Link> : isAdmin && !isUser 
    ? (<Link href="/" onClick={() => setIsAdmin(!isAdmin)} className='nav-link' >Sign out</Link> ) : 
    isUser && !isAdmin ? (
        <Link href="/" className='nav-link'>Return to home page</Link>
    ) : null}
        </nav>
    
    </div>
    )
}