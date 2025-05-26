import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import tst_img from "../../assets/test_pic.jpg"
import CommentsDialog from "./CommentsDialog.tsx";
import { PostResponse } from "@repo/datamodel/response";
import React from "react";
import moment from "moment";
import { capitalizeFirstCharOnly } from "../../Utils/stringUtils.ts";

interface PostCardProp {
  post: PostResponse,
  onCloseDialog: () => void
  callLikePostApi: (postId:string) => void
  callDislikePostApi: (postId:string) => void
  callUndoLikePostApi: (postId:string) => void
  callUndoDislikePostApi: (postId:string) => void
}

const PostCard: React.FC<PostCardProp> = ({ 
  post,
  onCloseDialog,
  callLikePostApi,
  callDislikePostApi,
  callUndoLikePostApi,
  callUndoDislikePostApi
}) => {

  const formatDate = (dateString: string) => {
    return moment(dateString).format("hh:mm A, DD MMMM, YYYY");
  };

  const badgeMap: Record<string, string> = {
    recommend: "Recommend a place",
    ask: "Ask for help",
    update: "Share a local update",
    event: "Event announcement",
  };

  const likePost = ()=>{
    if(post.liked){
      callUndoLikePostApi(post._id)
    }else{
      callLikePostApi(post._id)
    }
  }

  const dislikePost = ()=>{
    if(post.disliked){
      callUndoDislikePostApi(post._id)
    }else{
      callDislikePostApi(post._id)
    }
  }

  return (
    <div className="w-90 h-min my-5 py-3 shadow-[0px_0px_20px_-15px] rounded-2xl border flex flex-col gap-3">
      <div className="w-full px-3 flex gap-3 items-center">
        <div className="bg-primary size-15 rounded-full flex items-center justify-center">
          <p className="text-white font-bold text-3xl text-shadow-lg">
            {capitalizeFirstCharOnly(post.userName)}
          </p>
        </div>
        <div>
          <p className="font-bold text-base">{post.userName}</p>
          <p className="font-bold text-txt-3 text-[13px]">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      <img className="h-52 object-cover w-full" src={post.imageUrl} alt="" />
      <p className="font-bold text-txt-3 text-sm mx-5 leading-tight">
        {post.content}
      </p>
      <div className="w-fit text-white font-bold bg-primary px-3 py-1 rounded-md ms-5 text-xs">
        {badgeMap[post.postType]}
      </div>
      <div className="w-full border-b" />
      <div className="flex justify-between mx-5">
        <div className="flex items-center gap-1.5">
          <ThumbsUp 
            className={`size-5 ${post.liked ? "text-primary" : "text-txt-3"}`} 
            strokeWidth={2.5}
            onClick={likePost}
          />
          <p className="font-bold text-txt-3 text-sm">{post.likesCount}</p>
          <div className="w-1" />
          <ThumbsDown 
            className={`size-5 mt-1 ${post.disliked ? "text-primary" : "text-txt-3"}`} 
            strokeWidth={2.5}
            onClick={dislikePost}
          />
          <p className="font-bold text-txt-3 text-sm">{post.dislikesCount}</p>
        </div>

        <CommentsDialog postId={post._id} onCloseDialog={onCloseDialog}>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <MessageSquareText className="size-5 text-txt-3 mt-1" strokeWidth={2.5} />
            <p className="font-bold text-txt-3  text-sm">{post.commentsCount} Comments</p>
          </div>
        </CommentsDialog>
      </div>
    </div>
  );
}

export default PostCard