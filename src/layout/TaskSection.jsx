import { useState, useEffect } from 'react';

// Import functions to manage tasks in IndexedDB
import manageTasks from '../db/CRUDIndexedDB';

// Import icon components
import CheckIcon from '../components/icons/CheckIcon';
import TrashCan from '../components/icons/TrashCan';

function TaskSection() {
    // State declarations
    const [task, setTask] = useState(''); // Stores the current task input value
    const [disabled, setDisabled] = useState(false); // Controls input field disabled state
    const [taskList, setTaskList] = useState([]); // Stores the list of tasks

    // Effect hook to load tasks when component mounts
    useEffect(() => {
        getTaskList();
    }, []);

    // Function to fetch tasks from IndexedDB
    const getTaskList = async () => {
        setTaskList(await manageTasks.read());
    };

    // Handler for input field changes
    const handleChange = event => setTask(event.target.value);

    // Handler for form submission (adding new task)
    const handleTask = async event => {
        event.preventDefault();

        // Create a new task object template
        const taskTemplate = {
            id: `${crypto.randomUUID()}:${new Date().getTime()}`, // Generate unique ID
            description: task.trim(), // Trim whitespace from task description
            completed: false // Initial completion status
        };

        // Create task in IndexedDB
        manageTasks.create(taskTemplate);

        // Refresh the task list
        await getTaskList();

        // Temporarily disable input to prevent multiple submissions
        setDisabled(true);

        // Re-enable input after 1 second
        setTimeout(() => setDisabled(false), 1000);

        // Clear the input field
        setTask('');
    };

    // Handler for checkbox changes (marking tasks complete/incomplete)
    const handleCheckbox = (event, taskID) => {
        const checked = event.target.checked;

        // Update task completion status in local state
        const updatedTaskList = taskList.map(task => {
            return task.id === taskID ? { ...task, completed: checked } : task;
        });

        setTaskList(updatedTaskList);

        // Update task in IndexedDB
        manageTasks.edit(taskID, checked);
    };

    // Function to delete a task
    const deleteTask = async id => {
        manageTasks.delete(id); // Delete from IndexedDB
        await getTaskList(); // Refresh task list
    };

    return (
        <section className="h-full flex flex-col flex-1 gap-6 lg:max-w-1/2 w-1/2 border border-line-color rounded-2xl px-5 py-10">
            <div className="w-full border border-transparent border-t-line-color"></div>
            <header className="flex justify-between items-center">
                <h2 className="text-3xl lg:text-5xl text-primary-font text-primary-font-color font-bold">Task list</h2>
                <CheckIcon width={50} height={50} className="text-primary-color" />
            </header>

            <div className="flex flex-1 flex-col gap-3" id="TaskContainer">
                {taskList.map(task => {
                    const { id, description, completed } = task;
                    return (
                        <div key={id} className="flex justify-between">
                            <div className="flex items-center gap-5">
                                <input
                                    type="checkbox"
                                    id={id}
                                    className="size-6 hover:cursor-pointer"
                                    checked={completed}
                                    onChange={event => handleCheckbox(event, id)}
                                />
                                <label htmlFor={id} className="text-xl text-primary-font-color hover:cursor-pointer">
                                    {description}
                                </label>
                            </div>

                            <div>
                                <button onClick={() => deleteTask(id)}>
                                    <TrashCan
                                        width={25}
                                        height={25}
                                        className="text-primary-color hover:cursor-pointer hover:scale-125 transition-transform "
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form className="flex justify-between gap-2" onSubmit={handleTask}>
                <input
                    type="text"
                    placeholder="Add your task!"
                    className="w-9/12 bg-secondary-bg text-primary-font-color py-3 px-5 rounded focus:outline-none"
                    value={task}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Send"
                    className="w-3/12 bg-primary-color text-primary-font-color py-3 px-5 rounded font-bold  hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color"
                    disabled={disabled}
                />
            </form>
        </section>
    );
}

export default TaskSection;
