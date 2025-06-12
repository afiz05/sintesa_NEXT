# Modular Form Components - Belanja Inquiry Data

This folder contains modular form components for the Belanja inquiry data feature. Each form component is designed to be reusable and maintainable.

## Structure

```
forms/
├── index.tsx               # Export all form components
├── KementerianForm.tsx     # Kementerian form component
├── EselonIForm.tsx         # Eselon I form component
└── SatkerForm.tsx          # Satker form component
```

## Components

### KementerianForm

**File:** `KementerianForm.tsx`
**Purpose:** Handles Kementerian (Ministry) selection with search, filtering, and display options.

**Key Features:**

- Searchable dropdown with multi-select functionality
- Condition and keyword input fields
- Display format selection (Kode, Kode Uraian, Uraian, Jangan Tampilkan)
- Performance information display
- Selected items management with chips
- "Select All" functionality

### EselonIForm

**File:** `EselonIForm.tsx`
**Purpose:** Handles Eselon I selection with dependency on Kementerian selection.

**Key Features:**

- Dependent on Kementerian selection (disabled when no Kementerian selected)
- Searchable dropdown with multi-select functionality
- Condition and keyword input fields
- Display format selection
- Performance information display
- Selected items management with chips
- Dynamic label display based on Kementerian selection

### SatkerForm

**File:** `SatkerForm.tsx`
**Purpose:** Handles Satker (Work Unit) selection with advanced filtering and performance optimization.

**Key Features:**

- Large dataset handling with limited display optimization
- Searchable dropdown with multi-select functionality
- Condition and keyword input fields
- Display format selection
- Performance information display
- Selected items management with chips
- Dynamic help text for better UX

## Usage

Import the components from the forms directory:

```tsx
import { KementerianForm, EselonIForm, SatkerForm } from "./forms";
```

Each component requires specific props to function properly. See the individual component files for detailed prop interfaces.

## Design Patterns

1. **Consistent Interface**: All form components follow the same pattern for props and state management
2. **Color Coding**: Each form has its own color scheme for better visual distinction
   - Kementerian: Green theme
   - Eselon I: Orange theme
   - Satker: Purple theme
3. **Performance Optimization**: Components include performance information displays
4. **Accessibility**: All components include proper ARIA labels and keyboard navigation
5. **Responsive Design**: Components use CSS Grid with responsive breakpoints

## Future Extensions

To add more form components:

1. Create a new component file following the naming pattern `[FormName]Form.tsx`
2. Follow the same prop interface pattern as existing components
3. Use consistent UI patterns and color themes
4. Export the component in `index.tsx`
5. Add the component to this documentation

## Dependencies

- **@heroui/react**: UI component library
- **lucide-react**: Icon library
- **Parent form context**: Shared state and handlers from the main form component
