import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toolbar, IconButton, Typography, makeStyles, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignItems: 'center',
    },
    tools:{
        marginRight: '1rem',
        paddingRight:'1rem',
        color: '#ffffff'
    }
  }));
  

function NavBar() {
    const classes = useStyles();
    const user   = useSelector(state => state.user)
	const { userInfo } = user
    const dispatch = useDispatch()
    
    const openMenu = () =>{
        document.querySelector('.sidebar').classList.add('open')
      }
     const closeMenu=()=>{
      document.querySelector('.sidebar').classList.remove('open')
     }
  
    return (
        <Fragment>
       <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
    <Link to='/'>baazaar</Link>
        </div>
        <div className="header-links">
            <Link to ='/'>Home</Link>
            <Link to ='/cart'>Cart</Link>
              {userInfo ? <Link to={`/profile/${userInfo._id}`}>{userInfo.name}</Link> 
            : <Link to='/signin'>Sign in</Link> }
            {userInfo?.isAdmin ? <Link to= '/products'>Admin</Link> : null}
        </div>
    </header>
    	<aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close" onClick={closeMenu} >
            x
        </button>
        <ul>
            <li>
                <a href='index.html'>Pants</a>
            </li>
            <li>
                <a href='index.html'>Shirts</a>
            </li>
        </ul>
    </aside> 
  </Fragment>
    )
}

export default NavBar
