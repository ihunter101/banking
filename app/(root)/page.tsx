import RightSidebar from '@/components/RightSideBar'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Hunter', lastName: 'Gaillard', email: "hg_finance@gmail.com"}
  return (
    
    <section className='home'>
      <div className='home-content'>
        <header>
        <HeaderBox  
          type="greeting"
          title="welcome"
          user={loggedIn?.firstName || 'Guest'} 
          subtext='Access and manage your account and transactions efficiently.'
          />

        <TotalBalanceBox 
          accounts= {[]}
          totalBanks = {1}
          totalCurrentBalance = {1250.35}
        
        />

        </header>
      </div>
      <RightSidebar 
      user= {loggedIn}
      transactions= {[]}
      banks= {[{currentBalance: '4000'}, {currentBalance: 2000.50}]}
      />
    </section>
  )
}

export default Home