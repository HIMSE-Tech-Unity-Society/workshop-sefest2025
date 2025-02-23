import { FC, useState } from 'react'
import { Link } from 'react-router'

import { Product } from '@/interfaces/products'
import { formatCurrency } from '@/lib/formatCurrency'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type Props = {
  data?: Product[] | null
}

const ProductCard: FC<{ product: Product }> = ({ product }) => (
  <Card key={product.category_id} className='bg-[#d5e7f7]'>
    <Link to={`/product/${product.slug}`} className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg group h-60 lg:mb-3">
      <img
        src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}cover/${product.cover}`}
        loading="lazy"
        alt={`${product.title} cover`}
        className="object-cover object-center w-full transition duration-200 h-60 group-hover:scale-110"
      />
    </Link>

    <CardContent>
      <Link to={`/product/${product.slug}`} className="capitalize mb-1 font-semibold text-[#730fc3] hover:text-[#5f0d8d] lg:text-lg">
        {product.title}
      </Link>

      <div className="flex items-end gap-2">
        <span className="font-bold text-gray-500 lg:text-lg">
          {formatCurrency(Number(product.price))}
        </span>
      </div>
    </CardContent>

    <CardFooter className='gap-3'>
      <Avatar>
        <AvatarFallback>{product.creator?.name?.[0] ?? 'A'}</AvatarFallback>
      </Avatar>
      {product.creator?.name}
    </CardFooter>
  </Card>
)

const ProductsGrid: FC<Props> = ({ data }) => {
  const [products, setProducts] = useState<Product[]>();

  setProducts([])

  const displayProducts = data || products;

  return (
    <section className='mx-5 mb-10 max-w-screen-2xl 2xl:mx-auto'>
      <h2 className="mb-5 text-2xl font-bold text-white md:text-3xl">
        Products
      </h2>

      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {!displayProducts || displayProducts.length === 0 ? (
          <h1 className='col-span-4 text-3xl font-semibold text-center text-white'>
            No products found
          </h1>
        ) : (
          displayProducts.map((product) => (
            <ProductCard key={`${product.category_id}-${product.slug}`} product={product} />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductsGrid