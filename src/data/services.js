// The real offer. Prices are the owner's UK prices; keep them verbatim.
export const services = [
  {
    id: 'design',
    glyph: 'plan',
    title: 'Garden Design & Planning',
    short: 'We visit, read your soil and sun, and draw up a planting plan that suits how you eat.',
    tagline: 'Your vision, our blueprint.',
    description:
      "Every great food garden starts with a plan. We visit your property, assess the sunlight, soil quality, and available space, then design a planting layout tailored to your family's tastes and lifestyle.",
    includes: [
      'On-site consultation and space assessment',
      'Custom planting plan with seasonal rotation',
      'Soil testing and amendment recommendations',
      'Companion planting strategy',
      'Recommended plant varieties for your climate',
    ],
    price: 'From £95',
    stratum: 'Topsoil',
  },
  {
    id: 'install',
    glyph: 'bed',
    title: 'Installation & Planting',
    short: 'Raised beds built, soil prepared, first crops in the ground, and a walk-through so you know every plant.',
    tagline: 'We get our hands dirty so you can get growing.',
    description:
      'From raised beds to in-ground plots and vertical gardens, we design and build food-growing setups that suit your space, aesthetic, and ambition. We prepare the soil, lay out the beds, and get your first crops in the ground.',
    includes: [
      'Raised bed construction and installation',
      'Premium organic soil preparation and composting',
      'Initial planting of vegetables, herbs, and fruits',
      'Mulching and water retention setup',
      'Handover walk-through so you know every plant',
    ],
    price: 'Quote on request',
    stratum: 'Topsoil',
  },
  {
    id: 'maintenance',
    glyph: 'can',
    title: 'Ongoing Maintenance',
    short: 'Weekly, fortnightly or seasonal visits: weeding, feeding, organic pest control and replanting.',
    tagline: 'A garden that keeps giving, season after season.',
    description:
      "Life gets busy. We offer regular maintenance visits to keep your garden thriving year-round, whether that's weekly, fortnightly, or seasonally. We prune, feed, manage pests organically, and replant as the seasons change.",
    includes: [
      'Regular weeding, pruning, and tidying',
      'Organic pest and disease management',
      'Feeding and fertilising with natural inputs',
      'Seasonal crop rotation and replanting',
      'Progress updates and harvest reports',
    ],
    price: 'From £55/visit',
    stratum: 'Root zone',
  },
  {
    id: 'fermentation',
    glyph: 'jar',
    title: 'Fermentation & Preservation',
    short: 'Turn a glut into a pantry: sauerkraut, kimchi, pickles, chutneys, kefir and more.',
    tagline: 'Nothing from your garden should ever go to waste.',
    description:
      'A good harvest is a blessing, but it can also be overwhelming. We help you preserve the excess through fermentation, pickling, drying, and traditional preservation methods, keeping your pantry stocked with real food all year long.',
    includes: [
      'Lacto-fermented vegetables (sauerkraut, kimchi, pickles)',
      'Fruit preserves, jams, and chutneys',
      'Fermented drinks (water kefir, kombucha, kvass)',
      'Drying and dehydrating seasonal crops',
      'Take-home starter kits and recipes',
    ],
    price: 'From £80/session',
    stratum: 'The larder',
  },
  {
    id: 'workshops',
    glyph: 'tray',
    title: 'Workshops',
    short: 'Small, hands-on sessions on growing, composting and preserving, taught so it sticks.',
    tagline: 'Learn to grow, preserve, and live from the land.',
    description:
      "We run small, hands-on workshops covering the full growing and harvesting cycle. Whether you want to learn to set up your first veggie patch, master fermentation, or understand seasonal food preservation, we'll teach it in a way that sticks.",
    includes: [
      'Vegetable gardening fundamentals',
      'Seasonal planting and crop rotation',
      'Fermentation and food preservation',
      'Composting and soil health',
      'Herb growing and culinary use',
    ],
    price: 'From £40/person',
    stratum: 'Seed bank',
  },
]

export const CONTACT = {
  email: 'penny@patch-a-mumma.co.uk',
  place: 'Chelmsford, Essex, UK',
  calendly: 'https://calendly.com/penny-patch-a-mumma/30min',
  formspree: 'https://formspree.io/f/xqejrjvn',
}
