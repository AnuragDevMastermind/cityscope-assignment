import { useState } from "react";
import CommentsServices from "../services/comments.services";
import { toast } from "./useToast";
import { GetCommentsResponse } from "@repo/datamodel/response";


const useComments = () => {

	const [comments,setComments] = useState<GetCommentsResponse>();

	const callGetCommentsApi = (postId:string)=>{
		CommentsServices.getComments({postId:postId})
			.then((response) => {
				const getCommentsResponse= response.data;
				setComments(getCommentsResponse);
			})
			.catch((e: Error) => {
			});
	}

	const callCreateCommentApi = (postId:string,content:string)=>{
		CommentsServices.createComment({postId:postId,content:content})
			.then((response) => {
				 const newComment = response.data;

				const transformedComment = {
					_id: newComment._id,
					content: newComment.content,
					createdAt: newComment.createdAt,
					userName: newComment.userName,
				};

				setComments((prev) => (prev ? [transformedComment, ...prev] : [transformedComment]));
				toast({
					title:"commented successfully"
				})
			})
			.catch((e: Error) => {
			});


	}

	return {
		comments,
		callGetCommentsApi,
		callCreateCommentApi
	};
}

export default useComments;