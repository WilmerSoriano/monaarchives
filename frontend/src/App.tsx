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
    addBookmark,
    updateBookmark,
    deleteBookmark,
    markVisited,
  } = useBookmarks();

  const filters = useFilters();

  // Destructured for useMemo deps (individual values, not the filter object).
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

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);

  const visibleBookmarks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return bookmarks
      .filter((bookmark) => {
        const matchesSearch =
          !term ||
          bookmark.title.toLowerCase().includes(term) ||
          bookmark.website.toLowerCase().includes(term);

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
          bookmark.website.toLowerCase().includes(websiteFilter.toLowerCase());

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

  const openAddModal = () => {
    setEditingBookmark(null);
    setModalOpen(true);
  };

  const openEditModal = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBookmark(null);
  };

  const handleSubmit = (data: BookmarkFormData) => {
    if (editingBookmark) {
      updateBookmark(editingBookmark.id, data);
    } else {
      addBookmark(data);
    }
    closeModal();
  };

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

      {filters.filtersOpen && <Filters filters={filters} />}

      <Library
        bookmarks={visibleBookmarks}
        sortBy={filters.sortBy}
        direction={filters.direction}
        onEdit={openEditModal}
        onDelete={setBookmarkToDelete}
        onVisit={markVisited}
      />

      {modalOpen && (
        <BookmarkModal
          key={editingBookmark?.id ?? "new"}
          bookmark={editingBookmark}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {bookmarkToDelete && (
        <DeleteConfirmModal
          onCancel={() => setBookmarkToDelete(null)}
          onConfirm={() => {
            deleteBookmark(bookmarkToDelete.id);
            setBookmarkToDelete(null);
          }}
        />
      )}
    </main>
  );
}

export default App;