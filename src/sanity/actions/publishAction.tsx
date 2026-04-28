import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionDescription,
} from "sanity";
import { PublishIcon } from "@sanity/icons";

// Bouton "Publier les modifications" custom dans la barre d'actions du document.
// Doublon volontaire avec la bannière jaune en haut du formulaire pour double sécurité.
export const PublishAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const ops = useDocumentOperation(id, type);

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
    disabled: !!ops.publish?.disabled,
    onHandle: () => {
      ops.publish?.execute();
      onComplete();
    },
    shortcut: "Ctrl+Alt+P",
  } satisfies DocumentActionDescription;
};
