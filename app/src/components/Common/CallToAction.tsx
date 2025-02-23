import { FC } from 'react'
import { Link } from 'react-router'

import { Button, buttonVariants } from '../ui/button'

const CallToAction: FC = () => {
  return (
    <section className='pb-10 mx-5'>
      <div className="bg-[#d5e7f7] rounded-lg items-center max-w-screen-2xl gap-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 p-6">
        <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" />
        <img className="hidden w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#730fc3]">Thousands of Happy Users are Here, When You?</h2>
          <p className="mb-6 font-normal md:text-lg text-[#788896]">Empowering Your Pre-Loved Journey Together, Let's Make Every Item Matter.</p>

          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button className='bg-[#730fc3] hover:bg-[#5f0d8d] transition duration-150 ease-linear'>
                Sell Product
              </Button>
            </Link>

            <Link to="/" className={buttonVariants({ variant: 'link', className: 'text-[#730fc3] hover:text-[#5f0d8d]' })}>
              Buy Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction