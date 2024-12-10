import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen w-full justify-between font-inter">
        {children}
        <div className='auth-asset'>
            <div>
                <Image src='/icons/auth-image.svg'
                alt= 'Auth Image'
                width={200}
                height={200}/>
            </div>
        </div>
        </main>
  );
}
