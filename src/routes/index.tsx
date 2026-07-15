import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';
import MainLayout from '../components/organisms/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'case-studies/:slug',
        element: <CaseStudy />,
      },
    ],
  },
]);
