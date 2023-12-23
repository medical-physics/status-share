import { setDarkMode, setLightMode } from "../redux/slices/accountSlice";
import { store } from "../redux/store/store";

export const initializeDarkMode = () => {
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    store.dispatch(setDarkMode());
  } else {
    store.dispatch(setLightMode());
  }
};
