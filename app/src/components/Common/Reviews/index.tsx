import { FC } from 'react'
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarIcon } from '../CustomIcons'
import { reviews } from './constant/data'

const Reviews: FC = () => {
  return (
    <section className='mx-5 mb-10 max-w-screen-2xl 2xl:mx-auto'>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Review Customer
        </h2>

        <h2 className="text-2xl font-bold text-white md:text-3xl">
          with Products in SE-Fest Digital
        </h2>
      </div>

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
          {reviews.map((a) => (
            <CarouselItem key={`rate-${a.name}`} className="md:basis-1/2 lg:basis-1/3">
              <Card className='bg-[#d5e7f7]'>
                <CardHeader>
                  <div className='flex items-start gap-2'>
                    <Avatar>
                      <AvatarFallback>{<>{a.name.charAt(1).toLocaleUpperCase()}</>}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-start">
                      <h4 className='font-bold text-[#e8833a]'>{a.name}</h4>
                      <span className='text-xs'>{a.job}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p>{a.review}</p>
                </CardContent>

                <CardFooter>
                  {Array.from({ length: a.rating }).map((_, index) => (
                    <StarIcon key={`star-${index}`} />
                  ))}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Reviews