import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL_FETCH_WALLET = "https://fams-management.tech/api/wallet/";
const URL_POST_WALLET = "https://fams-management.tech/api/wallet/"
export const fetchWallet = createAsyncThunk("fetchWallet", async ({ id }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing token");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(URL_FETCH_WALLET + id, config);
    console.log("Wallet", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
});

export const topToWallet = createAsyncThunk("topToWallet", async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing token");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const wallet = {
      user: {
        id: data.userId
      },
      ballance: data.ballance
    }
   
    const response = await axios.post(URL_POST_WALLET + data.userId, wallet, config);
    return response.data;
  } catch (error) {
   
    throw error;
  }
});


export const WalletData = createSlice({
  name: "walletData",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    wallet: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.wallet = action.payload;
      })
      .addCase(fetchWallet.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchWallet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default WalletData.reducer;
