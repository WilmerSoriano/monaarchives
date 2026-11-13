import { useEffect, useState } from "react";
import type { Bookmark, BookmarkFormData } from "../types/bookmark";
import {
  getBookmarks,
  createBookmark as apiCreateBookmark,
  updateBookmark as apiUpdateBookmark,
  deleteBookmark as apiDeleteBookmark,
  markBookmarkVisited,
} from "../services/bookmarkApi";

export function useBookmarks() {
  // Stores bookmarks retrieved from the backend and tracks loading and API errors.
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loads the bookmark collection when the hook is first mounted.
  useEffect(() => { let isMounted = true;

    async function loadBookmarks() {
      try {
        const data = await getBookmarks();

        if (isMounted) {
          setBookmarks(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : "Failed to load bookmarks.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBookmarks();

    return () => {isMounted = false;};}, []);

  // Creates a bookmark through the API and adds the returned entity to the collection.
  const addBookmark = async (data: BookmarkFormData) => {
    try {
      const newBookmark = await apiCreateBookmark(data);

      setBookmarks((current) => [...current, newBookmark]);
      setError(null);

      return newBookmark;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create bookmark.");
      throw error;
    }
  };

  // Replaces the selected bookmark with the updated entity returned by the API.
  const updateBookmark = async (id: string, data: BookmarkFormData) => {
    try {
      const updatedBookmark = await apiUpdateBookmark(id, data);

      setBookmarks((current) =>current.map((bookmark) => bookmark.id === id ? updatedBookmark : bookmark));

      setError(null);

      return updatedBookmark;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update bookmark.");
      throw error;
    }
  };

  // Deletes the selected bookmark through the API and removes it from the collection.
  const deleteBookmark = async (id: string) => {
    try {
      await apiDeleteBookmark(id);

      setBookmarks((current) => current.filter((bookmark) => bookmark.id !== id));

      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete bookmark.");
      throw error;
    }
  };

  // Records a visit through the backend and updates the bookmark with its returned timestamp.
  const markVisited = async (id: string) => {
    try {
      const updatedBookmark = await markBookmarkVisited(id);

      setBookmarks((current) => current.map((bookmark) =>bookmark.id === id ? updatedBookmark : bookmark));

      setError(null);

      return updatedBookmark;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to record bookmark visit.");
      throw error;
    }
  };

  // Exposes bookmark data and its management functions to components that use this hook.
  return { bookmarks, loading, error, addBookmark, updateBookmark, deleteBookmark, markVisited };
}
