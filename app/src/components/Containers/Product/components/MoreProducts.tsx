import { FC } from 'react'
import { Link } from 'react-router'
import Autoplay from "embla-carousel-autoplay"

import { OtherProduct } from '@/interfaces/products'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency } from '@/lib/formatCurrency'

type Props = {
  data?: OtherProduct[] | null
}

const MoreProducts: FC<Props> = ({ data }) => {
  return (
    <section className='w-full mx-5 mb-10 max-w-screen-2xl 2xl:mx-auto'>
      <h2 className="mb-5 text-2xl font-bold text-white md:text-3xl">
        More Products
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {data?.map((a: OtherProduct) => (
            <CarouselItem key={a.product_id} className="md:basis-1/2 lg:basis-1/3">
              <Card className='bg-[#d5e7f7]'>
                <Link to="/product/awdawd" className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg group h-60 lg:mb-3">
                  <img src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}cover/${a?.cover}`} alt={a?.title} loading="lazy" className="object-cover object-center w-full transition duration-200 h-60 group-hover:scale-110" />
                </Link>

                <CardContent>
                  <Link to="/product/awdawd" className="mb-1 font-semibold text-[#730fc3] hover:text-[#5f0d8d] lg:text-lg">{a.title}</Link>

                  <div className="flex items-end gap-2">
                    <span className="font-bold text-gray-500 lg:text-lg">{formatCurrency(Number(a.price))}</span>
                  </div>
                </CardContent>

                <CardFooter className='gap-3'>
                  <Avatar>
                    <AvatarImage src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}/${a?.creator.avatar}`} alt={a?.creator.name} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  {a?.creator.name}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default MoreProducts