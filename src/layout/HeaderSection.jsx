import { useState } from 'react';

/* Import icons */
import SettingIcon from '../components/icons/SettingIcon';
import OpenTaskIcon from '../components/icons/OpenTaskIcon';

/* Import components */
import ConfigurationModal from '../components/configurationModal';

function HeaderSection() {
    // State to control whether the settings modal is visible
    const [showModal, setShowModal] = useState(false);

    // Toggles the modal visibility - simple show/hide switch
    const showConfigurationModal = () => setShowModal(showModal === false ? true : false);

    return (
        <section className="lg:p-5 flex flex-col-reverse gap-10 lg:flex-row lg:justify-between">
            {/* App title and subtitle section */}
            <aside className="text-xl text-primary-font-color lg:text-3xl lg:flex lg:items-center">
                <h1 className="text-center lg:text-left flex flex-col lg:flex-row lg:gap-5">
                    <span className="block lg:inline font-extrabold text-4xl">TASKODORO</span>
                    <span className="hidden lg:inline font-normal">/</span>
                    <span className="block lg:inline font-light text-3xl">YOUR GOALS FOR THIS SESSION</span>
                </h1>
            </aside>

            {/* Right side with action buttons */}
            <aside className="flex justify-between">
                {/* Mobile-only button for opening tasks (hidden on larger screens) */}
                <button className="lg:hidden">
                    <OpenTaskIcon width={50} height={50} className="text-primary-color" />
                </button>

                {/* Settings button - opens the configuration modal */}
                <button
                    className="hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color text-primary-color"
                    onClick={showConfigurationModal}
                >
                    <SettingIcon width={50} height={50} />
                </button>

                {/* The settings modal that pops up when you click the gear icon */}
                <ConfigurationModal showModal={showModal} setShowModal={setShowModal} />
            </aside>
        </section>
    );
}

export default HeaderSection;
