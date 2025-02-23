import { FC } from 'react'
import { Link } from 'react-router'

import { siteMetadata } from '@/data/siteMetadata'
import MainLayout from '@/layouts/MainLayout'
import { Card } from '@/components/ui/card'

const ContainerAbout: FC = () => {
  return (
    <MainLayout>
      <section className="flex items-center justify-center min-h-screen gap-3 md:py-24 lg:py-0">
        <Card className='mx-5 max-w-7xl'>
          <div className="flex flex-wrap">
            <div className="w-full p-5">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                <div className="h-64 overflow-hidden bg-gray-100 rounded-lg shadow-lg md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600&h=750"
                    loading="lazy"
                    alt="Laptop"
                    className="object-cover object-center w-full h-full"
                  />
                </div>

                <div className="md:pt-8">
                  <h1 className="mb-4 text-2xl font-bold text-center sm:text-3xl md:text-left md:mb-6">
                    Tentang React.js Typescript Starter Project.
                  </h1>

                  <p className="mb-6 text-justify sm:text-lg md:mb-8">
                    <span className="p-1 font-mono bg-gray-200 rounded">
                      React.js Typescript Starter Project
                    </span>{' '}
                    adalah sebuah templat proyek awal yang dibuat dengan
                    React.js, Typescript, dan beberapa <i>library</i> lainnya.
                    Project ini dibuat untuk mempermudah dalam membuat proyek
                    baru dengan React.js dan Typescript.
                  </p>

                  <p className="mb-6 text-justify sm:text-lg md:mb-8">
                    Dibuatnya templat Proyek ini berawal dari sebuah keresahan{' '}
                    <Link
                      to={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline transition duration-100 hover:text-blue-600 active:text-blue-700"
                    >
                      Saya
                    </Link>{' '}
                    saat membuat proyek baru dengan React.js dan Typescript.
                    Karena Saya merasa harus membuat proyek baru dari awal,
                    mulai dari membuat folder <i>components</i>,{' '}
                    <i>components</i>, <i>containers</i>, <i>layouts</i>,
                    <i>utils</i>, dan masih banyak hal lain. Dan juga harus
                    menginstall beberapa <i>library</i> yang sering Saya
                    gunakan.
                  </p>

                  <p className="mb-6 text-justify sm:text-lg md:mb-8">
                    Dengan dibuatnya templat proyek ini diharapkan dapat
                    mempermudah dalam membuat proyek baru dengan React.js dan
                    Typescript. Hanya dengan menjalankan perintah:{' '}
                    <span className="bg-gray-200 text-[15px] p-1 rounded font-mono">
                      npx degit nuflakbrr/frontend-template#reactjs-ts nama-proyek
                    </span>
                  </p>

                  <p className="mb-6 text-justify sm:text-lg md:mb-8">
                    Maka kita hanya perlu menjalankan perintah{' '}
                    <span className="bg-gray-200 text-[15px] p-1 rounded font-mono">
                      npm install
                    </span>
                    untuk menginstall semua <i>library</i> yang ada pada templat
                    proyek ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </MainLayout>
  )
}

export default ContainerAbout