export const MENU_ITEMS = [
  {
    id: 1,
    name: "Masala Chai",
    category: "Beverages",
    price: 40,
    veg: true,
    available: true,
    rating: 4.8,
    orders: 1240,
    img: "☕",
    desc: "Classic spiced Indian tea brewed with cardamom, fresh ginger, and whole milk",
    variants: [
      { name: "Regular", priceAdd: 0 },
      { name: "Large", priceAdd: 15 },
      { name: "Kullhad Special", priceAdd: 25 }
    ],
    options: [
      { name: "Extra Ginger", priceAdd: 5 },
      { name: "Sugar Free", priceAdd: 0 },
      { name: "Extra Cardamom", priceAdd: 5 }
    ]
  },
  {
    id: 2,
    name: "Cold Brew Coffee",
    category: "Beverages",
    price: 120,
    veg: true,
    available: true,
    rating: 4.6,
    orders: 890,
    img: "🥤",
    desc: "Slow steeped 12-hour specialty single-origin cold brew coffee, served chilled",
    variants: [
      { name: "Standard Brew", priceAdd: 0 },
      { name: "Vanilla Cold Foam", priceAdd: 25 },
      { name: "Nitro Infused", priceAdd: 40 }
    ],
    options: [
      { name: "Oat Milk", priceAdd: 30 },
      { name: "Extra Shot Espresso", priceAdd: 25 }
    ]
  },
  {
    id: 3,
    name: "Mango Lassi",
    category: "Beverages",
    price: 80,
    veg: true,
    available: true,
    rating: 4.9,
    orders: 2100,
    img: "🥭",
    desc: "Thick, creamy traditional yogurt shake blended with sweet alphonso mangoes",
    variants: [
      { name: "Regular", priceAdd: 0 },
      { name: "Jumbo Special", priceAdd: 30 }
    ],
    options: [
      { name: "Add Pistachio Shavings", priceAdd: 15 },
      { name: "Sugar Free Sweetener", priceAdd: 0 }
    ]
  },
  {
    id: 4,
    name: "Butter Croissant",
    category: "Bakery",
    price: 90,
    veg: true,
    available: true,
    rating: 4.5,
    orders: 670,
    img: "🥐",
    desc: "Flaky, multi-layered French croissant baked with pure butter till golden brown",
    variants: [
      { name: "Classic", priceAdd: 0 },
      { name: "Warm Heated", priceAdd: 0 }
    ],
    options: [
      { name: "Add Nutella Dip", priceAdd: 20 },
      { name: "Add Whipped Cream", priceAdd: 15 }
    ]
  },
  {
    id: 5,
    name: "Chicken Club Sandwich",
    category: "Mains",
    price: 180,
    veg: false,
    available: true,
    rating: 4.7,
    orders: 540,
    img: "🥪",
    desc: "Three-layered sandwich loaded with grilled chipotle chicken breast, fresh lettuce, and tomatoes",
    variants: [
      { name: "Sourdough Bread", priceAdd: 0 },
      { name: "Multigrain Healthy Bread", priceAdd: 10 }
    ],
    options: [
      { name: "Extra Cheddar Cheese Slice", priceAdd: 20 },
      { name: "Double Loaded Chicken", priceAdd: 45 }
    ]
  },
  {
    id: 6,
    name: "Paneer Tikka Wrap",
    category: "Mains",
    price: 150,
    veg: true,
    available: true,
    rating: 4.4,
    orders: 430,
    img: "🌯",
    desc: "Grilled tandoori paneer cubes wrapped in a soft roomali flatbread with mint-coriander yogurt sauce",
    variants: [
      { name: "Classic Soft Wrap", priceAdd: 0 },
      { name: "Whole Wheat wrap", priceAdd: 15 }
    ],
    options: [
      { name: "Add Grilled Capsicum", priceAdd: 10 },
      { name: "Extra Cheese", priceAdd: 20 }
    ]
  },
  {
    id: 7,
    name: "Blueberry Cheesecake",
    category: "Desserts",
    price: 160,
    veg: true,
    available: true,
    rating: 4.9,
    orders: 320,
    img: "🍰",
    desc: "Rich, velvety classic baked cream cheese pie base smothered in custom wild blueberry compote",
    variants: [
      { name: "Standard Slice", priceAdd: 0 }
    ],
    options: [
      { name: "Extra Blueberry Syrup", priceAdd: 15 }
    ]
  },
  {
    id: 8,
    name: "Truffle Parmesan Fries",
    category: "Snacks",
    price: 130,
    veg: true,
    available: true,
    rating: 4.6,
    orders: 780,
    img: "🍟",
    desc: "Premium double-fried russet potatoes tossed in aromatic white truffle oil and fresh grated parmesan cheese",
    variants: [
      { name: "Medium Bucket", priceAdd: 0 },
      { name: "Large Share Basket", priceAdd: 40 }
    ],
    options: [
      { name: "Add Spicy Chipotle Dip", priceAdd: 15 },
      { name: "Extra Shaved Parmesan", priceAdd: 20 }
    ]
  }
];

export const OFFERS = [
  { id: 1, title: "Flat 20% OFF", subtitle: "Use code FOODIE20 on orders above ₹300", code: "FOODIE20", discType: "percent", value: 20, minAmount: 300, bgGrad: "from-pink-500 to-rose-500" },
  { id: 2, title: "Happy Hours Special", subtitle: "Get Free Chai with any Sandwich from 4 PM - 7 PM", code: "CHAIHOURS", discType: "flat", value: 40, minAmount: 200, bgGrad: "from-violet-500 to-indigo-500" },
  { id: 3, title: "First Order Discount", subtitle: "Flat ₹50 off on scanning QR for the first time", code: "FIRSTQR", discType: "flat", value: 50, minAmount: 150, bgGrad: "from-amber-500 to-orange-500" }
];

export const TEAM_MEMBERS = [
  { name: "Rahul Sharma", role: "Owner / Head Chef", avatar: "RS", email: "rahul@cafe-aroma.com" },
  { name: "Anjali Das", role: "Cashier / Counter Manager", avatar: "AD", email: "anjali@cafe-aroma.com" },
  { name: "Karthik Subramanian", role: "Waiter / Server Manager", avatar: "KS", email: "karthik@cafe-aroma.com" }
];

export const ORDERS = [
  { id: "#1024", customer: "Dhanush Kumar", table: "Table 2", items: ["1x Masala Chai", "1x Butter Croissant"], total: 130, status: "pending", time: "5 mins ago" },
  { id: "#1025", customer: "Sneha Reddy", table: "Table 5", items: ["1x Mango Lassi (Jumbo Special)", "1x Paneer Tikka Wrap"], total: 260, status: "preparing", time: "12 mins ago" },
  { id: "#1026", customer: "Vikram Sen", table: "Table 1", items: ["1x Truffle Parmesan Fries"], total: 130, status: "ready", time: "18 mins ago" }
];

export const ANALYTICS = {
  weeklyData: [12000, 15000, 18000, 14000, 22000, 26000, 31000],
  hourlyData: [10, 15, 8, 12, 18, 30, 45, 62, 58, 40, 25, 12, 10, 15, 8, 12, 18, 30, 45, 62, 58, 40, 25, 12],
  topItems: [
    { id: 1, name: "Masala Chai", img: "☕", orders: 1240, price: 40 },
    { id: 3, name: "Mango Lassi", img: "🥭", orders: 2100, price: 80 },
    { id: 8, name: "Truffle Fries", img: "🍟", orders: 780, price: 130 }
  ]
};
