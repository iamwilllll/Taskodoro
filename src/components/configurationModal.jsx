import changeTheme from '../utils/changeTheme';
import CloseIcon from './icons/CloseIcon';
import SelectOption from './SelectOption';

// Modal for app settings - lets users change themes and stuff
function ConfigurationModal({ showModal, setShowModal }) {
    // Only close if user clicks on the dark overlay, not the actual modal content
    const closeOnOverlayClick = event => {
        if (event.target !== event.currentTarget) return;
        setShowModal(false);
    };

    // Simple close function for the X button
    const closeModal = () => setShowModal(false);

    return (
        <section
            // This is the semi-transparent dark background behind the modal
            className={`absolute inset-0 m-auto w-screen h-screen bg-[#00000090] ${showModal ? 'flex' : 'hidden'}`}
            onClick={closeOnOverlayClick}
        >
            {/* The actual modal box that pops up */}
            <aside
                className={`m-auto w-10/12 h-9/12 lg:w-4/12 bg-modal-bg rounded-2xl p-5 border-2 border-line-color flex flex-col items-end`}
            >
                {/* Close button (top-right X) */}
                <button
                    className="text-secondary-font-color hover:scale-115 transition hover:cursor-pointer"
                    onClick={closeModal}
                >
                    <CloseIcon />
                </button>

                {/* Modal title */}
                <h2 className="text-center w-full my-5 font-bold text-3xl text-secondary-font-color">Setting</h2>

                {/* Dropdown to pick different themes */}
                <select
                    onChange={changeTheme} // This handles the theme switching
                    className="w-full p-3 border border-line-color rounded outline-none hover:cursor-pointer text-secondary-font-color"
                >
                    {/* Options for different themes - looks like the labels might be mixed up? */}
                    <SelectOption value="null" label="Select your value" />
                    <SelectOption value="Light" label="Light" />
                    <SelectOption value="dark" label="Dark" />
                    <SelectOption value="focus" label="Focus" />
                </select>
            </aside>
        </section>
    );
}

export default ConfigurationModal;
