export const restaurants = [
    "Panera Bread", "Starbucks", "Saxbys", "Dunkin'", "Freshens",
    "Social Grill", "Halal Shack", "1908 Pizzeria", "Yella's", "La Cantina",
    "Blanton Amazon", "Jersey Mike's", "Wild Blue Sushi", "Chick N Bap", "Virtual Kitchen"
];

export const locations = [
    "Blanton Hall", "Bohn Hall", "Freeman Hall", "Stone Hall", "Richardson Hall",
    "Dinallo Heights", "Hawk Crossing", "The Village", "School of Business",
    "Dickson Hall", "Schmitt Hall", "CELS Building", "Student Center",
    "Sprague Library", "University Hall", "Morehead Hall"
];

export const tips = [2, 5, 10];

export const base = {
    restaurant: "",
    drop_off_spot: "",
    delivery_contents: "",
    confirmation_number: "",
    room_floor: "",
    tip_amount: ""
}

export const statuses = [
    'pending',
    'accepted',
    'picked_up',
    'delivered',
    'cancelled'
]

// Converts display name to location_coords key
// e.g. "Blanton Hall" -> "blanton_hall"
export function locationToKey(name) {
    return name.toLowerCase().replace(/\s+/g, '_')
}

export const location_coords = {
    blanton_hall: { lat: 40.86429855089817, lng: -74.19563200502951 },
    bohn_hall: { lat: 40.86373058534867, lng: -74.19460115105487 },
    freeman_hall: { lat: 40.858452063762066, lng: -74.19832354920717 },
    stone_hall: { lat: 40.86247562401194, lng: -74.19525534735878 },
    richardson_hall: { lat: 40.86254746150886, lng: -74.19633903068355 },
    dinallo_heights: { lat: 40.86601137957483, lng: -74.19616240872563 },
    hawk_crossing: { lat: 40.867072713873384, lng: -74.20040976454831 },
    the_village: { lat: 40.87065700596797, lng: -74.19874211852272 },
    school_of_business: { lat: 40.86196810978933, lng: -74.19950499153603 },
    dickson_hall: { lat: 40.86131032658171, lng: -74.19906644920697 },
    schmitt_hall: { lat: 40.86142114131296, lng: -74.19728036270055 },
    cels_building: { lat: 40.86167794093544, lng: -74.19602293386515 },
    student_center: { lat: 40.862897125156486, lng: -74.19744200502963 },
    sprague_library: { lat: 40.86060608522004, lng: -74.19810470502982 },
    university_hall: { lat: 40.86258043606615, lng: -74.1990201492069 },
    morehead_hall: { lat: 40.85978918743869, lng: -74.19736077619446 }
}

// Approximate coordinates for each restaurant (Montclair State University campus area)
export const restaurant_coords = {
    "Panera Bread":   { lat: 40.85410, lng: -74.21540 }, // Upper Montclair area
    "Starbucks":      { lat: 40.86280, lng: -74.19920 }, // Near campus entrance
    "Saxbys":         { lat: 40.86293, lng: -74.19744 }, // Student Center
    "Dunkin'":        { lat: 40.86210, lng: -74.20050 }, // Near campus
    "Freshens":       { lat: 40.86295, lng: -74.19748 }, // Student Center
    "Social Grill":   { lat: 40.86290, lng: -74.19750 }, // Student Center
    "Halal Shack":    { lat: 40.86288, lng: -74.19745 }, // Student Center
    "1908 Pizzeria":  { lat: 40.86292, lng: -74.19742 }, // Student Center
    "Yella's":        { lat: 40.86285, lng: -74.19740 }, // Student Center
    "La Cantina":     { lat: 40.86296, lng: -74.19746 }, // Student Center
    "Blanton Amazon": { lat: 40.86430, lng: -74.19563 }, // Blanton Hall
    "Jersey Mike's":  { lat: 40.86291, lng: -74.19752 }, // Student Center
    "Wild Blue Sushi":{ lat: 40.86289, lng: -74.19743 }, // Student Center
    "Chick N Bap":    { lat: 40.86294, lng: -74.19747 }, // Student Center
    "Virtual Kitchen":{ lat: 40.86291, lng: -74.19745 }  // Student Center
}
