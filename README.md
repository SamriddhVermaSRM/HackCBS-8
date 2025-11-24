# ToObserve - AI-Powered Communication Training Platform

ToObserve is a web application designed to help users improve their communication skills through AI-powered analysis and feedback. The platform provides users with a series of training modules and lessons, and then uses machine learning to analyze their facial expressions and speech patterns to provide real-time feedback on their emotional engagement and communication effectiveness.

## Features

- **User Authentication:** Secure user authentication system with login and signup functionality.
- **Training Modules:** A variety of training modules and lessons to help users improve their communication skills.
- **AI-Powered Analysis:** Real-time analysis of user's facial expressions and speech patterns to provide feedback on their emotional engagement.
- **Interactive Dashboard:** A user-friendly dashboard to track progress and view detailed analysis of their performance.
- **Personalized Feedback:** Personalized feedback and recommendations to help users improve their communication skills.

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for building server-side rendered and static web applications.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
  - [Recharts](https://recharts.org/) - A composable charting library built on React components.
  - [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.
- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For building the backend API.
  - [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user data and training logs.
  - [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing user passwords.
  - [JSON Web Token](https://jwt.io/) - For securing API endpoints.
- **AI & Machine Learning:**
  - [Google Gemini](https://ai.google.dev/) - For analyzing user's speech patterns and providing feedback.
  - [Mediapipe](https://developers.google.com/mediapipe) - For real-time facial landmark detection and analysis.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SamriddhVermaSRM/HackCBS-8.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file in the root of your project and adding the following:
   ```
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   GEMINI_API_KEY="your_gemini_api_key"
   ```
4. Run the development server
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized as follows:

- `app/`: Contains the main application code, including pages, API routes, and global styles.
- `components/`: Contains reusable React components used throughout the application.
- `data/`: Contains static data used in the application, such as the training modules.
- `lib/`: Contains utility functions and helper modules, including the AI and MongoDB integration.
- `models/`: Contains the data models for the application.
- `prisma/`: Contains the Prisma schema and migration files.
- `public/`: Contains static assets, such as images and machine learning models.
- `types/`: Contains TypeScript type definitions.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
