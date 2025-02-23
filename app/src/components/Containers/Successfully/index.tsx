import { FC } from 'react'
import { Link } from 'react-router'

import MainLayout from '@/layouts/MainLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ContainerSuccessfully: FC = () => {
  return (
    <MainLayout>
      <section className="flex flex-col justify-center min-h-screen gap-3 py-40 mx-5 max-w-screen-2xl 2xl:mx-auto">
        <div className="container mx-auto max-w-screen-2xl">
          <Card className='py-20'>
            <div className="max-w-sm mx-auto mb-10">
              <img
                src="/assets/svg/undraw_successful-purchase.svg"
                loading="lazy"
                alt="Successfully"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div className='text-center'>
              <h1 className='font-bold mb-3 text-4xl text-[#730fc3]'>Successfully Checkout!</h1>

              <p className='mb-5 text-lg text-gray-500'>
                Thank you for your purchase! We&apos;ll be in touch with you soon.
              </p>

              <Link to="/creator">
                <Button className='bg-[#730fc3] hover:bg-[#5f0d8d] font-semibold transition duration-150 ease-linear'>Check Transaction</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContainerSuccessfully