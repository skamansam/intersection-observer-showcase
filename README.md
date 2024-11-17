> This project was created using Windsurf IDE, the world's first agentic IDE, to demonstrate the capabilities of the IntersectionObserver API. Windsurf enables direct interaction with AI assistants while coding, making it easier to create and explain complex implementations like this showcase.

⚠️ **Disclaimer**: This codebase was generated entirely by AI. While efforts have been made to ensure quality and functionality, the code may contain errors, inefficiencies, or redundancies. Always review, understand, and test code before using it in your own projects, regardless of its source. This repository serves as a demonstration and learning resource rather than production-ready code.

# IntersectionObserver Showcase

A simple demonstration of the IntersectionObserver API with responsive navigation and dynamic content highlighting.

## Features

- Responsive design with desktop and mobile navigation
- Smooth scrolling to sections
- Dynamic menu highlighting based on visible sections
- Mobile-friendly slide-out menu
- Different section heights for visual interest
- Uses Tailwind CSS for styling (via CDN)

## Implementation Details

### 1. Navigation Menu Implementation

The navigation system demonstrates several key features:
- **Responsive Design:** Separate desktop and mobile menus with smooth transitions
- **Animated Underlines:** CSS-based animations using pseudo-elements and transitions
- **Single Active State:** Logic to ensure only one menu item is active at a time

### 2. CSS Animation Details

The animated underline effect is achieved through careful CSS implementation:

```css
.menu-item::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #2563eb;
    transition: width 0.3s ease-in-out;
}

.menu-item.active::after {
    width: 100%;
}
```

### 3. IntersectionObserver Configuration

The observer is configured with multiple thresholds for precise tracking:

```javascript
const observerOptions = {
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    rootMargin: '-20% 0px -20% 0px'
};
```

- **Multiple Thresholds:** Allow for more granular visibility tracking
- **Root Margin:** Creates a buffer zone for smoother transitions

### 4. Visibility Tracking System

A sophisticated tracking system ensures accurate menu highlighting:
- Uses Map to store visibility ratios for each section
- Compares intersection ratios to determine the most visible section
- Updates menu items based on the highest visibility ratio

Example visibility tracking:
```javascript
sectionVisibility.set(entry.target.id, {
    visible: entry.isIntersecting,
    ratio: entry.intersectionRatio
});
```

### 5. Mobile Optimization

Special considerations for mobile devices include:
- Slide-out menu with smooth transitions
- Adjusted underline positioning for touch targets
- Automatic menu closing after selection
- Responsive layout adjustments

## Running the Project

Simply open the `index.html` file in a modern web browser. No build steps or dependencies required!

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:
1. Triggers on pushes to the main branch
2. Uploads the project files as artifacts
3. Deploys to GitHub Pages

To enable GitHub Pages deployment:
1. Go to your repository settings
2. Navigate to the "Pages" section
3. Under "Source", select "GitHub Actions"

The site will be available at `https://[username].github.io/intersection-observer-showcase/`

## Browser Support

This demo works best in modern browsers that support the IntersectionObserver API, which includes:
- Chrome
- Firefox
- Safari
- Edge
