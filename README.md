# Eat 🍴

Plan, shop, and cook effortlessly!

**Eat** is an app designed to help you create your weekly menu, buy ingredients, and cook your meals—all in one place.

## Features

- **Random Meal Suggestions**: Add random meals to your weekly menu.
- **Meal Planning**: Assign meals to specific days of the week.
- **Detailed Meal View**: See the ingredients and instructions for each meal aswell as video instructions.
- **Shopping List**: Add meal ingredients to your shopping list with a tap for easy shopping.

## Get Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and npm installed.

### Installation

1. Clone the Repository:

```bash
   git clone https://github.com/jRydell/Eat.git
   cd Eat
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npx expo start
```

## Run on Your Device or Emulator

- Press a to open the app on Android.
- Press i to open the app on iOS.
- Press w to open the app on the web.

## Usage

- **Add Meals:** Tap the button to add a random meal to your planner.
- **Plan Your Week:** Assign meals to specific days by tapping the weekday selector.
- **View Details:** Tap on a meal to see its ingredients and instructions.
- **Create a Shopping List:** Tap Add ingredients to ingredients to your shoppinglist.
- **Manage Meals:** Swipe left to delete a meal from your menu.
- **Manage Shoppinglist:** Tap remove to delete ingredients from the shopping list.

## Tech Stack

- **Framework:** React Native (via Expo)
- **Navigation:** Expo router
- **State Management:** Zustand
- **Storage:** AsyncStorage for local storage
- **API:** TheMealDB for meal data
- **Language:** TypeScript

## Contributing

Contributions are welcome! Follow these steps to contribute:

### Fork the repository.

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Commit your changes:

```bash
git commit -m 'Add your message'
```

3. Push the branch:

```bash
git push origin feature/your-feature-name
```

4. **Open a Pull Request.**

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- Expo for simplifying React Native development.
- TheMealDB API for providing meal data.
