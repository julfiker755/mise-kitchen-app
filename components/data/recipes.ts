export interface Category {
  id: string;
  title: string;
  image: string;
}

export interface RecipeAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  images?: string[];
  isSpicy?: boolean;
  isFavorite?: boolean;
  category?: string;
  rating?: number;
  cookingTime?: string;
  servings?: string;
  cuisine?: string;
  description?: string;
  author?: RecipeAuthor;
  ingredients?: string[];
  instructions?: string[];
}

export const categories: Category[] = [
  {
    id: "1",
    title: "Biriyani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Chicken",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281728?q=80&w=300&auto=format&fit=crop",
  },
];

export const defaultRecipeDetails = {
  category: "Ramen",
  cookingTime: "20 minutes",
  servings: "3 persons",
  cuisine: "Japanies",
  rating: 4.5,
  description:
    "Lorem ipsum dolor sit amet consectetur. Rutrum vitae tortor ut at turpis id quisque lacus. Cras bibendum amet ipsum et pellentesque congue elementum risus rhoncus.",
  author: {
    name: "Tom Holand",
    role: "Cook",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  },
  ingredients: [
    "2 packs fresh or dried ramen noodles.",
    "8 to 10 medium shrimp, peeled and deveined.",
    "2 large eggs",
    "1 cup snow peas or sugar snap peas",
    "2 tablespoons chopped chives or green onions",
    "1 teaspoon black sesame seeds",
  ],
  instructions: [
    "Boil the eggs for 6 to 7 minutes, then peel and cut them in half.",
    "Cook the ramen noodles according to the package instructions.",
    "Heat the broth and stir in miso paste, soy sauce, garlic, ginger, sesame oil, and rice vinegar.",
    "Add the shrimp and cook for 2 to 3 minutes until pink.",
    "Blanch the snow peas for 1 minute.",
    "Divide the noodles into bowls and pour the hot broth over them.",
    "Top with shrimp, eggs, snow peas, green onions, and black sesame seeds.",
  ],
};

export const popularRecipes: Recipe[] = [
  {
    id: "1",
    title: "Shrimp Ramen Bowl",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=600&auto=format&fit=crop",
    ],
    category: "Ramen",
    isSpicy: true,
    isFavorite: false,
    rating: 4.5,
    cookingTime: "20 minutes",
    servings: "3 persons",
    cuisine: "Japanies",
    description:
      "Lorem ipsum dolor sit amet consectetur. Rutrum vitae tortor ut at turpis id quisque lacus. Cras bibendum amet ipsum et pellentesque congue elementum risus rhoncus.",
    author: {
      name: "Tom Holand",
      role: "Cook",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    },
    ingredients: [
      "2 packs fresh or dried ramen noodles.",
      "8 to 10 medium shrimp, peeled and deveined.",
      "2 large eggs",
      "1 cup snow peas or sugar snap peas",
      "2 tablespoons chopped chives or green onions",
      "1 teaspoon black sesame seeds",
    ],
    instructions: [
      "Boil the eggs for 6 to 7 minutes, then peel and cut them in half.",
      "Cook the ramen noodles according to the package instructions.",
      "Heat the broth and stir in miso paste, soy sauce, garlic, ginger, sesame oil, and rice vinegar.",
      "Add the shrimp and cook for 2 to 3 minutes until pink.",
      "Blanch the snow peas for 1 minute.",
      "Divide the noodles into bowls and pour the hot broth over them.",
      "Top with shrimp, eggs, snow peas, green onions, and black sesame seeds.",
    ],
  },
  {
    id: "2",
    title: "Creamy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    category: "Pasta",
    isSpicy: false,
    isFavorite: false,
    rating: 4.8,
    cookingTime: "25 minutes",
    servings: "2 persons",
    cuisine: "Italian",
    description:
      "A rich and velvety garlic pasta made with freshly grated parmesan, heavy cream, and tender fettuccine noodles tossed with fresh herbs.",
    author: {
      name: "Maria Rossi",
      role: "Chef",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    ingredients: [
      "250g fettuccine or tagliatelle pasta",
      "4 cloves garlic, finely minced",
      "1 cup heavy cream",
      "1/2 cup grated parmesan cheese",
      "2 tbsp unsalted butter",
      "Fresh parsley, finely chopped",
    ],
    instructions: [
      "Boil pasta in salted water until al dente.",
      "Melt butter in a skillet and sauté minced garlic until fragrant.",
      "Pour in heavy cream and simmer gently for 3 minutes.",
      "Stir in parmesan cheese until melted and creamy.",
      "Toss drained pasta into the sauce and garnish with fresh parsley.",
    ],
  },
  {
    id: "3",
    title: "Zesty Lemon Chicken",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Savory Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Grilled Salmon with Herbs",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "6",
    title: "Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "7",
    title: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "8",
    title: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "9",
    title: "Spicy Chicken Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "10",
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "11",
    title: "Butter Chicken Curry",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "12",
    title: "Caprese Salad",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "13",
    title: "Beef Tacos al Pastor",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "14",
    title: "Homemade Chicken Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "15",
    title: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "16",
    title: "Korean Spicy Ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "17",
    title: "Roasted Vegetable Medley",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "18",
    title: "Classic Caesar Salad",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "19",
    title: "Buffalo Chicken Wings",
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "20",
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "21",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "22",
    title: "Greek Gyro Wrap",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "23",
    title: "Spicy Szechuan Noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "24",
    title: "Fresh Fruit Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "25",
    title: "Grilled Steak with Chimichurri",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "26",
    title: "Spicy Shrimp Pad Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "27",
    title: "Classic Club Sandwich",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "28",
    title: "Baked Ziti with Cheese",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
  {
    id: "29",
    title: "Jalapeño Poppers",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop",
    isSpicy: true,
    isFavorite: false,
  },
  {
    id: "30",
    title: "Blueberry Pancake Stack",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop",
    isSpicy: false,
    isFavorite: false,
  },
];
