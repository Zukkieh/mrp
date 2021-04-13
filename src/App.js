import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreActions, useStoreState  } from 'easy-peasy';
import { DataGrid } from '@material-ui/data-grid';
import counterModel from './counterModel';



function App() {




  const counter = useStoreState(store => store.counter.counter.counter);
  const iterate = useStoreActions(action => action.counter.counter.iterate);
  const rows = counterModel.counter.counter;
  const columns = [
    {field: 'id', headerName: 'id', width: 70},
    {field: 'nome', headerName: 'nome', width: 500},
    {field: 'tamanhoLote', headerName: 'Tam. Lote', width: 130},
    {field: 'leadTime', headerName: 'Lead Time', width: 130}
    // {field: 'estoqueSegurança', headerName: 'estoqueSegurança', width: '130'},
    // {field: 'quantidadeReceita', headerName: 'quantidadeReceita', width: '130'},
    // {field: 'estoqueInicial', headerName: 'estoqueInicial', width: '130'},
    // {field: 'unidadeDeMedida', headerName: 'unidadeDeMedida', width: '130'},
    // {field: 'pai', headerName: 'pai', width: '130'},
    // {field: 'duplicado', headerName: 'duplicado', width: '130'},
    // {field: 'calcular', headerName: 'calcular', width: '130'},
    // {field: 'entradas', headerName: 'entradas', width: '130'},
    // {field: 'saida', headerName: 'saida', width: '130'}


  ];
  
  


  return (
    <div className="App">
      <header className="App-header">

      </header>
      <body className="App-body">

      <div style={{ height: 500, width: '80%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}/>
    </div>
     
     
        
      </body>
     
    </div>
  );
}

export default App;
