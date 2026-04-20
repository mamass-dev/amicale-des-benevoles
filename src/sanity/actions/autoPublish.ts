import { useDocumentOperation, DocumentActionComponent, DocumentActionDescription } from "sanity";
import { PublishIcon } from "@sanity/icons";

// Bouton "Publier" custom, rendu bien visible comme action principale.
// Remplace le Publish par défaut qui peut être masqué par l'UI v5.
export const PublishButton: DocumentActionComponent = (props) => {
  const { id, type, draft, onComplete } = props;
  const { publish } = useDocumentOperation(id, type);

  return {
    label: draft ? "Publier les modifications" : "Publié",
    icon: PublishIcon,
    tone: "positive",
    disabled: publish.disabled || !draft,
    onHandle: () => {
      publish.execute();
      onComplete();
    },
    shortcut: "Ctrl+Alt+P",
  } as DocumentActionDescription;
};
