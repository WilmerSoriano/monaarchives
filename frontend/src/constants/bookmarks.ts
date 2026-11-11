import type { Bookmark, Status } from "../types/bookmark";

export const INSTANT_EPOCH = "1970-01-01T00:00:00Z";

export const STARTER_BOOKMARKS: Bookmark[] = [
  {
    id: 1,
    title: "One Piece",
    chapter: 0,
    status: "PLANNED",
    website: "example.com",
    rating: 0,
    url: "https://www.example.com/",
    dateLastClicked: INSTANT_EPOCH,
  },
  {
    id: 2,
    title: "Berserk",
    chapter: 378,
    status: "HIATUS",
    website: "mangadex.org",
    rating: 5,
    url: "https://mangadex.org/",
    dateLastClicked: INSTANT_EPOCH,
  },
  {
    id: 3,
    title: "Solo leveling",
    chapter: 180,
    status: "READING",
    website: "Asura Scans",
    rating: 3,
    url: "https://asurascans.com/comics/solo-leveling-f212c582",
    dateLastClicked: INSTANT_EPOCH,
  },
];

export const STATUSES: Status[] = [
  "COMPLETED",
  "READING",
  "PLANNED",
  "HIATUS",
  "DROPPED",
  "AXED",
];

export const PASTEL_CLASSES = [
  "lilac",
  "peach",
  "pink",
  "mint",
  "blue",
  "cream",
];