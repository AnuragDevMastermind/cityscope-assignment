import {
  CREATE_NEW_POST_ENDPOINT,
  DISLIKE_POST_ENDPOINT,
  GET_FEED_ENDPOINT,
  GET_USER_POSTS_ENDPOINT,
  LIKE_POST_ENDPOINT,
  UNDO_DISLIKE_POST_ENDPOINT,
  UNDO_LIKE_POST_ENDPOINT,
} from "@repo/utils/endpoints";

import { DislikePostPayload, LikePostPayload, UndoDislikePostPayload, UndoLikePostPayload } from "@repo/datamodel/payload";
import { DislikePostResponse, LikePostResponse, PostResponse, UndoDislikePostResponse, UndoLikePostResponse } from "@repo/datamodel/response";
import http from "../Utils/http-common";

class PostServices {
  createPost(createPostData: FormData) {
    return http.post<any>(CREATE_NEW_POST_ENDPOINT, createPostData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getUserPosts() {
    return http.post<PostResponse[]>(GET_USER_POSTS_ENDPOINT, {
      withCredentials: true,
    });
  }
  getFeed(filters?: {
    postType?: string;
    location?: {
      coordinates: [number, number];
      radius: number;
    };
  }) {
    return http.post<PostResponse[]>(GET_FEED_ENDPOINT, { filters }, {
      withCredentials: true,
    });
  }

  likePost(likePostPayload:LikePostPayload){
    return http.post<LikePostResponse>(LIKE_POST_ENDPOINT,likePostPayload,{
      withCredentials: true,
    });
  }

  dislikePost(dislikePostPayload:DislikePostPayload){
    return http.post<DislikePostResponse>(DISLIKE_POST_ENDPOINT,dislikePostPayload,{
      withCredentials: true,
    });
  }

  undoLikePost(undoLikePostPayload:UndoLikePostPayload){
    return http.post<UndoLikePostResponse>(UNDO_LIKE_POST_ENDPOINT,undoLikePostPayload,{
      withCredentials: true,
    });
  }

  undoDislikePost(undoDislikePostPayload: UndoDislikePostPayload){
    return http.post<UndoDislikePostResponse>(UNDO_DISLIKE_POST_ENDPOINT,undoDislikePostPayload,{
      withCredentials: true,
    });
  }

}

export default new PostServices();
