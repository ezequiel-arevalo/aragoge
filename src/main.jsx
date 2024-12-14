import { HashRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { App } from "./App.jsx";
import store from '@/redux/store';
import theme from '@/contexts/theme';
import '@/assets/css/global.css';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HashRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </HashRouter>
  </Provider>
);
