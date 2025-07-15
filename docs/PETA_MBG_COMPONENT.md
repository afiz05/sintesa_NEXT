# Peta MBG Component Documentation

## Overview

The `PetaMbg` component is an interactive Indonesian map visualization for the "Makan Bergizi" (MBG) program distribution. It uses Google Maps to display province-wise data with filtering and zoom capabilities.

## Features

- **Interactive Indonesian Map**: Full map of Indonesia with Google Maps
- **Province Filter**: Dropdown to select and zoom to specific provinces
- **Data Visualization**: Displays MBG program statistics for each province
- **Info Windows**: Click on markers to see detailed information
- **Performance Indicators**: Color-coded performance based on percentage
- **Reset View**: Return to national view

## Setup Instructions

### 1. Install Dependencies

The following dependencies are already installed:

- `@react-google-maps/api`
- `@types/google.maps`

### 2. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the "Maps JavaScript API"
4. Create an API key
5. Add the API key to your `.env` file:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. API Key Restrictions (Recommended)

- Restrict your API key to your domain for security
- Enable only necessary APIs (Maps JavaScript API)

## Component Usage

```tsx
import { PetaMbg } from "./components/mbg/dashboard-mbg/peta-mbg";

export default function Dashboard() {
  return (
    <div>
      <PetaMbg />
    </div>
  );
}
```

## Data Structure

The component uses data from `data/indonesia-provinces.ts` which includes:

- Province coordinates
- Zoom levels for each province
- MBG program data (total, realization, percentage)

## Features Breakdown

### Province Selection

- Use the dropdown to filter by province
- Map automatically pans and zooms to selected province
- Shows province-specific data in the header

### Markers and Info Windows

- Each province has a marker on the map
- Click markers to see detailed information
- Info windows show total programs, realization, and performance percentage

### Performance Color Coding

- **Green (Success)**: ≥85% performance
- **Yellow (Warning)**: 80-84% performance
- **Red (Danger)**: <80% performance

### Reset Functionality

- "Reset" button returns to national view
- Clears province selection and info windows

## Customization

### Adding New Provinces

Edit `data/indonesia-provinces.ts` to add new provinces:

```typescript
{
  id: "new_province",
  name: "New Province Name",
  coordinates: { lat: -6.200000, lng: 106.816666 },
  zoom: 8,
  mbgData: { totalProgram: 1000, realisasi: 800, persentase: 80.0 }
}
```

### Updating Performance Thresholds

Modify the `getPerformanceColor` function in the component:

```typescript
const getPerformanceColor = (percentage: number) => {
  if (percentage >= 90) return "success"; // Changed from 85
  if (percentage >= 75) return "warning"; // Changed from 80
  return "danger";
};
```

## API Usage Limits

- Google Maps free tier: $200/month credit
- Approximately 28,000 map loads per month
- Monitor usage in Google Cloud Console

## Troubleshooting

### Map Not Loading

1. Check if API key is correctly set in `.env`
2. Verify API key has Maps JavaScript API enabled
3. Check browser console for API errors

### Markers Not Appearing

1. Verify province data in `indonesia-provinces.ts`
2. Check coordinate format (lat/lng)
3. Ensure zoom levels are appropriate

### Performance Issues

1. Limit the number of markers if needed
2. Implement marker clustering for better performance
3. Use map bounds to load only visible markers

## File Structure

```
components/mbg/dashboard-mbg/
├── peta-mbg.tsx              # Main component
data/
├── indonesia-provinces.ts     # Province data
.env                          # Environment variables
```
