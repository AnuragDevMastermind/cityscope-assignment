import {
  CREATE_POST_ENDPOINT,
  FILTER_ENDPOINT,
  HOME_ENDPOINT,
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
  SIGNUP_ENDPOINT,
  YOUR_POST_ENDPOINT
} from "@repo/utils/endpoints";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/custom/Route";
import SideBar from "./components/custom/SideBar";
import CreatePostPage from "./pages/CreatePostPage";
import FeedPage from "./pages/FeedPage";
import FilterPage from "./pages/FilterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import YourPostPage from "./pages/YourPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={LOGIN_ENDPOINT} >
            <Route index element={<LoginPage />} />
          </Route>
          <Route path={SIGNUP_ENDPOINT} >
            <Route index element={<SignupPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<SideBar />}>
            <Route path={HOME_ENDPOINT} element={<FeedPage />} />
            <Route path={YOUR_POST_ENDPOINT} element={<YourPostPage />} />
            <Route path={PROFILE_ENDPOINT} element={<ProfilePage />} />
            <Route path={FILTER_ENDPOINT} element={<FilterPage />} />
            <Route path={"*"} element={<FeedPage />} />
            <Route path={CREATE_POST_ENDPOINT} element={<CreatePostPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
