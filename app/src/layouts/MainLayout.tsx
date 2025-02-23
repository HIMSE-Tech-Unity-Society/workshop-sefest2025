import { FC, ReactNode } from 'react';

import Navbar from '@/components/Mixins/Navbar';
import Footer from '@/components/Mixins/Footer';

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className='bg-[linear-gradient(135deg,#1b004f,#54008b,#c700ff)]'>{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
