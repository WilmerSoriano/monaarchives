
import type { Bookmark } from "../types/bookmark";
import type { SortBy, SortDirection } from "../hooks/useFilters";
import { BookmarkRow } from "./BookmarkRow";

type Props = {
  bookmarks: Bookmark[];
  sortBy: SortBy;
  direction: SortDirection;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
  onVisit: (id: number) => void;
};

export function Library({
  bookmarks,
  sortBy,
  direction,
  onEdit,
  onDelete,
  onVisit,
}: Props) {
  // Renders the bookmark library and displays the current number of bookmarks.
  return (
    <section className="library">
      <div className="library-heading">
        <h2>Manga/Manhwa/Manhua/LN/WN</h2>
        <span className="count">{bookmarks.length}</span>
      </div>

      {/* Displays the column labels and indicates the active title sorting direction. */}
      <div className="table-head">
        <span>
          Title{" "}
          <b>
            {sortBy === "title" ? (direction === "asc" ? "↑" : "↓") : ""}
          </b>
        </span>

        <span>Chapter</span>
        <span>Status</span>
        <span>Website</span>
        <span>Rating</span>
        <span></span>
      </div>

      {/* Maps each bookmark to an individual row and passes down its edit, delete, and visit actions. */}
      <div className="bookmark-list">
        {bookmarks.map((bookmark, index) => (
          <BookmarkRow
            key={bookmark.id}
            bookmark={bookmark}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            onVisit={onVisit}
          />
        ))}

        {/* Displays a message when no bookmarks match the current search or filter settings. */}
        {bookmarks.length === 0 && (
          <div className="empty-state">
            No bookmarks found. Try changing your filters or add a new story.
          </div>
        )}
      </div>

      {/* Summarizes the displayed bookmark count and current sorting configuration. */}
      <footer className="page-footer">
        <span>
          All {bookmarks.length} bookmarks · Sorted by {sortBy},{" "}
          {direction === "asc" ? "A–Z" : "Z–A"}
        </span>
      </footer>
    </section>
  );
}
