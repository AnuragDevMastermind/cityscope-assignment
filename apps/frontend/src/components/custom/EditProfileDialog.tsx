import { ReactNode, useState } from "react";
import { 
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../shadcn/Dialog"
import { Textarea } from "../shadcn/TextArea";
import { Button } from "../shadcn/Button";
import { DialogClose } from "@radix-ui/react-dialog";

interface EditProfileDailogProps {
    children: ReactNode,
    bio?: string
    onClick: (bio:string)=>void
}

const EditProfileDialog = ({children,bio,onClick}:EditProfileDailogProps)=> {
  const [editBio, setEditBio] = useState(bio)
  
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setEditBio(undefined);
        } else {
          setEditBio(bio);
        }
      }}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] ">
        <div className="flex flex-col">
          <div className="h-14 border-b w-full flex items-center">
            <p className="font-bold text-2xl text-txt-3 ps-5">Edit Profile</p>
          </div>
          <p className="font-bold text-txt-3 mt-6 ms-6">Bio</p>
          <div className="h-24 w-80 ms-6 mt-3 mb-18">
            <Textarea
              className="resize-none h-full "
              placeholder="Enter your bio"
              value={editBio??""}
              onChange={(e)=>setEditBio(e.target.value)}
            />
          </div>
          <div className="h-16 border-t w-full gap-4 flex-row flex items-center justify-end pe-6">
            <DialogClose asChild>
              <Button size="rounded" variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="rounded" onClick={()=>{
                if(editBio !== undefined && editBio.length !== 0)
                  onClick(editBio);
              }}>Apply</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;