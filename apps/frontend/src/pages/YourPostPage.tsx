import { useEffect } from "react";
import PostCard from "../components/custom/PostCard";
import { Button } from "../components/shadcn/Button";
import usePost from "../hooks/usePost";
import { useAppDispatch } from "../hooks/useRedux";
import { setCreatePostPage } from "../store/slice/currentPageSlice";

function YourPostPage() {
  const dispatch = useAppDispatch();
  const { 
    posts,
    callGetUserPosts,
    callLikePostApi,
    callDislikePostApi,
    callUndoLikePostApi,
    callUndoDislikePostApi

   } = usePost();

  useEffect(() => {
    callGetUserPosts();
  }, []);

  const onCloseDialog = () => {
    callGetUserPosts();
  }

  
  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-17 border-b flex justify-between px-8 items-center">
        <p className="font-bold text-2xl text-txt-3">Your Post</p>
        <Button onClick={() => dispatch(setCreatePostPage())} size="rounded">
          Create New Post
        </Button>
      </div>
      <div className="flex-1 flex items-center flex-col overflow-auto gap-4 py-4">
        {posts.map((post) => (
          <PostCard 
            key={post._id} 
            post={post} 
            onCloseDialog={onCloseDialog}
            callLikePostApi={callLikePostApi}
            callDislikePostApi={callDislikePostApi}
            callUndoLikePostApi={callUndoLikePostApi}
            callUndoDislikePostApi={callUndoDislikePostApi}
          />
        ))}
      </div>
    </div>
  );
}

export default YourPostPage;
