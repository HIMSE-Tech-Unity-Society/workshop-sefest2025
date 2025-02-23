import { FC, useState } from 'react'
import { useLocation } from 'react-router'

import { Product } from '@/interfaces/products'
import MainLayout from '@/layouts/MainLayout'
import Hero from '@/components/Common/Hero'
import Reviews from '@/components/Common/Reviews'
import CallToAction from '@/components/Common/CallToAction'
import ProductsGrid from '@/components/Common/ProductsGrid'

const ContainerCategory: FC = () => {
  const [data, setData] = useState<Product[]>()

  const location = useLocation()

  const q = location.pathname.split('/')[2]

  setData([])

  return (
    <MainLayout>
      <Hero query={q} />
      <ProductsGrid data={data} />
      <Reviews />
      <CallToAction />
    </MainLayout>
  )
}

export default ContainerCategory