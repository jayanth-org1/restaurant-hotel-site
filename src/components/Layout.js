import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Cart from './Cart';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Order History', path: '/order-history' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fine Dining
          </Typography>
          
          <Cart />
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {navItems.map((item) => (
                <Button 
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{ 
                    mx: 1,
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                    borderBottom: isActive(item.path) ? '2px solid white' : 'none'
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.name} 
                component={RouterLink} 
                to={item.path}
                selected={isActive(item.path)}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main">
        {children}
      </Box>
      
      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} Fine Dining Restaurant. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Layout; 