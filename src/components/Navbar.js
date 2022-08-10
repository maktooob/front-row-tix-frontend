import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Link } from 'react-router-dom'
import { Badge } from '@mui/material'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCart';


const Navbar = (props) => {
  const { logOutUser, user } = useContext(AuthContext)
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

  return (
    <>
      <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
        <Container maxWidth='xl' >
          <Toolbar disableGutters >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant='h6'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: "none"
                }}
              >
                FTR
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
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
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/}`}>
                      Home
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/}`}>
                      Events
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/}`}>
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/}`}>
                      SignUp
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                color: 'inherit',
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
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={`/`}>
                    Home
                  </Link>
                </Button>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={`/events`}>
                    Browse all events
                  </Link>
                </Button>
              </Box>
              {!user && (
                <Box sx={{ display: 'flex' }}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/login`}>
                      Login
                    </Link>
                  </Button>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', fontSize: "1.1rem" }}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/signup`}>
                      SignUp
                    </Link>
                  </Button>
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", flexGrow: 0 }}>
              {user && (
                <>
                  <Typography sx={{ mr: "2em", alignSelf: "center", fontSize: "1.1rem" }}>HEY, {user?.username.toUpperCase()}!</Typography>
                  <Badge sx={{ alignSelf: "center", mr: "2rem" }} badgeContent={props?.cart.length} color="error">
                    <Link to="/cart"><ShoppingCartOutlinedIcon sx={{ fontSize: "2rem", textDecoration: "none", color: "white" }} /></Link>
                  </Badge>
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
