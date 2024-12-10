import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-4">
        {children}
      </div>
        <div className='auth-asset '>
            <div>
                <Image src='/icons/auth-image.svg'
                alt= 'Auth Image'
                width={500}
                height={500}/>
            </div>
        </div>
        </main>
  );
}
