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
  gallery: string[];
  tag: string;
  badge: string;
  amenities: string[];
  summary: string;
  overview: string;
  sleepingArrangements: string[];
  houseRules: string[];
  nearbyAttractions: string[];
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
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
    ],
    tag: "Ocean view",
    badge: "Popular",
    amenities: ["Oceanfront", "Pet-friendly", "Deck", "Outdoor shower", "Fast Wi-Fi", "Washer/dryer"],
    summary:
      "Bright coastal interiors, easy beach access, and room for the whole family make this an ideal Topsail weekender.",
    overview:
      "Salty Winds Cottage is designed for laid-back beach weeks, with bright living spaces, multiple outdoor hangout areas, and a location that makes it easy to enjoy Surf City. The layout works well for families or couples traveling together, with plenty of room to spread out after a day on the sand.",
    sleepingArrangements: [
      "Primary bedroom: King bed with ensuite bath",
      "Guest bedroom 2: Queen bed",
      "Guest bedroom 3: Two twin beds",
      "Guest bedroom 4: Twin-over-full bunk room",
    ],
    houseRules: [
      "No smoking",
      "Minimum age to book: 25",
      "Dog-friendly with approval",
      "Check-in 4:00 PM / Check-out 10:00 AM",
    ],
    nearbyAttractions: ["Surf City Pier", "Daddy Mac’s Beach Grille", "Island shopping", "Beach access"],
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
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
    ],
    tag: "Private pool",
    badge: "Owner favorite",
    amenities: ["Pool", "Elevator", "Game room", "Sound views", "Large kitchen", "Outdoor dining"],
    summary:
      "Spacious gathering areas, elevated finishes, and resort-style extras for larger beach trips.",
    overview:
      "Soundside Retreat is built for bigger groups that want space, comfort, and upscale coastal finishes. The home balances indoor gathering zones with outdoor relaxation, making it a strong fit for multi-family stays and longer trips to the island.",
    sleepingArrangements: [
      "Primary suite: King bed with private bath",
      "Guest bedroom 2: King bed",
      "Guest bedroom 3: Queen bed",
      "Guest bedroom 4: Queen bed",
      "Guest bedroom 5: Two twin bunks",
    ],
    houseRules: [
      "No smoking",
      "Minimum age to book: 25",
      "No pets",
      "Check-in 4:00 PM / Check-out 10:00 AM",
    ],
    nearbyAttractions: ["North Topsail public beach access", "Turtle hospital", "Soundside views", "Boating access"],
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
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1200&q=80",
    ],
    tag: "Walk to beach",
    badge: "New listing",
    amenities: ["Walk to beach", "Screened porch", "Updated kitchen", "Family-friendly", "Outdoor shower", "Grill"],
    summary:
      "Classic beach-house feel with a strong walkable location near the south end of the island.",
    overview:
      "Pelican Point offers classic Topsail Beach charm with practical comfort for an easygoing vacation. The home is close to beach access and local favorites, making it a strong option for families who want convenience without losing that old-school coastal feel.",
    sleepingArrangements: [
      "Primary bedroom: Queen bed",
      "Guest bedroom 2: Queen bed",
      "Guest bedroom 3: Twin-over-full bunk with twin trundle",
    ],
    houseRules: [
      "No smoking",
      "Minimum age to book: 25",
      "No pets",
      "Check-in 4:00 PM / Check-out 10:00 AM",
    ],
    nearbyAttractions: ["Topsail Beach shops", "Beach Shop & Grill", "Skating rink", "Public beach access"],
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
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    ],
    tag: "Large groups",
    badge: "Oceanfront",
    amenities: ["Oceanfront", "Pool", "Multiple decks", "Hot tub", "Elevator", "Chef kitchen"],
    summary:
      "Built for reunions and multi-family trips with generous common spaces and premium outdoor living.",
    overview:
      "Driftwood Dunes is a larger-format luxury beach home designed for memorable group stays. With layered outdoor spaces, a stronger amenity set, and room for everyone to gather comfortably, it’s positioned as a premium direct-booking option.",
    sleepingArrangements: [
      "Primary suite: King bed",
      "Guest bedroom 2: King bed",
      "Guest bedroom 3: Queen bed",
      "Guest bedroom 4: Queen bed",
      "Guest bedroom 5: Two twin beds",
      "Guest bedroom 6: Two twin bunks",
    ],
    houseRules: [
      "No smoking",
      "Minimum age to book: 30",
      "No pets",
      "Check-in 4:00 PM / Check-out 10:00 AM",
    ],
    nearbyAttractions: ["Surf City dining", "Pier access", "Shops", "Boating and water activities"],
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
