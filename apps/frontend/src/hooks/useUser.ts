import { useState } from "react";
import { GetProfileResponse } from "@repo/datamodel/response";
import UserServices from "../services/user.services";
import { toast } from "./useToast";

const useUser = () => {
  const [profile, setProfile] = useState<GetProfileResponse>();
  const callGetProfileApi = ()=>{
    UserServices.getProfile()
      .then((response) => {
        const getProfileResponse= response.data
        setProfile(getProfileResponse);
      })
      .catch((e: Error) => {
      });
  }

  const callUpdateBioApi = (bio:string)=>{
    UserServices.updateBio({newBio:bio})
      .then((response) => {
        const updateBioResponse= response.data
        setProfile(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            bio: updateBioResponse.bio
          };
        });
        toast({
          title:"Profile Updated Successfully"
        })
      })
      .catch((e: Error) => {
      });
  }

  return { 
    profile,
    callGetProfileApi,
    callUpdateBioApi
  };
};

export default useUser;
