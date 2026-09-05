# Recipe & Meal Discovery Application

A modern, high-performance mobile application built with **React Native (Expo SDK 54)** and **TypeScript**. SwifPay connects food enthusiasts and culinary creators with recipe discovery, meal planning, step-by-step cooking guides, and a dedicated creator management studio.

---

# web link [https://github.com/julfiker755/mise-kitchen-web]

## 📱 Project Overview

SwifPay is designed with a dual-experience ecosystem:
1. **User Mode (Food Lovers / Home Chefs)**: Discover popular recipes, filter by category/cuisine/time, save favorites, follow step-by-step cooking instructions with photos, read reviews, and explore creator profiles.
2. **Creator Mode (Culinary Creators / Chefs)**: Manage recipe publications, create and edit detailed recipes (with ingredients & instructions), and track performance through rich analytics dashboards (views, saves, list generation).

---

## 🚀 Key Features

### 🔐 1. Authentication & Security
- **Email & Password Authentication**: Formik + Yup schema-validated login and registration flows.
- **Password Recovery & OTP Verification**: Forgot password and multi-digit OTP verification support.
- **Persistent User State**: Fast, encrypted local storage with Zustand and AsyncStorage.

### 🍽️ 2. User Discovery & Experience
- **Interactive Home Screen**:
  - Greeting header with avatar and quick search.
  - Category horizontal carousel (Breakfast, Lunch, Dinner, Desserts, Healthy, etc.).
  - Popular recipe cards with quick-toggle favorite bookmarks.
  - Filter modal (Category, Cooking Time, Difficulty, Servings, Cuisine).
- **Comprehensive Recipe Details**:
  - Hero image with cooking time, calories, servings, and ratings.
  - Interactive ingredients checklist.
  - Step-by-step instructions with visual guides.
  - User reviews and rating submissions.
- **Explore & Search**:
  - Real-time search with debouncing and filter chips.
  - "See All" categorized recipe listings.
- **Bookmarks & Favorites**: Quick access to saved recipes for easy meal preparation.
- **Account & Settings**:
  - Profile customization and password management.
  - Role switcher (Switch seamlessly between User & Creator modes).
  - Notification management.
  - Secure confirmation dialogs for logout and account deletion.

### 👨‍🍳 3. Creator Portal & Management Studio
- **Creator Dashboard**:
  - **Overview Metrics**: Total recipes, total views, total saved bookmarks, and grocery lists generated.
  - **Performance Analytics**: Visual interactive charts showing view preferences and engagement trends.
  - **Top Hit Recipes**: Quick list of best-performing recipes.
- **Recipe Management & Publishing**:
  - **Recipe Store (Create)**: Form for recipe metadata, tags, serving sizes, cuisine, ingredients array, and multi-step instructions with image pickers.
  - **Recipe Edit**: Full CRUD capabilities for updating live recipe details.
  - **Recipe Analytics**: Granular view counts and user interaction metrics.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React Native (0.81.5)** | Core mobile application framework |
| **Expo (SDK ~54)** | Development tooling, native modules, and build system |
| **Expo Router (v6)** | File-based typed routing and deep-linking navigation |
| **TypeScript (~5.9)** | Strict type safety and autocompletion |
| **Tailwind CSS (`twrnc`)** | Utility-first styling with custom color palette |
| **Zustand** | Lightweight, scalable global state management |
| **AsyncStorage** | Local persistent storage for auth and preferences |
| **Formik & Yup** | Robust form state handling and schema validation |
| **Sonner Native** | Smooth, customizable toast notifications |
| **React Native Reanimated** | Fluid animations and interactive transitions |
| **Expo Vector Icons / Lucide / Feather** | Consistent icon set across the UI |
| **Expo Image & ImagePicker** | Optimized media rendering and image upload capability |

---

## 📂 Project Structure

