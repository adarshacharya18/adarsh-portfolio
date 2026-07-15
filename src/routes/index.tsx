import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Experience from '../pages/Experience';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
import Timeline from '../pages/Timeline';
import Certificates from '../pages/Certificates';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import CaseStudy from '../pages/CaseStudy';
import MainLayout from '../components/organisms/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'experience', element: <Experience /> },
      { path: 'articles', element: <Articles /> },
      { path: 'articles/:slug', element: <ArticleDetail /> },
      { path: 'timeline', element: <Timeline /> },
      { path: 'certificates', element: <Certificates /> },
      { path: 'contact', element: <Contact /> },
      { path: 'case-studies/:slug', element: <CaseStudy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
