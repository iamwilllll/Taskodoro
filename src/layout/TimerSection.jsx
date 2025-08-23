import PauseIcon from '../components/icons/PauseIcon';
import SoundOn from '../components/icons/SoundOn';
function TimerSection() {
    return (
        <section className="w-min-1/2 w-full flex flex-col items-center justify-center flex-1 gap-10">
            <header className="text-7xl text-primary-font-color">25:00</header>
            <footer className="flex gap-5 bg-secondary-bg py-5 px-15 rounded-full">
                <button>
                    <PauseIcon width={70} height={70} />
                </button>
                <button>
                    <SoundOn width={70} height={70} />
                </button>
            </footer>
        </section>
    );
}

export default TimerSection;
