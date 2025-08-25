import changeTheme from '../utils/changeTheme';

function configurationModal({ showModal }) {
    return (
        <section
            className={`absolute ${showModal ? 'top-0' : '-top-100 lg:-top-125'} right-0 w-full p-5 h-1/3 bg-modal-bg transition-[top] duration-1000 flex justify-center items-center border border-transparent border-b-line-color lg:w-1/4 lg:h-1/2 lg:border-line-color`}
        >
            <select
                onChange={changeTheme}
                className="w-full p-2 outline-none border border-line-color hover:brightness-90 hover:cursor-pointer bg-primary-color text-primary-font-color"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="focus">Focus</option>
            </select>
        </section>
    );
}

export default configurationModal;
