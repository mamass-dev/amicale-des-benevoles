"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import type { SanityEvent } from "@/sanity/lib/types";
import { eventCoords } from "@/lib/event-coords";

const sportifIcon = L.divIcon({
  className: "amb-marker amb-marker--sportif",
  html: `<span class="amb-marker__pin"></span>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -26],
});

const culturelIcon = L.divIcon({
  className: "amb-marker amb-marker--culturel",
  html: `<span class="amb-marker__pin"></span>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -26],
});

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (fitted.current || points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
    fitted.current = true;
  }, [map, points]);

  return null;
}

type EventWithCoords = SanityEvent & { coords: [number, number] };

export default function EventsMap({ events }: { events: SanityEvent[] }) {
  const mappable: EventWithCoords[] = useMemo(
    () =>
      events
        .map((e) => ({ ...e, coords: eventCoords[e.slug] }))
        .filter((e): e is EventWithCoords => Array.isArray(e.coords)),
    [events]
  );

  const points = mappable.map((e) => e.coords);

  if (mappable.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
        Aucun événement géolocalisé pour le moment.
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border" style={{ height: "60vh", minHeight: 480 }}>
      <MapContainer
        center={[46.6, 4.5]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {mappable.map((event) => (
          <Marker
            key={event.slug}
            position={event.coords}
            icon={event.type === "sportif" ? sportifIcon : culturelIcon}
          >
            <Popup>
              <div className="space-y-1.5 min-w-[200px]">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  {event.type === "sportif" ? "Sportif" : "Culturel"}
                </div>
                <div className="font-bold text-base leading-tight">{event.name}</div>
                <div className="text-xs">{event.dates}</div>
                <div className="text-xs opacity-70">{event.location}</div>
                <Link
                  href={`/evenements/${event.slug}`}
                  className="inline-block mt-2 text-xs font-semibold text-[#e97a2b] hover:underline"
                >
                  Voir l&apos;événement →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
