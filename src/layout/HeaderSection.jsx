import SettingIcon from '../components/icons/SettingIcon';
import OpenTaskIcon from '../components/icons/OpenTaskIcon';

function HeaderSection() {
    return (
        <section className="md:p-5 flex flex-col-reverse gap-10 md:flex-row md:justify-between">
            <aside className="text-xl text-primary-font-color md:text-3xl md:flex md:items-center">
                <h1 className="text-center md:text-left flex flex-col md:flex-row md:gap-5">
                    <span className="block md:inline font-extrabold">TASKODORO</span>
                    <span className="hidden md:inline font-normal">/</span>
                    <span className="block md:inline font-light">YOUR GOALS FOR THIS SESSION</span>
                </h1>
            </aside>
            <aside className="flex justify-between">
                <button className="md:hidden">
                    <OpenTaskIcon width={50} height={50} />
                </button>
                <button className="hover:cursor-pointer hover:scale-125 transition-transform">
                    <SettingIcon width={50} height={50} />
                </button>
            </aside>
        </section>
    );
}

export default HeaderSection;
