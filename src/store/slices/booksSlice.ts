import { createSlice } from "@reduxjs/toolkit";
import { sampleBooks, type Book } from "@/data/sampleBooks";

type BooksState = {
  items: Book[];
};

const initialState: BooksState = {
  items: sampleBooks,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export default booksSlice.reducer;
