export interface Post {
  id: string;
  imageUrl: string;
  // Date display
  labelDate: string; // e.g. "Today"
  postDate: Date; // e.g. 9-08-2016
  // Stats — left column (col A), right column (col B)
  likesA: number; // 128
  commentsA: number; // 31
  likesB: number; // 67
  commentsB: number; // 22
  // Source
  sourceType: string; // "Image upload"
  sourceDate: Date; // 11-04-2016
}

export type LayoutMode = "grid" | "row";

export interface FilterState {
  from: Date | null;
  to: Date | null;
  layout: LayoutMode;
}

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
  username: string;
  startDate: Date;
}
