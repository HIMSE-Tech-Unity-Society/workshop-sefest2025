import { FC } from 'react'
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent } from '@/components/ui/carousel'

const CategoriesCarousel: FC = () => {
  return (
    <section className='mx-5 mb-10 max-w-screen-2xl 2xl:mx-auto'>
      <h2 className="mb-5 text-2xl font-bold text-white md:text-3xl">
        Categories
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent>
          {/* {isLoading ? Array.from({ length: 4 }).map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
              <Card className='bg-[#d5e7f7]'>
                <CardHeader>
                  <Skeleton className='w-10 h-10 rounded-full' />
                </CardHeader>

                <CardContent>
                  <Skeleton className='h-2 w-60' />
                </CardContent>
              </Card>
            </CarouselItem>
          )) : categories?.map((a: Categories) => (
            <CarouselItem key={a.category_id} className="md:basis-1/2 lg:basis-1/4">
              <Card className='bg-[#d5e7f7]'>
                <CardHeader>
                  <img src={import.meta.env.VITE_PUBLIC_API_PUBLIC_ASSET_URL + a.icon} alt={a.name} className="w-10 h-10" loading="lazy" />
                </CardHeader>

                <CardContent>
                  <Link to={`/category/${a.slug}`} className='font-semibold hover:text-[#730fc3]'>{a.name}</Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))} */}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default CategoriesCarousel