import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Home } from './pages/Home/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<h1>Not found!</h1>} />
      <Route path="*" element={<h1>404 - Page not found</h1>} />
    </>
  )
);
