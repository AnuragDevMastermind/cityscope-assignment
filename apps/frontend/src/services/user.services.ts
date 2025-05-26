import { UpdateBioPayload } from "@repo/datamodel/payload";
import { GetProfileResponse, UpdateBioResponse } from "@repo/datamodel/response";
import { GET_PROFILE_ENDPOINT, UPDATE_BIO_ENDPOINT } from "@repo/utils/endpoints";
import http from "../Utils/http-common";

class UserServices {
  getProfile() {
    return http.get<GetProfileResponse>(GET_PROFILE_ENDPOINT)
  }
  updateBio(updateBioPayload:UpdateBioPayload) {
    return http.post<UpdateBioResponse>(UPDATE_BIO_ENDPOINT,updateBioPayload)
  }
}

export default new UserServices();
