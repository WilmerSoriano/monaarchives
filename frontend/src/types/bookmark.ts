export type Status =
  | "COMPLETED"
  | "READING"
  | "PLANNED"
  | "HIATUS"
  | "DROPPED"
  | "AXED";

export type Bookmark = {
  id: string;
  title: string;
  chapter: number;
  status: Status;
  dns: string;
  url: string;
  rating: number;
  dateCreated: string;
  dateUpdated: string;
  dateLastClicked: string;
};

/** Payload sent by the modal to create/update a bookmark. */
export type BookmarkFormData = {
  title: string;
  chapter: number;
  status: Status;
  dns: string,
  url: string;
  rating: number;
};