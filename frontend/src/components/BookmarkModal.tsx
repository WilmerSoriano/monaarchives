import { useState } from "react";
import type { FormEvent } from "react";
import { BookmarkPlus, ChevronDown, Pencil, Plus, X } from "lucide-react";
import type { Bookmark, BookmarkFormData, Status } from "../types/bookmark";
import { STATUSES } from "../constants/bookmarks";
import { isValidHttpUrl } from "../utils/url";

type Props = {
  bookmark: Bookmark | null; // null = "Add" mode
  onClose: () => void;
  onSubmit: (data: BookmarkFormData) => void;
};

export function BookmarkModal({ bookmark, onClose, onSubmit }: Props) {
  const isEditing = bookmark !== null;

  const [form, setForm] = useState(() => ({
    title: bookmark?.title ?? "",
    chapter: bookmark ? String(bookmark.chapter) : "",
    status: (bookmark?.status ?? "READING") as Status,
    url: bookmark?.url ?? "",
    rating: bookmark?.rating ?? 0,
  }));

  const [formChapterWarning, setFormChapterWarning] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

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
    setForm((current) => ({ ...current, chapter: rawValue }));
  };

  const titleIsValid = form.title.trim().length > 0;
  const chapterIsValid = form.chapter.trim() !== "" && /^\d+$/.test(form.chapter);
  const urlIsValid = isValidHttpUrl(form.url);
  const canSubmit = titleIsValid && chapterIsValid && urlIsValid;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const parsedUrl = new URL(form.url.trim());

    onSubmit({
      title: form.title.trim(),
      chapter: Number(form.chapter),
      status: form.status,
      url: parsedUrl.toString(),
      rating: form.rating,
    });
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form className="modal" onSubmit={handleSubmit} noValidate>
        <div className="modal-top">
          <div className="modal-icon">
            {isEditing ? <Pencil size={22} /> : <BookmarkPlus size={22} />}
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <h2>{isEditing ? "Edit bookmark" : "Add bookmark"}</h2>

        <label className="field full">
          <span>Title</span>

          <input
            required
            autoFocus
            placeholder="e.g. Omniscient Reader’s Viewpoint"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
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
              onChange={(event) => handleFormChapterChange(event.target.value)}
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
                {STATUSES.map((status) => (
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
              setForm((current) => ({ ...current, url: event.target.value }))
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

          <div className="rating-picker" onMouseLeave={() => setHoverRating(0)}>
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
                      rating: current.rating === number ? 0 : number,
                    }))
                  }
                  aria-label={`Set rating to ${number} out of 5`}
                  aria-pressed={form.rating === number}
                  className={number <= (hoverRating || form.rating) ? "on" : ""}
                >
                  ★
                </button>
              ))}
            </div>

            <strong>{form.rating} / 5</strong>
          </div>
        </div>

        <div className="modal-edit">
          <button type="button" className="button cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="button primary submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            {isEditing ? (
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
  );
}