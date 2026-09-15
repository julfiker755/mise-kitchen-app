# 🍲 Mise Kitchen - Recipe & Meal Discovery Application

A modern, high-performance mobile application built with **React Native (Expo SDK 54)** and **TypeScript**. Mise Kitchen connects food enthusiasts and culinary creators with recipe discovery, meal planning, step-by-step cooking guides, and a dedicated creator management studio.

---

# web link [https://github.com/julfiker755/mise-kitchen-web]

## 📖 Executive Summary & Project Analysis

**Mise Kitchen** (`mise-kitchen`) is built from the ground up using **React Native 0.81**, **Expo SDK 54**, and **TypeScript**. It bridges the gap between everyday home cooking and digital culinary creation through a dual-experience interface:

1. **Food Enthusiasts & Home Chefs**: An intuitive, visually rich discovery hub featuring curated recipes, comprehensive nutrition & cooking metrics, category carousels, multi-criteria filtering, and step-by-step interactive cooking guides.
2. **Culinary Creators & Chefs**: A dedicated Creator Studio providing end-to-end recipe authoring (ingredients, step guides, media), detailed engagement analytics (views, saves, grocery lists generated), and catalog management.

The app is engineered with **Expo Router v6** for typed, file-based routing and deep-linking, **Zustand** + **AsyncStorage** for persistent state management, and an organic culinary design system styled with Tailwind CSS (`twrnc`).

---

## 🚀 Key Features

### 🔐 1. Authentication & Security
- **Email & Password Authentication**: Validated with **Formik** and strict **Yup** schemas.
- **Two-Step Password Recovery**: Integrated Forgot Password workflow with multi-cell OTP verification (`otp/index.tsx`) and password reset confirmation.
- **Persistent Session State**: Zustand-powered authentication store (`useAuthStore`) seamlessly synchronized with encrypted `AsyncStorage`.
- **User vs Creator Role Switching**: Instant role toggling allowing accounts to access either consumer browsing or creator publishing workflows.

### 🥗 2. User Discovery & Cooking Companion
- **Personalized Feed & Discovery**:
  - Time-aware user greetings and profile quick access.
  - Multi-category horizontal scroll (Breakfast, Lunch, Dinner, Desserts, Healthy Bites, Quick Meals).
  - Popular recipe cards with quick-toggle favorite bookmarking.
- **Smart Filter Modal**:
  - Filter by cooking time, difficulty level (Easy, Medium, Hard), serving size, meal category, and international cuisines.
- **Interactive Recipe Detail View**:
  - High-resolution hero image header with cooking duration, calorie count, servings, and aggregated rating.
  - Interactive ingredients checklist for kitchen prep.
  - Step-by-step numbered cooking instructions with visual demonstrations.
  - Creator attribution with direct navigation to the creator's portfolio.
- **Community Ratings & Reviews**:
  - Review feed showing authentic user experiences, ratings breakdown, and feedback submission.
- **Bookmarks & Favorites**:
  - Offline-ready saved recipes list for easy meal prep.
- **Search Engine**:
  - Real-time search with instant filtering and keyword categorization.

### 👨‍🍳 3. Creator Management Studio
- **Creator Dashboard & Analytics**:
  - **KPI Metrics**: Total recipe count, total impressions/views, bookmark saves, and grocery lists generated.
  - **Performance Charts**: Visual analytics (`components/common/creator/chart.tsx`) detailing weekly view trends and engagement.
  - **Top Hit Recipes**: Real-time ranking of best-performing recipes.
- **Recipe Authoring Suite (`recipe-store`)**:
  - **Metadata & Details**: Title, description, cooking time, calorie estimates, difficulty, and cuisine tags.
  - **Media Uploads**: Built-in photo picker (`expo-image-picker`) with cropping tools.
  - **Dynamic Ingredients Builder**: Add, edit, reorder, and remove ingredients with units and quantities.
  - **Step-by-Step Instruction Creator**: Create modular steps with individual descriptions and step photo attachments.
- **Catalog Management & Editing**:
  - Full CRUD lifecycle (Create, Read, Update, Delete) with interactive confirmation dialogs to prevent accidental loss.

---

## 🎨 Architecture & Design System

### The "Mise" Visual Philosophy
The application adheres to an earthy, organic culinary palette that keeps food photography at the center of attention:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary (Olive Sage)** | `#5B7553` | Brand accent, primary action buttons, active navigation indicators |
| **Background (Warm Cream)** | `#FAF7F2` | Gentle, warm canvas that enhances food images without eye strain |
| **Text Primary (Charcoal)** | `#333333` | High-contrast typography for readability in bright kitchen environments |
| **Muted Text (Slate Grey)** | `#7A7A7A` | Secondary descriptions, timestamps, and metadata |
| **Card / Surface** | `#FFFFFF` | Elevated card surfaces with soft border contrasts |
| **Accent / Badge** | `#E6F4FE` / `#FFF3E0` | Category chips and status highlights |

