import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  ChevronLeft, 
  PlayCircle, 
  Send, 
  Menu,
  Info,
  Leaf,
  Sun,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

// --- Mock Data ---
const FILTERS = ["All", "Medicinal", "Culinary", "Beverage", "Ornamental"];

const PLANTS = [
  {
    id: 1,
    name: "Bayam Brazil",
    nameEn: "Brazilian Spinach",
    scientific: "Alternanthera sissoo",
    image: "https://images.unsplash.com/photo-1628608212574-e8d1976008b8?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "Brazilian Spinach is a low-growing perennial vegetable valued for its crunchy texture and high nutritional value. It thrives in tropical climates and is commonly used in Malaysian cooking.",
    characteristics: "Height: 30cm-50cm. Leaves: Crinkled, glossy green. Growth: Spreading ground cover.",
    nutritional: "High in Iron, Vitamin A, and Vitamin C. Contains high levels of carotenoids.",
    uses: "Traditionally used to improve eye health and strengthen the immune system. Popular as a spinach substitute in salads and stir-fries.",
    care: "Light: Partial shade to full sun.\nWater: Keep soil moist but not waterlogged.\nSoil: Rich, well-draining soil."
  },
  {
    id: 2,
    name: "Bunga Kantan",
    nameEn: "Torch Ginger",
    scientific: "Etlingera elatior",
    image: "https://images.unsplash.com/photo-1596726658098-84c207903823?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A stunning plant known for its bright pink flower buds which are a key ingredient in local laksa and other traditional dishes.",
    characteristics: "Height: Up to 5m. Flowers: Large, pink/red waxy petals. Stems: Tall, reed-like.",
    nutritional: "Rich in antioxidants and antibacterial properties.",
    uses: "The flower bud is sliced into salads, curries, and laksa. Traditionally used to treat earaches and clean wounds.",
    care: "Light: Full sun to partial shade.\nWater: High water requirement.\nSoil: Fertile, high organic matter."
  },
  {
    id: 3,
    name: "Cekur",
    nameEn: "Sand Ginger",
    scientific: "Kaempferia galanga",
    image: "https://images.unsplash.com/photo-1615485925763-867862f7253a?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "A stemless herb arising from a tuberous rhizome, widely used in traditional medicine and cooking throughout Southeast Asia.",
    characteristics: "Leaves: Round, lying flat on the ground. Rhizome: Aromatic, pale brown exterior.",
    nutritional: "Contains essential oils like ethyl cinnamate and ethyl p-methoxycinnamate.",
    uses: "Used to treat indigestion, colds, and pectoral pains. Also used as a spice in rice dishes and traditional remedies.",
    care: "Light: Shade to partial shade.\nWater: Moderate watering.\nSoil: Loamy, well-draining soil."
  },
  {
    id: 4,
    name: "Daun Kaduk",
    nameEn: "Wild Betel Leaf",
    scientific: "Piper sarmentosum",
    image: "https://images.unsplash.com/photo-1621506822262-421733614918?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "Known locally as 'Daun Kaduk', this plant is often confused with the betel nut vine but is smaller and used differently in cuisine.",
    characteristics: "Leaves: Heart-shaped, glossy green. Growth: Creeping vine.",
    nutritional: "High in calcium, antioxidants, and essential minerals.",
    uses: "Leaves are used as wrappers for snacks like 'Miang Kham'. Roots are used to treat toothaches in traditional medicine.",
    care: "Light: Partial shade.\nWater: Regular watering.\nSoil: Moist, fertile soil."
  },
  {
    id: 5,
    name: "Daun Kari",
    nameEn: "Curry Leaf",
    scientific: "Murraya koenigii",
    image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "An aromatic herb essential in South Asian and Southeast Asian cuisines, known for its distinctive fragrance and flavor.",
    characteristics: "Height: Up to 6m. Leaves: Pinnate, aromatic, dark green. Flowers: Small, white, fragrant.",
    nutritional: "Rich in Vitamin A, B, C, and E. Contains iron, calcium, and antioxidants.",
    uses: "Essential ingredient in curries, rice dishes, and chutneys. Used in traditional medicine for diabetes and digestive issues.",
    care: "Light: Full sun.\nWater: Moderate, allow soil to dry between watering.\nSoil: Well-draining, slightly acidic."
  },
  {
    id: 6,
    name: "Gelam",
    nameEn: "Cajuput Tree",
    scientific: "Melaleuca cajuputi",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "A paperbark tree native to Southeast Asia, known for its medicinal oil extracted from leaves and twigs.",
    characteristics: "Height: Up to 25m. Bark: White, papery, peeling. Leaves: Narrow, aromatic.",
    nutritional: "Essential oil contains cineole, terpineol, and other therapeutic compounds.",
    uses: "Cajuput oil is used for respiratory ailments, muscle pain, and as an antiseptic. Traditional remedy for colds and fevers.",
    care: "Light: Full sun.\nWater: Tolerates wet conditions.\nSoil: Adaptable, prefers swampy areas."
  },
  {
    id: 7,
    name: "Haba Neraka",
    nameEn: "Yellow Walking Iris",
    scientific: "Trimezia steyermarkii",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A beautiful ornamental plant with striking yellow flowers, commonly used in Malaysian gardens for its aesthetic appeal.",
    characteristics: "Height: 60-90cm. Flowers: Bright yellow with brown markings. Leaves: Sword-shaped, fan-like.",
    nutritional: "Primarily ornamental; not typically consumed.",
    uses: "Used as ornamental garden plant. Some traditional uses for minor ailments in folk medicine.",
    care: "Light: Full sun to partial shade.\nWater: Regular watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 8,
    name: "Halia Bara",
    nameEn: "Red Ginger",
    scientific: "Alpinia purpurata",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A stunning ornamental ginger with vibrant red flower bracts, popular in tropical gardens and floral arrangements.",
    characteristics: "Height: 2-4m. Flowers: Bright red bracts with small white flowers. Leaves: Large, lanceolate.",
    nutritional: "Primarily ornamental; contains some antioxidant compounds.",
    uses: "Popular in floral arrangements and landscaping. Some traditional medicinal uses for skin conditions.",
    care: "Light: Partial shade to full sun.\nWater: Keep consistently moist.\nSoil: Rich, well-draining soil."
  },
  {
    id: 9,
    name: "Halia Cengkerang",
    nameEn: "Shell Ginger",
    scientific: "Alpinia zerumbet",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "An aromatic ginger species with beautiful shell-like flower clusters, valued for both ornamental and medicinal properties.",
    characteristics: "Height: 2-3m. Flowers: Pink and white, shell-shaped clusters. Leaves: Variegated in some varieties.",
    nutritional: "Contains flavonoids, terpenes, and antioxidant compounds.",
    uses: "Leaves used to wrap food. Traditional remedy for hypertension, fever, and digestive issues.",
    care: "Light: Partial shade.\nWater: Regular watering.\nSoil: Rich, moist soil."
  },
  {
    id: 10,
    name: "Inai",
    nameEn: "Henna Tree",
    scientific: "Lawsonia inermis",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "A flowering plant famous for producing henna dye, used for centuries in body art and traditional medicine.",
    characteristics: "Height: 2-6m. Flowers: Small, fragrant, white to pink. Leaves: Small, oval, opposite.",
    nutritional: "Contains lawsone, tannins, and flavonoids with antimicrobial properties.",
    uses: "Leaves ground into paste for body art (mehndi). Used to treat skin conditions, hair care, and as a cooling agent.",
    care: "Light: Full sun.\nWater: Drought tolerant once established.\nSoil: Well-draining, alkaline soil."
  },
  {
    id: 11,
    name: "Kunyit",
    nameEn: "Turmeric",
    scientific: "Curcuma longa",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "A flowering plant of the ginger family, renowned worldwide for its vibrant yellow rhizomes used in cooking and medicine.",
    characteristics: "Height: Up to 1m. Rhizomes: Bright orange-yellow inside. Leaves: Large, oblong.",
    nutritional: "Contains curcumin, a powerful anti-inflammatory and antioxidant compound.",
    uses: "Major ingredient in curry powders and traditional dishes. Used in Ayurvedic medicine for inflammation and healing.",
    care: "Light: Full sun to partial shade.\nWater: Keep moist during growing season.\nSoil: Well-drained, rich soil."
  },
  {
    id: 12,
    name: "Limau Kasturi",
    nameEn: "Calamansi",
    scientific: "Citrus × microcarpa",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A small citrus fruit popular in Southeast Asian cuisine, known for its unique tangy flavor combining lime and mandarin notes.",
    characteristics: "Height: 2-7m. Fruit: Small, round, orange when ripe. Flowers: White, fragrant.",
    nutritional: "High in Vitamin C, citric acid, and antioxidants.",
    uses: "Used in drinks, marinades, dipping sauces, and desserts. Traditional remedy for coughs and sore throats.",
    care: "Light: Full sun.\nWater: Regular watering.\nSoil: Well-draining, slightly acidic."
  },
  {
    id: 13,
    name: "Limau Nipis",
    nameEn: "Key Lime",
    scientific: "Citrus aurantifolia",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A small, aromatic citrus fruit essential in Malaysian cuisine for its sharp, acidic flavor.",
    characteristics: "Height: 2-5m. Fruit: Small, round, green to yellow. Leaves: Aromatic when crushed.",
    nutritional: "Excellent source of Vitamin C and citric acid.",
    uses: "Essential in sambal, marinades, drinks, and cooking. Used traditionally for digestive health and skin care.",
    care: "Light: Full sun.\nWater: Regular, consistent watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 14,
    name: "Limau Purut",
    nameEn: "Kaffir Lime",
    scientific: "Citrus hystrix",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A citrus plant prized for its aromatic leaves and bumpy-skinned fruit, essential in Southeast Asian cooking.",
    characteristics: "Height: 2-11m. Fruit: Bumpy, wrinkled skin. Leaves: Double-lobed, highly aromatic.",
    nutritional: "Rich in antioxidants, essential oils, and Vitamin C.",
    uses: "Leaves used in curries, soups, and stir-fries. Fruit rind used in curry pastes. Traditional hair care ingredient.",
    care: "Light: Full sun to partial shade.\nWater: Regular watering.\nSoil: Well-draining, slightly acidic."
  },
  {
    id: 15,
    name: "Magnolia Coco",
    nameEn: "Champaka Telur",
    scientific: "Magnolia coco",
    image: "https://images.unsplash.com/photo-1518882605630-8b05aabdb4be?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A beautiful flowering shrub known for its intensely fragrant, cream-colored flowers that bloom at night.",
    characteristics: "Height: 2-4m. Flowers: Cream to white, egg-shaped, highly fragrant. Leaves: Glossy, dark green.",
    nutritional: "Primarily ornamental; flowers used in traditional perfumery.",
    uses: "Flowers used for their fragrance in traditional ceremonies and perfumes. Some medicinal uses for headaches.",
    care: "Light: Partial shade.\nWater: Regular watering.\nSoil: Rich, well-draining, acidic soil."
  },
  {
    id: 16,
    name: "Misai Kucing",
    nameEn: "Cat's Whiskers",
    scientific: "Orthosiphon aristatus",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600",
    category: "Medicinal",
    overview: "A medicinal herb famous in traditional medicine for its kidney and urinary health benefits.",
    characteristics: "Height: 30-60cm. Flowers: White to purple with long stamens resembling cat whiskers.",
    nutritional: "Contains sinensetin, rosmarinic acid, and other bioactive compounds.",
    uses: "Traditional remedy for kidney stones, urinary tract infections, diabetes, and hypertension. Made into herbal tea.",
    care: "Light: Partial shade to full sun.\nWater: Regular watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 17,
    name: "Nenas Kerang",
    nameEn: "Oyster Plant",
    scientific: "Tradescantia spathacea",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A striking ornamental plant with sword-shaped leaves that are green on top and purple underneath.",
    characteristics: "Height: 30-50cm. Leaves: Rosette form, green above, purple below. Flowers: Small, white, in boat-shaped bracts.",
    nutritional: "Contains flavonoids and has some traditional medicinal properties.",
    uses: "Popular ornamental plant. Traditional uses for coughs, colds, and minor wounds in folk medicine.",
    care: "Light: Partial shade to full sun.\nWater: Moderate watering.\nSoil: Well-draining soil."
  },
  {
    id: 18,
    name: "Oregano",
    nameEn: "Oregano",
    scientific: "Origanum vulgare",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A fragrant herb from the mint family, widely used in Mediterranean and international cuisines.",
    characteristics: "Height: 20-80cm. Leaves: Small, oval, aromatic. Flowers: Pink to purple.",
    nutritional: "Rich in antioxidants, Vitamin K, and antibacterial compounds like carvacrol and thymol.",
    uses: "Essential herb in Italian, Greek, and Mexican cuisines. Used for respiratory ailments and digestive health.",
    care: "Light: Full sun.\nWater: Allow soil to dry between watering.\nSoil: Well-draining, slightly alkaline."
  },
  {
    id: 19,
    name: "Paku Merak",
    nameEn: "Peacock Clubmoss",
    scientific: "Selaginella moellendorffii",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A delicate, feathery plant resembling a miniature fern, popular in terrariums and shaded gardens.",
    characteristics: "Height: 10-30cm. Fronds: Delicate, feathery, iridescent blue-green. Growth: Creeping.",
    nutritional: "Primarily ornamental; some traditional uses in folk medicine.",
    uses: "Popular terrarium and indoor plant. Some traditional uses for wound healing.",
    care: "Light: Shade to partial shade.\nWater: Keep consistently moist, high humidity.\nSoil: Rich, moisture-retentive soil."
  },
  {
    id: 20,
    name: "Palas",
    nameEn: "Mangrove Fan Palm",
    scientific: "Licuala spinosa",
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A beautiful fan palm native to Southeast Asian coastal areas, known for its distinctive circular, pleated leaves.",
    characteristics: "Height: 3-5m. Leaves: Circular, fan-shaped, deeply divided. Trunk: Slender, clustering.",
    nutritional: "Leaves traditionally used for wrapping food.",
    uses: "Leaves used for thatching, food wrapping, and handicrafts. Young shoots edible in some regions.",
    care: "Light: Partial shade.\nWater: Keep consistently moist.\nSoil: Rich, moist, well-draining soil."
  },
  {
    id: 21,
    name: "Pandan",
    nameEn: "Screwpine",
    scientific: "Pandanus amaryllifolius",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "An aromatic plant essential in Southeast Asian cooking, known for its sweet, fragrant leaves used in desserts and savory dishes.",
    characteristics: "Height: 1-2m. Leaves: Long, blade-like, bright green, fragrant. Growth: Clumping.",
    nutritional: "Contains glycosides, alkaloids, and aromatic compounds.",
    uses: "Leaves used to flavor rice, desserts, drinks, and curries. Natural food coloring. Traditional remedy for headaches.",
    care: "Light: Partial shade to full sun.\nWater: Keep soil moist.\nSoil: Rich, moist soil."
  },
  {
    id: 22,
    name: "Pisang",
    nameEn: "Banana",
    scientific: "Musa acuminata",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "One of the world's most important fruit crops, with numerous varieties cultivated throughout Malaysia for food and cultural uses.",
    characteristics: "Height: 2-9m. Leaves: Large, paddle-shaped. Fruit: Clusters (hands) of elongated berries.",
    nutritional: "Rich in potassium, Vitamin B6, Vitamin C, and dietary fiber.",
    uses: "Fruit eaten fresh or cooked. Leaves used for wrapping food. Flowers and stems also edible. Fiber used for textiles.",
    care: "Light: Full sun.\nWater: Regular, abundant watering.\nSoil: Rich, well-draining, fertile soil."
  },
  {
    id: 23,
    name: "Pokok Gincu",
    nameEn: "Red Button Ginger",
    scientific: "Costus woodsonii",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A striking ornamental ginger with spiral stems and bright red flower heads resembling lipstick.",
    characteristics: "Height: 1-2m. Stems: Spiral arrangement. Flowers: Bright red, cone-shaped inflorescence.",
    nutritional: "Primarily ornamental; some traditional medicinal properties.",
    uses: "Popular ornamental plant. Some traditional uses for fever and inflammation.",
    care: "Light: Partial shade to full sun.\nWater: Keep consistently moist.\nSoil: Rich, well-draining soil."
  },
  {
    id: 24,
    name: "Pokok Jenjuang",
    nameEn: "Ti Plant",
    scientific: "Cordyline fruticosa",
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A colorful ornamental plant with dramatic foliage in shades of red, pink, and green, popular in tropical gardens.",
    characteristics: "Height: 1-4m. Leaves: Lance-shaped, colorful (red, pink, green, variegated). Stems: Woody.",
    nutritional: "Root contains starch; traditionally used for food in Pacific islands.",
    uses: "Popular ornamental and landscaping plant. Leaves used for wrapping food. Cultural significance in many traditions.",
    care: "Light: Partial shade to full sun.\nWater: Regular watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 25,
    name: "Pokok Paku Pakis",
    nameEn: "Boston Fern",
    scientific: "Nephrolepis exaltata",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "A lush, graceful fern with arching fronds, popular as a hanging plant and for adding greenery to shaded areas.",
    characteristics: "Height: 40-90cm. Fronds: Arching, sword-shaped, bright green. Growth: Clumping.",
    nutritional: "Primarily ornamental; excellent air purifier.",
    uses: "Popular indoor and outdoor ornamental plant. Known for air-purifying qualities. Some traditional medicinal uses.",
    care: "Light: Indirect light, shade.\nWater: Keep consistently moist, high humidity.\nSoil: Rich, well-draining, peat-based."
  },
  {
    id: 26,
    name: "Pokok Wuruk",
    nameEn: "Lady Palm",
    scientific: "Rhapis excelsa",
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&q=80&w=600",
    category: "Ornamental",
    overview: "An elegant, slow-growing palm with fan-shaped leaves, prized as an indoor plant and in traditional gardens.",
    characteristics: "Height: 2-4m. Leaves: Fan-shaped, deeply divided into segments. Stems: Covered with fiber.",
    nutritional: "Primarily ornamental; excellent air purifier.",
    uses: "Popular indoor ornamental plant. Traditional uses in feng shui. Excellent air-purifying properties.",
    care: "Light: Indirect light to partial shade.\nWater: Keep soil slightly moist.\nSoil: Well-draining, rich potting mix."
  },
  {
    id: 27,
    name: "Pudina",
    nameEn: "Mint",
    scientific: "Mentha spicata",
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A refreshing aromatic herb widely used in beverages, desserts, and savory dishes across many cuisines.",
    characteristics: "Height: 30-60cm. Leaves: Oval, serrated, aromatic. Stems: Square. Flowers: Purple to white spikes.",
    nutritional: "Contains menthol, antioxidants, and Vitamins A and C.",
    uses: "Used in drinks, salads, chutneys, and desserts. Traditional remedy for digestive issues, headaches, and nausea.",
    care: "Light: Partial shade to full sun.\nWater: Keep consistently moist.\nSoil: Rich, moist soil."
  },
  {
    id: 28,
    name: "Serai",
    nameEn: "Lemongrass",
    scientific: "Cymbopogon citratus",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "An aromatic grass essential in Southeast Asian cuisine, prized for its citrusy flavor and numerous health benefits.",
    characteristics: "Height: 1-2m. Leaves: Long, blade-like, aromatic. Stems: Bulbous base, pale green.",
    nutritional: "Contains citral, antioxidants, and anti-inflammatory compounds.",
    uses: "Essential in curries, soups, teas, and marinades. Traditional remedy for fever, digestive issues, and as insect repellent.",
    care: "Light: Full sun.\nWater: Regular watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 29,
    name: "Ulam Raja",
    nameEn: "Wild Cosmos",
    scientific: "Cosmos caudatus",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600",
    category: "Culinary",
    overview: "A traditional herb commonly eaten raw as ulam (salad) in Malaysian cuisine, known for its distinctive flavor and health benefits.",
    characteristics: "Height: 1-2m. Leaves: Pinnate, feathery. Flowers: Pink to purple, daisy-like.",
    nutritional: "High in antioxidants, Vitamin C, calcium, and quercetin.",
    uses: "Eaten raw as ulam with sambal. Traditional remedy for blood circulation, bone health, and anti-aging.",
    care: "Light: Full sun to partial shade.\nWater: Moderate watering.\nSoil: Well-draining, fertile soil."
  },
  {
    id: 30,
    name: "Bunga Telang",
    nameEn: "Butterfly Pea",
    scientific: "Clitoria ternatea",
    image: "https://images.unsplash.com/photo-1631128795552-32d398e09e13?auto=format&fit=crop&q=80&w=600",
    category: "Beverage",
    overview: "A climbing plant famous for its vivid blue flowers used to make natural blue coloring for food and beverages.",
    characteristics: "Flowers: Deep blue with yellow markings. Growth: Climbing vine. Leaves: Pinnate.",
    nutritional: "Rich in anthocyanins, antioxidants, and flavonoids.",
    uses: "Flowers used to color Nasi Kerabu blue and to make herbal tea. Traditional remedy for eye health and memory.",
    care: "Light: Full sun.\nWater: Moderate watering.\nSoil: Well-draining, neutral pH soil."
  }
];

