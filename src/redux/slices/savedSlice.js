import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('savedArticles');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Could not load saved articles", err);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('savedArticles', serializedState);
  } catch (err) {
    console.error("Could not save articles", err);
  }
};

const savedSlice = createSlice({
  name: 'saved',
  initialState: loadFromLocalStorage(), 
  reducers: {
    saveArticle: (state, action) => {
      if (!state.some((article) => article._id === action.payload._id)) {
        const newState = [...state, action.payload];
        saveToLocalStorage(newState); 
        return newState;
      }
      return state;
    },
    removeArticle: (state, action) => {
      const newState = state.filter((article) => article._id !== action.payload._id);
      saveToLocalStorage(newState); 
      return newState;
    },
  },
});

export const { saveArticle, removeArticle } = savedSlice.actions;
export default savedSlice.reducer;
