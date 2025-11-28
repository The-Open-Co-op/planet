// Simple script to generate OG image
// This creates a placeholder - in production you'd use a proper image generation service

const fs = require('fs');
const path = require('path');

// Create a simple SVG that can be used as OG image
const svgContent = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1976d2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1565c0;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad)"/>
  
  <!-- Logo placeholder -->
  <rect x="560" y="180" width="80" height="80" rx="16" fill="rgba(255,255,255,0.2)"/>
  <text x="600" y="235" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">🌐</text>
  
  <!-- Title -->
  <text x="600" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">Personal Network Manager</text>
  
  <!-- Tagline -->
  <text x="600" y="370" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="24">Build and manage your professional network with ease</text>
  
  <!-- Features -->
  <g transform="translate(300, 430)">
    <text x="0" y="0" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="18">📊 LinkedIn Integration</text>
    <text x="250" y="0" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="18">👥 Contact Management</text>
    <text x="500" y="0" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="18">📱 QR Invitations</text>
  </g>
  
  <!-- URL -->
  <text x="600" y="550" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" font-size="16">nao-pnm-ui.pages.dev</text>
</svg>
`;

// Write the SVG file
fs.writeFileSync(path.join(__dirname, '../public/og-image.svg'), svgContent);

console.log('OG image generated successfully!');
console.log('Note: For production, convert this SVG to PNG for better social media compatibility');