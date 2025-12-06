import { createSlice,createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import { Coupons } from "./coupons.js";

//import axios from "axios";
import api from "./axiosInstance.js";



// --- COUPON SLICE ---
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: ""
  },

  reducers: {
    applyCoupon: (state, action) => {
      const enteredCode = action.payload.toUpperCase();

      if (Coupons[enteredCode]) {
        state.code = enteredCode;
        state.discount = Coupons[enteredCode];
        state.applied = true;

        state.message = `Coupon "${enteredCode}" applied! You got ${Coupons[enteredCode]}% OFF.`;
      } else {
        state.message = "Invalid coupon code";
      }
    }
  }
});

export const { applyCoupon } = couponSlice.actions;

// --- CART SLICE ---
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },

    incrementItem: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state[index].quantity += 1;
    },

    decrementItem: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity > 1) state[index].quantity -= 1;
        else state.splice(index, 1);
      }
    },

    // ✅ clearCart
    clearCart: () => {
      return []; // empty the cart
    },
  },
});

// ✅ Export all actions including clearCart
export const { addToCart, removeFromCart, incrementItem, decrementItem, clearCart } = cartSlice.actions;


// --- HOME THUNK ---
export const fetchHomeProducts = createAsyncThunk(
  "home/fetchHomeProducts",
  async () => {
    const response = await api.get("/homeProducts/getAll");
    return response.data;
  }
);

// --- HOME SLICE ---
const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.homeItems = action.payload.data; // data from backend
      })

      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// --- VEG SLICE ---
export const fetchVegProducts = createAsyncThunk(
  "veg/fetchVegProducts",
  async () => {
    const response = await api.get("/vegproducts/getAll");
    return response.data;
  }
);

let vegSlice = createSlice({
  name: "veg",
  initialState: {
    vegItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vegItems = action.payload.data;   // FIXED HERE
      })

      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// --- NON-VEG SLICE ---
export const fetchNonVegProducts = createAsyncThunk(
  "nonveg/fetchNonVegProducts",
  async () => {
    const response = await api.get(
      "/nonveg/getAll"
    );
    return response.data;
  }
);

let nonVegSlice = createSlice({
  name: "nonveg",
  initialState: {
    nonVegItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNonVegProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = action.payload.data;   // SAME STRUCTURE AS VEG
      })

      .addCase(fetchNonVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchMilkBreadProducts = createAsyncThunk(
  "milkBread/fetchMilkBreadProducts",
  async () => {
    const response = await api.get(
      "/milkbread/getAll"
    );
    return response.data;
  }
);


// --- MILK & BREAD SLICE ---
let milkBreadSlice = createSlice({
  name: "milkBread",
  initialState: {
    milkBreadItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMilkBreadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMilkBreadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.milkBreadItems = action.payload.data; 
      })

      .addCase(fetchMilkBreadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const fetchFruitsVegProducts = createAsyncThunk(
  "fruitsVeg/fetchFruitsVegProducts",
  async () => {
    const response = await api.get("/fruitsveg/getAll");
    return response.data; // Assuming your backend sends { data: [...] }
  }
);

// --- FRUITS & VEG SLICE ---
const fruitsVegSlice = createSlice({
  name: "fruitsVeg",
  initialState: {
    fruitsVegItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFruitsVegProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFruitsVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.fruitsVegItems = action.payload.data; // assuming payload has .data
      })
      .addCase(fetchFruitsVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});







// ------------------- ORDERS SLICE -------------------
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders", orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server Error");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});





// ---- ORDERS FETCH THUNK (Version 1) ----
export const getAllOrders1 = createAsyncThunk(
  "orders1/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders/getAll");
      const data = res.data?.data; // backend ---> { message, data: [] }
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ---- ORDER SLICE 1 ----
export const ordersSlice1 = createSlice({
  name: "allOrders1",
  initialState: {
    orderDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(getAllOrders1.pending, (state) => {
        state.loading = true;
      })

      // SUCCESS
      .addCase(getAllOrders1.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.loading = false;
      })

      // ERROR
      .addCase(getAllOrders1.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      });
  },
});


// ===================== Registration Thunk =====================
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (formData) => {
    const response = await api.post("/register",formData);
    return response.data;
  }
);

// ===================== Registration Slice =====================
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});


// ===================== Login Thunk & Slice =====================
export const LoginUser = createAsyncThunk(
  "Login/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", formData);
      return res.data; // must return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    loading: false,
    error: null,
    user: null,
    localStorageData: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        // Extract token
        const token = action.payload.token;

        if (token) {
          localStorage.setItem("token", token);   // 👈 SAVE TOKEN
        }

        localStorage.setItem("userData", JSON.stringify(action.payload));
        state.localStorageData = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});




// --- STORE CREATION ---
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    veg: vegSlice.reducer,
    nonveg: nonVegSlice.reducer,
    milkbread: milkBreadSlice.reducer,
    fruitsveg: fruitsVegSlice.reducer,
    home: homeSlice.reducer, 
    orders: ordersSlice.reducer,
    orders1: ordersSlice1.reducer,
    registration: registrationSlice.reducer,
    Login: LoginSlice.reducer,

  },
});

export default store;