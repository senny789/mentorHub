import {createSlice} from '@reduxjs/toolkit'
import { randomUUID } from 'crypto'
export type userState={
    id:number,
personalInfo:{
    name:string,
    email:string,
    phone:number
},
plan:{
    type:'arcade'|'advanced'|'pro',
    period:'monthly'|'yearly'
},
addons:{
    online:boolean,
    storage:boolean,
    customize:boolean
},
totalCharge:number;
}
export const msfUserSlice=createSlice({
    name:'msfUsers',
    initialState:{
        users:[]as userState[]
    },
    reducers:{
        addUser:(state,action)=>{
            state.users.push({id:state.users.length+1,...action.payload})
        },
        removeUser:(state,action)=>{
            state.users=state.users.filter(user=>user.id!==action.payload.id)
        },
        editUser:(state,action)=>{
            state.users=state.users.map(user=>{
                if(user.id===action.payload.user.id){
                    return action.payload.user
                }
                return user
            })
        }
    }
})
export const {addUser,removeUser,editUser}=msfUserSlice.actions
export const selectUser=(state:any)=>state.msfUser.users
export default msfUserSlice.reducer