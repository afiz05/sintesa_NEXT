# Belanja Test Page

## Overview

This test page allows you to test the new clean Belanja Inquiry Controller with various SQL queries and see paginated results.

## Features

- **Predefined Test Queries**: Ready-to-use queries for testing different scenarios
- **Custom SQL Input**: Write and execute your own SQL queries
- **Real-time Search**: Search within query results
- **Pagination**: Navigate through large result sets (100 records per page)
- **Performance Metrics**: See query execution time and result counts

## Available Test Queries

### 1. Simple Query - All Departments

Groups data by department showing total records, pagu, and realisasi.

### 2. Specific Department (001)

Shows detailed records for department 001 including satker breakdown.

### 3. Top 50 Satkers by Pagu

Displays satkers ordered by total pagu amount.

### 4. Monthly Summary

Shows departmental and unit summary with realization percentages.

## How to Use

1. **Navigate to the test page**: Go to `/test-belanja` or click "Belanja Test" in the sidebar
2. **Select a predefined query** or **write a custom SQL query**
3. **Click "Execute Query"** to run the query
4. **Use search** to filter results in real-time
5. **Navigate pages** using the pagination controls

## Backend Integration

The test page uses the clean `/inquiryBelanja` endpoint with:

- **Query-level pagination** (LIMIT/OFFSET)
- **100 rows per page** (matching the frontend component)
- **Search functionality** across searchable columns
- **Clean error handling** and response structure

## Database Tables

The system uses:

- `monev2025.pagu_real_detail_harian_2025` - Main budget data
- `dbref.t_dept_2023` - Department reference
- `dbref.t_satker_2025` - Satker reference
- `dbref.t_unit_2025` - Unit reference

## API Response Format

```json
{
  "success": true,
  "result": [...],
  "pagination": {
    "total": 12345,
    "totalPages": 124,
    "currentPage": 1,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "cache": false,
  "queryTime": "150ms",
  "message": "Page 1 loaded successfully"
}
```
