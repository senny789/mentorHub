import React, { useEffect, useMemo, useState } from 'react'
import image from '../../../assets/images/bg-triangle.svg'
import rock from '../../../assets/images/icon-rock.svg'
import paper from '../../../assets/images/icon-paper.svg'
import scissors from '../../../assets/images/icon-scissors.svg'
type Signs='rock'|'paper'|'scissors'|''
const Sign=({type}:{type:string})=>{
    const bgColorLight=type==='rock'?'bg-red-600':type==='paper'?'bg-blue-600':'bg-yellow-600'
    const bgColorDark=type==='rock'?'bg-red-800':type==='paper'?'bg-blue-800':'bg-yellow-800'
    const imageType=type==='rock'?rock:type==='paper'?paper:scissors
    return <div className={`${bgColorDark} rounded-[100%] aspect-square w-[250px] relative overflow-hidden cursor-pointer hover:opacity-[0.5]`}>
        <div className={`${bgColorLight} rounded-[100%] aspect-square w-[100%]  absolute -top-2 left-0`}>
            <div className='bg-gray-600 w-[80%] rounded-[100%] absolute top-7 left-7 aspect-square  overflow-hidden'>
        <div className='w-[100%] rounded-full aspect-square bg-white text-black absolute top-1 flex justify-between items-center'>
          <img src={imageType.src} alt='sign'  width={'100px'} className='aspect-square m-auto'></img>
        </div>
        </div>
        </div>
    </div>
}
const SelectionScreen=({setSelected}:{setSelected:(val:Signs)=>void})=>{
  return <div className='relative h-full w-full z-1 mt-20' style={{
    backgroundImage:`url(${image.src})`,
    backgroundSize:'contain',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat'
    
}}>
    <span className='absolute top-72 left-[30%]' onClick={()=>setSelected('rock')} > 
    <Sign type='rock'/>
    </span>
    <span className='absolute -top-10 -left-10 ' onClick={()=>setSelected('paper')} >
    <Sign type='paper'/>
    </span>
    <span className='absolute -top-10 right-0' onClick={()=>setSelected('scissors')}> 
    <Sign type='scissors'/>
    </span>
</div>
}
const PlayingScreen=({selected,setScore,setSelected,sennySign,status}:{status:string,sennySign:string,selected:Signs,setSelected:(val:Signs)=>void,setScore:(val:any)=>void})=>{
  
  return (
    <div className='flex gap-15 w-full z-1 mt-20'>
      <section  className='flex flex-col gap-10 items-center'>
        <h1 className='text-3xl text-white font-bold'>You Picked</h1>
        <Sign type={selected}/>
      </section>
      <section className='flex flex-col gap-10 justify-center items-center p-5'>
        <h1 className='text-3xl text-white font-bold'>You {status}</h1>
        <button className='bg-white rounded-xl py-2 px-8  text-black' onClick={()=>setSelected('')}>Play Again</button>
      </section>
      <section className='flex flex-col gap-10 items-center'>
        <h1 className='text-3xl text-white font-bold'>Senny Picked</h1>
        <Sign type={sennySign}/>
      </section>
    </div>
  )

}
const Body = ({setScore}:{setScore:(val:any)=>void}) => {
  const [selected,setSelected]=useState<Signs>('')
  const sennySign=useMemo(()=>['rock','paper','scissors'][Math.floor(Math.random()*3)],[selected])
  console.log(sennySign)
  const [status,setStatus]=useState('')
  const scoreChanger=()=>{
    switch(selected){
      case 'rock':
        switch(sennySign){
          case 'rock':
            setStatus('Draw')
            setScore((sc:number)=>sc)
            return;
          case 'paper':
            setStatus('Lose')
            setScore((sc:number)=>{return sc-1})
            return;
          case 'scissors':
            setStatus('Won')
            setScore((sc:number)=>{return sc+1})
            return
        }
        break;
      case 'paper':
        switch(sennySign){
          case 'rock':
            setStatus('Won')
            setScore((sc:number)=>{return sc+1})
            return;
          case 'paper':
            setStatus('Draw')
            return;
          case 'scissors':
            setStatus('Lose')
            setScore((sc:number)=>{return sc-1})
            return
        }
        break;
      case 'scissors':
        switch(sennySign){
          case 'rock':
            setStatus('Lose')
            setScore((sc:number)=>{return sc-1})
            return;
          case 'paper':
            setStatus('Won')
            setScore((sc:number)=>{return sc+1})
            return;
          case 'scissors':
            setStatus('Draw')
            return
        }
        break;
    }
  }
  useEffect(()=>{
    if(selected!==''){
scoreChanger()
    }
  },[selected])
  return (
    (selected==='')?<SelectionScreen setSelected={setSelected}/>:<PlayingScreen status={status} sennySign={sennySign} selected={selected} setSelected={setSelected} setScore={setScore}/>
  )
}

export default Body