import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import { createTheme, colors, ThemeProvider } from '@mui/material';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@mui/material';
import { useAxiosInterceptors } from './utilities/api/axios'; // Import the hook

const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal[300],
      light: '#f9fafe',
      dark: colors.teal[700],
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: colors.grey[600],
    },
  },
});

function App() {
  // Nested component to properly use the interceptor hook
  const InterceptorsSetup = () => {
    useAxiosInterceptors(); // Set up axios interceptors correctly inside a functional component
    return null; // This component doesn't render anything
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<CircularProgress />}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <InterceptorsSetup /> {/* Ensure interceptors are set up */}
            <Navbar />
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
