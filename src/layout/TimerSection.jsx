import PauseIcon from '../components/icons/PauseIcon';
import SoundOn from '../components/icons/SoundOn';

function TimerSection() {
    return (
        <section className="flex flex-col items-center justify-center lg:max-w-1/2 w-1/2 gap-10">
            <header className="text-7xl font-bold text-primary-font-color">25:00</header>
            <footer className="flex gap-5 bg-secondary-bg py-5 px-15 rounded-full">
                <button>
                    <PauseIcon
                        width={70}
                        height={70}
                        className="text-primary-color hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color"
                    />
                </button>
                <button>
                    <SoundOn
                        width={70}
                        height={70}
                        className="text-primary-color hover:scale-110 hover:cursor-pointer hover:brightness-110 transition-transform transition-color"
                    />
                </button>
            </footer>
        </section>
    );
}

export default TimerSection;
