import CloseIcon from './icons/CloseIcon';
import TaskForm from './TaskForm';

// Modal for editing existing tasks - pops up when you want to modify a task
function ConfigurationModal({ showEditModal, setShowEditModal, getTaskList, taskData }) {
    // Simple function to close the modal
    const closeModal = () => setShowEditModal(false);

    // Only close if user clicks on the dark background, not the modal itself
    const closeOnOverlayClick = event => {
        if (event.target !== event.currentTarget) return;
        setShowEditModal(false);
    };

    return (
        <section
            // Dark semi-transparent overlay that covers the whole screen
            className={`absolute inset-0 m-auto w-full h-full bg-[#00000090] ${showEditModal ? 'flex' : 'hidden'}`}
            onClick={closeOnOverlayClick}
        >
            {/* The actual modal box that contains the edit form */}
            <aside
                className={`m-auto w-10/12 h-9/12 lg:w-4/12 bg-modal-bg rounded-2xl p-5 border-2 border-line-color flex flex-col items-end`}
            >
                {/* Close button (the X in the top right corner) */}
                <button
                    className="text-secondary-font-color hover:scale-115 transition hover:cursor-pointer"
                    onClick={closeModal}
                >
                    <CloseIcon />
                </button>

                {/* Modal title */}
                <h2 className="text-center w-full my-5 font-bold text-3xl text-secondary-font-color">Edit task</h2>

                {/* Empty div for spacing - keeps the form positioned nicely */}
                <div className="flex-1"></div>

                {/* The actual task form component - pre-filled with existing task data */}
                <TaskForm getTaskList={getTaskList} taskData={taskData} />
            </aside>
        </section>
    );
}

export default ConfigurationModal;
