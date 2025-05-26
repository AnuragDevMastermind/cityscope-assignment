import { PipelineStage, Types } from "mongoose";
import { UserModel } from "../../models/user.model";

export const getUsers = () => UserModel.find();
export const getUserByNumber = (number: string) =>
  UserModel.findOne({ number });
export const getUserById = (id: string) => UserModel.findOne({ id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getProfile = (
  userId: string
) => {
  const aggregationPipeline: PipelineStage[] = [
    {
      $match: {
        _id: new Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "posts",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$userId", "$$userId"] }
            }
          },
          {
            $count: "postCount"
          }
        ],
        as: "postStats"
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        bio: 1,
        number: 1,
        postCount: {
          $ifNull: [{ $arrayElemAt: ["$postStats.postCount", 0] }, 0]
        }
      }
    }
  ];

  return UserModel.aggregate(aggregationPipeline).exec();
};

export const updateUserBio = (
  userId: string,
  newBio: string
) => {
  return UserModel.findByIdAndUpdate(
    userId,
    { $set: { bio: newBio } },
    {
      new: true,
      projection: {
        bio: 1,
        _id: 0 
      }
    }
  ).exec();
};
