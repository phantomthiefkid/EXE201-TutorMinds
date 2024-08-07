import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL_FETCH_WALLET = "https://fams-management.tech/api/wallet/";
const URL_POST_WALLET = "https://fams-management.tech/api/wallet/";
const URL_INVOICE = "https://fams-management.tech/api/invoice";
const URL_GET_ORDER = "https://fams-management.tech/order";
const URL_CREATE_PAYMENT_LINK = "https://fams-management.tech/api/create-payment-link";
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
    // console.log("Wallet", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
});

export const fetchWalletTutor = createAsyncThunk("fetchWalletTutor", async ({ id }) => {
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
    console.log("Redux: ", response.data)
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
});

export const invoice = createAsyncThunk("invoice", async (data) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          throw new Error("Missing token");
      }
      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,  // Sửa lại lỗi cú pháp
          },
          params: {
            type: data.type,
            price: data.price,
            studentId: data.studentId,
            tutorId: data.tutorId
          }
      };
      

      // Gửi yêu cầu POST với URL và dữ liệu trong body
      const response = await axios.post(URL_INVOICE, null, config);
      return response.data;
  } catch (error) {
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
        id: data.userId,
      },
      ballance: data.ballance
    }

    console.log("data: ", data)

    const response = await axios.post(URL_POST_WALLET + data.userId, wallet, config);
    return response.data;
  } catch (error) {

    throw error;
  }
});

export const createPaymentLink = createAsyncThunk("createPaymentLink", async (price) => {
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
          params: {
            price: price
          }
      };
      const response = await axios.post(URL_CREATE_PAYMENT_LINK, null, config);
      return response.data;
  } catch (error) {
      throw error;
  }
});

export const getOrder = createAsyncThunk("getOrder", async (orderId) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          throw new Error("Missing token");
      }
      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,  
          }
      };
      const response = await axios.get(`${URL_GET_ORDER}/${orderId}`, config);
      return response.data.data;
  } catch (error) {
      throw error;
  }
});

export const WalletData = createSlice({
  name: "walletData",
  initialState: {
    isLoading: false,
    data: [],
    order: {},
    isError: false,
    wallet: {},
    walletTutor: {},
    payLink: null
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
      })
      .addCase(fetchWalletTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.walletTutor = action.payload;
      })
      .addCase(fetchWalletTutor.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchWalletTutor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createPaymentLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.payLink = action.payload;
      })
      .addCase(createPaymentLink.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(createPaymentLink.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default WalletData.reducer;
