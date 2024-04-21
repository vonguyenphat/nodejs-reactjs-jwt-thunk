import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getUserFromAT } from "../../Services/access.service";



const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userInfo: {},
      isLoading: false,
      isLoggedIn: false,
      error: false,
      isDataFetched:false
   },
   extraReducers: builder => {
      builder
         // eslint-disable-next-line no-unused-vars
         .addCase(fetchLogin.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(fetchLogin.fulfilled, (state, action) => {
            console.log(`action fulfilled:::`, action);
            const { status, metadata } = action.payload;
            if (status === 200) {
               state.userInfo = metadata.user
               console.log(`userInfo fulfilled:::`, state.userInfo);
               localStorage.setItem("at-jwt", metadata.tokens.accessToken);
               localStorage.setItem("rt-jwt", metadata.tokens.refreshToken);
               localStorage.setItem("x-client", metadata.user.userId);
               state.isLoggedIn = true;
            }
            state.isLoading = false;
         })
         // eslint-disable-next-line no-unused-vars
         .addCase(fetchLogin.rejected, (state, action) => {
            state.error = true;
            state.isLoggedIn = false;
            state.isLoading = false;
         })
         // eslint-disable-next-line no-unused-vars
         .addCase(fetchUserFromAt.pending, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = true;
         })
         // eslint-disable-next-line no-unused-vars
         .addCase(fetchUserFromAt.fulfilled, (state, action) => {
            console.log(action);
            const { status, metadata } = action.payload;
            if (status === 200) {
               state.userInfo = metadata
               state.isLoggedIn = true;
               state.isDataFetched = true;
            } else {
               // console.log(`fetchUserFromAt fulfilled:::`, state);
               state.userInfo = {}
               state.isLoggedIn = false;
               state.isDataFetched = false;
            }
            state.isLoading = false;
         })
         // eslint-disable-next-line no-unused-vars
         .addCase(fetchUserFromAt.rejected, (state, action) => {
            state.error = true;
            state.isLoggedIn = false;
            state.isLoading = false;
         })
   }
})
export default authSlice;



export const fetchLogin = createAsyncThunk('/auth/fetchLogin', async (payload) => {
   return await login(payload);
})
export const fetchUserFromAt = createAsyncThunk('/auth/fetchUserFromAt', async () => {
   return await getUserFromAT();
})
export const fetchLogout = createAsyncThunk('/auth/fetchUserFromAt', async () => {
   return null;
})