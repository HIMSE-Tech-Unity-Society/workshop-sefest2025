import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { OtherProduct, Product } from '@/interfaces/products'
import MainLayout from '@/layouts/MainLayout'
import { formatCurrency } from '@/lib/formatCurrency'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import MoreProducts from './components/MoreProducts'

const ContainerProduct: FC = () => {
  const [data, setData] = useState<{ product: Product, others: OtherProduct[] }>()

  const location = useLocation()
  const navigate = useNavigate()

  const handleCheckOwnProduct = () => {
    if (data?.product.creator.name === 'awdawda') {
      toast("Oops! Something went wrong!", {
        description: "You cannot buy your own product",
        closeButton: true,
        style: {
          background: 'oklch(0.577 0.245 27.325)',
          color: 'oklch(0.975 0.037 149.214)',
        },
      });
    } else {
      navigate(`/checkout/${data?.product.slug}`)
    }
  }

  return (
    <MainLayout>
      <section className="flex flex-col justify-center min-h-screen gap-3 py-40 mx-5 max-w-screen-2xl 2xl:mx-auto">
        <div className="flex items-center justify-end w-full">
          <Badge variant='secondary' className='lg:text-base'>
            {data?.product?.category?.name}
          </Badge>
        </div>

        <h1 className='max-w-md mb-5 text-3xl font-bold text-white capitalize md:text-5xl lg:text-7xl'>{data?.product.title}</h1>

        <img src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}cover/${data?.product.cover}`} alt={data?.product.title} className="rounded-lg aspect-video max-h-[600px] object-cover object-center" />

        <div className="flex items-start justify-between gap-3 mb-20">
          <div className="w-full lg:w-1/2">
            <Card className='bg-[#d5e7f7]'>
              <CardHeader>
                <h3 className='font-bold text-xl text-[#730fc3]'>Overview</h3>
              </CardHeader>

              <CardContent>
                <p className='text-justify'>{data?.product.overview}</p>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-1/2">
            <Card className='bg-[#d5e7f7]'>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}/${data?.product.creator.avatar}`} alt={data?.product.creator.name} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <h3 className='font-bold text-lg text-[#730fc3]'>{data?.product.creator?.name}</h3>
                    <p className='text-sm text-[#788896]'>{data?.product.creator?.totalproductbycreator} Products</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className='mb-8 text-justify'>{data?.product.creator.job}</p>

                <span className='text-3xl font-bold'>{formatCurrency(Number(data?.product.price))}</span>
              </CardContent>

              <CardFooter>
                <Button onClick={() => handleCheckOwnProduct()} className='w-full bg-[#730fc3] hover:bg-[#5f0d8d] text-lg font-bold py-6 transition duration-150 ease-linear'>
                  Checkout Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {data?.others?.length !== 0 && <MoreProducts data={data?.others} />}
      </section>
    </MainLayout>
  )
}

export default ContainerProduct