import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(()=> import('./pages/NotFound'))

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