const CHAT_MESSAGES = [
  { id: 1, sender: 'bot', text: "Hello! I'm your Heritage Garden Assistant. How can I help you today?" },
];

// --- Home Screen ---
const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F3EF] to-[#EBE8E0]">
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200" 
          alt="Heritage Garden" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={22} />
            </div>
            <div className="text-white">
              <h1 className="text-lg font-bold font-serif tracking-tight">Heritage Garden</h1>
              <p className="text-xs text-white/80">Botanical Collection</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} className="text-[#B8A88A]" />
              <span className="text-white text-sm font-medium">Discover Traditional Botanicals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
              Explore Malaysia's<br />Heritage Plants
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
              Journey through centuries of botanical wisdom, from medicinal herbs to culinary treasures.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => onNavigate('search')}
                className="bg-white text-[#2D5016] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#B8A88A] hover:text-white transition-all shadow-lg hover:scale-105"
              >
                <Search size={20} />
                Browse Collection
              </button>
              <button 
                onClick={() => onNavigate('chat')}
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <MessageSquare size={20} />
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#1A2E11] mb-3 font-serif">What We Offer</h3>
          <p className="text-[#5A6B52] text-lg">Comprehensive resources for plant enthusiasts</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E8E6E0] hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#6B8E4E] to-[#2D5016] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BookOpen className="text-white" size={26} />
            </div>
            <h4 className="text-xl font-bold text-[#1A2E11] mb-3 font-serif">Plant Database</h4>
            <p className="text-[#5A6B52] leading-relaxed mb-4">
              Access detailed information on traditional plants, their uses, and care instructions.
            </p>
            <button onClick={() => onNavigate('search')} className="text-[#2D5016] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Explore Now <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E8E6E0] hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#B8A88A] to-[#9C8B6E] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <MessageSquare className="text-white" size={26} />
            </div>
            <h4 className="text-xl font-bold text-[#1A2E11] mb-3 font-serif">AI Assistant</h4>
            <p className="text-[#5A6B52] leading-relaxed mb-4">
              Get instant answers about plant care, traditional uses, and cultivation tips.
            </p>
            <button onClick={() => onNavigate('chat')} className="text-[#2D5016] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Start Chat <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#E8E6E0] hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#6B8E4E] to-[#B8A88A] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <PlayCircle className="text-white" size={26} />
            </div>
            <h4 className="text-xl font-bold text-[#1A2E11] mb-3 font-serif">Guided Tours</h4>
            <p className="text-[#5A6B52] leading-relaxed mb-4">
              Experience immersive audio-guided tours through our botanical heritage.
            </p>
            <button className="text-[#2D5016] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Listen Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#2D5016] to-[#3D6020] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-white/80">Plant Species</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-white/80">Traditional Uses</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-white/80">Medicinal Plants</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-white/80">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Search Screen ---
