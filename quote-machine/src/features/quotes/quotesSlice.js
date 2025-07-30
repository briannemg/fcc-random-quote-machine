import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const bluesPurples = [
  "#3b5998",
  "#5a4fcf",
  "#6a8fbf",
  "#8a79af",
  "#4a90e2",
  "#2f2d54",
  "#7083a3",
  "#9370db",
  "#334d8f",
  "#7b68ee",
];

export const fetchQuotes = createAsyncThunk(
  "quotes/fetchQuotes",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await res.json();
      thunkAPI.dispatch(setQuotes(data.quotes));
      thunkAPI.dispatch(pickRandomQuote());
    } catch {
      return thunkAPI.rejectWithValue("Failed to load quotes.");
    }
  }
);

const initialState = {
  allQuotes: [],
  currentQuote: { quote: "", author: "" },
  currentColor: bluesPurples[0],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      state.allQuotes = action.payload;
    },
    setCurrentQuote: (state, action) => {
      state.currentQuote = action.payload;
    },
    setColor: (state, action) => {
      state.currentColor = action.payload;
    },
    pickRandomQuote: (state) => {
      const quote =
        state.allQuotes[Math.floor(Math.random() * state.allQuotes.length)];
      const color =
        bluesPurples[Math.floor(Math.random() * bluesPurples.length)];
      state.currentQuote = quote;
      state.currentColor = color;
    },
  },
});

export const { setQuotes, setCurrentQuote, setColor, pickRandomQuote } =
  quotesSlice.actions;

export default quotesSlice.reducer;
