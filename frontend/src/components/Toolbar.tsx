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
  return (
    <section className="toolbar">
      <label className="searchbox">
        <Search size={19} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Find your series by title..."
        />
      </label>

      <button
        className={`button filter-toggle ${filtersOpen ? "active" : ""}`}
        onClick={onToggleFilters}
      >
        <SlidersHorizontal size={17} />
        Filters
        <ChevronDown className={filtersOpen ? "rotate" : ""} size={16} />
      </button>

      <button className="button primary" onClick={onAddBookmark}>
        <Plus size={18} />
        Add bookmark
      </button>
    </section>
  );
}