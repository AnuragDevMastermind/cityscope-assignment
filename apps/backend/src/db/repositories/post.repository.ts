import { PipelineStage, Types } from "mongoose";
import { PostModel } from "../../models/post model";

export const createPost = (
  values: Record<string, any>
) => new PostModel(values)
  .save()
  .then((post) => post.toObject());

export const likePost = (
  postId: string,
  userId: string
) => PostModel.findOneAndUpdate(
  { _id: postId, likes: { $ne: userId } },
  {
    $addToSet: { likes: userId },
    $inc: { likesCount: 1 },
  },
  {
    new: true,
    projection: { _id: 1 }
  }
)

export const dislikePost = (
  postId: string,
  userId: string
) => PostModel.findOneAndUpdate(
  { _id: postId, dislikes: { $ne: userId } },
  {
    $addToSet: { dislikes: userId },
    $inc: { dislikesCount: 1 },
  },
  {
    new: true,
    projection: { _id: 1 }
  }
)

export const undoLike = (
  postId: string,
  userId: string
) => PostModel.findOneAndUpdate(
  { _id: postId, likes: userId },
  {
    $pull: { likes: userId },
    $inc: { likesCount: -1 },
  },
  {
    new: true,
    projection: { _id: 1 }
  }
)

export const undoDislike = (
  postId: string,
  userId: string
) => PostModel.findOneAndUpdate(
  { _id: postId, dislikes: userId },
  {
    $pull: { dislikes: userId },
    $inc: { dislikesCount: -1 },
  },
  {
    new: true,
    projection: { _id: 1 }
  }
)

export const getFeed = (
  userId: string,
  filters?: {
    postType?: string;
    location?: {
      coordinates: [number, number]; // [LONGITUDE, LATITUDE]
      radius: number;
    };
  }
) => {
  const aggregationPipeline: PipelineStage[] = [];

  const match: Record<string, any> = {};

  if (filters?.postType) {
    match.postType = filters.postType;
  }

  if (filters?.location) {
    const { coordinates, radius } = filters.location;
    const [longitude, latitude ] = coordinates;
    const radiusInRadians = radius / 6378.1; 

    match.location = {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radiusInRadians]
      }
    };
  }

  if (Object.keys(match).length > 0) {
    aggregationPipeline.push({ $match: match });
  }

  aggregationPipeline.push(
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
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$postId", "$$postId"] },
            },
          },
          {
            $count: "count",
          },
        ],
        as: "commentsCount",
      },
    },
    {
      $addFields: {
        commentsCount: {
          $ifNull: [{ $arrayElemAt: ["$commentsCount.count", 0] }, 0],
        },
      },
    },
    {
      $addFields: {
        liked: {
          $in: [new Types.ObjectId(userId), "$likes"],
        },
        disliked: {
          $in: [new Types.ObjectId(userId), "$dislikes"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        content: 1,
        userName: "$user.name",
        postType: 1,
        likesCount: 1,
        dislikesCount: 1,
        liked: 1,
        disliked: 1,
        commentsCount: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    }
  );

  return PostModel.aggregate(aggregationPipeline).exec();
};


export const getUserPosts = (
  userId: string,
) => {
  const aggregationPipeline: PipelineStage[] = [
    {
      $match: {
        userId: new Types.ObjectId(userId),
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
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$postId", "$$postId"] },
            },
          },
          {
            $count: "count",
          },
        ],
        as: "commentsCount",
      },
    },
    {
      $addFields: {
        commentsCount: {
          $ifNull: [{ $arrayElemAt: ["$commentsCount.count", 0] }, 0],
        },
      },
    },
    {
      $addFields: {
        liked: {
          $in: [new Types.ObjectId(userId), "$likes"],
        },
        disliked: {
          $in: [new Types.ObjectId(userId), "$dislikes"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        content: 1,
        userName: "$user.name",
        postType: 1,
        likesCount: 1,
        dislikesCount: 1,
        liked: 1,
        disliked: 1,
        commentsCount: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ];

  return PostModel.aggregate(aggregationPipeline).exec();
};

export const getPostReactions = async (postId: string, userId: string) => {
  const pipeline: PipelineStage[] = [
    {
      $match: {
        _id: new Types.ObjectId(postId),
      },
    },
    {
      $addFields: {
        liked: {
          $in: [new Types.ObjectId(userId), "$likes"],
        },
        disliked: {
          $in: [new Types.ObjectId(userId), "$dislikes"],
        },
      },
    },
    {
      $project: {
        liked: 1,
        disliked: 1,
        likesCount: 1,
        dislikesCount: 1,
      },
    },
  ];

  const result = await PostModel.aggregate(pipeline).exec();
  return result[0]; // return single post reaction info
};
