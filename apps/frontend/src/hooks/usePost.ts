import PostServices from "../services/post.services"
import { toast } from "./useToast";
import { store } from "../store/store";
import { setYourPostPage } from "../store/slice/currentPageSlice";
import { useState } from "react";
import { PostResponse } from "@repo/datamodel/response";

const usePost = () => {

  const [posts, setPosts] = useState<PostResponse[]>([])

  const callCreatePost = (createPostData: FormData) => {
    PostServices.createPost(createPostData)
      .then((response: any) => {
        store.dispatch(setYourPostPage())
        toast({
          title: "Post Created Successfully"
        })
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callGetUserPosts = () => {
    PostServices.getUserPosts()
      .then((response: any) => {
        console.log(response.data);
        setPosts(response.data)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const callLikePostApi = (postId:string)=>{

    PostServices.likePost({postId:postId})
      .then((response) => {
        const likePostResponse= response.data;

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  liked: likePostResponse.liked,
                  disliked: likePostResponse.disliked,
                  likesCount: likePostResponse.likesCount,
                  dislikesCount: likePostResponse.dislikesCount,
                }
              : post
          )
        );

      })
      .catch((e: Error) => {
      });
  }

  const callDislikePostApi = (postId:string)=>{

    PostServices.dislikePost({postId:postId})
      .then((response) => {
        const dislikePostResponse = response.data;

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  liked: dislikePostResponse.liked,
                  disliked: dislikePostResponse.disliked,
                  likesCount: dislikePostResponse.likesCount,
                  dislikesCount: dislikePostResponse.dislikesCount,
                }
              : post
          )
        );

      })
      .catch((e: Error) => {
      });
  }

  const callUndoLikePostApi = (postId:string)=>{

    PostServices.undoLikePost({postId:postId})
      .then((response) => {
        const undoLikePostResponse = response.data;

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  liked: undoLikePostResponse.liked,
                  disliked: undoLikePostResponse.disliked,
                  likesCount: undoLikePostResponse.likesCount,
                  dislikesCount: undoLikePostResponse.dislikesCount,
                }
              : post
          )
        );

      })
      .catch((e: Error) => {
      });
  }

  const callUndoDislikePostApi = (postId:string)=>{

    PostServices.undoDislikePost({postId:postId})
      .then((response) => {
        const undoDislikePostResponse = response.data;

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  liked: undoDislikePostResponse.liked,
                  disliked: undoDislikePostResponse.disliked,
                  likesCount: undoDislikePostResponse.likesCount,
                  dislikesCount: undoDislikePostResponse.dislikesCount,
                }
              : post
          )
        );

      })
      .catch((e: Error) => {
      });
  }


  const callGetFeedApi = (filters?: {
    postType?: string;
    location?: {
      coordinates: [number, number];
      radius: number;
    };
  }) => {
    PostServices.getFeed(filters)
      .then((response: any) => {
          setPosts(response.data);
      })
      .catch((e: Error) => {
          console.log(e);
      })
  };


  return {
    posts,
    callCreatePost,
    callGetUserPosts,
    callGetFeedApi,
    callLikePostApi,
    callDislikePostApi,
    callUndoLikePostApi,
    callUndoDislikePostApi
  }

}

export default usePost