import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Replace static imports with lazy imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Product = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));

// Import non-lazy components (keep these standard)
import Navbar from './pages/Nav';
import Footer from './pages/Footer';
import ErrorBoundary from './pages/ErrorBoundary';
import PageLoader from './pages/PageLoader';

function App() {
  return (
      <div>
      <Navbar />
      
      {/* 2. Wrap Routes in Suspense */}
      {/* The fallback is what shows for a split second while the page loads */}
      
        <ErrorBoundary> {/* This catches the crash */}
    <Suspense fallback={<PageLoader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
    

      <Footer />
      </div>
    
  );
}

export default App;