import { useState } from 'react';
import manageTasks from '../db/CRUDIndexedDB';

// Form component for adding or editing tasks
function TaskForm({ getTaskList, taskData = [] }) {
    // Grab existing task data if we're editing
    const { id, description, completed } = taskData;

    // State for the task input and button disabled state
    const [task, setTask] = useState(description || '');
    const [disabled, setDisabled] = useState(false);

    // Handles form submission for both new and edited tasks
    const handleTask = async event => {
        event.preventDefault();

        // Create task object - either update existing or create new
        const taskTemplate = {
            id: id || `${crypto.randomUUID()}:${new Date().getTime()}`, // Generate unique ID if new task
            description: task.trim(), // Clean up any extra spaces
            completed: completed || false // Keep existing completion status or default to false
        };

        // Decide whether to edit or create based on whether we have an existing ID
        if (id) manageTasks.edit(taskTemplate);
        if (!id) manageTasks.create(taskTemplate);

        // Briefly disable button to prevent spam clicks
        setDisabled(true);
        setTimeout(() => setDisabled(false), 1000);

        // Clear the input field after submitting
        setTask('');

        // Refresh the task list to show the new/updated task
        getTaskList();
    };

    return (
        <form className="flex justify-between gap-2" onSubmit={handleTask}>
            {/* Task input field */}
            <input
                type="text"
                placeholder="Add your task!"
                className="w-9/12 bg-secondary-bg text-primary-font-color py-3 px-5 rounded focus:outline-none"
                value={task}
                onChange={event => setTask(event.target.value)}
            />

            {/* Submit button - changes color when disabled */}
            <input
                type="submit"
                value="Send"
                className="w-3/12 bg-primary-color text-primary-font-color py-3 px-5 rounded font-bold hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color"
                disabled={disabled}
            />
        </form>
    );
}

export default TaskForm;