### Core Technology Stack

```
Mise Kitchen Mobile App
├── Core Framework: React Native 0.81.5 + Expo SDK 54
├── Navigation: Expo Router v6 (File-based Typed Routing)
├── Languages: TypeScript ~5.9.2
├── Styling: twrnc (Tailwind CSS for React Native)
├── Global State: Zustand v5 + AsyncStorage
├── Forms & Validation: Formik + Yup
├── UI Feedback: Sonner Native (Modern Toast notifications)
├── Gestures & Motion: React Native Reanimated + Gesture Handler
└── Media & Assets: Expo Image + Expo Image Picker
```

---

## 📂 Project Structure

```text
mise-kitchen/
├── app/                                    # Expo Router application routes
│   ├── _layout.tsx                         # Root layout (Theme, Providers, Toasters)
│   ├── index.tsx                           # Onboarding / Splash discovery screen
│   ├── (auth)/                             # Authentication group
│   │   ├── login/index.tsx                 # User login screen
│   │   ├── register/index.tsx              # Account registration
│   │   ├── forgot-pass/index.tsx           # Password recovery request
│   │   ├── otp/index.tsx                   # Multi-input OTP verification
│   │   └── reset-pass/index.tsx            # New password setup
│   ├── (tabs)/                             # User mode tab navigation
│   │   ├── _layout.tsx                     # Bottom tab bar configuration
│   │   ├── home.tsx                        # Main recipe discovery feed
│   │   ├── favorite.tsx                    # Bookmarked & saved recipes
│   │   └── account.tsx                     # User profile, role switch & settings
│   ├── (common)/                           # Shared application screens
│   │   ├── all-recipes/index.tsx           # Complete recipe directory with filters
│   │   ├── creator-profile/index.tsx       # Public creator portfolio & recipes
│   │   ├── details/index.tsx               # In-depth recipe detail & cooking guide
│   │   ├── notification/index.tsx          # System & creator alerts
│   │   ├── review-list/index.tsx           # Recipe review listing & submission
│   │   ├── search/index.tsx                # Keyword & tag search screen
│   │   └── settings/index.tsx              # Account preferences & security
│   └── creator/                            # Creator studio ecosystem
│       ├── (tabs)/                         # Creator bottom tab navigation
│       │   ├── _layout.tsx                 # Creator tab bar
│       │   ├── index.tsx                   # Creator analytics dashboard
│       │   ├── recipes.tsx                 # Published recipes inventory
│       │   └── account.tsx                 # Creator account settings & switch
│       ├── analysis/index.tsx              # In-depth metric analytics
│       ├── details/index.tsx               # Creator view of recipe details
│       ├── recipe-store/index.tsx          # Recipe creation suite
│       └── recipe-edit/index.tsx           # Recipe editing & updates
│
├── assets/                                 # Static branding, logo, and illustration assets
├── components/                             # Reusable modular component library
│   ├── common/                             # Domain-specific components
│   │   ├── account/                        # Account cards, not-user states
│   │   ├── basic/                          # Recipe carousels, detailed cards
│   │   └── creator/                        # Analytics charts & recipe form suite
│   │       └── recipe-store/               # Step modals, ingredient managers, image pickers
│   ├── data/                               # Sample recipes, categories & mock definitions
│   ├── modal/                              # Bottom sheets, filter modals, confirmation dialogs
│   ├── reuseable/                          # RecipeCard, TopHitCard, MenuCard, BottomButton
│   ├── schema/                             # Yup validation schemas
│   └── ui/                                 # Base atoms (Button, FromInput, OTPInput, Badge)
│
├── hooks/                                  # Custom business logic hooks
│   ├── use-confirmation.ts                 # Confirmation dialog orchestrator
│   ├── useFromFields.tsx                   # Form input synchronization
│   └── useModalState.tsx                   # Generic modal controller
│
├── icon/                                   # SVG icon primitives & brand icons
├── types/                                  # TypeScript interface declarations
├── utils/                                  # SafeArea helpers, polyfills, formatters
├── zustand/                                # Persistent Zustand state stores
│   └── useAuthStore.tsx                    # User credentials, auth status & role management
├── app.json                                # Expo application manifest & permissions
└── package.json                            # Project dependencies and run scripts
```

---

## 🧭 Route Navigation Breakdown

Mise Kitchen leverages **Expo Router v6** for organized, typed file-based navigation. Routes are logically partitioned into route groups:

