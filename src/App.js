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
            <div className='navigation'><button onClick={() => setPage('lapiseira')}>{'Próximo ->'}</button></div>
            <InitialParameters />
          </>
        )
      }
      {
        page === 'lapiseira' && (
          <>
            <div className='navigation'>
              <button onClick={() => setPage('initial')}>{'<- Voltar'}</button>
            </div>
            <Lapiseira />
            <div className='navigation'>
              <button onClick={() => setPage('result')}>{'CALCULAR'}</button>
            </div>
          </>
        )
      }
      {
        page === 'result' && (
          <>
            <div className='navigation'>
              <button onClick={() => setPage('lapiseira')}>{'<- Voltar'}</button>
              <button style={{margin: '0 0 0 16px'}} onClick={() => setPage('initial')}>{'Início'}</button>
            </div>
          <Results />
          </>
        )
      }


    </div>
  );
}

export default App;
