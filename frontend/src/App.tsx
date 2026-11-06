import { useEffect, useMemo, useState } from "react";
import { BookmarkPlus, ChevronDown, ExternalLink, Link2, Plus, Search, SlidersHorizontal, X } from "lucide-react";

type Status = "COMPLETED" | "READING" | "PLANNED" | "HIATUS" | "DROPPED" | "AXED";
type Bookmark = {
  id: number; title: string; kind: string; chapter: number; status: Status;
  website: string; rating: number; url: string;
};

const starterBookmarks: Bookmark[] = [
  { id: 1, title: "A Returner’s Magic Should Be Special", kind: "Manhwa", chapter: 269, status: "COMPLETED", website: "tappytoon.com", rating: 5, url: "https://www.tappytoon.com/" },
  { id: 2, title: "Berserk", kind: "Manga", chapter: 378, status: "HIATUS", website: "mangadex.org", rating: 5, url: "https://mangadex.org/" },
  { id: 3, title: "Chainsaw Man", kind: "Manga", chapter: 180, status: "READING", website: "MANGA Plus", rating: 4, url: "https://mangaplus.shueisha.co.jp/" },
  { id: 4, title: "Cheating Men Must Die", kind: "Manhua", chapter: 112, status: "DROPPED", website: "mangadex.org", rating: 2, url: "https://mangadex.org/" },
  { id: 5, title: "Solo Leveling", kind: "Manhwa", chapter: 200, status: "COMPLETED", website: "tappytoon.com", rating: 5, url: "https://www.tappytoon.com/" },
  { id: 6, title: "The Apothecary Diaries", kind: "Light novel", chapter: 42, status: "READING", website: "j-novel.club", rating: 5, url: "https://j-novel.club/" },
  { id: 7, title: "The Beginning After the End", kind: "Manhwa", chapter: 0, status: "PLANNED", website: "tapas.io", rating: 0, url: "https://tapas.io/" },
  { id: 8, title: "The Hunters Guild: Red Hood", kind: "Manga", chapter: 18, status: "AXED", website: "MANGA Plus", rating: 3, url: "https://mangaplus.shueisha.co.jp/" }
];

