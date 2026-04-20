import { useEffect, useState } from "react";
import { useDocumentOperation, DocumentActionComponent, DocumentActionDescription } from "sanity";

// Auto-publie chaque draft dès qu'il est sauvegardé (500ms de debounce).
// Simplifie l'UX : l'utilisateur n'a plus besoin de cliquer sur "Publish".
export const AutoPublishAction: DocumentActionComponent = (props) => {
  const { id, type, draft, onComplete } = props;
  const { publish } = useDocumentOperation(id, type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!draft) return;
    if (publish.disabled) return;
    if (isPublishing) return;

    setIsPublishing(true);
    const timer = setTimeout(() => {
      publish.execute();
      setIsPublishing(false);
      if (onComplete) onComplete();
    }, 500);

    return () => clearTimeout(timer);
  }, [draft, publish, isPublishing, onComplete]);

  return {
    label: isPublishing ? "Publication en cours…" : "Publié automatiquement",
    disabled: true,
    tone: "positive",
  } as DocumentActionDescription;
};
