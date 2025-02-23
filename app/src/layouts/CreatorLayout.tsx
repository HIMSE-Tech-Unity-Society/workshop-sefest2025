import { FC, ReactNode } from 'react';

import NavbarCreator from '@/components/Mixins/Navbar/Creator';
import Footer from '@/components/Mixins/Footer';

type Props = {
  children?: ReactNode;
};

const CreatorLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <NavbarCreator />

      <main className='bg-[linear-gradient(135deg,#1b004f,#54008b,#c700ff)]'>{children}</main>

      <Footer />
    </>
  );
};

export default CreatorLayout;