const statuses: Status[] = ["COMPLETED", "READING", "PLANNED", "HIATUS", "DROPPED", "AXED"];
const pastelClasses = ["lilac", "peach", "mint", "blue", "cream", "pink"];

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try { const saved = localStorage.getItem("monaarchives-bookmarks"); return saved ? JSON.parse(saved) : starterBookmarks; }
    catch { return starterBookmarks; }
  });
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState<"title" | "chapter" | "rating">("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [minChapter, setMinChapter] = useState("");
  const [maxChapter, setMaxChapter] = useState("");
  const [websiteFilter, setWebsiteFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", chapter: "0", status: "READING" as Status, url: "", rating: 0 });

  useEffect(() => { localStorage.setItem("monaarchives-bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);

  const visibleBookmarks = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookmarks.filter((b) => {
      const matchesSearch = !term || b.title.toLowerCase().includes(term) || b.website.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchesRating = ratingFilter === null || b.rating === ratingFilter;
      const matchesMin = minChapter === "" || b.chapter >= Number(minChapter);
      const matchesMax = maxChapter === "" || b.chapter <= Number(maxChapter);
      const matchesWebsite = !websiteFilter || b.website.toLowerCase().includes(websiteFilter.toLowerCase());
      return matchesSearch && matchesStatus && matchesRating && matchesMin && matchesMax && matchesWebsite;
    }).sort((a, b) => {
      const result = sortBy === "title" ? a.title.localeCompare(b.title) : a[sortBy] - b[sortBy];
      return direction === "asc" ? result : -result;
    });
  }, [bookmarks, search, statusFilter, ratingFilter, minChapter, maxChapter, websiteFilter, sortBy, direction]);

  const resetFilters = () => {
    setSortBy("title"); setDirection("asc"); setRatingFilter(null); setStatusFilter("ALL");
    setMinChapter(""); setMaxChapter(""); setWebsiteFilter(""); setSearch("");
  };

  const addBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    let website = "";
    try { website = form.url ? new URL(form.url).hostname.replace(/^www\./, "") : ""; }
    catch { website = form.url.replace(/^https?:\/\//, "").split("/")[0]; }
    setBookmarks((current) => [...current, {
      id: Date.now(), title: form.title.trim(), kind: "Manga",
      chapter: Math.max(0, Number(form.chapter) || 0), status: form.status,
      website: website || "—", rating: form.rating, url: form.url
    }]);
    setForm({ title: "", chapter: "0", status: "READING", url: "", rating: 0 });
    setModalOpen(false);
  };

  return <main className="page">
    <header className="brand">
      <div className="mascot-placeholder" aria-label="Mascot image placeholder" />
      <h1>MonaArchives</h1>
    </header>

    <section className="toolbar">
      <label className="searchbox"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your series by title..." /></label>
      <button className={`button filter-toggle ${filtersOpen ? "active" : ""}`} onClick={() => setFiltersOpen(v => !v)}><SlidersHorizontal size={17}/> Filters <ChevronDown className={filtersOpen ? "rotate" : ""} size={16}/></button>
      <button className="button primary" onClick={() => setModalOpen(true)}><Plus size={18}/> Add bookmark</button>
    </section>

    {filtersOpen && <section className="filters">
      <div className="filter-top">
        <div className="filter-group sort-group"><span className="filter-label">Sort by</span><div className="pills">
          {(["title", "chapter", "rating"] as const).map(s => <button key={s} className={`pill ${sortBy === s ? "selected" : ""}`} onClick={() => setSortBy(s)}>{s[0].toUpperCase() + s.slice(1)}</button>)}
          <button className={`pill ${direction === "asc" ? "selected" : ""}`} onClick={() => setDirection("asc")}>↑ Ascending</button>
          <button className={`pill ${direction === "desc" ? "selected" : ""}`} onClick={() => setDirection("desc")}>↓ Descending</button>
        </div></div>
        <div className="filter-group rating-group"><span className="filter-label">Rating</span><div className="pills">
          <button className={`pill ${ratingFilter === null ? "selected" : ""}`} onClick={() => setRatingFilter(null)}>Any</button>
          {[0,1,2,3,4,5].map(n => <button key={n} className={`rating-number ${ratingFilter === n ? "chosen" : ""}`} onClick={() => setRatingFilter(n)}>{n}</button>)}
        </div></div>
        <div className="filter-group chapter-group"><span className="filter-label">Chapter number</span><div className="chapter-inputs"><input aria-label="Minimum chapter" type="number" min="0" placeholder="Min" value={minChapter} onChange={e => setMinChapter(e.target.value)}/><span>–</span><input aria-label="Maximum chapter" type="number" min="0" placeholder="Max" value={maxChapter} onChange={e => setMaxChapter(e.target.value)}/></div></div>
        <div className="filter-group website-group"><span className="filter-label">Website name</span><label className="website-input"><Search size={15}/><input value={websiteFilter} onChange={e => setWebsiteFilter(e.target.value)} placeholder="e.g. MangaDex"/></label></div>
      </div>
      <div className="status-line"><span className="filter-label">Status</span><div className="pills">
        <button className={`pill ${statusFilter === "ALL" ? "selected" : ""}`} onClick={() => setStatusFilter("ALL")}>All</button>
        {statuses.map(s => <button key={s} className={`pill ${statusFilter === s ? "selected" : ""}`} onClick={() => setStatusFilter(s)}>{s}</button>)}
      </div><button className="reset" onClick={resetFilters}>Reset filters</button></div>
      <p className="filter-hint">{ratingFilter === null ? "A rating of 0 are stories yet to be rated yet." : `Showing stories rated ${ratingFilter} out of 5.`}</p>
    </section>}

    <section className="library">
      <div className="library-heading"><h2>Manga/Manhwa/Manhua/LN/WN</h2><span className="count">{visibleBookmarks.length}</span></div>
      <div className="table-head"><span>Title <b>{sortBy === "title" ? (direction === "asc" ? "↑" : "↓") : ""}</b></span><span>Chapter</span><span>Status</span><span>Website</span><span>Rating</span></div>
      <div className="bookmark-list">
        {visibleBookmarks.map((b, i) => <article className={`bookmark-row ${pastelClasses[i % pastelClasses.length]}`} key={b.id}>
          <div className="book-title"><strong>{b.title}</strong><small>{b.kind}</small></div>
          <span className="chapter-value">{b.chapter}</span>
          <span><span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span></span>
          <span className="website-value"><span className="site-icon">{b.website.charAt(0).toUpperCase()}</span>{b.website}{b.url && <a href={b.url} target="_blank" rel="noreferrer" aria-label={`Open ${b.website}`}><ExternalLink size={14}/></a>}</span>
          <span className="stars" aria-label={`${b.rating} out of 5 stars`}>{[1,2,3,4,5].map(n => <span key={n} className={n <= b.rating ? "filled" : ""}>★</span>)}</span>
        </article>)}
        {visibleBookmarks.length === 0 && <div className="empty-state">No bookmarks found. Try changing your filters or add a new story.</div>}
      </div>
      <footer className="page-footer"><span>All {visibleBookmarks.length} bookmarks · Sorted by {sortBy}, {direction === "asc" ? "A–Z" : "Z–A"}</span></footer>
    </section>

    {modalOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
      <form className="modal" onSubmit={addBookmark}>
        <div className="modal-top"><div className="modal-icon"><BookmarkPlus size={22}/></div><button type="button" className="close-button" onClick={() => setModalOpen(false)} aria-label="Close"><X size={18}/></button></div>
        <h2>Add bookmark</h2>
        <label className="field full"><span>Title</span><input required autoFocus placeholder="e.g. Omniscient Reader’s Viewpoint" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/></label>
        <div className="field-grid">
          <label className="field"><span>Chapter</span><input type="number" min="0" value={form.chapter} onChange={e => setForm({...form, chapter: e.target.value})}/></label>
          <label className="field"><span>Reading status</span><div className="select-wrap"><select value={form.status} onChange={e => setForm({...form, status: e.target.value as Status})}>{statuses.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={16}/></div></label>
        </div>
        <label className="field full"><span>Reading URL</span><input type="url" placeholder="https://..." value={form.url} onChange={e => setForm({...form, url: e.target.value})}/></label>
        <div className="field full"><span>Rating</span><div className="rating-picker"><div className="rating-stars">{[1,2,3,4,5].map(n => <button type="button" key={n} onClick={() => setForm({...form, rating: n})} aria-label={`Rate ${n} out of 5`} className={n <= form.rating ? "on" : ""}>★</button>)}</div><strong>{form.rating} / 5</strong></div></div>
        <div className="modal-actions"><button type="button" className="button cancel" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="button primary submit"><Plus size={17}/> Add bookmark</button></div>
      </form>
    </div>}
  </main>;
}

export default App;