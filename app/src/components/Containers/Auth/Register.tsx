import { FC } from 'react';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
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
import { toast } from 'sonner';

const ContainerRegister: FC = () => {
  const navigate = useNavigate();

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters!' }),
    avatar: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Image is required")
      .refine((files) => files.length <= 1, "Only one file is allowed")
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
      ),
    email: z.string().email({ message: 'Email not valid!' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters!' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirm_password: z.string(),
    job: z.string().min(3, { message: 'Job must be at least 3 characters!' }),
    bank_name: z.string().min(3, { message: 'Bank Name must be at least 3 characters!' }),
    account_number: z.string().min(3, { message: 'Account Number must be at least 3 characters!' }),
    account_owner_name: z.string().min(3, { message: 'Account Owner Name must be at least 3 characters!' }),
  }).superRefine(({ confirm_password, password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirm_password'],
      });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      avatar: undefined,
      email: '',
      password: '',
      confirm_password: '',
      job: '',
      bank_name: '',
      account_number: '',
      account_owner_name: '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      // fetching below
      console.log(value)

      toast.success("Account Successfully Created!", {
        description: 'Please login to your account!',
        closeButton: true,
        style: {
          background: 'oklch(0.577 0.245 27.325)',
          color: 'oklch(0.975 0.037 149.214)',
        },
      });

      setTimeout(() => {
        navigate('/auth/login');
      }, 1000);
    } catch (err: Error | any) {
      toast("Oops! Something went wrong!", {
        description: err.message,
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
      <section className="flex items-center justify-center min-h-screen gap-3 py-32 md:py-24 lg:py-0">
        <Card className='mx-5'>
          <div className="flex flex-col items-center justify-between py-5 lg:py-16 lg:flex-row">
            <div className="w-full px-4 mx-5 mb-10 lg:mb-0 lg:w-1/2">
              <img
                src="/assets/svg/undraw_register.svg"
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
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='flex items-center justify-between gap-3'>
                    <div className="w-full lg:w-1/2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} autoFocus />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full lg:w-1/2">
                      <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field: { onChange } }) => (
                          <FormItem>
                            <FormLabel>Avatar</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job</FormLabel>
                        <FormControl>
                          <Input placeholder="Graphic Designer" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bank_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="BCA" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="account_owner_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Owner Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="account_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" disabled={isSubmitting} className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex items-center justify-between gap-3'>
                    <div className="w-full lg:w-1/2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" disabled={isSubmitting} placeholder="********" className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full lg:w-1/2">
                      <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password Confirmation</FormLabel>
                            <FormControl>
                              <Input type="password" disabled={isSubmitting} placeholder="********" className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#730fc3]/70" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={!isValid || isSubmitting} className="w-full py-2 mt-3 font-bold text-white transition duration-300 ease-linear bg-[#730fc3] rounded-lg hover:bg-[#5f0d8d]">Submit</Button>
                </form>
              </Form>

              <div className="flex items-center justify-center mt-5">
                <p className="text-slate-600">
                  Have an account?{' '}
                  <Link to="/auth/login" className="font-bold text-[#730fc3]">
                    Log In here!
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

export default ContainerRegister;
