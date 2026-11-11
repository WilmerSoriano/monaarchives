
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  BookmarkPlus,
  ChevronDown,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";

type Status =
  | "COMPLETED"
  | "READING"
  | "PLANNED"
  | "HIATUS"
  | "DROPPED"
  | "AXED";

type Bookmark = {
  id: number;
  title: string;
  chapter: number;
  status: Status;
  website: string;
  rating: number;
  url: string;
  dateLastClicked: string;
};

const INSTANT_EPOCH = "1970-01-01T00:00:00Z"; // default date

// Back up samples just in case
const starterBookmarks: Bookmark[] = [
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

const statuses: Status[] = [
  "COMPLETED",
  "READING",
  "PLANNED",
  "HIATUS",
  "DROPPED",
  "AXED",
];

const pastelClasses = ["lilac", "peach", "pink","mint", "blue", "cream"]; // Colors from CSS file

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim());

    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      Boolean(parsed.hostname)
    );
  } catch {
    return false;
  }
}

function getWebsiteName(url: URL): string {
  const hostname = url.hostname.replace(/^www\./, "");

  return hostname;
}

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem("monaarchives-bookmarks");

      if (!saved) return starterBookmarks;

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) return starterBookmarks;

      return parsed.map((bookmark: Partial<Bookmark>) => ({
        ...bookmark,
        lastVisitedAt: bookmark.dateLastClicked ?? INSTANT_EPOCH,
      })) as Bookmark[];
    } catch {
      return starterBookmarks;
    }
  });

  // === The Search and filter options === 
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [sortBy, setSortBy] = useState<"title" | "chapter" | "rating">("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [minChapter, setMinChapter] = useState("");
  const [maxChapter, setMaxChapter] = useState("");
  const [minChapterWarning, setMinChapterWarning] = useState(false);
  const [maxChapterWarning, setMaxChapterWarning] = useState(false);
  const [websiteFilter, setWebsiteFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBookmarkId, setEditingBookmarkId] = useState<number | null>(null);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);

  const [form, setForm] = useState({
    title: "",
    chapter: "",
    status: "READING" as Status,
    url: "",
    rating: 0,
  });

  const [formChapterWarning, setFormChapterWarning] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
