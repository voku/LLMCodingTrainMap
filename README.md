# The LLM Transit Authority

<div align="center">
  <img width="1200" height="475" alt="LLM Transit Authority" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

> A pragmatic guide to using LLMs for coding, visualized as an interactive metro map system.

[**🚇 View Live Demo**](https://voku.github.io/LLMCodingTrainMap/)

## Overview

The LLM Transit Authority is an interactive web application that guides developers through different approaches to using Large Language Models (LLMs) for coding tasks. Navigate through a subway-style map to explore various strategies, techniques, and best practices.

## Features

- **Interactive Transit Map**: Click on stations to learn about different LLM coding techniques
- **Multiple Learning Paths**: Different "lines" represent different approaches (Foundation, Lane A, Lane B)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progressive Learning**: Start from basics and progress through advanced concepts

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voku/LLMCodingTrainMap.git
   cd LLMCodingTrainMap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Key Files Detector Helper Prompt

When working with LLMs on this codebase or similar projects, use this prompt to help identify the most important files:

```
I need help understanding this codebase. Please analyze the project structure and identify:

1. **Core Application Files**: Main entry points and app structure files
2. **Data/Content Files**: Files containing the primary content or data
3. **Component Files**: Reusable UI components
4. **Configuration Files**: Build, deployment, and tool configuration
5. **Type Definitions**: TypeScript interfaces and types

For each category, list the files and provide a brief description of what they do and how they interact.

Focus on files that would be most important to understand or modify for:
- Adding new content or features
- Changing the UI/UX
- Deploying or configuring the application
- Understanding the data structure
```

## Project Structure

```
LLMCodingTrainMap/
├── components/          # React components
│   ├── TransitMap.tsx  # Main interactive map component
│   └── ContentDrawer.tsx # Side panel for station content
├── data.tsx            # All station and line data
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.html          # HTML entry point
├── index.tsx           # React entry point
└── vite.config.ts      # Build configuration
```

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

Visit the [GitHub repository](https://github.com/voku/LLMCodingTrainMap) to contribute.

## License

This project is open source and available under the MIT License.

## Acknowledgments

Created to help developers effectively leverage LLMs in their coding workflow.
