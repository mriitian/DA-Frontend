import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import { createTheme, colors, ThemeProvider } from '@mui/material';
import store, { persistor } from './store/index'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
