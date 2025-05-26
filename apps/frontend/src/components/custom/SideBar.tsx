import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { CREATE_POST_ENDPOINT, FEED_ENDPOINT, FILTER_ENDPOINT, PROFILE_ENDPOINT, YOUR_POST_ENDPOINT } from "@repo/utils/endpoints";
import ic_company from "../../assets/ic_company.svg";
import IcFeed from "../../assets/IcFeed";
import { Backpack, CircleUserRound, LogOut } from "lucide-react";
import { useEffect } from "react";
import { setFeedPage, setProfilePage, setYourPostPage } from "../../store/slice/currentPageSlice";
import useLogin from "../../hooks/useLogin";

function SideBarComp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useAppSelector((state) => state.currentPageSlide);
  const { callLogoutApi } = useLogin()

  useEffect(() => {
    navigate(currentPage)
  }, [currentPage])

  return (
    <div className="h-full w-72 flex flex-col border-r">
      <div className="h-17 border-b w-full flex items-center ps-6 gap-3">
        <img className="size-10" src={ic_company} alt="" />
        <p className="font-bold text-lg text-primary">CityScope</p>
      </div>
      <div className="flex flex-col ps- 6 items-center">
        <div
          className="w-9/10 h-12 ps-1 mt-3 hover:bg-foreground-1 flex items-center rounded-md gap-3"
          onClick={() => dispatch(setFeedPage())}
        >
          <IcFeed className={`${(currentPage === FEED_ENDPOINT || currentPage === FILTER_ENDPOINT) ? "stroke-primary" : "stroke-icon"}`} />
          <p className={`${(currentPage === FEED_ENDPOINT || currentPage === FILTER_ENDPOINT) ? "text-primary" : "text-txt-3"} font-bold text-lg`}>Feed</p>
        </div>

        <div
          className="w-9/10 h-12 ps-1 hover:bg-foreground-1 flex items-center rounded-md gap-3"
          onClick={() => dispatch(setYourPostPage())}
        >
          <Backpack className={`${(currentPage === YOUR_POST_ENDPOINT || currentPage === CREATE_POST_ENDPOINT) ? "stroke-primary" : "stroke-icon"} size-[30px]`} />
          <p className={`${(currentPage === YOUR_POST_ENDPOINT || currentPage === CREATE_POST_ENDPOINT) ? "text-primary" : "text-txt-3"} font-bold text-lg`}>Your Post</p>
        </div>

        <div
          className="w-9/10 h-12 ps-1 hover:bg-foreground-1 flex items-center rounded-md gap-3"
          onClick={() => dispatch(setProfilePage())}
        >
          <CircleUserRound className={`${currentPage === PROFILE_ENDPOINT ? "stroke-primary" : "stroke-icon"} size-[30px]`} />
          <p className={`${currentPage === PROFILE_ENDPOINT ? "text-primary" : "text-txt-3"} font-bold text-lg`}>Profile</p>
        </div>

        <div
          className="w-9/10 h-12 ps-1 hover:bg-foreground-1 flex items-center rounded-md gap-3"
          onClick={() => {
            callLogoutApi()
          }}
        >
          <LogOut className="stroke-icon size-[30px]" />
          <p className="text-txt-3 font-bold text-lg">Logout</p>
        </div>

      </div>
    </div>
  );
}

export default function SideBar() {
  return (
    <div className="size-full flex">
      <SideBarComp />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
};