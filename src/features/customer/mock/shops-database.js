export const SHOPS_DATABASE = {
  "fresh-cafe": {
    shopSlug: "fresh-cafe",
    shopName: "Fresh Cafe Organic",
    logo: "🌿",
    themeId: "cafe",
    desc: "Artisanal organic brew coffee, slow-baked buttery pastries, sourdough sandwiches & fresh fruit bowls.",
    phone: "+91 98765 00001",
    address: "Plot 12, Sector 4, HSR Layout, Bengaluru",
    banner: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    offers: [
      { id: 1, title: "Flat 20% OFF", subtitle: "Use code FOODIE20 on orders above ₹300", code: "FOODIE20", discType: "percent", value: 20 },
      { id: 2, title: "Chai hours Special", subtitle: "Get Free Croissant with Cold Brew", code: "BREWNEW", discType: "flat", value: 40 }
    ],
    menu: [
      { id: 1, name: "Masala Chai", category: "Beverages", price: 40, veg: true, available: true, rating: 4.8, orders: 1240, img: "☕", desc: "Classic spiced Indian tea brewed with cardamom, fresh ginger, and whole milk" },
      { id: 2, name: "Cold Brew Coffee", category: "Beverages", price: 120, veg: true, available: true, rating: 4.6, orders: 890, img: "🥤", desc: "Slow steeped 12-hour specialty single-origin cold brew coffee, served chilled" },
      { id: 3, name: "Mango Lassi", category: "Beverages", price: 80, veg: true, available: true, rating: 4.9, orders: 2100, img: "🥭", desc: "Thick, creamy traditional yogurt shake blended with sweet alphonso mangoes" },
      { id: 4, name: "Butter Croissant", category: "Bakery", price: 90, veg: true, available: true, rating: 4.5, orders: 670, img: "🥐", desc: "Flaky, multi-layered French croissant baked with pure butter till golden brown" },
      { id: 5, name: "Sourdough Club Sandwich", category: "Mains", price: 180, veg: true, available: true, rating: 4.7, orders: 540, img: "🥪", desc: "Three-layered sandwich loaded with grilled cottage cheese, fresh pesto, lettuce, and tomatoes" }
    ]
  },
  "burger-hub": {
    shopSlug: "burger-hub",
    shopName: "Gourmet Burger Hub",
    logo: "🍔",
    themeId: "minimal",
    desc: "Decadent fresh smashed cheeseburgers, crispy truffle parmesan russet fries, hot chicken sliders, and creamy milkshakes.",
    phone: "+91 98765 00002",
    address: "Building 45, 100 Feet Road, Indiranagar, Bengaluru",
    banner: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600",
    offers: [
      { id: 1, title: "Flat ₹50 OFF", subtitle: "Use code FIRSTBURGER on first scan", code: "FIRSTBURGER", discType: "flat", value: 50 }
    ],
    menu: [
      { id: 201, name: "Double Smashed Burger", category: "Mains", price: 240, veg: false, available: true, rating: 4.9, orders: 1840, img: "🍔", desc: "Gourmet double smashed lamb patties, melted cheddar, house secret burger spread on brioche buns" },
      { id: 202, name: "Truffle Parmesan Fries", category: "Snacks", price: 130, veg: true, available: true, rating: 4.7, orders: 1200, img: "🍟", desc: "Premium double-fried russet potatoes tossed in aromatic white truffle oil and fresh grated parmesan cheese" },
      { id: 203, name: "Crispy Mozzarella Sticks", category: "Snacks", price: 110, veg: true, available: true, rating: 4.5, orders: 740, img: "🧀", desc: "Breaded seasoned mozzarella sticks, fried golden brown, served with tangy marinara dip" },
      { id: 204, name: "Salted Caramel Shake", category: "Beverages", price: 150, veg: true, available: true, rating: 4.8, orders: 930, img: "🥤", desc: "Creamy vanilla ice cream blended with home-cooked sea salt caramel and whole milk" }
    ]
  },
  "tea-station": {
    shopSlug: "tea-station",
    shopName: "The Royal Tea Station",
    logo: "🍵",
    themeId: "dark",
    desc: "Aromatic Kullhad ginger cardamon tea, crispy street-style potato samosas, hot chocolate fudge brownies, and chilled coolers.",
    phone: "+91 98765 00003",
    address: "Block C, 5th Cross, Koramangala, Bengaluru",
    banner: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    offers: [
      { id: 1, title: "Flat 10% OFF", subtitle: "Use code TEATIME for evening snacks", code: "TEATIME", discType: "percent", value: 10 }
    ],
    menu: [
      { id: 301, name: "Premium Kullhad Chai", category: "Beverages", price: 45, veg: true, available: true, rating: 4.9, orders: 3450, img: "🍵", desc: "Authentic Indian tea brewed with fresh crushed ginger, cardamoms, served in custom clay cup" },
      { id: 302, name: "Spiced Potato Samosa Plate", category: "Snacks", price: 50, veg: true, available: true, rating: 4.6, orders: 1560, img: "🥟", desc: "Two pieces of crispy pastry filled with spiced potato and peas, served with sweet tamarind sauce" },
      { id: 303, name: "Fudge Chocolate Brownie", category: "Desserts", price: 95, veg: true, available: true, rating: 4.7, orders: 880, img: "🍫", desc: "Decadent dense double chocolate fudge brownie, served warm with rich dark chocolate fudge syrup" },
      { id: 304, name: "Mint Lime Mojito Cooler", category: "Beverages", price: 110, veg: true, available: true, rating: 4.5, orders: 670, img: "🍹", desc: "Refreshing blend of fresh muddled mint leaves, lime juice, brown sugar, topped with sparkling club soda" }
    ]
  }
};
