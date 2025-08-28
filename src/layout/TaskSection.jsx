import { useState, useEffect } from 'react';
import manageTasks from '../db/CRUDIndexedDB';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import EditTaskModal from '../components/EditTaskModal';

function TaskSection() {
    // State for our list of tasks
    const [taskList, setTaskList] = useState([]);
    // Controls whether the edit modal is visible
    const [showEditModal, setShowEditModal] = useState(false);
    // Stores the task data we want to edit
    const [taskData, setTaskData] = useState([]);

    // Fetches tasks from the database and updates our state
    const getTaskList = async () => {
        setTaskList(await manageTasks.read());
    };

    // Load tasks when the component first renders
    useEffect(() => {
        getTaskList();
    }, []);

    // Opens the edit modal with the selected task's data
    const editTask = task => {
        setTaskData(task);
        setShowEditModal(true);
    };

    return (
        <>
            {/* Edit modal (hidden by default) */}
            <EditTaskModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                taskData={taskData}
                getTaskList={getTaskList}
            />

            {/* Main task section container */}
            <section className="h-full flex flex-col flex-1 gap-6 lg:max-w-1/2 w-1/2 border border-line-color rounded-2xl px-5 py-10">
                {/* Decorative divider line */}
                <div className="w-full border border-transparent border-t-line-color"></div>

                {/* Section header with title and complete all button */}
                <header className="flex justify-between items-center">
                    <h2 className="text-3xl lg:text-5xl text-primary-font text-primary-font-color font-bold">Task list</h2>
                    <button className="flex items-center justify-center h-full w-4/12 lg:w-2/12 gap-2 bg-primary-color p-1 rounded text-primary-font-color font-bold hover:cursor-pointer hover:scale-110 transition-transform">
                        Complete all
                    </button>
                </header>

                {/* Container where all the individual tasks will be displayed */}
                <div className="flex flex-1 flex-col gap-3" id="TaskContainer">
                    {taskList.map(taskData => (
                        <TaskItem key={taskData.id} taskData={taskData} setTaskList={setTaskList} editTask={editTask} />
                    ))}
                </div>

                {/* Form at the bottom to add new tasks */}
                <TaskForm getTaskList={getTaskList} />
            </section>
        </>
    );
}

export default TaskSection;
