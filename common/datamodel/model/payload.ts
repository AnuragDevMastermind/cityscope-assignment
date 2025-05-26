export type UpdateBioPayload = {
  newBio: string,
}

export type GetCommentsPayload = {
	postId: string
}

export type CreateCommentPayload = {
  postId: string,
  content: string
}

export type LikePostPayload = {
  postId: string
}

export type UndoLikePostPayload = {
  postId: string
}

export type DislikePostPayload = {
  postId: string
}

export type UndoDislikePostPayload = {
  postId: string
}