// app/page.js
import Head from 'next/head';
import Image from 'next/image';
import TestForm from './_components/TestForm';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Web Contact Form Telegram Widget</title>
        <meta name="description" content="Easily connect your web contact form to Telegram." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto min-h-screen ">
        <div className="flex  p-4 bg-gray-100 items-center justify-center">
          <div className="text-center">
            <Image
              src="/logo-color.png"
              alt="Company Logo"
              width={150}
              height={150}
              priority
            />
            <h1 className="text-2xl font-bold mt-5">Welcome to Our Web Contact Form Telegram Service</h1>
            <p className="mt-2 text-gray-600">
              Connect your contact form directly to your Telegram for instant notifications.
            </p>
          </div>
        </div>

        <TestForm />
      </main>
    </>
  );
}
