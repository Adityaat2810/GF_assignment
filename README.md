# 🌐 Globetrotter Unsplash Search Application

## 📸 Project Overview

A sophisticated, responsive, and interactive search application built with Vue.3, Vuex, and Tailwind CSS, leveraging the Unsplash API to provide a seamless image search experience.


## ✨ Features

### 🔍 Advanced Search Capabilities
- Real-time search with Unsplash API integration
- Infinite scroll pagination
- Dynamic result rendering
- Detailed image result information

### 🎨 User Experience
- Dark and Light mode toggle
- Responsive design
- Smooth animations and transitions
- Intuitive UI/UX

### 🛠 Technical Highlights
- Vue.js 3 with Composition API
- Vuex for state management
- Tailwind CSS for styling
- Lucide icons
- Fully responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo_url>
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the project root:
```
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_access_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```



## 🎯 Key Components

### SearchBar
- Real-time search input
- Filter toggle
- Clear search functionality

### SearchResultItem
- Expandable result card
- Detailed image metadata
- Smooth expand/collapse animations

### State Management
- Vuex store for managing:
  - Search query
  - Search results
  - Loading state
  - Pagination


## 📞 Contact

Your Name - adityasainics10@gmail.com

Project Link: [https://github.com/Adityaat2810/GF_assignment](https://github.com/Adityaat2810/GF_assignment)

# ImageQuest: Performance Optimization and Scalability

## Performance Optimization Strategies

### 1. State Management Refinement
- Use lazy loading and code splitting to reduce initial bundle size
- Leverage Vue's `computed` properties and `watch` for reactive, performant updates

### 2. API and Network Optimization
- Add request debouncing and throttling to minimize unnecessary API calls
- Implement client-side caching using `localStorage` or in-memory caching
- Create robust error handling with automatic retry mechanisms for network requests

### 3. Image Loading Techniques
- Implement progressive image loading with low-resolution placeholders
- Use `IntersectionObserver` for efficient lazy loading of images
- Add WebP and next-gen image format support for faster load times

### 4. Scalable Frontend Architecture
- Break down monolithic components into smaller, reusable Vue components
- Implement TypeScript for improved type safety and developer experience


### 6. Optimization Techniques
- Use `v-once` and `keep-alive` for static or infrequently changing components
- Implement memoization for expensive computations
- Minimize DOM manipulations and optimize render cycles

### 7. Advanced Scaling Considerations
- Consider server-side rendering (SSR) for improved initial load performance
- Implement a backend proxy for API rate limiting and caching