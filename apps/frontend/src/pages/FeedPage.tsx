import { SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";
import PostCard from "../components/custom/PostCard";
import { Button } from "../components/shadcn/Button";
import usePost from "../hooks/usePost";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setFilterPage } from "../store/slice/currentPageSlice";

function FeedPage() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filterSlice);
  const {
    posts,
    callGetFeedApi,
    callLikePostApi,
    callDislikePostApi,
    callUndoLikePostApi,
    callUndoDislikePostApi,
  } = usePost();


  useEffect(() => {
    callGetFeedApi(filter);
  }, []);

  const onCloseDialog = () => {
    callGetFeedApi(filter);
  }

  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-17 border-b flex justify-between px-8 items-center">
        <p className="font-bold text-2xl text-txt-3">Feed</p>
        <Button onClick={() => dispatch(setFilterPage())} variant="secondary" size="rounded">
          <SlidersHorizontal strokeWidth={3} />
          Filters
        </Button>
      </div>
      <div className="flex-1 flex items-center flex-col overflow-auto">
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

export default FeedPage;