// ============================================================

  // Saves bookmark changes to local storage so the library persists after refreshing the page.
  useEffect(() => {
    localStorage.setItem(
      "monaarchives-bookmarks",
      JSON.stringify(bookmarks)
    );
  }, [bookmarks]);

  // Filters and sorts bookmarks based on the user's selected search and filter options.
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
          bookmark.website
            .toLowerCase()
            .includes(websiteFilter.toLowerCase());

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
  // =========================================

  const resetFilters = () => {
    setSortBy("title");
    setDirection("asc");
    setRatingFilter(null);
    setStatusFilter("ALL");
    setMinChapter("");
    setMaxChapter("");
    setMinChapterWarning(false);
    setMaxChapterWarning(false);
    setWebsiteFilter("");
    setSearch("");
  };

  const handleFilterChapterChange = (
    rawValue: string,
    setValue: (value: string) => void,
    setWarning: (value: boolean) => void
  ) => {
    if (rawValue !== "" && !/^\d+$/.test(rawValue)) {
      setWarning(true);
      setValue(rawValue.replace(/\D/g, ""));
      return;
    }

    setWarning(false);
    setValue(rawValue);
  };

  const handleFormChapterChange = (rawValue: string) => {
    if (rawValue !== "" && !/^\d+$/.test(rawValue)) {
      setFormChapterWarning(true);

      setForm((current) => ({
        ...current,
        chapter: rawValue.replace(/\D/g, ""),
      }));

      return;
    }

    setFormChapterWarning(false);

    setForm((current) => ({
      ...current,
      chapter: rawValue,
    }));
  };

  const titleIsValid = form.title.trim().length > 0;
  const chapterIsValid =
    form.chapter.trim() !== "" && /^\d+$/.test(form.chapter);
  const urlIsValid = isValidHttpUrl(form.url);

  const canSubmit = titleIsValid && chapterIsValid && urlIsValid;

  // Open a blank modal for a new bookmark.
  const openAddModal = () => {
    setEditingBookmarkId(null);

    setForm({
      title: "",
      chapter: "",
      status: "READING",
      url: "",
      rating: 0,
    });

    setFormChapterWarning(false);
    setHoverRating(0);
    setModalOpen(true);
  };

  // Open the same modal with the selected bookmark's information.
  const openEditModal = (bookmark: Bookmark) => {
    setEditingBookmarkId(bookmark.id);

    setForm({
      title: bookmark.title,
      chapter: String(bookmark.chapter),
      status: bookmark.status,
      url: bookmark.url,
      rating: bookmark.rating,
    });

    setFormChapterWarning(false);
    setHoverRating(0);
    setModalOpen(true);
  };

  // Save either a new bookmark or changes to an existing one.
  const saveBookmark = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) return;

    const parsedUrl = new URL(form.url.trim());
    const website = getWebsiteName(parsedUrl);

    if (editingBookmarkId !== null) {
      setBookmarks((current) =>
        current.map((bookmark) =>
          bookmark.id === editingBookmarkId
            ? {
                ...bookmark,
                title: form.title.trim(),
                chapter: Number(form.chapter),
                status: form.status,
                website,
                rating: form.rating,
                url: parsedUrl.toString(),
              }
            : bookmark
        )
      );
    } else {
      const newBookmark: Bookmark = {
        id: Date.now(),
        title: form.title.trim(),
        chapter: Number(form.chapter),
        status: form.status,
        website,
        rating: form.rating,
        url: parsedUrl.toString(),
        dateLastClicked: INSTANT_EPOCH,
      };

      setBookmarks((current) => [...current, newBookmark]);
    }

    closeModal();
  };

  // Open the confirmation dialog for the selected bookmark.
  const requestBookmarkDelete = (bookmark: Bookmark) => {
    setBookmarkToDelete(bookmark);
  };

  // Delete only after the user confirms the action.
  const confirmBookmarkDelete = () => {
    if (!bookmarkToDelete) return;

    setBookmarks((current) =>
      current.filter((bookmark) => bookmark.id !== bookmarkToDelete.id)
    );
    setBookmarkToDelete(null);
  };

  // Close the confirmation dialog without changing the bookmark list.
  const cancelBookmarkDelete = () => {
    setBookmarkToDelete(null);
  };

  // Update the hidden visit timestamp when the website link is clicked.
  const markBookmarkVisited = (id: number) => {
    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === id
          ? {
              ...bookmark,
              dateLastClicked: new Date().toISOString(),
            }
          : bookmark
      )
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBookmarkId(null);
    setFormChapterWarning(false);
    setHoverRating(0);
  };

  return (
    <main className="page">
      <header className="brand">
        <div
          className="mascot-placeholder"
          aria-label="Mascot image placeholder"
        />
        <h1>MonaArchives</h1>
      </header>

      <section className="toolbar">
        <label className="searchbox">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your series by title..."
          />
        </label>

        <button
          className={`button filter-toggle ${filtersOpen ? "active" : ""}`}
          onClick={() => setFiltersOpen((value) => !value)}
        >
          <SlidersHorizontal size={17} />
          Filters
          <ChevronDown
            className={filtersOpen ? "rotate" : ""}
            size={16}
          />
        </button>

        <button className="button primary" onClick={openAddModal}>
          <Plus size={18} />
          Add bookmark
        </button>
      </section>

      {filtersOpen && (
        <section className="filters">
          <div className="filter-top">
            <div className="filter-group sort-group">
              <span className="filter-label">Sort by</span>

              <div className="pills">
                {(["title", "chapter", "rating"] as const).map((sort) => (
                  <button
                    key={sort}
                    className={`pill ${
                      sortBy === sort ? "selected" : ""
                    }`}
                    onClick={() => setSortBy(sort)}
                  >
                    {sort[0].toUpperCase() + sort.slice(1)}
                  </button>
                ))}

                <button
                  className={`pill ${
                    direction === "asc" ? "selected" : ""
                  }`}
                  onClick={() => setDirection("asc")}
                >
                  ↑ Ascending
                </button>

                <button
                  className={`pill ${
                    direction === "desc" ? "selected" : ""
                  }`}
                  onClick={() => setDirection("desc")}
                >
                  ↓ Descending
                </button>
              </div>
            </div>

            <div className="filter-group rating-group">
              <span className="filter-label">Rating</span>

              <div className="pills">
                <button
                  className={`pill ${
                    ratingFilter === null ? "selected" : ""
                  }`}
                  onClick={() => setRatingFilter(null)}
                >
                  Any
                </button>

                {[0, 1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    className={`rating-number ${
                      ratingFilter === number ? "chosen" : ""
                    }`}
                    onClick={() => setRatingFilter(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group chapter-group">
              <span className="filter-label">Chapter number</span>

              <div className="chapter-inputs">
                <input
                  aria-label="Minimum chapter"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Min"
                  value={minChapter}
                  onChange={(event) =>
                    handleFilterChapterChange(
                      event.target.value,
                      setMinChapter,
                      setMinChapterWarning
                    )
                  }
                  aria-invalid={minChapterWarning}
                />

                <span>–</span>

                <input
                  aria-label="Maximum chapter"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Max"
                  value={maxChapter}
                  onChange={(event) =>
                    handleFilterChapterChange(
                      event.target.value,
                      setMaxChapter,
                      setMaxChapterWarning
                    )
                  }
                  aria-invalid={maxChapterWarning}
                />
              </div>

              {(minChapterWarning || maxChapterWarning) && (
                <small className="input-warning" role="alert">
                  Only numbers are allowed.
                </small>
              )}
            </div>

            <div className="filter-group website-group">
              <span className="filter-label">Website name</span>

              <label className="website-input">
                <Search size={15} />

                <input
                  value={websiteFilter}
                  onChange={(event) => setWebsiteFilter(event.target.value)}
                  placeholder="e.g. MangaDex"
                />
              </label>
            </div>
          </div>

          <div className="status-line">
            <span className="filter-label">Status</span>

            <div className="pills">
              <button
                className={`pill ${
                  statusFilter === "ALL" ? "selected" : ""
                }`}
                onClick={() => setStatusFilter("ALL")}
              >
                All
              </button>

              {statuses.map((status) => (
                <button
                  key={status}
                  className={`pill ${
                    statusFilter === status ? "selected" : ""
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <button className="reset" onClick={resetFilters}>
              Reset filters
            </button>
          </div>

          <p className="filter-hint">
            {ratingFilter === null
              ? "A rating of 0 are stories yet to be rated yet."
              : `Showing stories rated ${ratingFilter} out of 5.`}
          </p>
        </section>
      )}

      <section className="library">
        <div className="library-heading">
          <h2>Manga/Manhwa/Manhua/LN/WN</h2>
          <span className="count">{visibleBookmarks.length}</span>
        </div>

        <div className="table-head">
          <span>
            Title{" "}
            <b>
              {sortBy === "title"
                ? direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </b>
          </span>

          <span>Chapter</span>
          <span>Status</span>
          <span>Website</span>
          <span>Rating</span>
          <span></span>        
        </div>

        <div className="bookmark-list">
          {visibleBookmarks.map((bookmark, index) => (
            <article
              className={`bookmark-row ${
                pastelClasses[index % pastelClasses.length]
              }`}
              key={bookmark.id}
            >
              <div className="book-title">
                <strong>{bookmark.title}</strong>
              </div>

              <span className="chapter-value">{bookmark.chapter}</span>

              <span>
                <span
                  className={`status-badge ${bookmark.status.toLowerCase()}`}
                >
                  {bookmark.status}
                </span>
              </span>

              <span className="website-value">
                <span className="site-icon">
                  {bookmark.website.charAt(0).toUpperCase()}
                </span>

                <a
                  className="website-link"
                  href={bookmark.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => markBookmarkVisited(bookmark.id)}
                  aria-label={`Open ${bookmark.website}`}
                >
                  {bookmark.website}
                </a>
              </span>

              <span
                className="stars"
                aria-label={`${bookmark.rating} out of 5 stars`}
              >
                {[1, 2, 3, 4, 5].map((number) => (
                  <span
                    key={number}
                    className={number <= bookmark.rating ? "filled" : ""}
                  >
                    ★
                  </span>
                ))}
              </span>

              <div className="bookmark-actions">
                <button
                  type="button"
                  className="edit-bookmark"
                  onClick={() => openEditModal(bookmark)}
                  aria-label={`Edit ${bookmark.title}`}
                >
                  <Pencil size={14} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  className="delete-bookmark"
                  onClick={() => requestBookmarkDelete(bookmark)}
                  aria-label={`Delete ${bookmark.title}`}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </article>
          ))}

          {visibleBookmarks.length === 0 && (
            <div className="empty-state">
              No bookmarks found. Try changing your filters or add a new
              story.
            </div>
          )}
        </div>

        <footer className="page-footer">
          <span>
            All {visibleBookmarks.length} bookmarks · Sorted by {sortBy},{" "}
            {direction === "asc" ? "A–Z" : "Z–A"}
          </span>
        </footer>
      </section>

      {modalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <form className="modal" onSubmit={saveBookmark} noValidate>
            <div className="modal-top">
              <div className="modal-icon">
                {editingBookmarkId !== null ? (
                  <Pencil size={22} />
                ) : (
                  <BookmarkPlus size={22} />
                )}
              </div>

              <button
                type="button"
                className="close-button"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <h2>
              {editingBookmarkId !== null
                ? "Edit bookmark"
                : "Add bookmark"}
            </h2>

            <label className="field full">
              <span>Title</span>

              <input
                required
                autoFocus
                placeholder="e.g. Omniscient Reader’s Viewpoint"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                aria-invalid={form.title.length > 0 && !titleIsValid}
              />
            </label>

            <div className="field-grid">
              <label className="field">
                <span>Chapter</span>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="e.g. 25"
                  value={form.chapter}
                  onChange={(event) =>
                    handleFormChapterChange(event.target.value)
                  }
                  aria-invalid={formChapterWarning}
                  required
                />

                {formChapterWarning && (
                  <small className="input-warning" role="alert">
                    Only numbers are allowed.
                  </small>
                )}
              </label>

              <label className="field">
                <span>Reading status</span>

                <div className="select-wrap">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as Status,
                      }))
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>
              </label>
            </div>

            <label className="field full">
              <span>Reading URL</span>

              <input
                type="url"
                placeholder="https://..."
                value={form.url}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    url: event.target.value,
                  }))
                }
                aria-invalid={form.url.length > 0 && !urlIsValid}
                required
              />

              {form.url.length > 0 && !urlIsValid && (
                <small className="input-warning" role="alert">
                  Enter a valid URL beginning with https:// or http://.
                </small>
              )}
            </label>

            <div className="field full">
              <span>Rating</span>

              <div
                className="rating-picker"
                onMouseLeave={() => setHoverRating(0)}
              >
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      type="button"
                      key={number}
                      onMouseEnter={() => setHoverRating(number)}
                      onFocus={() => setHoverRating(number)}
                      onBlur={() => setHoverRating(0)}
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          rating:
                            current.rating === number ? 0 : number,
                        }))
                      }
                      aria-label={`Set rating to ${number} out of 5`}
                      aria-pressed={form.rating === number}
                      className={
                        number <= (hoverRating || form.rating) ? "on" : ""
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>

                <strong>{form.rating} / 5</strong>
              </div>
            </div>

            <div className="modal-edit">
              <button
                type="button"
                className="button cancel"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="button primary submit"
                disabled={!canSubmit}
                aria-disabled={!canSubmit}
              >
                {editingBookmarkId !== null ? (
                  <>
                    <Pencil size={17} />
                    Save changes
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Add bookmark
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {bookmarkToDelete && (
        <div
          className="modal-backdrop delete-confirm-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cancelBookmarkDelete();
          }}
        >
          <section
            className="delete-confirm-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            aria-describedby="delete-confirm-message"
          >
            <div className="delete-confirm-icon">
              <Trash2 size={21} />
            </div>

            <h2 id="delete-confirm-title">Are you sure you want to Delete?</h2>
            <p id="delete-confirm-message">All bookmark info will be lost.</p>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="delete-no-button"
                onClick={cancelBookmarkDelete}
              >
                No
              </button>
              <button
                type="button"
                className="delete-yes-button"
                onClick={confirmBookmarkDelete}
              >
                Yes
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;

