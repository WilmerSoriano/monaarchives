
import { Trash2 } from "lucide-react";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ onCancel, onConfirm }: Props) {
  // Renders a confirmation dialog and allows the user to cancel by clicking outside the dialog.
  return (
    <div
      className="modal-backdrop delete-confirm-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      {/* Presents the deletion warning with accessible dialog labels for assistive technologies. */}
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

        {/* Provides the option to cancel the deletion or confirm and proceed with it. */}
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
