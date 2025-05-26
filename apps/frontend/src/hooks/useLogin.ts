import { LoginData } from "../types/form.types";
import AuthServices from "../services/auth.services";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setUser } from "../store/slice/authSlice";
import { getUserFromToken } from "../Utils/tokenUtils";
import { UserResponse } from "@repo/datamodel/response";

const useLogin = () => {
  const user = useAppSelector((state) => state.loginSlice).user;
  const dispatch = useAppDispatch();

  const isUserLoggedIn = () => {
    return user != null;
  };

  const callLoginApi = (loginFormData: LoginData) => {
    AuthServices.login(loginFormData)
      .then((response: any) => {
        const user: UserResponse = getUserFromToken(response.data.accessToken);
        dispatch(setUser(user));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const callLogoutApi = () => {
    AuthServices.logout()
      .then((response: any) => {
        dispatch({ type: "reset" });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return { 
    user,
    callLoginApi,
    callLogoutApi,
    isUserLoggedIn
  };
};

export default useLogin;
