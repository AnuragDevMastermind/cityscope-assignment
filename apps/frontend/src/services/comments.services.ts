import { CreateCommentPayload, GetCommentsPayload } from "@repo/datamodel/payload";
import { CreateCommentResponse, GetCommentsResponse } from "@repo/datamodel/response";
import { CREATE_COMMENT_ENDPOINT, GET_COMMENTS_ENDPOINT } from "@repo/utils/endpoints";
import http from "../Utils/http-common";
class CommentsServices {
	getComments(getCommentsPayload:GetCommentsPayload){
		return http.post<GetCommentsResponse>(GET_COMMENTS_ENDPOINT,getCommentsPayload)
	}
	createComment(createCommentPayload:CreateCommentPayload){
		return http.post<CreateCommentResponse>(CREATE_COMMENT_ENDPOINT,createCommentPayload)
	}
}

export default new CommentsServices();