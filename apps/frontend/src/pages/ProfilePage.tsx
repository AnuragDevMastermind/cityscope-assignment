import { Pencil, Phone } from "lucide-react";
import { useEffect } from "react";
import EditProfileDialog from "../components/custom/EditProfileDialog.tsx";
import { Button } from "../components/shadcn/Button";
import { useAppDispatch } from "../hooks/useRedux";
import useUser from "../hooks/useUser.ts";
import { setProfilePage, setYourPostPage } from "../store/slice/currentPageSlice";
import { capitalizeFirstCharOnly } from "../Utils/stringUtils.ts";



function ProfilePage() {
  const dispatch = useAppDispatch();
  const {profile, callGetProfileApi, callUpdateBioApi} = useUser();

  useEffect(() => {
    dispatch(setProfilePage());
    callGetProfileApi();
  }, [])

  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-17 border-b flex ps-8 items-center">
        <p className="font-bold text-2xl text-txt-3">Profile</p>
      </div>
      { (profile !== undefined) && (
        <div className="flex-1 flex">
          <div className="bg-primary size-28 rounded-full flex items-center justify-center ms-10 mt-7 me-5">
            <p className="text-white font-bold text-7xl text-shadow-lg mb-1">{
              `${capitalizeFirstCharOnly(profile.name)}`
            }</p>
          </div>
          <div className="mt-7">
            <div className="flex gap-5">
              <div>
                <p className="font-bold text-2xl text-txt-1">{profile.name}</p>
                <p className="text-sm font-bold text-txt-3">
                  {profile.postCount} <span className="font-medium">posts</span>
                </p>
              </div>
              <Button onClick={()=>{dispatch(setYourPostPage());}} size="rounded">Your Post</Button>
            </div>
            <div className="mt-5">
              <p className="font-bold text-txt-1">Number</p>
              <div className="flex mt-2 gap-2">
                <Phone className="mt-1 size-3.5 text-txt-3" strokeWidth={3}/>
              <p className="text-sm font-bold text-txt-3 w-[450px]">{profile.number}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-row">
                <p className="font-bold text-txt-1">Bio</p>
                <EditProfileDialog bio={profile.bio} onClick={(editBio)=>callUpdateBioApi(editBio)}>
                  <div className="px-3">
                    <Pencil className="mt-1.5 size-3.5 text-txt-3 cursor-pointer" strokeWidth={3}/>
                  </div>
                </EditProfileDialog>
              </div>
              <p className="text-sm mt-2 font-bold text-txt-3 w-[450px]">
                {profile.bio? profile.bio :"There is no bio. Click on edit to edit your bio."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;