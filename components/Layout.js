import React from 'react'
import NavBar from './Navbar'
import Notify from './Notify'
// import Modal from './'

function Layout({children}) {
    return (
        <div className="container">
            <NavBar />
           <Notify />
            {/* <Modal /> */}
            {children}
        </div>
    )
}

export default Layout