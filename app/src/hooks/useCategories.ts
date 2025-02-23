import { useContext } from 'react';
import CategoriesContext from '@/context/CategoriesContext';

export const useCategories = () => {
  const categoriesContext = useContext(CategoriesContext);

  return categoriesContext;
};
