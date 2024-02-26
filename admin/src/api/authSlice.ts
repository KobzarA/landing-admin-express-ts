import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/models";
import { IResponse } from "../interfaces/api";
import { API_BASE } from "../config";
import axios, { AxiosError } from "axios";

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

// Example async action to fetch user data from an API
export const fetchCheckAuth = createAsyncThunk(
  "auth/fetchUserData",
  async () => {
    const checked = await axios.get<IResponse<IUser> | null>(
      `${API_BASE}admin/login/validate`,
      {
        withCredentials: true,
      },
    );

    return checked.data;
  },
);
export const fetchLogIn = createAsyncThunk(
  "auth/fetchLogIn",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI,
  ) => {
    try {
      const res = await axios.post<IResponse<IUser>>(
        `${API_BASE}admin/login/password`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
export const fetchLogOut = createAsyncThunk(
  "auth/fetchLogOut",
  async (_, thunkAPI) => {
    debugger;
    try {
      const res = await axios.get<{ message: string }>(
        `${API_BASE}admin/logout`,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) return null;
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckAuth.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCheckAuth.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.loading = "succeeded";
          state.user = action.payload.data;

          // state.token = action.payload.token;
        }
      })
      .addCase(fetchCheckAuth.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(fetchLogIn.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLogIn.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (action.payload) state.user = action.payload;
      })
      .addCase(fetchLogIn.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          if (action.error.message) state.error = action.error.message;
        }
        state.loading = "failed";
      })
      .addCase(fetchLogOut.fulfilled, (state) => {
        state.error = null;
        state.loading = "idle";
        state.token = null;
        state.user = null;
      })
      .addCase(fetchLogOut.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
});

export default authSlice.reducer;
