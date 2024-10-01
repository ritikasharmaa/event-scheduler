import logo from './logo.svg';
import './App.css';
import { CreateEvent } from './component/CreateEvent';
import { SearchAvailableSlot } from './component/SearchAvailableSlot';
import { EventList } from './component/EventList';
import { UpdateEvent } from './component/UpdateEvent';

function App() {
  return (
    <div>
      <h1>Event Scheduler System</h1>
<CreateEvent/>
<SearchAvailableSlot />
<EventList />
<UpdateEvent />
    </div>
  );
}

export default App;
