import { FC } from 'react';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import MainLayout from '@/layouts/MainLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ContainerLogin: FC = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({ message: 'Email not valid!' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters!' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      // fetching below
      console.log(value)

      toast("Login Success!", {
        description: 'You have successfully logged in!',
        closeButton: true,
        style: {
          background: 'oklch(0.627 0.194 149.214)',
          color: 'oklch(0.975 0.037 149.214)',
        },
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch {
      toast("Oops! Something went wrong!", {
        description: 'Email or Password invalid! Please try again.',
        closeButton: true,
        style: {
          background: 'oklch(0.577 0.245 27.325)',
          color: 'oklch(0.975 0.037 149.214)',
        },
      });
    }
  }

  return (
    <MainLayout>
      <section className="flex items-center justify-center min-h-screen gap-3 md:py-24 lg:py-0">
        <Card className='mx-5'>
          <div className="flex flex-col items-center justify-between py-5 lg:py-16 lg:flex-row">
            <div className="w-full px-4 mx-5 mb-10 lg:mb-0 lg:w-1/2">
              <img
                src="/assets/svg/undraw_login.svg"
                loading="lazy"
                alt="Hero Illustration"
                className="object-cover object-center h-full md:w-[500px] lg:w-full lg:h-full"
              />
            </div>

            <div className="w-full px-4 mx-5 lg:w-1/2">
              <div className="flex items-center justify-center mb-5">
                <h1 className="text-2xl font-bold text-center lg:text-3xl">
                  Welcome to <span className='text-[#730fc3]'>SE-Fest Digital</span>!
                </h1>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} autoFocus />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} type="password" placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={!isValid || isSubmitting} className="w-full py-2 mt-3 font-bold text-white transition duration-300 ease-linear bg-[#730fc3] rounded-lg hover:bg-[#5f0d8d]">Submit</Button>
                </form>
              </Form>

              <div className="flex items-center justify-center mt-5">
                <p className="text-slate-600">
                  Doesn't have account?{' '}
                  <Link to="/auth/register" className="font-bold text-[#730fc3]">
                    Sign Up here!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default ContainerLogin;
