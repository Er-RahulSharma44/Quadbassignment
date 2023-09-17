import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { alertActions } from '_store';
import { history, fetchWrapper } from '_helpers';
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
    return {
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        login: login(),
        logout: logout()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ username, password }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
                    dispatch(authActions.setAuth(user));
                    localStorage.setItem('auth', JSON.stringify(user));
                    const { from } = history.location.state || { from: { pathname: '/' } };
                    history.navigate(from);
                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function (arg, { dispatch }) {
                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/account/login');
            }
        );
    }
}