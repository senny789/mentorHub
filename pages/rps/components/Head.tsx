import React from 'react'

const Head = ({score}:{score:number}) => {
  return (
    <header className='border border-10-white rounded-xl p-4 flex justify-between'>
       <h1 className='text-4xl font-semibold flex flex-col '><span>Rock</span><span>Paper</span><span>Scissors</span></h1>
       <span  className='bg-white p-4 rounded-xl'>
        <p className='text-[hsl(229,64%,46%)] font-semibold text-xl'>SCORE</p>
        <h1 className='text-[hsl(229,25%,31%)] text-5xl font-bold'>{score}</h1>
       </span>
        </header>
  )
}

export default Head