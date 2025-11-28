# Feature Flag Testing

## Default Mode (Mock Data)
- URL: `http://localhost:5173/`
- Expected: App loads directly without NextGraph login
- Features: Uses mock JSON data from `/public/contacts.json`
- No logout button shown in Account page

## NextGraph Mode  
- URL: `http://localhost:5173/?nextgraph=true`
- Expected: Shows NextGraph login screen initially
- Features: Uses LDO and NextGraph auth system
- Logout button shown in Account page

## Implementation Details
- Feature flag detected via URL parameter `nextgraph=true`
- Utility: `/src/utils/featureFlags.ts`
- Main conditional logic in `/src/App.tsx`
- Account page conditionally shows logout in NextGraph mode only