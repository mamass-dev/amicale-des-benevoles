// Types contenu — utilisés par les pages et composants.
// L'implémentation derrière (lib/content.ts) variera : statique → Payload.

export type Event = {
  slug: string;
  name: string;
  type: string;
  location: string;
  dates: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  image: string;
  missions?: string[];
  practicalInfo?: string[];
  coordinates?: { lat: number; lng: number };
  _updatedAt?: string;
};

export type StaffMember = {
  name: string;
  role: string;
  focus: string;
  email?: string;
  phone?: string;
  image: string;
};

export type BoardMember = {
  name: string;
  role: string;
  image: string;
};

export type TeamMembers = {
  staff: StaffMember[];
  board: BoardMember[];
};

export type Partner = {
  name: string;
  logo: string;
  url?: string;
};

export type Testimonial = {
  name: string;
  org: string;
  text: string;
  image?: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};
