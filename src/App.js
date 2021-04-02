import './App.css';
import { useStoreActions, useStoreState  } from 'easy-peasy';

function App() {

  const counter = useStoreState(store => store.counter.counter.counter);
  const iterate = useStoreActions(action => action.counter.counter.iterate);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {counter}
        </p>
        <button onClick={iterate}>
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
