import { configureStore } from "@reduxjs/toolkit";
import { contactsSlice } from "./ContactsSlice/contactSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
    storage,

  whitelist: ['items'],
};

const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer)

export const store = configureStore({
    reducer: {
        contact : contactsReducer,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)


