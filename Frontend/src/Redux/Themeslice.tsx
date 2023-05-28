import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface Themestate {
    darkmode : boolean
}

const Themeslice = createSlice({
    name : 'mode',
    initialState:{
        darkmode : true
    },
    reducers:{
        Setmode(state:Themestate,action:PayloadAction<boolean>){
            state.darkmode = action.payload
        }
    }
})

export const Themeaction = Themeslice.actions
export default Themeslice