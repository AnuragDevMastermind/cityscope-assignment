import { ReactNode, useState } from "react";
import { 
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../shadcn/Dialog";
import { Button } from "../shadcn/Button";
import { ScrollArea } from "../shadcn/ScrollArea";
import { Input } from "../shadcn/Input";
import useComments from "../../hooks/useComments";
import { capitalizeFirstCharOnly } from "../../Utils/stringUtils";

interface CommentsDailogProps {
    children: ReactNode,
    postId: string,
    onCloseDialog: () => void
}

const CommentsDialog = ({ children, postId, onCloseDialog }: CommentsDailogProps) => {
  const { comments, callGetCommentsApi, callCreateCommentApi } = useComments();
  const [commentStr, setCommentStr] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onCloseDialog();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger onClick={() => {
        callGetCommentsApi(postId);
        setOpen(true);
      }} asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-col">
          <div className="h-14 border-b w-full flex items-center">
            <p className="font-bold text-2xl text-txt-3 ps-5">Comments</p>
          </div>
          <ScrollArea className="h-72">
            <div>
              {comments?.map((comment) => (
                <div key={comment._id} className="pt-5 ps-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary size-10 rounded-full flex items-center justify-center">
                      <p className="text-white font-bold text-xl text-shadow-lg">
                        {capitalizeFirstCharOnly(comment.userName)}
                      </p>
                    </div>
                    <p className="text-txt-3 mb-1 font-bold">{comment.userName}</p>
                  </div>
                  <p className="w-66 text-txt-3 -translate-y-2 text-xs ms-13">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="h-18 border-t w-full gap-4 flex-row flex items-center px-6">
            <Input
              placeholder="Enter message"
              value={commentStr ?? ""}
              onChange={(e) => setCommentStr(e.target.value)}
              autoFocus={false}
            />
            <Button 
              className="w-38" 
              size="rounded"
              onClick={() => {
                if (commentStr && commentStr.length !== 0) {
                  callCreateCommentApi(postId, commentStr);
                  setCommentStr("");
                }
              }}
            >
              Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
