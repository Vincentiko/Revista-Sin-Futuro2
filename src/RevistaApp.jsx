import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const RevistaApp = () => {
  return (
    <GoogleOAuthProvider clientId="334058303990-g0u4jo2k79i4rs4a52dr9dil3imhe8s9.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};
