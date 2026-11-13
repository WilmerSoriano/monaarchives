

import { useMemo, useState } from "react";
import type { Bookmark, BookmarkFormData } from "./types/bookmark";
import { useBookmarks } from "./hooks/useBookmarks";
import { useFilters } from "./hooks/useFilters";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import { Filters } from "./components/Filters";
import { Library } from "./components/Library";
import { BookmarkModal } from "./components/BookmarkModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";

function App() {
  const {
    bookmarks,
    loading,
    error,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    markVisited,
  } = useBookmarks();

  const filters = useFilters();

  // Controls the add/edit modal and stores the bookmark currently being edited or deleted.
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);

  const {
  search,
  statusFilter,
  ratingFilter,
  minChapter,
  maxChapter,
  websiteFilter,
  sortBy,
  direction,
  } = filters;

  // Filters and sorts bookmarks based on the current search term and filter settings.
  // useMemo recalculates the visible list only when its dependencies change.
  const visibleBookmarks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return bookmarks
      .filter((bookmark) => {
        const matchesSearch =
          !term ||
          bookmark.title.toLowerCase().includes(term) ||
          bookmark.dns.toLowerCase().includes(term);

        const matchesStatus =
          statusFilter === "ALL" || bookmark.status === statusFilter;

        const matchesRating =
          ratingFilter === null || bookmark.rating === ratingFilter;

        const matchesMin =
          minChapter === "" || bookmark.chapter >= Number(minChapter);

        const matchesMax =
          maxChapter === "" || bookmark.chapter <= Number(maxChapter);

        const matchesWebsite =
          !websiteFilter ||
          bookmark.dns.toLowerCase().includes(websiteFilter.toLowerCase());

        return (
          matchesSearch &&
          matchesStatus &&
          matchesRating &&
          matchesMin &&
          matchesMax &&
          matchesWebsite
        );
      })
      .sort((a, b) => {
        const result =
          sortBy === "title"
            ? a.title.localeCompare(b.title)
            : a[sortBy] - b[sortBy];

        return direction === "asc" ? result : -result;
      });
  }, [
    bookmarks,
    search,
    statusFilter,
    ratingFilter,
    minChapter,
    maxChapter,
    websiteFilter,
    sortBy,
    direction,
  ]);

  // Opens the bookmark form in add mode by clearing any previously selected bookmark.
  const openAddModal = () => {
    setEditingBookmark(null);
    setModalOpen(true);
  };

  // Opens the bookmark form with the selected bookmark's existing information.
  const openEditModal = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setModalOpen(true);
  };

  // Closes the bookmark form and clears the current editing selection.
  const closeModal = () => {
    setModalOpen(false);
    setEditingBookmark(null);
  };

  // Saves the submitted form data and closes the modal only after the API request succeeds.
  const handleSubmit = async (data: BookmarkFormData) => {
    if (editingBookmark) {
      await updateBookmark(editingBookmark.id, data);
    } else {
      await addBookmark(data);
    }

    closeModal();
  };

  // Deletes the selected bookmark and closes the confirmation dialog only after success.
  const handleDelete = async () => {
    if (!bookmarkToDelete) return;

    try {
      await deleteBookmark(bookmarkToDelete.id);
      setBookmarkToDelete(null);
    } catch {
      // Keeps the confirmation dialog open if the deletion request fails.
    }
  };

  // Records a visit without allowing a failed API request to create an unhandled promise rejection.
  const handleVisit = (id: string) => {
    void markVisited(id).catch(() => {
      // The hook stores the API error for display.
    });
  };

  // Renders the main application layout and connects the shared state to each UI component.
  return (
    <main className="page">
      <Header />

      <Toolbar
        search={filters.search}
        onSearchChange={filters.setSearch}
        filtersOpen={filters.filtersOpen}
        onToggleFilters={() => filters.setFiltersOpen((v) => !v)}
        onAddBookmark={openAddModal}
      />

      {/* Shows the additional filtering and sorting controls when the filter panel is open. */}
      {filters.filtersOpen && <Filters filters={filters} />}

      {/* Displays loading and API error feedback while keeping the bookmark library accessible. */}
      {loading && <p className="api-status">Loading bookmarks...</p>}
      {error && <p className="api-error" role="alert">{error}</p>}

      {/* Displays the filtered bookmark list and passes down its available actions. */}
      {!loading && (
        <Library
          bookmarks={visibleBookmarks}
          sortBy={filters.sortBy}
          direction={filters.direction}
          onEdit={openEditModal}
          onDelete={setBookmarkToDelete}
          onVisit={handleVisit}
        />
      )}

      {/* Displays the add/edit form when requested. */}
      {modalOpen && (
        <BookmarkModal
          key={editingBookmark?.id ?? "new"}
          bookmark={editingBookmark}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {/* Displays a confirmation dialog before permanently deleting a bookmark. */}
      {bookmarkToDelete && (
        <DeleteConfirmModal
          onCancel={() => setBookmarkToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
}

export default App;
