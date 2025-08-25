import HeaderSection from './layout/HeaderSection';
import TaskSection from './layout/TaskSection';
import TimerSection from './layout/TimerSection';

function App() {
    return (
        <div className="flex flex-col h-screen p-5 gap-10 font-primary-font bg-base">
            <HeaderSection />
            <div className="flex-1 flex lg:flex-row items-center justify-center gap-10">
                <TaskSection />
            </div>
        </div>
    );
}

export default App;
