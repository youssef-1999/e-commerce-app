import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
let initialState={
    products:[]
}

export let getAllProducts=createAsyncThunk('products/getAllProducts',async ()=>
{
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(data.data);
    return data.data

})

 let productSlice=createSlice(
    {
        name:'products',
        initialState,
        extraReducers:(buuilder)=>
            {
                buuilder.addCase(getAllProducts.fulfilled,(state,action)=>
                {
                     state.products=action.payload
                }).addCase(getAllProducts.pending,()=>
                {
                        console.log("pending");
                }).addCase(getAllProducts.rejected,()=>
                {
                    console.log("rejected");
                })
            }

    }
)

export let ProductReducer=productSlice.reducer
