import HeaderSection from './layout/HeaderSection';
import TaskSection from './layout/TaskSection';
import TimerSection from './layout/TimerSection';

function App() {
    return (
        <div className="flex flex-col h-screen p-5">
            <HeaderSection />

            <div className="flex-1 flex flex-col md:flex-row">
                <TimerSection />
                <TaskSection />
            </div>
        </div>
    );
}

export default App;
