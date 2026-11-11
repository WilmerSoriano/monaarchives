export type Status =
  | "COMPLETED"
  | "READING"
  | "PLANNED"
  | "HIATUS"
  | "DROPPED"
  | "AXED";

export type Bookmark = {
  id: number;
  title: string;
  chapter: number;
  status: Status;
  website: string;
  rating: number;
  url: string;
  dateLastClicked: string;
};

/** Payload sent by the modal to create/update a bookmark. */
export type BookmarkFormData = {
  title: string;
  chapter: number;
  status: Status;
  url: string;
  rating: number;
};