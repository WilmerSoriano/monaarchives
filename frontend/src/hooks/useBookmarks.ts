
import { useEffect, useState } from "react";
import type { Bookmark, BookmarkFormData } from "../types/bookmark";
import { INSTANT_EPOCH, STARTER_BOOKMARKS } from "../constants/bookmarks";
import { getWebsiteName } from "../utils/url";

const STORAGE_KEY = "monaarchives-bookmarks";

// Loads previously saved bookmarks from local storage, restores missing click dates, and falls back to starter data if the saved data is unavailable or invalid.
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
  // Manages the bookmark collection and automatically saves every state change to local storage.
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Creates a new bookmark, extracts its website name from the URL, assigns an ID, and adds it to the library.
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

  // Updates the matching bookmark with the submitted form data while refreshing its website name from the URL.
  const updateBookmark = (id: number, data: BookmarkFormData) => {
    const website = getWebsiteName(new URL(data.url));

    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...data, website } : bookmark
      )
    );
  };

  // Removes the selected bookmark from the collection using its unique ID.
  const deleteBookmark = (id: number) => {
    setBookmarks((current) =>
      current.filter((bookmark) => bookmark.id !== id)
    );
  };

  // Records the latest visit time whenever a bookmark's reading link is opened.
  const markVisited = (id: number) => {
    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, dateLastClicked: new Date().toISOString() }
          : bookmark
      )
    );
  };

  // Exposes bookmark data and its management functions to components that use this hook.
  return { bookmarks, addBookmark, updateBookmark, deleteBookmark, markVisited };
}
