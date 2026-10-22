/**
 * Événements de conversion → Rybbit (stats.globecreateur.fr).
 * Le script Rybbit expose `window.rybbit.event(name, props)`. Sans effet côté
 * serveur ou si le script n'est pas chargé (bloqueur, navigateur headless).
 * Ne doit jamais casser l'UI.
 *
 * Taxonomie (props en snake_case, valeurs simples) :
 *  - inscription_click { location }            clic vers le formulaire Recrewteer (conversion principale)
 *  - lead_submit       { form: contact, subject } formulaire contact (ouverture du mailto)
 *  - contact_click     { channel: phone|email, location }
 *  - social_click      { network, location }
 */
export type TrackProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    rybbit?: { event: (name: string, props?: TrackProps) => void };
  }
}

export function track(name: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;
  try {
    window.rybbit?.event(name, props);
  } catch {
    /* analytics ne doit jamais bloquer */
  }
}
