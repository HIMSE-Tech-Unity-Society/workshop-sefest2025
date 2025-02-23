
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Categories } from '@/interfaces/categories';
import { useAxios } from '@/hooks/useAxios';

type Props = {
  children: ReactNode;
};

type ContextType = {
  categories?: Categories[];
  isLoading: boolean;
  setCategories: Dispatch<SetStateAction<Categories[] | undefined>>;
};

const defaultValue: ContextType = {
  isLoading: false,
  setCategories: () => null,
};

const CategoriesContext = createContext<ContextType>(defaultValue);

export const CategoriesProvider: FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<Categories[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const axios = useAxios();

  const fetchCategories = useCallback(async () => {
    //
  }, []);

  useEffect(() => {
    Promise.all([fetchCategories()]);
  }, [fetchCategories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        setCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
