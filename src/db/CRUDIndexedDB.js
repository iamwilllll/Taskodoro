// Import function to create/initialize IndexedDB
import { indexedDBError } from '../utils/handleCustomErrors';
import initDB from './initIndexedDB';

// Create a class to handle CRUD operations for tasks in IndexedDB
class taskCRUD {
    // Create a new task in the database
    create(task) {
        new Promise(async (resolve, reject) => {
            // Validate that no property in the task object has an empty value
            for (const key in task) if (task[key] === '') return;

            // Initialize the database and get a reference to the object store
            const db = await initDB();
            const store = db.transaction('tasks', 'readwrite').objectStore('tasks');

            // Resolve with the add operation result or reject with an error
            resolve(store.add(task));
            reject(new indexedDBError('The task could not be created'));
        });
    }

    // Read all tasks from the database
    read() {
        return new Promise(async (resolve, reject) => {
            const db = await initDB();

            // Create a read-only transaction and get all records from the store
            const store = db.transaction('tasks', 'readonly').objectStore('tasks');
            const request = store.getAll();

            // Handle the successful request or error
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Edit a specific task's completion status
    async edit(taskID, checked) {
        const db = await initDB();
        const store = db.transaction('tasks', 'readwrite').objectStore('tasks');
        const request = store.openCursor(); // Open a cursor to iterate through records

        request.onsuccess = event => {
            const cursor = event.target.result;

            if (cursor) {
                // Check if current record matches the task ID we want to edit
                if (cursor.value.id === taskID) {
                    // Create an updated task with the new completion status
                    const updatedTask = { ...cursor.value, completed: checked };
                    cursor.update(updatedTask); // Update the record in the database
                }

                cursor.continue(); // Move to the next record
            }
        };
    }

    // Delete a task by its ID
    async delete(id) {
        new Promise(async (resolve, reject) => {
            // Initialize the database and get a reference to the object store
            const db = await initDB();
            const store = db.transaction('tasks', 'readwrite').objectStore('tasks');

            // Resolve with the delete operation result or reject with an error
            resolve(store.delete(id));
            reject(new indexedDBError('The task could not be deleted'));
        });
    }
}

// Instantiate the CRUD class and export it for use in other modules
const manageTasks = new taskCRUD();
export default manageTasks;
