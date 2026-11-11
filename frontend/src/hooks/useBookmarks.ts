import { useEffect, useState } from "react";
import type { Bookmark, BookmarkFormData } from "../types/bookmark";
import { INSTANT_EPOCH, STARTER_BOOKMARKS } from "../constants/bookmarks";
import { getWebsiteName } from "../utils/url";

const STORAGE_KEY = "monaarchives-bookmarks";

function loadBookmarks(): Bookmark[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return STARTER_BOOKMARKS;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return STARTER_BOOKMARKS;

    return parsed.map((bookmark: Partial<Bookmark>) => ({
      ...bookmark,
      dateLastClicked: bookmark.dateLastClicked ?? INSTANT_EPOCH,
    })) as Bookmark[];
  } catch {
    return STARTER_BOOKMARKS;
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (data: BookmarkFormData) => {
    const website = getWebsiteName(new URL(data.url));

    const newBookmark: Bookmark = {
      id: Date.now(),
      title: data.title,
      chapter: data.chapter,
      status: data.status,
      website,
      rating: data.rating,
      url: data.url,
      dateLastClicked: INSTANT_EPOCH,
    };

    setBookmarks((current) => [...current, newBookmark]);
  };

  const updateBookmark = (id: number, data: BookmarkFormData) => {
    const website = getWebsiteName(new URL(data.url));

    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...data, website } : bookmark
      )
    );
  };

  const deleteBookmark = (id: number) => {
    setBookmarks((current) =>
      current.filter((bookmark) => bookmark.id !== id)
    );
  };

  const markVisited = (id: number) => {
    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, dateLastClicked: new Date().toISOString() }
          : bookmark
      )
    );
  };

  return { bookmarks, addBookmark, updateBookmark, deleteBookmark, markVisited };
}