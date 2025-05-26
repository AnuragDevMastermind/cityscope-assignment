export type UserResponse = {
  _id: string;
  number: string;
  name: string;
};

export type GetProfileResponse = {
  number: string,
  name: string,
  bio?: string,
  postCount: number
};

export type UpdateBioResponse = {
  _id: string,
  bio: string
}

export type GetCommentsResponse = {
  _id: string,
  content: string,
  createdAt: string,
  userName: string
}[]

export type CreateCommentResponse = {
  postId: string,
  userId: string,
  content: string,
  _id: string,
  createdAt: string,
  updatedAt: string,
  userName: string
}

export interface PostResponse {
  _id: string;
  userId: string;
  content: string;
  postType: string;
  likesCount: number;
  dislikesCount: number;
  liked: boolean;
  disliked: boolean;
  userName: string;
  imageUrl: string;
  commentsCount: number;
  createdAt: string;
}

export interface LikePostResponse {
  _id: string,
  likesCount: number,
  dislikesCount: number,
  liked: boolean,
  disliked: boolean
}

export interface UndoLikePostResponse {
  _id: string,
  likesCount: number,
  dislikesCount: number,
  liked: boolean,
  disliked: boolean
}

export interface DislikePostResponse {
  _id: string,
  likesCount: number,
  dislikesCount: number,
  liked: boolean,
  disliked: boolean
}

export interface UndoDislikePostResponse {
  _id: string,
  likesCount: number,
  dislikesCount: number,
  liked: boolean,
  disliked: boolean
}