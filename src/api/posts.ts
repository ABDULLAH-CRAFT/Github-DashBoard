export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

export const getPosts = async (): Promise<PostsResponse> => {
  const res = await fetch("https://dummyjson.com/posts?limit=20");
  const result = await res.json();
  if (!res.ok) throw new Error("Failed to fetch posts");
  return result;
};