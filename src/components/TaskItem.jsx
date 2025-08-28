import manageTasks from '../db/CRUDIndexedDB';
import TrashCan from './icons/TrashCan';
import PencilIcon from './icons/PencilIcon';

// Component for displaying individual task items with edit/delete options
function TaskItem({ taskData, setTaskList, editTask }) {
    // Destructure task properties for easier access
    const { id, description, completed } = taskData;

    // Handles checkbox toggle for task completion
    const handleCheckbox = (event, CurrentID) => {
        const IsChecked = event.target.checked;

        // Update local state immediately for better UX
        setTaskList(prevTasks => {
            return prevTasks.map(element => (element.id === CurrentID ? { ...element, completed: IsChecked } : element));
        });

        // Update the database with new completion status
        manageTasks.checked(CurrentID, IsChecked);
    };

    // Deletes a task from both state and database
    const deleteTask = async id => {
        manageTasks.delete(id);
        // Refresh the task list from database after deletion
        setTaskList(await manageTasks.read());
    };

    return (
        <>
            <div key={id} className="flex justify-between">
                {/* Task content and checkbox */}
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

                {/* Action buttons for edit and delete */}
                <div className="flex gap-3">
                    {/* Edit button - opens the edit modal */}
                    <button onClick={() => editTask(taskData)}>
                        <PencilIcon
                            className="text-primary-color hover:cursor-pointer hover:scale-110 transition-transform"
                            width={25}
                            height={25}
                        />
                    </button>

                    {/* Delete button - removes the task permanently */}
                    <button onClick={() => deleteTask(id)}>
                        <TrashCan
                            className="text-primary-color hover:cursor-pointer hover:scale-110 transition-transform"
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default TaskItem;