```text
swif-pay/
├── app/                              # Expo Router file-based route system
│   ├── _layout.tsx                   # App Root Layout (Providers, Navigation Theme, Toaster)
│   ├── index.tsx                     # Welcome / Onboarding Screen
│   ├── (auth)/                       # Authentication Route Group
│   │   ├── login/index.tsx           # Login Screen
│   │   ├── register/index.tsx        # Registration Screen
│   │   ├── forgot-pass/index.tsx     # Forgot Password Screen
│   │   ├── otp/index.tsx             # OTP Verification Screen
│   │   └── reset-pass/index.tsx      # Reset Password Screen
│   ├── (tabs)/                       # User Mode Bottom Tab Navigation
│   │   ├── _layout.tsx               # Tab Bar Configuration
│   │   ├── home.tsx                  # Home Feed & Discovery
│   │   ├── favorite.tsx              # Bookmarked Recipes
│   │   └── account.tsx               # User Profile & Settings Gateway
│   ├── (common)/                     # Shared Application Screens
│   │   ├── all-recipes/index.tsx     # Full Recipe Catalog
│   │   ├── creator-profile/index.tsx # Public Creator Portfolio
│   │   ├── details/index.tsx         # Detailed Recipe View
│   │   ├── notification/index.tsx    # Notification Center
│   │   ├── review-list/index.tsx     # Customer Reviews & Ratings
│   │   ├── search/index.tsx          # Recipe Search Screen
│   │   └── settings/index.tsx        # Settings & Preferences
│   └── creator/                      # Creator Mode Ecosystem
│       ├── (tabs)/                   # Creator Tab Navigation
│       │   ├── _layout.tsx           # Creator Tab Bar
│       │   ├── index.tsx             # Creator Overview & Dashboard
│       │   ├── recipes.tsx           # Creator Recipe List Management
│       │   └── account.tsx           # Creator Profile Settings
│       ├── analysis/index.tsx        # Analytics Breakdown
│       ├── details/index.tsx         # Creator Recipe Detail View
│       ├── recipe-store/index.tsx    # Add New Recipe Screen
│       └── recipe-edit/index.tsx     # Edit Existing Recipe Screen
│
├── assets/                           # Static assets, fonts, icons, and branding images
├── components/                       # Modular UI Components
│   ├── common/                       # Feature-specific shared widgets (charts, stats grids)
│   ├── data/                         # Mock data, category definitions, and initial recipe lists
│   ├── modal/                        # Bottom sheets, confirmation dialogs, filter modals
│   ├── reuseable/                    # Reusable UI cards (RecipeCard, TopHitCard, MenuCard)
│   ├── schema/                       # Yup validation schemas for forms
│   └── ui/                           # Base UI kit (Button, FromInput, OTPInput, Badge, Heading)
│
├── hooks/                            # Custom React Hooks
│   ├── use-confirmation.ts           # Confirmation dialog hook
│   ├── useFromFields.tsx             # Formik helper hooks
│   └── useModalState.tsx             # Global modal toggle and state manager
│
├── icon/                             # Custom SVG icons and FavIcon components
├── utils/                            # Helper utilities (Insets, safe area calculations)
├── zustand/                          # Global state stores
│   └── useAuthStore.tsx              # Authenticated user store with AsyncStorage persistence
│
├── app.json                          # Expo configuration & permissions
├── tailwind.config.js                # Custom Tailwind design tokens & colors
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 🎨 Design System & Theming

The application utilizes an organic, appetizing color palette configured in `tailwind.config.js`:

- **Primary (`#5B7553`)**: Olive Sage Green — evokes freshness, organic ingredients, and calm readability.
- **Background (`#FAF7F2` / `#F9F7F2`)**: Warm Cream / Off-White — soft background enhancing food photography.
- **Secondary (`#333333`)**: Charcoal — high-contrast text for optimal typography.
- **Accents**: Soft Amber, Terracotta, and subtle border pastels.

---

## 🏁 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js (v18 or newer)](https://nodejs.org/)
- [Bun](https://bun.sh/) or `npm` / `yarn`
- [Expo Go App](https://expo.dev/go) on your physical Android / iOS device OR an Android Studio Emulator / iOS Simulator.

### 1. Installation
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd swif-pay

# Install dependencies using npm or bun
npm install
# or
bun install
```

### 2. Running the Development Server
Start the Expo development server:

```bash
# Start Expo bundler
npm start
# or
npx expo start
```

### 3. Run on Target Platform
- **Android Device / Emulator**: Press `a` in the terminal or run `npm run android`
- **iOS Simulator (macOS only)**: Press `i` in the terminal or run `npm run ios`
- **Web Browser**: Press `w` in the terminal or run `npm run web`

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Starts the Expo development server |
| `npm run android` | Starts local Android build and runs on connected device/emulator |
| `npm run ios` | Starts local iOS build and runs on iOS simulator |
| `npm run web` | Launches the app in the browser for web preview |
| `npm run lint` | Checks code formatting and linter rules |
| `npm run prebuild` | Generates native `android` and `ios` directories |

---

## 🔒 State Management & Data Flow

- **Auth Store (`zustand/useAuthStore.tsx`)**: Manages the currently logged-in user profile, role, session status, and syncs automatically with persistent storage (`AsyncStorage`).
- **Modal Hook (`hooks/useModalState.tsx`)**: Manages dynamic modal states (filter bottom sheets, review sheets) cleanly across screens.
- **Confirmation Provider (`components/modal/confirm-dialog.tsx`)**: App-wide provider for interactive confirmation popups (e.g., Delete Recipe, Logout, Discard Draft).

---

## 🤝 Contributing

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.
