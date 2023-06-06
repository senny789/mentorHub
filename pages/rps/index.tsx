import React, { useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'

const RockPaperScissors = () => {
  const [score,setScore]=useState(0)
  
  return (
    <div className={`h-screen w-screen rps p-20 overflow-scroll`} style={{
        backgroundImage:'linear-gradient(hsl(214, 47%, 23%),hsl(237, 49%, 15%)'
        //
    }}>
      <main className='w-1/2 m-auto h-full'>
       <Head score={score}/>
       <Body setScore={setScore}/>
       </main>
    </div>
  )
}

export default RockPaperScissors