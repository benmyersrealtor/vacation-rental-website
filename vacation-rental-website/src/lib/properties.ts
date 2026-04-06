export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  sleeps: number;
  price: string;
  image: string;
  tag: string;
  badge: string;
  amenities: string[];
  summary: string;
}

export const properties: Property[] = [
  {
    id: "salty-winds",
    slug: "salty-winds-cottage",
    name: "Salty Winds Cottage",
    location: "Surf City, Topsail Island",
    area: "Surf City",
    beds: 4,
    baths: 3,
    sleeps: 10,
    price: "$425",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    tag: "Ocean view",
    badge: "Popular",
    amenities: ["Oceanfront", "Pet-friendly", "Deck", "Outdoor shower"],
    summary:
      "Bright coastal interiors, easy beach access, and room for the whole family make this an ideal Topsail weekender.",
  },
  {
    id: "soundside-retreat",
    slug: "soundside-retreat",
    name: "Soundside Retreat",
    location: "North Topsail Beach",
    area: "North Topsail Beach",
    beds: 5,
    baths: 4,
    sleeps: 12,
    price: "$510",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    tag: "Private pool",
    badge: "Owner favorite",
    amenities: ["Pool", "Elevator", "Game room", "Sound views"],
    summary:
      "Spacious gathering areas, elevated finishes, and resort-style extras for larger beach trips.",
  },
  {
    id: "pelican-point",
    slug: "pelican-point",
    name: "Pelican Point",
    location: "Topsail Beach",
    area: "Topsail Beach",
    beds: 3,
    baths: 2,
    sleeps: 8,
    price: "$360",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    tag: "Walk to beach",
    badge: "New listing",
    amenities: ["Walk to beach", "Screened porch", "Updated kitchen", "Family-friendly"],
    summary:
      "Classic beach-house feel with a strong walkable location near the south end of the island.",
  },
  {
    id: "driftwood-dunes",
    slug: "driftwood-dunes",
    name: "Driftwood Dunes",
    location: "Surf City, Topsail Island",
    area: "Surf City",
    beds: 6,
    baths: 5,
    sleeps: 14,
    price: "$640",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    tag: "Large groups",
    badge: "Oceanfront",
    amenities: ["Oceanfront", "Pool", "Multiple decks", "Hot tub"],
    summary:
      "Built for reunions and multi-family trips with generous common spaces and premium outdoor living.",
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
