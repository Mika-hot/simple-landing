import type { Post, ProfileStats } from "@/types";

const sourceTypes = [
  "Image upload",
  "Story upload",
  "Reel upload",
  "Image upload",
  "Video upload",
  "Image upload",
  "Story upload",
  "Image upload",
];

// 24 original posts — 2016–2021
const originalPosts: Post[] = Array.from({ length: 24 }, (_, i) => {
  const year = 2016 + Math.floor(i / 4);
  const month = (i % 4) * 3 + 1;
  const postYear = 2016 + Math.floor(i / 6);
  return {
    id: `post-${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i + 10}/600/600`,
    labelDate:
      i === 0
        ? "Today"
        : `${String(1 + (i % 28)).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`,
    postDate: new Date(year, month - 1, 1 + (i % 28)),
    likesA: 128 + i * 7,
    commentsA: 31 + i * 2,
    likesB: 67 + i * 5,
    commentsB: 22 + i,
    sourceType: sourceTypes[i % sourceTypes.length],
    sourceDate: new Date(postYear, i % 12, 11 + (i % 15)),
  };
});

// 20 newer posts — 2022–2026, sorted newest first
const newerPosts: Post[] = [
  { year: 2026, month: 5,  day: 15, seed: 50 },
  { year: 2026, month: 3,  day: 22, seed: 51 },
  { year: 2026, month: 1,  day: 8,  seed: 52 },
  { year: 2025, month: 11, day: 30, seed: 53 },
  { year: 2025, month: 9,  day: 14, seed: 54 },
  { year: 2025, month: 7,  day: 3,  seed: 55 },
  { year: 2025, month: 5,  day: 19, seed: 56 },
  { year: 2025, month: 2,  day: 28, seed: 57 },
  { year: 2024, month: 12, day: 11, seed: 58 },
  { year: 2024, month: 10, day: 7,  seed: 59 },
  { year: 2024, month: 8,  day: 23, seed: 60 },
  { year: 2024, month: 6,  day: 16, seed: 61 },
  { year: 2024, month: 4,  day: 2,  seed: 62 },
  { year: 2024, month: 2,  day: 18, seed: 63 },
  { year: 2023, month: 12, day: 25, seed: 64 },
  { year: 2023, month: 10, day: 9,  seed: 65 },
  { year: 2023, month: 7,  day: 31, seed: 66 },
  { year: 2023, month: 5,  day: 5,  seed: 67 },
  { year: 2023, month: 3,  day: 20, seed: 68 },
  { year: 2022, month: 12, day: 1,  seed: 69 },
].map(({ year, month, day, seed }, i) => ({
  id: `post-new-${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${seed}/600/600`,
  labelDate: `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`,
  postDate: new Date(year, month - 1, day),
  likesA: 340 + i * 18,
  commentsA: 89 + i * 5,
  likesB: 210 + i * 12,
  commentsB: 44 + i * 3,
  sourceType: sourceTypes[i % sourceTypes.length],
  sourceDate: new Date(year, (month % 12), Math.min(day + 5, 28)),
}));

// Combined: newer posts first, then original
export const mockPosts: Post[] = [...newerPosts, ...originalPosts];

export const PAGE_SIZE = 24;

export const profileStats: ProfileStats = {
  posts: 870,
  followers: 11787,
  following: 112,
  username: "monblanproject",
  startDate: new Date("2016-02-17"),
};
