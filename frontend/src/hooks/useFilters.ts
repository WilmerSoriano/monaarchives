import { useState } from "react";
import type { Status } from "../types/bookmark";

export type SortBy = "title" | "chapter" | "rating";
export type SortDirection = "asc" | "desc";

export function useFilters() {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

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