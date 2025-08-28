// Import function to create/initialize IndexedDB
import { indexedDBError } from '../utils/handleCustomErrors';
import initDB from './StartIndexedDB';

// Class that handles all the database operations for tasks
class taskCRUD {
    // Add a new task to the database
    create(task) {
        new Promise(async (resolve, reject) => {
            // Quick check to make sure we're not adding empty tasks
            for (const key in task) if (task[key] === '') return;

            // Get our database connection
            const db = await initDB();
            const store = db.transaction('tasks', 'readwrite').objectStore('tasks');

            // Try to add the task, handle errors if it fails
            resolve(store.add(task));
            reject(new indexedDBError('The task could not be created'));
        });
    }

    // Get all tasks from the database
    read() {
        return new Promise(async (resolve, reject) => {
            const db = await initDB();

            // Set up a read transaction and grab everything from the store
            const store = db.transaction('tasks', 'readonly').objectStore('tasks');
            const request = store.getAll();

            // Return the results or error out
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Update an existing task
    async edit(task) {
        new Promise(async (resolve, reject) => {
            const db = await initDB();
            const store = db.transaction('tasks', 'readwrite').objectStore('tasks');
            const request = store.put(task); // put() updates if exists, adds if not

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Remove a task by its ID
    async delete(id) {
        new Promise(async (resolve, reject) => {
            const db = await initDB();
            const store = db.transaction('tasks', 'readwrite').objectStore('tasks');

            // Delete the task and handle the result
            resolve(store.delete(id));
            reject(new indexedDBError('The task could not be deleted'));
        });
    }

    // Toggle the completed status of a specific task
    async checked(taskID, checked) {
        const db = await initDB();
        const store = db.transaction('tasks', 'readwrite').objectStore('tasks');
        const checkedRequest = store.openCursor(); // We use a cursor to find the right task

        checkedRequest.onsuccess = event => {
            const cursor = event.target.result;

            if (cursor) {
                // Found our task? Update its completion status
                if (cursor.value.id === taskID) {
                    const updatedTask = { ...cursor.value, completed: checked };
                    cursor.update(updatedTask);
                }

                cursor.continue(); // Keep looking through the database
            }
        };
    }
}

// Create an instance we can use throughout the app
const manageTasks = new taskCRUD();
export default manageTasks;
