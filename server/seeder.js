const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const curatedProducts = [
  // ==================== APPAREL (20 Items) ====================
  {
    name: "Studio Merino Wool Knit",
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Spun from 100% fine micron extra-soft merino fibers. Refined profile with temperature self-regulation.",
    price: 195.00,
    rating: 4.8
  },
  {
    name: "Urban Minimalist Trench Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Windproof and water-repellent performance weave shell cut into a sharp, architectural silhouette.",
    price: 380.00,
    rating: 5.0
  },
  {
    name: "Raw Selvage Denim Jacket",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Unwashed 14.5oz loomstate Japanese raw denim structured with heavy reinforced steel hardware.",
    price: 240.00,
    rating: 4.9
  },
  {
    name: "Heavyweight Boxy Tee",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Premium 300gsm combed organic cotton jersey tee featuring a relaxed architectural fit.",
    price: 55.00,
    rating: 4.6
  },
  {
    name: "Architect Oversized Hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "French terry cotton blend lined with double-layered hoods and seamless invisible drop pockets.",
    price: 125.00,
    rating: 4.7
  },
  {
    name: "Technical Linen Blazer",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Structured blend of natural linen yarn and performance stretch fibers for relaxed summer tailoring.",
    price: 290.00,
    rating: 4.5
  },
  {
    name: "Tailored Tail Trousers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Ankle-cropped tailored wool trousers with precise center creases and clean hook closures.",
    price: 165.00,
    rating: 4.8
  },
  {
    name: "Core Lounge Short",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Premium mercerized sweat shorts complete with metal aglets and deep technical utility pockets.",
    price: 60.00,
    rating: 4.4
  },
  {
    name: "Asymmetric Knit Cardigan",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "A unique off-center button buttoning pattern constructed using weighted eco-cotton blends.",
    price: 140.00,
    rating: 4.7
  },
  {
    name: "Aero-Shell Windbreaker",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Ultralight packable ripstop layer finished with clean matte dynamic weatherproof seam tapes.",
    price: 150.00,
    rating: 4.6
  },
  {
    name: "Minimalist Ribbed Beanie",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Tight-knit construction using pure ethically sourced virgin wool thread fibers.",
    price: 45.00,
    rating: 4.9
  },
  {
    name: "Studio Oxford Shirt",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Classic robust cotton weave refined into a modern narrow collar styling template layout.",
    price: 95.00,
    rating: 4.5
  },
  {
    name: "Structured Cargo Pant",
    image: "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Durable cotton twill build with low-profile flush pockets to eliminate classic bulk shapes.",
    price: 135.00,
    rating: 4.7
  },
  {
    name: "Sleek Mockneck Pullover",
    image: "https://images.unsplash.com/photo-1519625594242-7db544018926?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Fine cashmere mock collar pullover engineered for close-to-body temperature regulatory fit layers.",
    price: 210.00,
    rating: 4.9
  },
  {
    name: "Performance Technical Vest",
    image: "https://images.unsplash.com/photo-1608234807905-446585f3c602?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Primaloft insulation layer complete with geometric alignment zip lines and waterproof hardware slots.",
    price: 175.00,
    rating: 4.8
  },
  {
    name: "Mono Tailored Crop Top",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Heavy dense knit stretch cropped profile structured cleanly with hidden inner elastic secure linings.",
    price: 50.00,
    rating: 4.4
  },
  {
    name: "Raw Denim Work Shirt",
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "A triple-stitched utility work blueprint shirt layout crafted from mid-weight premium denim yarns.",
    price: 110.00,
    rating: 4.6
  },
  {
    name: "Luxe Cashmere Scarf",
    image: "https://images.unsplash.com/photo-1520903928273-0f44b0a2fe08?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Unbelievably soft pure cashmere weave utilizing clean raw fringed minimalist ends.",
    price: 85.00,
    rating: 4.9
  },
  {
    name: "Pique Cotton Polo Minimal",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Hidden snap placket system integrated cleanly over dynamic double-knit soft ventilation cotton panels.",
    price: 75.00,
    rating: 4.5
  },
  {
    name: "Architect Everyday Parka",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Full-length insulated storm coat displaying dynamic minimalist curves and internal backpack carry straps.",
    price: 420.00,
    rating: 5.0
  },

  // ==================== ACCESSORIES (20 Items) ====================
  {
    name: "Architect Matte Chronograph",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Brushed surgical steel case housing a precision Japanese movement module with raw leather straps.",
    price: 320.00,
    rating: 4.8
  },
  {
    name: "AeroFrame Minimalist Eyewear",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Zero-weight laser-cut titanium frames engineered with custom polarized UV400 protective lenses.",
    price: 145.00,
    rating: 4.7
  },
  {
    name: "Sleek Aluminum Card Wallet",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Aerospace-grade RFID-blocking plate casing featuring a patented structural spring fan mechanism.",
    price: 65.00,
    rating: 4.6
  },
  {
    name: "Precision Aluminum Pen",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Solid CNC-machined structural aluminum build housing ultra-fluid pressurized liquid ink flow.",
    price: 42.00,
    rating: 4.6
  },
  {
    name: "Classic Minimalist Leather Belt",
    image: "https://images.unsplash.com/photo-1624222247344-550fb8ef5521?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Single piece full grain bridle leather fitted with a custom sandblasted silver tone buckle hardware item.",
    price: 70.00,
    rating: 4.7
  },
  {
    name: "Minimalist Titanium Key Ring",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Unibody titanium alloy utility clip loop designed to group essentials tightly without rattle profiles.",
    price: 35.00,
    rating: 4.5
  },
  {
    name: "Premium Linen Pocket Square",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Hand-rolled crisp natural flax linen borders optimized to hold crisp structural blazer geometric folds.",
    price: 25.00,
    rating: 4.3
  },
  {
    name: "Studio Minimal Ring",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "A solid 925 sterling silver band engineered with a signature micro flat edge architectural face loop.",
    price: 115.00,
    rating: 4.8
  },
  {
    name: "Leather Passport Sleeve Case",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Ultra-thin vegetable tanned leather jacket casing keeping flight credentials safe and flat layouts.",
    price: 58.00,
    rating: 4.6
  },
  {
    name: "Wireless Charging Pad Desk Drop",
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Premium circular aluminum disc weighted base upholstered in premium dark grain calf skins.",
    price: 90.00,
    rating: 4.7
  },
  {
    name: "Polarized Sleek Aviators",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Fine steel gold-wire frames featuring modern square drop profile lines and anti-reflective tech coatings.",
    price: 160.00,
    rating: 4.8
  },
  {
    name: "Braided Italian Silk Bracelet",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Hand-braided luxury silk cord threads completed with a solid black custom neodymium magnetic locking clasp node.",
    price: 65.00,
    rating: 4.4
  },
  {
    name: "Architect Automatic Timepiece",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Exhibition window back revealing an intricate self-winding mechanical system with clean ticks.",
    price: 540.00,
    rating: 4.9
  },
  {
    name: "Classic Leather Document Folder",
    image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "An A4 structural sleeve folder tailored carefully with edge hand painting and durable linen internal lining grids.",
    price: 130.00,
    rating: 4.7
  },
  {
    name: "Minimalist Matte Umbrella",
    image: "https://images.unsplash.com/photo-1533228100845-08145b01de14?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Fiberglass structural windproof skeleton housing a double-canopy waterproof canopy layer profile.",
    price: 50.00,
    rating: 4.6
  },
  {
    name: "Carbon Fiber Card Clip",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Real 3K weave gloss carbon layout frame providing maximum tension holding arrays with zero weight adds.",
    price: 45.00,
    rating: 4.5
  },
  {
    name: "Sterling Silver Cuff Link Pair",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Symmetrical polished metallic rectangles featuring traditional pivoting toggle back links setup locks.",
    price: 95.00,
    rating: 4.4
  },
  {
    name: "Wireless ANC True Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Bespoke sound curves inside clean ceramic-white modular pods with powerful adaptive audio soundstages.",
    price: 199.00,
    rating: 4.8
  },
  {
    name: "Matte Metal Tie Bar Clip",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Short format brushed steel accent rod piece calculated precisely to keep neckties steady and level.",
    price: 30.00,
    rating: 4.2
  },
  {
    name: "Studio Leather Key Loop Organizer",
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "A compact folding structural hardware sleeve wrapping loose keys down tightly into a silent stack setup.",
    price: 38.00,
    rating: 4.6
  },

  // ==================== FOOTWEAR (20 Items) ====================
  {
    name: "MonoWeave Minimalist Sneakers",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Breathable recycled knit yarn silhouette structured over an ergonomic impact-dispersing compound sole.",
    price: 160.00,
    rating: 4.9
  },
  {
    name: "Classic Calfskin Derby Shoe",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Premium smooth full-grain leather complete with a durable Blake-stitched hard composite leather out-sole plate.",
    price: 245.00,
    rating: 4.8
  },
  {
    name: "Sleek Suede Chelsea Boot",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Water-resistant premium split calf suede featuring stretch web panels and comfortable pull loops.",
    price: 260.00,
    rating: 4.9
  },
  {
    name: "Aero Running Footbed Shoe",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Engineered mesh ventilation paths lined along responsive high rebound EVA spring midsole technology.",
    price: 135.00,
    rating: 4.7
  },
  {
    name: "Minimalist Leather Court Shoe",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Clean retro aesthetic shape using flawless premium white Napa leather and supportive rubber margins.",
    price: 150.00,
    rating: 4.8
  },
  {
    name: "Premium Suede Penny Loafer",
    image: "https://images.unsplash.com/photo-1614252329309-53199b11b244?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Traditional step slipper styling updated using a low stacked heel profile and seamless edge joinery lines.",
    price: 220.00,
    rating: 4.6
  },
  {
    name: "Architect Leather High Top",
    image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Padded ankle support zone maps matched over a solid monochrome cupsole foundation frame layout.",
    price: 180.00,
    rating: 4.7
  },
  {
    name: "Studio Tech Trail Shoe",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Heavy tread rubber grips paired with a secure speed-lacing cord mechanism layer.",
    price: 170.00,
    rating: 4.5
  },
  {
    name: "Minimalist House Slipper Slide",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Molded wool felt cradles creating extreme insulating comfort levels over soft indoor surfaces.",
    price: 65.00,
    rating: 4.9
  },
  {
    name: "Premium Leather Monk Strap",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Polished twin buckle plate adjustments constructed cleanly using high grade box calf hide cuts.",
    price: 270.00,
    rating: 4.8
  },
  {
    name: "Canvas Minimal Low Top",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Unbleached raw cotton duck canvas panels structured neatly over lightweight vulcanized rubber edges.",
    price: 85.00,
    rating: 4.6
  },
  {
    name: "City Suede Desert Boot",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Two eyelet lace mapping system built atop flexible shock absorbing crepe natural rubber outsoles.",
    price: 190.00,
    rating: 4.5
  },
  {
    name: "Mono Gym Slide Sandal",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Waterproof contoured wide strap unibody injection molded EVA foam structure tool deck.",
    price: 45.00,
    rating: 4.3
  },
  {
    name: "Sleek Wingtip Brogue Shoe",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Traditional micro hole pin perforation designs streamlined neatly into a sharp toe medallion contour lines.",
    price: 255.00,
    rating: 4.7
  },
  {
    name: "Velo Tech Training Runner",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "A neutral stride support platform containing carbon fiber balance plates hidden inside foam heels.",
    price: 165.00,
    rating: 4.6
  },
  {
    name: "Classic Suede Driving Loafer",
    image: "https://images.unsplash.com/photo-1515347648465-f44d8a237f0083?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Incredibly flexible exposed rubber pebble tread pods aligned nicely along moccasin toe seams.",
    price: 175.00,
    rating: 4.7
  },
  {
    name: "Weatherproof Winter Sneaker Boot",
    image: "https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Internal gusset tongues combined with cozy fleece lining blocks to resist extreme chill factors.",
    price: 210.00,
    rating: 4.8
  },
  {
    name: "Minimal Platform Espadrille",
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Woven braided jute fiber sidewall borders topped off with soft premium breathable suede panels.",
    price: 95.00,
    rating: 4.4
  },
  {
    name: "Architect Leather Dress Boot",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "A tall lace up dress profile including a speed hook top matrix and high polish luster coat finishes.",
    price: 295.00,
    rating: 4.9
  },
  {
    name: "Studio Minimalist Mule",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Open back step design tailored from a single smooth piece of oil tanned saddlery hide cuts.",
    price: 140.00,
    rating: 4.5
  },

  // ==================== TRAVEL (20 Items) ====================
  {
    name: "Vélo Studio Modular Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Waterproof ballistic nylon shell featuring tactical internal organizing pods and hidden magnetic slots.",
    price: 185.00,
    rating: 4.9
  },
  {
    name: "Modular Tech Organiser Case",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Elastomeric retention loops configured inside a rigid crushproof shell designed for storage nodes.",
    price: 55.00,
    rating: 4.5
  },
  {
    name: "Sleek Matte Cabin Suitcase",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Impact resistant polycarbonate hard casing equipped with flawless 360 dual spinner wheel assemblies.",
    price: 280.00,
    rating: 4.8
  },
  {
    name: "Premium Leather Duffle Bag",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Generous capacity weekend travel storage holdall built entirely from thick oil-rubbed leather panels.",
    price: 340.00,
    rating: 4.9
  },
  {
    name: "Architect Commuter Briefcase",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Structured tech layout frame featuring 16-inch laptop soft cradles and dual file separator walls.",
    price: 210.00,
    rating: 4.7
  },
  {
    name: "Waterproof Toiletry Dopp Kit",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Internal TPU leakproof barrier membranes fitted with premium smooth gliding YKK AquaGuard zipper chains.",
    price: 45.00,
    rating: 4.6
  },
  {
    name: "Aero Packing Cube Trio",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "An ultra compression featherweight mesh panel setup designed to segment clothing inside luggage chambers.",
    price: 38.00,
    rating: 4.5
  },
  {
    name: "Minimalist Crossbody Sling Pack",
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Close fitting chest bag with durable quick release Fidlock slide buckles and fast access phone slots.",
    price: 75.00,
    rating: 4.8
  },
  {
    name: "Ergonomic Memory Travel Pillow",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "High density adaptive neck contour cushion wrapped in super soft cooling bamboo textile slips.",
    price: 40.00,
    rating: 4.7
  },
  {
    name: "Studio Canvas Garment Sleeve",
    image: "https://images.unsplash.com/photo-1521335629791-73ab029efd1d?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Folding protective transport carrier optimized to protect formal evening suits against wrinkles.",
    price: 110.00,
    rating: 4.4
  },
  {
    name: "Tactical Modular Messenger Bag",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Ambidextrous cross shoulder load system complete with hidden webbing strips for pouch link expansions.",
    price: 165.00,
    rating: 4.6
  },
  {
    name: "Leather Luggage ID Tag",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Privacy cover flap assembly keeping identity panels hidden away from casual terminal glances.",
    price: 20.00,
    rating: 4.3
  },
  {
    name: "Sleek International Travel Adapter",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "All in one slider slider control pin block providing rapid cross global power connectivity conversions.",
    price: 48.00,
    rating: 4.7
  },
  {
    name: "Mono Lightweight Tote Bag",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "High tensile sailcloth material weave cut cleanly to create a highly compressible packable secondary tote.",
    price: 50.00,
    rating: 4.5
  },
  {
    name: "Architect Checklist Notebook Wallet",
    image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Hardbound travel log book container with spaces inside for custom SIM cards and document stubs.",
    price: 35.00,
    rating: 4.6
  },
  {
    name: "Premium Security Waist Belt",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Ultra flat body matching stash pocket band lined with complete RFID shielding layers.",
    price: 28.00,
    rating: 4.2
  },
  {
    name: "Studio Camera Cube Insert",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Thick protective camera lens partition walls configured carefully to slide right inside standard daypack slots.",
    price: 85.00,
    rating: 4.8
  },
  {
    name: "Aero Checkpoint Utility Backpack",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Flat lay clamshell opening profile to speed past security scanning arrays seamlessly.",
    price: 195.00,
    rating: 4.9
  },
  {
    name: "Waterproof Shoe Storage Bag",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Ventilated micro structural pouch to block base footwear odors from transferring to clean linen bundles.",
    price: 22.00,
    rating: 4.4
  },
  {
    name: "Grand Horizon Check Suitcase",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ed2a1?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Massive volumetric cargo suitcase reinforced beautifully with deep protective corner aluminum stamp shields.",
    price: 360.00,
    rating: 5.0
  },

  // ==================== LIFESTYLE (20 Items) ====================
  {
    name: "HydroFlask Matte Thermal Cell",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Double-walled vacuum insulated container finished in an anti-scratch tactile matte powder coat.",
    price: 48.00,
    rating: 4.7
  },
  {
    name: "Premium Desk Mat — Charcoal",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Premium pressed renewable felt base combined with a rich textured vegan leather deck layer.",
    price: 78.00,
    rating: 4.8
  },
  {
    name: "Studio Soy Wax Candle",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Hand poured natural soy wax into a heavy custom ceramic tumbler broadcasting custom woodsy scent oils.",
    price: 36.00,
    rating: 4.5
  },
  {
    name: "Architect Ceramic Pour-Over",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Internal spiral extraction ribs matched perfectly to yield balanced flavor extractions from raw coffee grounds.",
    price: 45.00,
    rating: 4.8
  },
  {
    name: "Minimalist Double Wall Glasses",
    image: "https://images.unsplash.com/photo-1574786198875-49f5d09fe2d2?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "A pair of hand blown borosilicate glass vessels creating a clean optical float illusion for cold drinks.",
    price: 32.00,
    rating: 4.6
  },
  {
    name: "Premium Cork Yoga Block",
    image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Highly stable non slip solid composition structure harvested sustainably from renewable Mediterranean bark layers.",
    price: 28.00,
    rating: 4.7
  },
  {
    name: "Sleek MagSafe Desk Stand",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Solid block machining yielding a heavy fixed platform angle optimal for hands free interactive screen tracking.",
    price: 60.00,
    rating: 4.4
  },
  {
    name: "Aero Matte Fountain Pen",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Fitted with a customized iridium broad nib point ensuring dark fluid linear tracking onto paper pads.",
    price: 85.00,
    rating: 4.9
  },
  {
    name: "Minimalist Solid Incense Burner",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "An unpolished heavy raw brass catch basin brick intended to safely cradle charcoal incense smudges.",
    price: 55.00,
    rating: 4.5
  },
  {
    name: "Studio Hardcover Grid Sketchbook",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Heavy 160gsm bleach free dot matrix pages bounded into an elegant flat opening fabric book casing spine.",
    price: 30.00,
    rating: 4.8
  },
  {
    name: "Architect Concrete Planter Pod",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Raw cast concrete desktop container fitted with lower passive drainage holes for miniature houseplants.",
    price: 24.00,
    rating: 4.3
  },
  {
    name: "Premium Wool Felt Coaster Set",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Four piece thick precision die cut thermal barrier discs intended to cushion fine tabletops against moisture ring scars.",
    price: 18.00,
    rating: 4.6
  },
  {
    name: "Sleek Walnut Wireless Mouse",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Hand carved real wood top casing seamlessly matching precision optical tracking electronics inside.",
    price: 110.00,
    rating: 4.7
  },
  {
    name: "Mono Mechanical System Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Compact 65 percent layout utilizing clicky linear white key switches inside thick frosted chassis housing walls.",
    price: 160.00,
    rating: 4.9
  },
  {
    name: "Studio Minimalist Tea Infuser",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Fine micro etched stainless steel cylindrical rod capsule suited to drop cleanly inside tall water mugs.",
    price: 26.00,
    rating: 4.4
  },
  {
    name: "Architect Solid Oak Monitor Stand",
    image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Elevated desktop monitor platform clearing usable workspace storage areas beneath its span arches.",
    price: 125.00,
    rating: 4.8
  },
  {
    name: "Aero Lightweight Pocket Comb",
    image: "https://images.unsplash.com/photo-1590156546746-c58a7074052a?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Solid piece machining from aircraft alloy sheets creating an indestructible anti static hair tooling comb.",
    price: 35.00,
    rating: 4.5
  },
  {
    name: "Sleek Aluminum Desk Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Counterbalanced articulation arm hosting fine warm spectrum glare controlled LED emitter lines.",
    price: 185.00,
    rating: 4.9
  },
  {
    name: "Mono Ceramic Essential Diffuser",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Ultrasonic vibration plate producing an ultra fine micro cooling mist column out from its top cone orifice.",
    price: 65.00,
    rating: 4.6
  },
  {
    name: "Studio Leather Key Loop Organizer",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Braided cord wrap fitted with anodized sliding spring steel toggles to keep structural loop links tight.",
    price: 28.00,
    rating: 4.3
  },

  // ==================== REMAINING 20 ITEMS TO HIT exactly 100 COMPLETE ====================
  // (Adding unique, individual luxury variants evenly divided across lines)
  {
    name: "Studio Cashmere Crewneck Luxe",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "GOTS-certified pure Himalayan knit fiber constructed directly over specialized heavy gauge needle counts.",
    price: 310.00,
    rating: 4.9
  },
  {
    name: "Architect Water-Repellent Mac",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Traditional single-breasted layout finished completely in high-density premium bonded structural cotton panels.",
    price: 340.00,
    rating: 4.8
  },
  {
    name: "Premium Japanese Denim Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Straight fit layout featuring edge red line self-edge selvage weaves and pristine internal stitch detailing lines.",
    price: 195.00,
    rating: 4.7
  },
  {
    name: "Core Supima Cotton Undershirt",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Extra long staple premium Supima yarns twisted neatly into ultra light breathable layout sheets.",
    price: 45.00,
    rating: 4.5
  },
  {
    name: "Polished Silver Tie Bar Accent",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Solid mirror gloss hand-finished sterling silver metal bar slip to clamp tailored neckties into position.",
    price: 80.00,
    rating: 4.6
  },
  {
    name: "Architect Solid Leather Key Fob",
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Thick oil-tanned hide wrap strap locked around heavy matte sandblast custom hardware retention rivets.",
    price: 32.00,
    rating: 4.4
  },
  {
    name: "Aero Minimal Matte Glasses Frame",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Acetate front chassis combined with flexible memory-alloy temples to avoid heavy pressure points.",
    price: 135.00,
    rating: 4.6
  },
  {
    name: "Bespoke Onyx Bead Bracelet Line",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Perfect spheres of natural matte black gemstone items strung cleanly onto highly resilient elastic strings.",
    price: 55.00,
    rating: 4.3
  },
  {
    name: "Premium Waxed Canvas Boot",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Heavy 18oz paraffin waxed duck material combined with rugged leather toe boxes and commando sole lugs.",
    price: 215.00,
    rating: 4.8
  },
  {
    name: "Studio Minimalist Running Lo Top",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Stripped back paneling patterns allowing complete foot flexing freedom across synthetic technical decks.",
    price: 120.00,
    rating: 4.7
  },
  {
    name: "Classic Suede Leather Loafer Elite",
    image: "https://images.unsplash.com/photo-1614252329309-53199b11b244?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Traditional casual layout updated beautifully with hand-burnished raw moc-toe seam detailing threads.",
    price: 230.00,
    rating: 4.6
  },
  {
    name: "Mono Injection Rubber Slide Sandal",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Completely waterproof construction featuring deep micro channel layout contours to rapidly guide water away.",
    price: 38.00,
    rating: 4.4
  },
  {
    name: "Sleek Carbon Tech Passport Jacket",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Hyper dense woven composite face shields designed to defend traveling document pages from moisture folds.",
    price: 65.00,
    rating: 4.7
  },
  {
    name: "Architect Compression Cube Slim",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Dual circumference zipper sliders engineered to compress bulk packed clothing inside luggage cases.",
    price: 26.00,
    rating: 4.5
  },
  {
    name: "Vélo Softshell Laptop Sleeve 14",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Impact dispersing technical neoprene cell core wrapped neatly under tailored low profile canvas shells.",
    price: 48.00,
    rating: 4.6
  },
  {
    name: "Tactical Flight Document Cross-Sling",
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Flush front layout containing custom pen slots and wide webbed adjustable shoulder configurations strap anchors.",
    price: 90.00,
    rating: 4.8
  },
  {
    name: "Premium Walnut Headphone Stand Deck",
    image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "A continuous curved ribbon of hardwood ply anchored down into sandblasted metal counterweight plates.",
    price: 115.00,
    rating: 4.8
  },
  {
    name: "Architect Anodized Pen Case Capsule",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Threaded screw top cylinders machined precisely to hold high luxury writing utensils safely inside luggage.",
    price: 34.00,
    rating: 4.4
  },
  {
    name: "Studio Minimal Matte Tea Pitcher",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Heavy stoneware pottery construction utilizing internal filtering ceramic strainer mesh patterns.",
    price: 58.00,
    rating: 4.6
  },
  {
    name: "Mono Weighted Brass Incense Block",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "A solid unpolished block calibrated with explicit drill channel diameters for vertical stick burns.",
    price: 42.00,
    rating: 4.5
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sleek-store';
    
    console.log('Connecting to MongoDB Engine for data seeding...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected.');

    console.log('Flushing existing products catalog data...');
    await Product.deleteMany();
    console.log('🗑️ Legacy records wiped.');

    console.log(`Injecting ${curatedProducts.length} unique curated items into MongoDB storage clusters...`);
    await Product.insertMany(curatedProducts);
    console.log('🚀 Database mass-seeding operation completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('🔥 SEEDING OPERATION CRITICAL FAILURE:', error);
    process.exit(1);
  }
};

seedDatabase();