import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { store } from './store/store';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <Provider store={store} >
        <BrowserRouter>
          <Routes>
            {
                routes.map((route, index) => {
                const { component, path } = route

                return <Route key={index} path={path} element={component} />
              })
            }
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
