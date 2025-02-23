import { FC } from 'react';
import { Link } from 'react-router';

import { useCategories } from '@/hooks/useCategories';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/Common/CustomIcons';
import { Categories } from '@/interfaces/categories';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  const { categories } = useCategories();

  const secondaryLink = [
    { title: 'Order', url: '/order' },
    { title: 'Journal', url: '/journal' },
  ];

  const tertiaryLink = [
    { title: 'Contact Us', url: '/contact' },
    { title: 'FAQ', url: '/faq' },
  ];

  const legalLink = [
    { title: 'Terms of Service', url: '/terms-of-service' },
    { title: 'Privacy Policy', url: '/privacy-policy' },
  ];

  const socialLink = [
    { title: 'Facebook', icon: <FacebookIcon />, url: '/' },
    { title: 'Instagram', icon: <InstagramIcon />, url: '/' },
    { title: 'Twitter', icon: <TwitterIcon />, url: '/' },
    { title: 'LinkedIn', icon: <LinkedInIcon />, url: '/' },
  ];

  return (
    <div className="bg-[#e3cff3]">
      <footer className="px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-2 gap-12 pt-10 mb-16 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12">
          <div className="col-span-full lg:col-span-2">
            <div className="mb-4">
              <Link to="/" aria-label="logo" className='className="inline-flex items-center gap-2 text-xl font-bold text-gray-100 font-primary md:text-2xl"'>
                <img
                  src="/assets/svg/logo-footer.svg"
                  alt="Brand Logo"
                  className="object-cover object-center h-full w-60"
                />
              </Link>
            </div>

            <p className="mb-6 text-justify text-[#293845] sm:pr-8">
              Turn Items into a New Opportunity.
            </p>

            <div className="flex gap-4">
              {socialLink?.map((f, i) => (
                <Link
                  to={f.url}
                  target="_blank"
                  className="text-[#293845] transition duration-100 hover:text-[#730fc3]"
                  rel="noreferrer"
                  key={i}
                >
                  {f.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 font-bold tracking-widest text-[#5f0d8d] uppercase">
              Browse
            </div>

            <nav className="flex flex-col gap-4">
              <div>
                <Link to="/" className="text-[#293845] transition duration-100 hover:text-[#730fc3]">
                  All Products
                </Link>
              </div>

              {categories?.map((b: Categories) => (
                <div key={b.category_id}>
                  <Link to={`/category/${b.slug}`} className="text-[#293845] transition duration-100 hover:text-[#730fc3]">
                    {b.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold tracking-widest text-[#5f0d8d] uppercase">
              Others
            </div>

            <nav className="flex flex-col gap-4">
              {secondaryLink?.map((c, i) => (
                <div key={i}>
                  <Link to={c.url} className="text-[#293845] transition duration-100 hover:text-[#730fc3]">
                    {c.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold tracking-widest text-[#5f0d8d] uppercase">
              Helps
            </div>

            <nav className="flex flex-col gap-4">
              {tertiaryLink?.map((d, i) => (
                <div key={i}>
                  <Link to={d.url} className="text-[#293845] transition duration-100 hover:text-[#730fc3]">
                    {d.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold tracking-widest text-[#5f0d8d] uppercase">
              Legal
            </div>

            <nav className="flex flex-col gap-4">
              {legalLink?.map((e, i) => (
                <div key={i}>
                  <Link to={e.url} className="text-[#293845] transition duration-100 hover:text-[#730fc3]">
                    {e.title}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="py-8 text-sm text-center text-[#293845] border-t border-[#293845]">
          © {year} - SE-Fest Digital. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
