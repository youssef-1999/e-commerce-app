import { createSlice } from "@reduxjs/toolkit";

//state
let initialState={
    counter:0
}

//name ,inintialSyate,methods in type of object

let counterSlice=createSlice(
    {
        name:'counter',
        initialState,
        reducers:{
            increase:(state)=>
                {
                    state.counter++
                },
            descrease:(state)=>
                {
                    state.counter--
                }
        }
    }
)

export let counterReducer=counterSlice.reducer
export let {increase,descrease}=counterSlice.actions