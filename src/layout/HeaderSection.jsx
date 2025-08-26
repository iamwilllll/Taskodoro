import { useState } from 'react';

/* Import icons */
import SettingIcon from '../components/icons/SettingIcon';
import OpenTaskIcon from '../components/icons/OpenTaskIcon';

/* Import components */
import ConfigurationModal from '../components/configurationModal';

function HeaderSection() {
    const [showModal, setShowModal] = useState(false);

    // What this function does is check the value of the variable "showModal" if it is false it returns it to true and vice versa, to then pass it as a prop to the component
    const showConfigurationModal = () => setShowModal(showModal === false ? true : false);

    return (
        <section className="lg:p-5 flex flex-col-reverse gap-10 lg:flex-row lg:justify-between">
            <aside className="text-xl text-primary-font-color lg:text-3xl lg:flex lg:items-center">
                <h1 className="text-center lg:text-left flex flex-col lg:flex-row lg:gap-5">
                    <span className="block lg:inline font-extrabold text-4xl">TASKODORO</span>
                    <span className="hidden lg:inline font-normal">/</span>
                    <span className="block lg:inline font-light text-3xl">YOUR GOALS FOR THIS SESSION</span>
                </h1>
            </aside>
            <aside className="flex justify-between">
                <button className="lg:hidden">
                    <OpenTaskIcon width={50} height={50} className="text-primary-color" />
                </button>
                <button
                    className="hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color text-primary-color"
                    onClick={showConfigurationModal}
                >
                    <SettingIcon width={50} height={50} />
                </button>
                <ConfigurationModal showModal={showModal} setShowModal={setShowModal} />
            </aside>
        </section>
    );
}

export default HeaderSection;