const SearchScreen = ({ onPlantClick, onBack }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = PLANTS.filter(p => {
    const matchesFilter = activeFilter === "All" || p.category === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.scientific.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F3EF] to-[#EBE8E0]">
      <div className="bg-white border-b border-[#E8E6E0]">
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-[#F5F3EF] rounded-xl flex items-center justify-center hover:bg-[#E8E6E0] transition-colors"
            >
              <ChevronLeft className="text-[#2D5016]" size={22} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A2E11] font-serif">Plant Collection</h2>
              <p className="text-[#5A6B52] text-sm">{filteredPlants.length} plants found</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6B52]" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or scientific name..." 
              className="w-full bg-[#F5F3EF] border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#6B8E4E] focus:bg-white transition-all text-[#1A2E11] placeholder:text-[#9CA89A]"
            />
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 px-6 scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white shadow-lg'
                  : 'bg-white text-[#5A6B52] border-2 border-[#E8E6E0] hover:border-[#6B8E4E] hover:text-[#2D5016]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredPlants.map(plant => (
          <div 
            key={plant.id} 
            onClick={() => onPlantClick(plant)}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-[#E8E6E0] hover:border-[#6B8E4E] hover:shadow-2xl transition-all cursor-pointer group"
          >
            <div className="h-56 overflow-hidden relative">
              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#2D5016] border border-[#E8E6E0]">
                {plant.category}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-lg text-white mb-1 font-serif">{plant.name}</h3>
                <p className="text-xs text-white/90">{plant.nameEn} • <span className="italic">{plant.scientific}</span></p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[#5A6B52] text-sm line-clamp-2 mb-4">{plant.overview}</p>
              <button className="text-[#2D5016] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-[#F5F3EF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-[#5A6B52]" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1A2E11] mb-2">No plants found</h3>
          <p className="text-[#5A6B52]">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

// --- Plant Detail Screen ---
const PlantDetailScreen = ({ plant, onBack }) => {
  if (!plant) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F3EF] to-[#EBE8E0]">
      <div className="relative h-[60vh]">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white font-semibold text-sm">{plant.category}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
          <h1 className="text-4xl font-bold text-white mb-1 font-serif">{plant.name}</h1>
          <p className="text-white/80 text-lg mb-1">{plant.nameEn}</p>
          <p className="text-white/70 italic">{plant.scientific}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#E8E6E0]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6B8E4E] to-[#2D5016] rounded-xl flex items-center justify-center">
                <Info size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-xl text-[#1A2E11] font-serif">Overview</h3>
            </div>
            <p className="text-[#5A6B52] leading-relaxed text-lg">{plant.overview}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#E8E6E0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B8A88A] to-[#9C8B6E] rounded-xl flex items-center justify-center">
                  <Leaf size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-[#1A2E11] font-serif">Characteristics</h3>
              </div>
              <p className="text-[#5A6B52] leading-relaxed">{plant.characteristics}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#E8E6E0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6B8E4E] to-[#B8A88A] rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-[#1A2E11] font-serif">Nutritional Value</h3>
              </div>
              <p className="text-[#5A6B52] leading-relaxed">{plant.nutritional}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-2xl text-white mb-4 font-serif">Traditional & Modern Uses</h3>
            <p className="text-white/95 leading-relaxed text-lg">{plant.uses}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#E8E6E0]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6B8E4E] to-[#2D5016] rounded-xl flex items-center justify-center">
                <Sun size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-xl text-[#1A2E11] font-serif">Care Instructions</h3>
            </div>
            <div className="space-y-4">
              {plant.care.split('\n').map((line, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#6B8E4E] mt-2 flex-shrink-0"></div>
                  <span className="text-[#5A6B52] text-lg">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Chat Screen ---
const ChatScreen = ({ onBack }) => {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "I'm still learning about the garden! Ask me about specific plants like Brazilian Spinach or Turmeric for detailed information." }]);
    }, 1000);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestedQuestions = [
    "What are the benefits of Turmeric?",
    "How do I care for Brazilian Spinach?",
    "Which plants are good for tea?"
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F3EF] to-[#EBE8E0]">
      <div className="bg-white border-b border-[#E8E6E0] px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-[#F5F3EF] rounded-xl flex items-center justify-center hover:bg-[#E8E6E0] transition-colors"
          >
            <ChevronLeft className="text-[#2D5016]" size={22} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#1A2E11] font-serif">AI Assistant</h2>
            <p className="text-[#5A6B52] text-sm">Ask about plants & care</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6B8E4E] to-[#2D5016] rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="text-white" size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A2E11] mb-3 font-serif">How can I help?</h3>
            <p className="text-[#5A6B52] mb-8">Ask me anything about our plant collection</p>
            
            <div className="space-y-3 max-w-md mx-auto">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="w-full bg-white p-4 rounded-2xl border-2 border-[#E8E6E0] hover:border-[#6B8E4E] text-left text-[#5A6B52] hover:text-[#2D5016] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-5 rounded-3xl shadow-lg ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-[#2D5016] to-[#3D6020] text-white rounded-tr-md' 
                  : 'bg-white text-[#1A2E11] border-2 border-[#E8E6E0] rounded-tl-md'
              }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < msg.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-6 bg-white border-t border-[#E8E6E0]">
        <div className="max-w-4xl mx-auto relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..." 
            className="w-full bg-[#F5F3EF] border-2 border-transparent rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-[#6B8E4E] focus:bg-white transition-all text-[#1A2E11] placeholder:text-[#9CA89A]"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-2 p-3 bg-gradient-to-br from-[#6B8E4E] to-[#2D5016] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setSelectedPlant(null);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  const renderContent = () => {
    if (activeTab === 'home') return <HomeScreen onNavigate={handleNavigate} />;
    if (activeTab === 'search') {
      return selectedPlant 
        ? <PlantDetailScreen plant={selectedPlant} onBack={() => setSelectedPlant(null)} />
        : <SearchScreen onPlantClick={handlePlantClick} onBack={() => handleNavigate('home')} />;
    }
    if (activeTab === 'chat') return <ChatScreen onBack={() => handleNavigate('home')} />;
    return <HomeScreen onNavigate={handleNavigate} />;
  };

  return (
    <div className="font-sans antialiased bg-white min-h-screen">
      <main className="h-full">
        {renderContent()}
      </main>
    </div>
  );
}
