import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
  ids: string[];
};

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
