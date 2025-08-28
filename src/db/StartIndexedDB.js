// Import the custom error
import { indexedDBError } from '../utils/handleCustomErrors';

function createIndexedDB() {
    // Return a promise to resolve the data
    
    return new Promise((resolve, reject) => {
        // Check that it exists in the browser, if not, it sends an error
        if (!window.indexedDB) {
            console.log(new indexedDBError('IndexedDB is not available in your browser'));
            return;
        }

        // Make a request to "window" to create the indexedDB named "tasks"
        const request = window.indexedDB.open('tasks', 1);

        // If created correctly
        request.onsuccess = event => resolve(event.target.result);

        // If it is not created it throws this error
        request.onerror = () => reject(new indexedDBError('Failed to create indexedDB'));

        // If created, define the structure
        request.onupgradeneeded = () => request.result.createObjectStore('tasks', { keyPath: 'id' });
    });
}

async function initDB() {
    // wait for the function to execute and then return the result
    return await createIndexedDB();
}
// Export function
export default initDB;
