import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';
import { usersAPI } from '../../../dataApi/Api';

const initialState = {
    users: [],
    loading: false,
    isError: ""

}

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, { dispatch }) => {
        try {

            const res = await usersAPI.get('/user')
            dispatch(getDataUsers({ users: res.data }))

        } catch (error) {
            console.log(error);

        }
    }
)

export const createUsers = createAsyncThunk(
    "user/createUsers",
    async (sendDataUsers) => {
        try {
            const res = await usersAPI.post("/user", sendDataUsers)
            return res.data

        } catch (error) {
            console.log(error);

        }

    }

)

export const deleteUsers = createAsyncThunk(
    "user/deleteUsers",
    async (id) => {
        try {

            await usersAPI.delete(`/user/${id}`)
            return id

        } catch (error) {

        }
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getDataUsers: (state, actions) => {
            state.users = actions.payload.users

        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUsers.pending, (state, action) => {
            state.loading = true
        });

        builder.addCase(createUsers.fulfilled, (state, action) => {

            state.users.push(action.payload)
            Swal.fire(
                'The Internet?',
                'That thing is still around?',
                'question'
            )
        });

        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            console.log(action.payload)
            state.users = state.users.filter(user => user.id !== action.payload);

        });
    },



})


export const { getDataUsers } = userSlice.actions

export default userSlice.reducer