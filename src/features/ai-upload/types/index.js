/**
 * JSDoc Type Specifications representing the AI Menu Extractor structure.
 * This guarantees type transparency and clean integration for FastAPI.
 */

/**
 * @typedef {Object} MenuItem
 * @property {string|number} id - Unique product identifier
 * @property {string} name - Product display title
 * @property {number} price - Base price value
 * @property {string} description - Product ingredients or brewing details
 * @property {boolean} veg - True if product is vegetarian
 * @property {boolean} available - Stock status toggle
 * @property {string} [image] - Optional product preview url
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} name - Category classification group name
 * @property {MenuItem[]} items - List of products belonging to this category
 */

/**
 * @typedef {Object} ExtractedMenu
 * @property {string} shopName - Restaurant or cafe outlet name
 * @property {MenuCategory[]} categories - List of categorized items
 */

/**
 * @typedef {Object} AIFile
 * @property {string} id - Unique file uuid
 * @property {File} file - Native File object
 * @property {string} name - Filename
 * @property {number} size - File size in bytes
 * @property {number} progress - Upload speed percentage (0-100)
 * @property {"idle" | "uploading" | "failed" | "completed"} status - File state indicator
 * @property {string} [error] - Error details if upload fails
 */

export const TypesPlaceholder = {};
