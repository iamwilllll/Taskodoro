/**
 * Handles theme switching and persistence in localStorage
 *
 * This module provides functionality to:
 * 1. Apply the saved theme when the DOM is loaded
 * 2. Change the current theme and save the preference
 * 3. Persist theme selection across page refreshes
 */

// Apply saved theme when document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the stored theme from localStorage, default to 'light' if not set
    const currentTheme = window.localStorage.getItem('theme') || 'light';

    // Set the theme attribute on the document element
    document.documentElement.dataset.theme = currentTheme;
});

/**
 * Changes the current theme and saves the preference
 * @param {Event} event - The event object from the triggering element
 */
const changeTheme = event => {
    // Get the new theme value from the event target (typically a select input)
    const newTheme = event.target.value;

    // Apply the new theme to the document element
    document.documentElement.dataset.theme = newTheme;

    // Persist the theme choice in localStorage
    window.localStorage.setItem('theme', newTheme);
};

// Export the changeTheme function as default
export default changeTheme;
