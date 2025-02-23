import { FC, useState } from 'react'
import { useSearchParams } from 'react-router'

import { Product } from '@/interfaces/products'
import MainLayout from '@/layouts/MainLayout'
import Hero from '@/components/Common/Hero'
import Reviews from '@/components/Common/Reviews'
import CallToAction from '@/components/Common/CallToAction'
import ProductsGrid from '@/components/Common/ProductsGrid'
import CategoriesCarousel from './components/Categories'

const ContainerHome: FC = () => {
  const [data, setData] = useState<Product[] | null>(null)

  const [searchParams] = useSearchParams()

  const q = searchParams.get('keyword')

  return (
    <MainLayout>
      <Hero query={q} />
      {!q && <CategoriesCarousel />}
      <ProductsGrid data={data} />
      <Reviews />
      <CallToAction />
    </MainLayout>
  )
}

export default ContainerHome