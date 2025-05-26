import { zodResolver } from "@hookform/resolvers/zod";
import { Map as LeafletMap } from 'leaflet';
import { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Map from "../components/custom/Map";
import SelectBadge from '../components/custom/SelectBadge';
import { Button } from "../components/shadcn/Button";
import { Textarea } from "../components/shadcn/TextArea";
import usePost from '../hooks/usePost';
import { useAppDispatch } from "../hooks/useRedux";
import { setYourPostPage } from "../store/slice/currentPageSlice";
import { CreatePostData } from '../types/form.types';
import { createPostValidationSchema } from '../Utils/validation';

function CreatePostPage() {
  const dispatch = useAppDispatch();
  const { callCreatePost } = usePost()
  const mapRef = useRef<LeafletMap | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSetLocation = () => {
    mapRef.current?.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true
    });
  };

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostValidationSchema),
  });

  const onSubmit: SubmitHandler<CreatePostData> = async (createPostData: CreatePostData) => {
    const formData = new FormData()
    formData.append("content", createPostData.content);
    formData.append("postType", createPostData.postType);
    formData.append("image", createPostData.image[0]);
    formData.append("coordinates", createPostData.lng.toString());
    formData.append("coordinates", createPostData.lat.toString());
    callCreatePost(formData)
  }

  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-17 border-b flex justify-between px-8 items-center">
        <p className="font-bold text-2xl text-txt-3">Create New Post</p>
        <div className="flex gap-6">
          <Button onClick={() => dispatch(setYourPostPage())} className="px-9" variant="secondary" size="rounded">
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-post-form"
            className="px-9"
            size="rounded"
          >
            Create
          </Button>
        </div>
      </div>
      <form
        id="create-post-form"
        className="flex-1 flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-[2] p-5">
          <div className="size-full flex flex-col">
            <div className="flex justify-between me-1">
              <p className="font-medium text-lg text-txt-3">Select Location</p>
              <div
                role="button"
                onClick={handleSetLocation}
                className="border bg-white -translate-y-1 rounded-lg scale-[80%] p-2 px-4 cursor-pointer shadow-md font-bold transition-transform duration-100 ease-in-out hover:scale-90 active:scale-90"
              >
                📍 Set Current Location
              </div>

            </div>
            {errors.lat && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lat.message ?? "Invalid location"}
              </p>
            )}
            <div className="bg-green-300 flex-1 mt-3">
              <Map
                ref={mapRef}
                onMarkerSet={(latlng) => {
                  setValue("lat", latlng.lat, { shouldValidate: true });
                  setValue("lng", latlng.lng, { shouldValidate: true });
                  trigger("lat");
                  trigger("lng");
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-[1] flex flex-col">
          <p className="font-medium text-lg text-txt-3 mt-7 mb-3">Content</p>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <div className="w-full h-24 pe-5">
                <Textarea
                  {...field}
                  className="resize-none h-full "
                  placeholder="Type here..."
                />
              </div>
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
          <SelectBadge onClick={(postType) => setValue("postType", postType, { shouldValidate: true })} />
          <input
            type="hidden"
            {...register("postType", { required: "Post type is required" })}
          />
          {errors.postType && (
            <p className="text-red-500 text-sm mt-2">{errors.postType.message}</p>
          )}
          <p className="font-medium text-lg text-txt-3 mt-7 mb-3">Select Image</p>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            ref={fileInputRef}
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setValue("image", files, { shouldValidate: true });
              }
            }}
            className="hidden"
          />
          <Button
            type="button"
            className="w-fit"
            size="rounded"
            onClick={() => fileInputRef.current?.click()}
          >Choose Image</Button>
          {watch("image")?.[0]?.name && (
            <p className="font-semibold text-sm text-txt-3 mt-3 border w-fit px-2 py-1 rounded-md">
              {watch("image")[0].name}
            </p>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;