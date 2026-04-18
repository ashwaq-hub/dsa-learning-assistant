# DSA Learning Assistant

A modern, interactive web application for learning and practicing Data Structures and Algorithms (DSA). Built with Next.js and React, this learning assistant provides an intuitive interface for mastering fundamental computer science concepts.

## 🎯 Overview

The DSA Learning Assistant is designed to help students, developers, and programming enthusiasts understand core data structures and algorithms through interactive lessons, visualizations, and practice problems.

**Key Features:**
- Interactive DSA tutorials and lessons
- Visual algorithm demonstrations
- Code examples and explanations
- Practice problems with solutions
- Progress tracking and assessments
- Clean, modern UI with responsive design

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.2.2
- **UI Library**: [React](https://react.dev/) 18.3.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.4.0
- **Icons**: [Lucide React](https://lucide.dev/) 0.400.0
- **Styling**: CSS (extensible for Tailwind/Styled Components)
- **Node**: 20.12.0+

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.17 or later
- **npm** 9.0+ or **yarn** 3.0+
- **Git** 2.0+

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dsa-learning-assistant.git
cd dsa-learning-assistant
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
dsa-learning-assistant/
├── src/                          # Source code directory
│   ├── pages/                    # Next.js pages
│   ├── components/               # Reusable React components
│   ├── styles/                   # CSS/styling files
│   └── utils/                    # Utility functions and helpers
├── public/                       # Static assets (images, fonts, etc.)
├── resources/                    # Learning resources and content
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 📝 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot-module reloading.

### Production Build

```bash
npm run build
```
Creates an optimized production build.

### Start Production Server

```bash
npm start
```
Runs the production server (requires `npm run build` first).

### Linting

```bash
npm run lint
```
Runs ESLint to check code quality and style compliance.

## 🔧 Configuration

### TypeScript Configuration
TypeScript settings are configured in `tsconfig.json`. Adjust paths and compiler options as needed.

### Next.js Configuration
Next.js settings are in `next.config.js`. React Strict Mode is enabled for development.

### Environment Variables
Create a `.env.local` file in the project root for environment-specific variables:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🌐 Deployment

This project is configured for deployment on [Vercel](https://vercel.com).

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Import the repository
4. Follow the setup wizard
5. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 📦 Dependencies

### Runtime
- **next** (16.2.2) - React framework for production
- **react** (18.3.0) - UI library
- **react-dom** (18.3.0) - React DOM rendering
- **lucide-react** (0.400.0) - Modern icon library

### Development
- **typescript** (5.4.0) - Static typing
- **@types/react** (18.3.0) - Type definitions for React
- **@types/react-dom** (18.3.0) - Type definitions for React DOM
- **@types/node** (20.12.0) - Type definitions for Node.js

## 🎨 Styling

The project is ready to integrate CSS frameworks. Consider adding:

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Styled Components](https://styled-components.com/) - CSS-in-JS
- [Material-UI](https://mui.com/) - Component library

## 🧪 Testing

(Add testing framework and information when implemented)

To add testing support:

```bash
npm install --save-dev jest @testing-library/react
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learning Resources

### Data Structures
- Arrays, Linked Lists, Stacks, Queues
- Trees (Binary, BST, AVL)
- Hash Tables, Graphs
- Heaps, Tries

### Algorithms
- Sorting (Bubble, Quick, Merge, Heap)
- Searching (Linear, Binary)
- Graph Algorithms (BFS, DFS, Dijkstra)
- Dynamic Programming
- Greedy Algorithms

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Keep components small and focused
- Add comments for complex logic
- Run `npm run lint` before committing

## 📄 License

This project is private. All rights reserved.

## 👨‍💻 Author

Created as a learning and educational project.

## 📧 Contact & Support

For questions, issues, or suggestions, please:
- Open an [Issue](https://github.com/yourusername/dsa-learning-assistant/issues)
- Create a [Discussion](https://github.com/yourusername/dsa-learning-assistant/discussions)

## 🔐 Security

- Keep dependencies updated: `npm audit fix`
- Never commit `.env` files with secrets
- Review dependencies for vulnerabilities
- Use `.gitignore` to exclude sensitive files

## 🚦 Status

- ✅ Project initialized
- 🔄 Development in progress
- 🚀 Ready for contributions

---

**Last Updated**: 2026-04-17  
**Version**: 1.0.0
