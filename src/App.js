
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { Stats, SharedLayout } from './pages/dashboard';

function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <SharedLayout />
            }
          >

            <Route index element={<Stats />} />
          </Route>
        </Routes>

      </BrowserRouter>

    );
  }


export default App;
