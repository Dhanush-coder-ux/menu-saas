export const MENU_TEMPLATES = [
  {
    shopName: "Bella Italia Bistro",
    categories: [
      {
        name: "Woodfired Pizzas",
        items: [
          { id: 1, name: "Margherita Supreme", price: 340, description: "San Marzano tomatoes, fresh buffalo mozzarella, fresh sweet basil leaves, and EVOO", veg: true, available: true, image: "🍕" },
          { id: 2, name: "Spicy Pepperoni & Hot Honey", price: 420, description: "Cured pepperoni slices, double mozzarella, wild oregano, drizzled with hot chili honey", veg: false, available: true, image: "🍕" },
          { id: 3, name: "Truffle Wild Mushroom", price: 460, description: "Creamy white sauce base, porcini & button mushrooms, parmesan, drizzled with white truffle oil", veg: true, available: false, image: "🍄" }
        ]
      },
      {
        name: "Artisanal Pasta",
        items: [
          { id: 4, name: "Fettuccine Truffle Carbonara", price: 380, description: "Homemade egg fettuccine, pancetta strips, pasteurized egg yolks, pecorino cheese, black truffle dust", veg: false, available: true, image: "🍝" },
          { id: 5, name: "Pesto Genovese Penne", price: 320, description: "Penne pasta tossed in fresh sweet basil pine-nut pesto, roasted cherry tomatoes, topped with pine nuts", veg: true, available: true, image: "🌿" }
        ]
      },
      {
        name: "Desserts & Dolci",
        items: [
          { id: 6, name: "Classico Tiramisu", price: 210, description: "Layered savoiardi ladyfinger cookies soaked in espresso liqueur, whipped mascarpone cream, dark cocoa powder", veg: true, available: true, image: "🍰" },
          { id: 7, name: "Pistachio Gelato Cup", price: 150, description: "Authentic double churned Sicilian bronte pistachio gelato, topped with roasted crushed pistachios", veg: true, available: true, image: "🍧" }
        ]
      }
    ]
  },
  {
    shopName: "Brew & Co. Cafe",
    categories: [
      {
        name: "Signature Brews",
        items: [
          { id: 101, name: "Spanish Latte", price: 140, description: "Double shot espresso, sweet condensed milk, velvety micro-foamed milk", veg: true, available: true, image: "☕" },
          { id: 102, name: "Salted Caramel Cold Brew", price: 160, description: "16-hour slow steeped specialty cold brew coffee, topped with sweet salted caramel cream foam", veg: true, available: true, image: "🥤" },
          { id: 103, name: "Premium Kullhad Chai", price: 45, description: "Authentic Indian tea brewed with fresh crushed ginger, green cardamoms, served in custom clay cup", veg: true, available: true, image: "🍵" }
        ]
      },
      {
        name: "Gourmet Bakery",
        items: [
          { id: 104, name: "Almond Butter Croissant", price: 110, description: "Twice baked buttery flaky croissant filled with rich sweet almond frangipane cream, sliced toasted almonds", veg: true, available: true, image: "🥐" },
          { id: 105, name: "Fudge Chocolate Brownie", price: 95, description: "Decadent dense double chocolate fudge brownie, served warm with rich dark chocolate fudge syrup", veg: true, available: false, image: "🍫" }
        ]
      }
    ]
  },
  {
    shopName: "Juice Lab & Bowls",
    categories: [
      {
        name: "Superfood Bowls",
        items: [
          { id: 201, name: "Sunset Berry Acai Bowl", price: 280, description: "Organic pure frozen acai berry base, sliced fresh strawberries, organic honey, crunchy roasted granola", veg: true, available: true, image: "🍓" },
          { id: 202, name: "Tropical Matcha Greens Bowl", price: 290, description: "Uji matcha green tea powder blended with spinach, banana, pineapple juice, coconut flakes, chia seeds", veg: true, available: true, image: "🍌" }
        ]
      },
      {
        name: "Cold-Pressed Nectar",
        items: [
          { id: 203, name: "Citrus Ginger Glow", price: 130, description: "Cold-pressed fresh valencia oranges, turmeric root, yellow carrots, and double fresh ginger shoot", veg: true, available: true, image: "🍊" },
          { id: 204, name: "Pomegranate Mint Cooler", price: 150, description: "Freshly pressed ruby pomegranates, organic sweet mint leaves, finished with lime twist juice", veg: true, available: true, image: "🍹" }
        ]
      }
    ]
  }
];
