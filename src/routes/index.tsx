/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/organisms/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const Projects = lazy(() => import('../pages/Projects'));
const Experience = lazy(() => import('../pages/Experience'));
const Articles = lazy(() => import('../pages/Articles'));
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'));
const Timeline = lazy(() => import('../pages/Timeline'));
const Certificates = lazy(() => import('../pages/Certificates'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));
const CaseStudy = lazy(() => import('../pages/CaseStudy'));

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
