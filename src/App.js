import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import OrderHistory from './pages/OrderHistory';

// Context
import { CartProvider } from './context/CartContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8d6e63', // Brown color for restaurant theme
    },
    secondary: {
      main: '#ff9800', // Orange accent
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserPreferencesProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<Reservation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}

export default App; 