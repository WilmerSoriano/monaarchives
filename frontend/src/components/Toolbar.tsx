
import { ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  onAddBookmark: () => void;
};

export function Toolbar({
  search,
  onSearchChange,
  filtersOpen,
  onToggleFilters,
  onAddBookmark,
}: Props) {
  // Provides the main library toolbar for searching bookmarks, opening filters, and adding new bookmarks.
  return (
    <section className="toolbar">
      {/* Allows users to search the library by bookmark title as they type. */}
      <label className="searchbox">
        <Search size={19} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Find your series by title..."
        />
      </label>

      {/* Toggles the visibility of the library's additional filtering and sorting controls. */}
      <button
        className={`button filter-toggle ${filtersOpen ? "active" : ""}`}
        onClick={onToggleFilters}
      >
        <SlidersHorizontal size={17} />
        Filters
        <ChevronDown className={filtersOpen ? "rotate" : ""} size={16} />
      </button>

      {/* Opens the bookmark form in add mode so users can create a new library entry. */}
      <button className="button primary" onClick={onAddBookmark}>
        <Plus size={18} />
        Add bookmark
      </button>
    </section>
  );
}
