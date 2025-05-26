export type SignUpData = {
  number: string;
  name: string;
  password: string;
};
export type LoginData = {
  number: string;
  password: string;
};
export type CreatePostData = {
  content: string;
  postType: string;
  image: FileList;
  lat: number;
  lng: number;
}