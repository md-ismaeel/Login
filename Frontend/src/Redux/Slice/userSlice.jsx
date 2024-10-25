import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLogin: false
};

const userSlice = createSlice({
    name: "kodeKalp",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload;
        },
        setIsLogin: (state, actions) => {
            state.isLogin = actions.payload
        }
    },
});

export const { setUser, setIsLogin } = userSlice.actions;
export default userSlice.reducer;
