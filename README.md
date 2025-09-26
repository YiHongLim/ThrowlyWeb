# ThrowlyWeb

Throwly is a sustainable, AI-inspired local marketplace that replaces money with a points-based barter system. This repository contains React web application that powers the Throwly experience and directs user to the Throwly app. This guide will help you get started locally.

### What is Throwly?

- **AI Pricing Engine**: Users upload an item (e.g., a bike, shoes, electronics). Throwly’s AI assigns a point value based on images, descriptions, and location.
- **Points Economy**: Trade using Throwly Points instead of cash.
- **Stack & Redeem**: Earn points by giving away items; stack them for higher‑value trades or redeem at partner thrift stores.
- **Community Engagement**: A leaderboard (Duolingo‑style) rewards top donors and helpers.
- **Requests**: Ask the community for items you need.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository**
git clone https://github.com/YiHongLim/ThrowlyWeb.git
cd ThrowlyWeb

2. **Install dependencies**
- Using npm:
  ```
  npm install
  ```
- Or with yarn:
  ```
  yarn install
  ```

3. **Start the development server**
- Using npm:
  ```
  npm start
  ```
- Or with yarn:
  ```
  yarn start
  ```
- The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production
npm run build

or
yarn build

- Your production files will be in the `build/` directory.

## Project Structure
src/
components/
pages/
App.js
index.js
public/
index.html

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)