| Route URI | Purpose | Access Role |
| :--- | :--- | :--- |
| `/` | Landing / Onboarding screen with quick call-to-action | Public |
| `/(auth)/login` | Email & password login | Public / Guest |
| `/(auth)/register` | New account registration | Public / Guest |
| `/(auth)/forgot-pass` | Request OTP for password recovery | Public / Guest |
| `/(auth)/otp` | 4-6 digit OTP code confirmation | Public / Guest |
| `/(auth)/reset-pass` | Create new password | Public / Guest |
| `/(tabs)/home` | Primary recipe feed, carousels & search bar | User Mode |
| `/(tabs)/favorite` | Saved bookmark collection | User Mode |
| `/(tabs)/account` | User profile, preferences, mode switcher | User Mode |
| `/(common)/details` | Full recipe details (ingredients, cooking steps, metrics) | All Users |
| `/(common)/search` | Real-time search by name, tag, or ingredient | All Users |
| `/(common)/all-recipes`| Grid catalog with category filtering | All Users |
| `/(common)/creator-profile`| Public chef/creator profile & their public recipes | All Users |
| `/(common)/review-list`| User reviews, ratings, and feedback form | All Users |
| `/creator` | Creator studio dashboard & analytics summary | Creator Mode |
| `/creator/recipes` | Manage published and draft recipes | Creator Mode |
| `/creator/recipe-store`| Multi-step recipe creation workflow | Creator Mode |
| `/creator/recipe-edit` | Update existing recipe contents | Creator Mode |
| `/creator/analysis` | Comprehensive engagement charts & metrics | Creator Mode |

---

## ⚡ State Management & Reliability

### Authentication Store (`zustand/useAuthStore.tsx`)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'creator';
  avatar?: string;
}
```
- Automatically persists session state in `AsyncStorage`.
- Handles user login, logout, profile updates, and active role switching (`user` ↔ `creator`).

### Dynamic Dialog System (`components/modal/confirm-dialog.tsx`)
- Provides a centralized confirmation dialog service across all screens.
- Used for destructive or irreversible actions:
  - Deleting a recipe from the creator inventory.
  - Logging out of the active account.
  - Discarding unsaved changes in the recipe builder.

---

## 🏁 Getting Started

### Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js**: Version `18.x` or `20.x` LTS ([Download](https://nodejs.org/))
- **Package Manager**: `npm`, `yarn`, or [Bun](https://bun.sh/)
- **Expo Go App**: Install on your Android or iOS device from Google Play or Apple App Store.
- *(Optional)* **Android Studio** for local Android Virtual Device (AVD) emulation, or **Xcode** on macOS for iOS simulator.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/julfiker755/swif-pay.git mise-kitchen

# Enter the project directory
cd mise-kitchen

# Install dependencies using Bun or npm
bun install
# or
npm install
```

### 2. Start the Development Server
```bash
# Start the Expo development bundler
npx expo start
```

### 3. Run on Your Device or Emulator
Once Metro Bundler starts:
- **Android Device / Emulator**: Press `a` in the terminal or run:
  ```bash
  npm run android
  ```
- **iOS Simulator (macOS)**: Press `i` in the terminal or run:
  ```bash
  npm run ios
  ```
- **Physical Device**: Scan the QR code displayed in the terminal using the **Expo Go** app (Android) or Camera app (iOS).
- **Web Browser**: Press `w` in the terminal or run:
  ```bash
  npm run web
  ```

---

## 🛠️ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm start` | Launches Metro bundler via Expo |
| `npm run android` | Builds and launches the app on Android emulator/device |
| `npm run ios` | Builds and launches the app on iOS simulator |
| `npm run web` | Starts web-compatible development server |
| `npm run lint` | Runs ESLint analysis for code quality |
| `npm run prebuild` | Generates native `android/` and `ios/` folders |

---

## 🗺️ Roadmap & Upcoming Features

- [ ] **AI Recipe Assistant**: Scan pantry ingredients using the device camera to instantly suggest recipes.
- [ ] **Interactive Grocery List Export**: Export missing ingredients directly into digital grocery baskets.
- [ ] **Video Recipe Feeds**: Short-form culinary preparation clips for creators.
- [ ] **Dark Mode Support**: Full system-adaptive dark palette for night-time kitchen cooking.
- [ ] **Meal Planner Calendar**: Weekly scheduled meal planning with nutritional breakdown.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Mise Kitchen:

1. Fork the Project repository.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/CulinaryFeature
   ```
3. Commit your Changes:
   ```bash
   git commit -m "feat: add interactive timer component"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/CulinaryFeature
   ```
5. Open a Pull Request.

---

## 📄 License

This project is private and proprietary. All rights reserved.  
Developed with ❤️ for culinary lovers by the **Mise Kitchen** team.
