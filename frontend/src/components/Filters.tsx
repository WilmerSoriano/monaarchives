import { ChevronDown, Search } from "lucide-react";
import { STATUSES } from "../constants/bookmarks";
import type { Filters as FiltersState } from "../hooks/useFilters";

type Props = {
  filters: FiltersState;
};

export function Filters({ filters }: Props) {
  return (
    <section className="filters">
      <div className="filter-top">
        <div className="filter-group sort-group">
          <span className="filter-label">Sort by</span>

          <div className="pills">
            {(["title", "chapter", "rating"] as const).map((sort) => (
              <button
                key={sort}
                className={`pill ${filters.sortBy === sort ? "selected" : ""}`}
                onClick={() => filters.setSortBy(sort)}
              >
                {sort[0].toUpperCase() + sort.slice(1)}
              </button>
            ))}

            <button
              className={`pill ${filters.direction === "asc" ? "selected" : ""}`}
              onClick={() => filters.setDirection("asc")}
            >
              ↑ Ascending
            </button>

            <button
              className={`pill ${filters.direction === "desc" ? "selected" : ""}`}
              onClick={() => filters.setDirection("desc")}
            >
              ↓ Descending
            </button>
          </div>
        </div>

        <div className="filter-group rating-group">
          <span className="filter-label">Rating</span>

          <div className="pills">
            <button
              className={`pill ${filters.ratingFilter === null ? "selected" : ""}`}
              onClick={() => filters.setRatingFilter(null)}
            >
              Any
            </button>

            {[0, 1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                className={`rating-number ${
                  filters.ratingFilter === number ? "chosen" : ""
                }`}
                onClick={() => filters.setRatingFilter(number)}
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
              value={filters.minChapter}
              onChange={(event) =>
                filters.handleFilterChapterChange(
                  event.target.value,
                  filters.setMinChapter,
                  filters.setMinChapterWarning
                )
              }
              aria-invalid={filters.minChapterWarning}
            />

            <span>–</span>

            <input
              aria-label="Maximum chapter"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Max"
              value={filters.maxChapter}
              onChange={(event) =>
                filters.handleFilterChapterChange(
                  event.target.value,
                  filters.setMaxChapter,
                  filters.setMaxChapterWarning
                )
              }
              aria-invalid={filters.maxChapterWarning}
            />
          </div>

          {(filters.minChapterWarning || filters.maxChapterWarning) && (
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
              value={filters.websiteFilter}
              onChange={(event) => filters.setWebsiteFilter(event.target.value)}
              placeholder="e.g. MangaDex"
            />
          </label>
        </div>
      </div>

      <div className="status-line">
        <span className="filter-label">Status</span>

        <div className="pills">
          <button
            className={`pill ${filters.statusFilter === "ALL" ? "selected" : ""}`}
            onClick={() => filters.setStatusFilter("ALL")}
          >
            All
          </button>

          {STATUSES.map((status) => (
            <button
              key={status}
              className={`pill ${filters.statusFilter === status ? "selected" : ""}`}
              onClick={() => filters.setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <button className="reset" onClick={filters.resetFilters}>
          Reset filters
        </button>
      </div>

      <p className="filter-hint">
        {filters.ratingFilter === null
          ? "A rating of 0 are stories yet to be rated yet."
          : `Showing stories rated ${filters.ratingFilter} out of 5.`}
      </p>
    </section>
  );
}