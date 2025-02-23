import { FC } from 'react';
import { useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  query?: string | null;
}

const Hero: FC<Props> = ({ query }) => {
  const navigate = useNavigate();

  const formSchema = z.object({
    keyword: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: query ? query : '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const searchParams = new URLSearchParams();
    searchParams.append('keyword', value.keyword);

    setTimeout(() => {
      navigate(`/?${searchParams.toString()}`);
    }, 500);
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[700px] gap-3">
      <div className='mb-5'>
        <h1 className='font-extrabold text-4xl md:text-6xl lg:text-7xl text-white text-center'>{query ? 'Search By:' : 'Turn Items'}</h1>
        <h1 className='font-extrabold text-4xl md:text-6xl lg:text-7xl text-white text-center capitalize'>{query ? query : 'into a New Opportunity'}</h1>

        {!query ? (
          <p className='font-samibold text-base lg:text-xl mt-5 text-gray-300 text-center'>The top marketplace made by SE-Fest 2025</p>
        ) : null}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-center flex-row">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Search Product..."
                    className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid || isSubmitting} className="w-full py-2 font-bold text-white transition duration-300 ease-linear bg-[#730fc3] rounded-lg hover:bg-[#5f0d8d]">Search</Button>
        </form>
      </Form>
    </section>
  )
}

export default Hero