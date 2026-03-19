export const utilityLinks = [
  'Help',
  'Orders',
  'Track Delivery',
  'Stores',
  'Account',
]

export const primaryNavItems = [
  { id: 'featured', label: 'New & Featured' },
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'kids', label: 'Kids' },
  { id: 'lab', label: 'Flight Lab' },
]

export const promoMessages = [
  'Members receive free returns within 30 days.',
  'Order before 6 PM for priority metro dispatch.',
  'Need sizing help? Book a fit consult before checkout.',
]

export const megaMenuGroups = {
  default: {
    label: 'Featured',
    columns: [],
    feature: {
      kicker: '',
      title: '',
      description: '',
      cta: '',
    },
  },
  featured: {
    label: 'New & Featured',
    columns: [
      {
        heading: 'Featured',
        links: ['This Week in Motion', 'Latest Drops', 'Launch Calendar', 'Member Exclusives'],
      },
      {
        heading: 'Trending',
        links: ['Road Running', 'Studio Training', 'Recovery Slides', 'City Commute'],
      },
      {
        heading: 'Shop Icons',
        links: ['Pace Pro', 'Aero Rise', 'Court Phase', 'Summit Trail'],
      },
      {
        heading: 'Shop By Sport',
        links: ['Running', 'Training', 'Basketball', 'Football'],
      },
    ],
    feature: {
      kicker: 'Editorial Focus',
      title: 'Season opener: light race silhouettes and recovery essentials.',
      description:
        'The shell supports campaign-led stories, not just category links, so large nav flyouts can feel premium instead of dense.',
      cta: 'Browse the campaign',
    },
  },
  men: {
    label: 'Men',
    columns: [
      {
        heading: 'Shoes',
        links: ['Running Shoes', 'Training Shoes', 'Basketball Shoes', 'Walking Shoes'],
      },
      {
        heading: 'Clothing',
        links: ['Tops & T-Shirts', 'Shorts', 'Jackets', 'Compression'],
      },
      {
        heading: 'Accessories',
        links: ['Socks', 'Caps', 'Gym Bags', 'Hydration'],
      },
      {
        heading: 'Trending',
        links: ['Race Day', 'Gym Core', 'Everyday Sport', 'Travel Layers'],
      },
    ],
    feature: {
      kicker: 'Menswear Direction',
      title: 'Balanced between high-output training and relaxed everyday sport.',
      description:
        'The layout stays close to a Nike-style mega menu while inheriting our own card softness and token scale.',
      cta: 'Explore menswear',
    },
  },
  women: {
    label: 'Women',
    columns: [
      {
        heading: 'Featured',
        links: ['New Arrivals', 'Studio Staples', 'Wellness Picks', 'City Running'],
      },
      {
        heading: 'Shoes',
        links: ['Tempo Trainers', 'Lift & Train', 'Lifestyle', 'Recovery'],
      },
      {
        heading: 'Clothing',
        links: ['Matching Sets', 'Sports Bras', 'Tights', 'Outerwear'],
      },
      {
        heading: 'Collections',
        links: ['Move Daily', 'After Class', 'Weekend Run', 'Travel Edit'],
      },
    ],
    feature: {
      kicker: 'Womenswear Direction',
      title: 'Editorial merchandising with calmer palettes and stronger whitespace.',
      description:
        'This gives us the same hierarchy as the source inspiration without carrying over its visual branding.',
      cta: 'Shop the edit',
    },
  },
  kids: {
    label: 'Kids',
    columns: [
      {
        heading: 'Age Groups',
        links: ['Toddlers', 'Younger Kids', 'Older Kids', 'School Essentials'],
      },
      {
        heading: 'Sports',
        links: ['Football', 'Basketball', 'Running', 'Playtime'],
      },
      {
        heading: 'Shoes',
        links: ['Easy On', 'Playground', 'Court', 'All-Day Cushioned'],
      },
      {
        heading: 'Accessories',
        links: ['Backpacks', 'Water Bottles', 'Socks', 'Caps'],
      },
    ],
    feature: {
      kicker: 'Kids Direction',
      title: 'Simplified journeys with stronger category cues and easy gifting routes.',
      description:
        'Useful later for mobile nav and entry-level category cards on smaller screens.',
      cta: 'View kids collection',
    },
  },
  lab: {
    label: 'Flight Lab',
    columns: [
      {
        heading: 'Innovation',
        links: ['Foam Systems', 'Plate Tech', 'Upper Materials', 'Surface Labs'],
      },
      {
        heading: 'By Goal',
        links: ['Speed', 'Stability', 'Recovery', 'Endurance'],
      },
      {
        heading: 'Experiments',
        links: ['Prototype Drops', 'Athlete Notes', 'Wear Tests', 'Material Stories'],
      },
      {
        heading: 'Support',
        links: ['Fit Finder', 'Care Guide', 'Compare Models', 'Tech Glossary'],
      },
    ],
    feature: {
      kicker: 'Sub-brand Zone',
      title: 'A sub-brand style category with room for storytelling and innovation content.',
      description:
        'This slot maps to the Jordan-like architecture in the brief while keeping original brand positioning.',
      cta: 'Enter the lab',
    },
  },
}

