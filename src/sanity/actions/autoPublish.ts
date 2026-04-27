import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionDescription,
} from "sanity";
import { PublishIcon } from "@sanity/icons";

// Bouton "Publier" custom, toujours visible et au premier plan.
// Sanity v5 cache le publish par défaut dans le menu "..." — on le ramène en avant.
export const PublishButton: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const { publish } = useDocumentOperation(id, type);

  const hasDraft = !!draft;
  const isPublished = !!published;

  return {
    label: hasDraft
      ? "Publier les modifications"
      : isPublished
      ? "Publié ✓"
      : "Publier",
    icon: PublishIcon,
    tone: "positive",
    disabled: !!publish.disabled,
    onHandle: () => {
      publish.execute();
      onComplete();
    },
    shortcut: "Ctrl+Alt+P",
  } satisfies DocumentActionDescription;
};
