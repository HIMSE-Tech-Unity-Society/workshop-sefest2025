import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { CreditCard, Landmark, User } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { OtherProduct, Product } from '@/interfaces/products';
import MainLayout from '@/layouts/MainLayout'
import { formatCurrency } from '@/lib/formatCurrency'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

const ContainerCheckout: FC = () => {
  const [data, setData] = useState<{ product: Product, others: OtherProduct[] }>()

  const location = useLocation();
  const navigate = useNavigate();

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const formSchema = z.object({
    proof: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Image is required")
      .refine((files) => files.length <= 1, "Only one file is allowed")
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proof: undefined,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value)

    // setTimeout(() => {
    //   navigate('/success');
    // }, 1000);
  }

  return (
    <MainLayout>
      <section className='flex flex-col justify-center min-h-screen gap-3 py-40 mx-5 max-w-screen-2xl 2xl:mx-auto'>
        <h1 className='text-2xl font-bold text-white md:text-3xl'>Checkout</h1>

        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            <Card className='bg-[#d5e7f7]'>
              <div className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg group h-60 lg:mb-3">
                <img src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}cover/${data?.product?.cover}`} alt={data?.product?.title} loading="lazy" className="object-cover object-center w-full transition duration-200 h-60 group-hover:scale-110" />
              </div>

              <CardContent>
                <h1 className="capitalize mb-1 font-semibold text-[#730fc3] hover:text-[#5f0d8d] lg:text-lg">{data?.product?.title}</h1>

                <div className='my-2'>
                  <Badge variant='secondary' className='lg:text-base'>
                    {data?.product.category.name}
                  </Badge>
                </div>

                <div className="flex items-end gap-2">
                  <span className="font-bold text-gray-500 lg:text-lg">{formatCurrency(Number(data?.product.price))}</span>
                </div>
              </CardContent>

              <CardFooter className='gap-3'>
                <Avatar>
                  <AvatarImage src={`${import.meta.env.VITE_PUBLIC_API_STORAGE_URL}/${data?.product.creator.avatar}`} alt={data?.product.creator.name} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className='font-bold text-lg text-[#730fc3]'>{data?.product.creator?.name}</h3>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-3">
            <Card className='bg-[#d5e7f7] w-full mb-3'>
              <div className="flex items-center justify-between p-6">
                <div className="flex flex-col justify-start">
                  <h1 className='text-xl font-semibold text-gray-500'>Account Number</h1>
                  <span className='text-2xl font-semibold'>{user?.account_number}</span>
                </div>

                <div className="flex flex-col justify-start">
                  <Avatar>
                    <AvatarFallback>
                      <CreditCard />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between gap-3">
              <Card className='bg-[#d5e7f7] w-1/2 mb-3'>
                <div className="flex items-center justify-between p-6">
                  <div className="flex flex-col justify-start">
                    <h1 className='text-xl font-semibold text-gray-500'>Bank Name</h1>
                    <span className='text-2xl font-semibold uppercase'>{user?.bank_name}</span>
                  </div>

                  <div className="flex flex-col justify-start">
                    <Avatar>
                      <AvatarFallback>
                        <Landmark />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Card>

              <Card className='bg-[#d5e7f7] w-1/2 mb-3'>
                <div className="flex items-center justify-between p-6">
                  <div className="flex flex-col justify-start">
                    <h1 className='text-xl font-semibold text-gray-500'>Account Owner Name</h1>
                    <span className='text-2xl font-semibold'>{user?.account_owner_name}</span>
                  </div>

                  <div className="flex flex-col justify-start">
                    <Avatar>
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Card>
            </div>

            <Card className='bg-[#d5e7f7] w-full mb-3'>
              <CardHeader>
                <h1>Confirm Payment</h1>

                <CardDescription>
                  <p>Please upload proof of payment, we'll verify it and confirm your payment.</p>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex items-center justify-between gap-3'>
                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name="proof"
                          render={({ field: { onChange } }) => (
                            <FormItem>
                              <FormLabel>Transaction Approvement</FormLabel>
                              <FormControl>
                                <Input
                                  type='file'
                                  disabled={isSubmitting}
                                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70"
                                  onChange={(e) => onChange(e.target.files)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={!isValid || isSubmitting} className="w-full py-2 mt-3 font-bold text-white transition duration-300 ease-linear bg-[#730fc3] rounded-lg hover:bg-[#5f0d8d]">Pay!</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout >
  )
}

export default ContainerCheckout