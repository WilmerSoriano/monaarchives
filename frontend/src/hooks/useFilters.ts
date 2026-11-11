
import { useState } from "react";
import type { Status } from "../types/bookmark";

export type SortBy = "title" | "chapter" | "rating";
export type SortDirection = "asc" | "desc";

export function useFilters() {
  // Manages the library search input and controls whether the filter panel is visible.
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Stores the active sorting preferences and filtering criteria used to narrow down the bookmark collection.
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [minChapter, setMinChapter] = useState("");
  const [maxChapter, setMaxChapter] = useState("");
  const [minChapterWarning, setMinChapterWarning] = useState(false);
  const [maxChapterWarning, setMaxChapterWarning] = useState(false);
  const [websiteFilter, setWebsiteFilter] = useState("");

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

  // Validates chapter filter input, removes non-numeric characters, and updates the corresponding warning state.
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

  return {
    search,
    setSearch,
    filtersOpen,
    setFiltersOpen,
    sortBy,
    setSortBy,
    direction,
    setDirection,
    ratingFilter,
    setRatingFilter,
    statusFilter,
    setStatusFilter,
    minChapter,
    setMinChapter,
    maxChapter,
    setMaxChapter,
    minChapterWarning,
    setMinChapterWarning,
    maxChapterWarning,
    setMaxChapterWarning,
    websiteFilter,
    setWebsiteFilter,
    resetFilters,
    handleFilterChapterChange,
  };
}

export type Filters = ReturnType<typeof useFilters>;
