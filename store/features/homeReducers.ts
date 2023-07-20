import {createSlice} from '@reduxjs/toolkit'

export const homeSlice=createSlice({
    name:'home',
    initialState:{
        demo:false
    },reducers:{
    toggleDemoPage:(state)=>{
        state.demo=!state.demo
    }   
    }
    })
    
    export const {toggleDemoPage}=homeSlice.actions
    export const selectDemo = (state:any) => state.home.demo
    export default homeSlice.reducer