import {
  Heart,
  Users,
  Handshake,
  Star,
  Shield,
  Award,
  Target,
  Car,
  Calendar,
  Home,
  MapPin,
  Euro,
  Leaf,
  Clock,
  Zap,
  BedDouble,
  Settings,
  Bell,
  BookOpen,
  User,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Users,
  Handshake,
  Star,
  Shield,
  Award,
  Target,
  Car,
  Calendar,
  Home,
  MapPin,
  Euro,
  Leaf,
  Clock,
  Zap,
  BedDouble,
  Settings,
  Bell,
  BookOpen,
  User,
};

export function getIcon(name: string | undefined, fallback: LucideIcon = Heart): LucideIcon {
  if (!name) return fallback;
  return iconMap[name] ?? fallback;
}