export const homepage = {
  hero: {
    kicker: 'Pace State / Spring 26',
    title: 'Run the city in lighter layers and sharper silhouettes.',
    description:
      'Lightweight trainers, clean layers, and faster everyday movement.',
    actions: [
      { label: 'Shop new arrivals', kind: 'primary' },
      { label: 'Explore race edit', kind: 'secondary' },
    ],
    highlights: [
      'Carbon-ready trainers',
      'Warm-weather utility layers',
      'Recovery tools for post-run resets',
    ],
    visual: {
      image: '/homepage-images/homepage-hero.png',
      imageAlt: 'Two women trying on premium athletic footwear in a softly lit boutique setting.',
      overlayImage: '/homepage-images/global-direction.png',
      overlayAlt: 'Floating performance sneaker in motion with bright directional studio lighting.',
    },
  },
  secondaryPromo: {
    kicker: 'Training Studio',
    title: 'Built for lifting, sprint intervals, and long sessions in one rotation.',
    description:
      'Stable support, cleaner lines, and all-session comfort.',
    actions: [
      { label: 'Shop training', kind: 'primary' },
      { label: 'See matching layers', kind: 'secondary' },
    ],
    tone: 'warm',
    image: '/homepage-images/secondary-promo.png',
    hoverVideo: '/homepage-images/training-studio-hover.mp4',
    imageAlt: 'Performance trainer suspended in a bright studio environment.',
  },
  featured: {
    kicker: 'Featured',
    title: 'Product stories with sharper focus.',
    description:
      'Less talking. More product.',
    cards: [
      {
        tag: 'Race Collection',
        title: 'Low-weight racers with visible speed cues.',
        description: 'Engineered mesh. Fast rebound.',
        cta: 'Shop racers',
        tone: 'brand',
        image: '/homepage-images/featured-race-collection.png',
        imageAlt: 'Performance running shoe with soft neutral styling and travel accessories.',
      },
      {
        tag: 'Recovery',
        title: 'Recovery pieces for slower, cleaner resets.',
        description: 'Soft foam. Minimal feel.',
        cta: 'View recovery',
        tone: 'cool',
        image: '/homepage-images/featured-recovery.png',
        imageAlt: 'Minimal white recovery slides styled in a wellness-inspired setting.',
      },
      {
        tag: 'Travel Edit',
        title: 'Neutral trainers built for movement-heavy weekends.',
        description: 'Light pack. Easy styling.',
        cta: 'Explore travel',
        tone: 'light',
        image: '/homepage-images/featured-travel-edit.png',
        imageAlt: 'Modern sneaker styled for travel on a light stone counter with soft natural light.',
      },
    ],
  },
  sportGrid: {
    kicker: 'Shop By Sport',
    title: 'Start with the sport.',
    description:
      'Quick entry. Product first.',
    categories: [
      {
        title: 'Running',
        description: 'Road and race-day speed.',
        cta: 'Shop running',
        tone: 'brand',
        image: '/homepage-images/sport-running.png',
        imageAlt: 'Performance running shoe floating above a clean urban road scene.',
      },
      {
        title: 'Training',
        description: 'Grip and stable support.',
        cta: 'Shop training',
        tone: 'warm',
        image: '/homepage-images/sport-training.png',
        imageAlt: 'Training shoe in a gym setting with weights and warm directional light.',
      },
      {
        title: 'Football',
        description: 'Traction for quick cuts.',
        cta: 'Shop football',
        tone: 'cool',
        image: '/homepage-images/sport-football.png',
        imageAlt: 'Football boot on a lit field with stadium lights in the background.',
      },
      {
        title: 'Basketball',
        description: 'Court control and lift.',
        cta: 'Shop basketball',
        tone: 'light',
        image: '/homepage-images/sport-basketball.png',
        imageAlt: 'Basketball shoe on a hardwood court with a basketball and dramatic arena lights.',
      },
    ],
  },
  campaigns: [
    {
      kicker: 'Collection Story',
      title: 'Neutral trail styles for city edges and off-grid mornings.',
      description:
        'A wide campaign band keeps the cadence of hero, promo, card row, category grid, then another image-led story.',
      cta: 'Discover trail edit',
      tone: 'cool',
      image: '/homepage-images/campaign-trail-edit.png',
      imageAlt: 'Neutral trail shoes photographed on natural rock terrain in warm outdoor light.',
    },
    {
      kicker: 'Member Advantage',
      title: 'Book fit consults, save favourites, and unlock early access drops.',
      description:
        'This band gives the homepage one non-product commerce message before the footer, similar to service-oriented promotional content.',
      cta: 'Join membership',
      tone: 'brand',
      image: '/homepage-images/campaign-membership-service.png',
      imageAlt: 'Women trying on athletic shoes in a premium boutique-style fitting environment.',
    },
  ],
}

export const footerColumns = [
  {
    title: 'Support',
    links: ['Contact Us', 'Delivery Options', 'Return Policy', 'Fit Consults'],
  },
  {
    title: 'About',
    links: ['Our Craft', 'Material Innovation', 'Store Stories', 'Careers'],
  },
  {
    title: 'Explore',
    links: ['Journal', 'Training Guides', 'Member Benefits', 'Launch Calendar'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Accessibility'],
  },
]
