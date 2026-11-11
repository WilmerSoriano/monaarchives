import { Trash2 } from "lucide-react";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ onCancel, onConfirm }: Props) {
  return (
    <div
      className="modal-backdrop delete-confirm-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className="delete-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-message"
      >
        <div className="delete-confirm-icon">
          <Trash2 size={21} />
        </div>

        <h2 id="delete-confirm-title">Are you sure you want to Delete?</h2>
        <p id="delete-confirm-message">All bookmark info will be lost.</p>

        <div className="delete-confirm-actions">
          <button type="button" className="delete-no-button" onClick={onCancel}>
            No
          </button>
          <button type="button" className="delete-yes-button" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </section>
    </div>
  );
}