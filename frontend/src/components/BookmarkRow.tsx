import { Pencil, Trash2 } from "lucide-react";
import type { Bookmark } from "../types/bookmark";
import { PASTEL_CLASSES } from "../constants/bookmarks";

type Props = {
  bookmark: Bookmark;
  index: number;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
  onVisit: (id: number) => void;
};

export function BookmarkRow({
  bookmark,
  index,
  onEdit,
  onDelete,
  onVisit,
}: Props) {
  return (
    <article
      className={`bookmark-row ${PASTEL_CLASSES[index % PASTEL_CLASSES.length]}`}
    >
      <div className="book-title">
        <strong>{bookmark.title}</strong>
      </div>

      <span className="chapter-value">{bookmark.chapter}</span>

      <span>
        <span className={`status-badge ${bookmark.status.toLowerCase()}`}>
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
          onClick={() => onVisit(bookmark.id)}
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
          <span key={number} className={number <= bookmark.rating ? "filled" : ""}>
            ★
          </span>
        ))}
      </span>

      <div className="bookmark-actions">
        <button
          type="button"
          className="edit-bookmark"
          onClick={() => onEdit(bookmark)}
          aria-label={`Edit ${bookmark.title}`}
        >
          <Pencil size={14} />
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="delete-bookmark"
          onClick={() => onDelete(bookmark)}
          aria-label={`Delete ${bookmark.title}`}
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}