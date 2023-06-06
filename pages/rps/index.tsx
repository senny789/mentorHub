import React, { useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'

const RockPaperScissors = () => {
  const [score,setScore]=useState(0)
  const [playing,setPlaying]=useState(false)
  return (
    <div className={`h-screen w-screen rps p-20 overflow-scroll flex justify-center items-center`} style={{
        backgroundImage:'linear-gradient(hsl(214, 47%, 23%),hsl(237, 49%, 15%)'
        //
    }}>
      {playing?<main className='w-1/2 m-auto h-full'>
       <Head score={score}/>
       <Body setScore={setScore}/>
       </main>:<div className=' flex flex-col items-center gap-4 font-bold text-3xl'>
        <h1>Welcome to Rock Paper Scissors</h1>
        <button className='bg-green-500 rounded-xl p-4 m-auto' onClick={()=>setPlaying(true)}>Play</button>
        </div>}
    </div>
  )
}

export default RockPaperScissors