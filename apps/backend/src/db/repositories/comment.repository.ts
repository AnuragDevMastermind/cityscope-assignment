import { PipelineStage, Types } from "mongoose";
import { CommentModel } from "../../models/comment.model";

export const createComment = (
  values: Record<string, any>
) => new CommentModel(values)
  .save()
  .then((post) => post.toObject())

export const getCommentsByPostId = (postId: string) => {
  const aggregationPipeline: PipelineStage[] = [
    {
      $match: {
        postId: new Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
          {
            $project: {
              _id: 0,
              name: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,
        userName: "$user.name",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ];

  return CommentModel.aggregate(aggregationPipeline).exec();
};
