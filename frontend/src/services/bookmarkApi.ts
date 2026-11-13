/*
    This file is only responsible for making
    HTTP requests.
*/
import type { Bookmark, BookmarkFormData } from "../types/bookmark";

const API_URL =  "http://localhost:8080/api/v1/bookmarks"; // To be changed for security reason.

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Determines the type of request user asked.
    const response = await fetch(`${API_URL}${endpoint}`, {...options, headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,},
    });
    
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error( errorMessage || `Request failed with status ${response.status}`);
    }
    
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

// Retrieves all bookmarks.
export function getBookmarks(): Promise<Bookmark[]> {
  return apiRequest<Bookmark[]>("");
}

export function createBookmark(data: BookmarkFormData): Promise<Bookmark> {
  return apiRequest<Bookmark>("", {method: "POST", body: JSON.stringify(data),}); // and also returns the saved bookmark
}

export function updateBookmark(id: string, data: BookmarkFormData): Promise<Bookmark> {
  return apiRequest<Bookmark>(`/${encodeURIComponent(id)}`, {method: "PUT",body: JSON.stringify(data),});
}

export function patchBookmark(id: string, data: Partial<BookmarkFormData>): Promise<Bookmark> {
    return apiRequest<Bookmark>(`/${encodeURIComponent(id)}`, {method: "PATCH",body: JSON.stringify(data),});
}

//Only updates the visited date
export function markBookmarkVisited(id: string): Promise<Bookmark> {
    return apiRequest<Bookmark>(`/${encodeURIComponent(id)}/visit`,{ method: "PATCH" });
}

export function deleteBookmark(id: string): Promise<void> {
    return apiRequest<void>(`/${encodeURIComponent(id)}`, {method: "DELETE",});
}