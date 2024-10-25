import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";

const loadState = () => {
    try {
        const saveData = localStorage.getItem("kodekalp-users");
        if (saveData === null) {
            return undefined;
        }
        const parsedData = JSON.parse(saveData);
        return parsedData
    } catch (err) {
        console.error("Failed to load state from localStorage:", err);
        localStorage.removeItem("kodekalp-users");
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const { user, isLogin } = state.userSlice;
        const saveData = JSON.stringify({
            userSlice: { user, isLogin },
        });
        localStorage.setItem("kodekalp-users", saveData);
    } catch (err) {
        console.error("Failed to save data to localStorage:", err);
    }
};

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        userSlice
    },
    preloadedState: persistedState,
})

// Subscribe to store updates to save state to localStorage
store.subscribe(() => {
    saveState(store.getState());
});