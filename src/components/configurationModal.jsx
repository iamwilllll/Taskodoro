import changeTheme from '../utils/changeTheme';
import CloseIcon from './icons/CloseIcon';

function ConfigurationModal({ showModal, setShowModal }) {
    const closeOnOverlayClick = event => {
        if (event.target !== event.currentTarget) return;

        setShowModal(false);
    };

    const closeModal = () => setShowModal(false);

    return (
        <section
            className={`absolute inset-0 m-auto w-full h-full bg-[#00000090] ${showModal ? 'flex' : 'hidden'}`}
            onClick={closeOnOverlayClick}
        >
            <aside className={`m-auto w-10/12 h-9/12 lg:w-4/12 bg-modal-bg rounded-2xl p-5 border-2 border-line-color`}>
                <button
                    className="text-secondary-font-color hover:scale-115 transition hover:cursor-pointer"
                    onClick={closeModal}
                >
                    <CloseIcon />
                </button>
                <h2 className="text-center my-5 font-bold text-3xl text-secondary-font-color">Setting</h2>
                <select
                    onChange={changeTheme}
                    className="w-full p-3 border border-line-color rounded outline-none hover:cursor-pointer text-secondary-font-color"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="focus">Focus</option>
                </select>
            </aside>
        </section>
    );
}

export default ConfigurationModal;
