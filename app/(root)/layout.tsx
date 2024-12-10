//app>(root)>layout.tsx

import MobileNav from '@/components/MobileNav';
import SideBar from '@/components/SideBar';
import { getLoggedInUser } from '@/lib/actions/useractions';
import Image from 'next/image';
import { redirect } from 'next/navigation';

/**
 * The root layout component for the app.
 *
 * This component is responsible for rendering the side bar, mobile nav, and
 * the main content area of the app.
 *
 * @param {{ children: React.ReactNode }} props The props object for the
 * component.
 * @returns {JSX.Element} The JSX element to be rendered.
 */
/**
 * The root layout component for the app.
 *
 * This component is responsible for rendering the side bar, mobile nav, and
 * the main content area of the app.
 *
 * @param {{ children: React.ReactNode }} props The props object for the
 * component.
 * @returns {JSX.Element} The JSX element to be rendered.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in');
    
  return (
    <main className='flex h-screen w-full font-inter'>
        <SideBar user={loggedIn} />

        <div className='flex-1 size-full flex-col'>

          <div className="root-layout">
            < Image 
              src="/icons/logo.svg" 
              alt="logo"
              width={30} 
              height={30}/>

              <div>
                <MobileNav user={loggedIn}
                
                />
              </div>
          </div>
            {children}
        </div>
        </main>
  );
}
