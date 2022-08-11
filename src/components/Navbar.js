import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Link } from 'react-router-dom'
import { Badge } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router-dom'
import StadiumIcon from '@mui/icons-material/Stadium';

const Navbar = (props) => {
  const { logOutUser, user } = useContext(AuthContext)
  const [bgNav, setBgNav] = useState("rgb(224, 223, 223)")
  const [bgNavHover, setBgNavHover] = useState("")
  const [fontNav, setFontNav] = useState("rgb(28, 28, 28)")
  const location = useLocation()
  console.log("location", location)
  useEffect(() => {
    if (location.pathname === "/") {
      setBgNav("transparent")
      setFontNav("white")
      setBgNavHover("rgba(0,0,0,0.6)")
    }
    else {
      setBgNav("rgb(224, 223, 223)")
      setFontNav("rgb(28, 28, 28)")
      setBgNavHover("")
    }
    
  }, [location])
  console.log(user)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  console.log("hover", bgNavHover)
  console.log(bgNav)
  return (
    <>
      <AppBar className="navbar" position="static" sx={{ background:  `${bgNav}`, boxShadow: 'none', '&:hover': { backgroundColor: `${bgNavHover}` } }}>
        <Container maxWidth='xl' >
          <Toolbar disableGutters >
            <Link to="/" style={{ textDecoration: "none" }}><StadiumIcon sx={{ display: { xs: 'none', md: 'flex' }, color: `${fontNav}` , mr: 1 }} /></Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant='h6'
                sx={{
                  mr: 4,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  letterSpacing: '.3rem',
                  color: `${fontNav}`,
                  textDecoration: "none",
                  letterSpacing: "0.01rem"
                }}
              >
                FRONT ROW TIX

              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                sx={{ color: `${fontNav}` }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center' >
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/`}>
                      Home
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/events`}>
                      Events
                    </Link>
                  </Typography>
                </MenuItem>
                {!user && <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/login`}>
                        Login
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/signup`}>
                        SignUp
                      </Link>
                    </Typography>
                  </MenuItem>
                </div>
                }
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, color: `${fontNav}`, mr: 1 }} />
            <Typography
              variant='h4'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: {md: `${fontNav}`, xs: "white" },
                textDecoration: 'none',
                fontSize: "1.2rem"
              }}
            >
              FTR
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                  <Link style={{ textDecoration: 'none', color: `${fontNav}` }} to={`/`}>
                    Home
                  </Link>
                </Button>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                  <Link style={{ textDecoration: 'none', color: `${fontNav}` }} to={`/events`}>
                    Browse all events
                  </Link>
                </Button>
              </Box>
              {!user && (
                <Box sx={{ display: 'flex' }}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                    <Link style={{ textDecoration: 'none', color: `${fontNav}` }} to={`/login`}>
                      Login
                    </Link>
                  </Button>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                    <Link style={{ textDecoration: 'none', color: `${fontNav}` }} to={`/signup`}>
                      SignUp
                    </Link>
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", flexGrow: 0 }}>
              {user && (
                <>
                  <Typography sx={{ display: {xs: "none", md: "block"}, mr: "2em", alignSelf: "center", color: `${fontNav}`, fontSize: "1.1rem" }}>HEY, {user?.username.toUpperCase()}!</Typography>
                  <Badge sx={{ alignSelf: "center", mr: "2rem" }} badgeContent={props?.cart.length} color="error">
                    <Link to="/cart"><ShoppingCartOutlinedIcon sx={{ color: `${fontNav}`, fontSize: "2rem", textDecoration: "none" }} /></Link>
                  </Badge>
                  <Tooltip title='Open User Menu'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircleIcon sx={{ fontSize: "2.5rem", textDecoration: "none", color: `${fontNav}` }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>
                    {' '}
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/user/${user?._id}`}>
                      My Profile
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>
                    {' '}
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/cart`}>
                      My Cart
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); logOutUser() }}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/login`}>
                      Logout
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navbar
