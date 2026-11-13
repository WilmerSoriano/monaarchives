
import { useState } from "react";
import type { FormEvent } from "react";
import { BookmarkPlus, ChevronDown, Pencil, Plus, X } from "lucide-react";
import type { Bookmark, BookmarkFormData, Status } from "../types/bookmark";
import { STATUSES } from "../constants/bookmarks";
import { getWebsiteName, isValidHttpUrl } from "../utils/url";

type Props = {
  bookmark: Bookmark | null; // null = "Add" mode
  onClose: () => void;
  onSubmit: (data: BookmarkFormData) => void | Promise<void>;
};

export function BookmarkModal({ bookmark, onClose, onSubmit }: Props) {
  // Determines whether the modal is being used to add a new bookmark or edit an existing one.
  const isEditing = bookmark !== null;

  // Initializes the form with existing bookmark data when editing, or default values when adding.
  const [form, setForm] = useState(() => ({
    title: bookmark?.title ?? "",
    chapter: bookmark ? String(bookmark.chapter) : "",
    status: (bookmark?.status ?? "READING") as Status,
    url: bookmark?.url ?? "",
    rating: bookmark?.rating ?? 0,
  }));

  // Tracks invalid chapter input, the currently hovered rating star, and submission state.
  const [formChapterWarning, setFormChapterWarning] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Restricts chapter input to numbers and displays a warning when non-numeric characters are entered.
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

  // Checks the form fields against the validation constraints defined by the Java request DTOs.
  const titleIsValid =
    form.title.trim().length > 0 && form.title.trim().length <= 180;
  const chapterNumber = Number(form.chapter);
  const chapterIsValid =
    form.chapter.trim() !== "" &&
    /^\d+$/.test(form.chapter) &&
    chapterNumber >= 0 &&
    chapterNumber <= 10000;
  const urlIsValid =
    form.url.trim().length <= 1000 && isValidHttpUrl(form.url);
  const dnsIsValid =
    urlIsValid &&
    getWebsiteName(new URL(form.url.trim())).length <= 128;
  const ratingIsValid =
    Number.isInteger(form.rating) && form.rating >= 0 && form.rating <= 5;

  const canSubmit =
    titleIsValid &&
    chapterIsValid &&
    urlIsValid &&
    dnsIsValid &&
    ratingIsValid &&
    !submitting;

  // Validates the form, extracts the website name, and submits the six fields expected by the Java DTO.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const parsedUrl = new URL(form.url.trim());

    const data: BookmarkFormData = {
      title: form.title.trim(),
      chapter: chapterNumber,
      status: form.status,
      dns: getWebsiteName(parsedUrl),
      url: parsedUrl.toString(),
      rating: form.rating,
    };

    setSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save bookmark."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Renders the add/edit modal, including bookmark fields, reading status, rating selection, and form actions.
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (!submitting && event.target === event.currentTarget) onClose();
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
            disabled={submitting}
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
            maxLength={180}
            placeholder="e.g. Omniscient Reader’s Viewpoint"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            aria-invalid={form.title.length > 0 && !titleIsValid}
          />

          {form.title.trim().length > 180 && (
            <small className="input-warning" role="alert">
              Title cannot exceed 180 characters.
            </small>
          )}
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
              aria-invalid={formChapterWarning || (form.chapter !== "" && !chapterIsValid)}
              required
            />

            {formChapterWarning && (
              <small className="input-warning" role="alert">
                Only numbers are allowed.
              </small>
            )}

            {form.chapter !== "" && /^\d+$/.test(form.chapter) && !chapterIsValid && (
              <small className="input-warning" role="alert">
                Chapter must be between 0 and 10,000.
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
            maxLength={1000}
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
              Enter a valid HTTP or HTTPS URL no longer than 1,000 characters.
            </small>
          )}

          {urlIsValid && !dnsIsValid && (
            <small className="input-warning" role="alert">
              The extracted website name cannot exceed 128 characters.
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
                  disabled={submitting}
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

        {submitError && (
          <p className="input-warning" role="alert">
            {submitError}
          </p>
        )}

        {/* Provides actions to cancel the form, submit the new, or updated bookmark. */}
        <div className="modal-edit">
          <button
            type="button"
            className="button cancel"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="button primary submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            {submitting ? (
              "Saving..."
            ) : isEditing ? (
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
