import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'

import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { Toaster } from './components/ui/sonner';
import router from './config/route';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <CategoriesProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CategoriesProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
