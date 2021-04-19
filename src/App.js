import { useState } from 'react';
import './App.css';
import InitialParameters from './feature/initialParameters/InitialParameters';
import Lapiseira from './feature/lapiseira/Lapiseira';
import Results from './feature/results/Results';

function App() {

  const [page, setPage] = useState('initial')

  return (
    <div className="App">
      {
        page === 'initial' && (
          <>
            <div className='navigation'><button onClick={() => setPage('lapiseira')}>{'>'}</button></div>
            <InitialParameters />
          </>
        )
      }
      {
        page === 'lapiseira' && (
          <>
            <div className='navigation'>
              <button onClick={() => setPage('initial')}>{'<'}</button>
            </div>
            <Lapiseira />
            <div className='navigation'>
              <button onClick={() => setPage('result')}>{'CAULCULAR'}</button>
            </div>
          </>
        )
      }
      {
        page === 'result' && (
          <>
            <div className='navigation'>
              <button onClick={() => setPage('lapiseira')}>{'<'}</button>
              <button onClick={() => setPage('initial')}>{'início'}</button>
            </div>
          <Results />
          </>
        )
      }


    </div>
  );
}

export default App;
