import './App.css';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import {useState, useEffect, useMemo} from 'react';
import { useStoreActions, useStoreState  } from 'easy-peasy';

import counterModel from './counterModel';

const Styles = styled.div`
padding: 1rem;

table {
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }

    input {
      font-size: 1rem;
      padding: 0;
      margin: 0;
      border: 0;
    }
  }
}

.pagination {
  padding: 0.5rem;
}
`




function App() {
  const rows = counterModel.counter.counter;

  const [data, setData] = useState(() =>rows)
    const [originalData] = useState(data)
    const [skipPageReset, setSkipPageReset] = useState(false)
  
    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
  
    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
      // We also turn on the flag to not reset the page
      setSkipPageReset(true)
      setData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        })
      )
    }
  
    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    useEffect(() => {
      setSkipPageReset(false)
    }, [data])

  const counter = useStoreState(store => store.counter.counter.counter);
  const iterate = useStoreActions(action => action.counter.counter.iterate);
  
  const columns = useMemo( 
    () => [
    {accessor: 'id', Header: 'id'},
    {accessor: 'nome', Header: 'nome'},
    {accessor: 'tamanhoLote', Header: 'Tam. Lote'},
    {accessor: 'leadTime', Header: 'Lead Time'},
    {accessor: 'estoqueSegurança', Header:'Estoque Segurança'}
    // {field: 'quantidadeReceita', headerName: 'quantidadeReceita', width: '130'},
    // {field: 'estoqueInicial', headerName: 'estoqueInicial', width: '130'},
    // {field: 'unidadeDeMedida', headerName: 'unidadeDeMedida', width: '130'},
    // {field: 'pai', headerName: 'pai', width: '130'},
    // {field: 'duplicado', headerName: 'duplicado', width: '130'},
    // {field: 'calcular', headerName: 'calcular', width: '130'},
    // {field: 'entradas', headerName: 'entradas', width: '130'},
    // {field: 'saida', headerName: 'saida', width: '130'}

  ]
  );
  

  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)
  
    const onChange = e => {
      setValue(e.target.value)
    }
  
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }
  
  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  }
  
  // Be sure to pass our updateMyData and the skipPageReset option
  function Table({ columns, data, updateMyData, skipPageReset }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
      },
      usePagination
    )
  
    // Render the UI for your table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Ir para página:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }
  





  


  return (
    <div className="App">
      <header className="App-header">

      </header>
      <body className="App-body">

      <Styles>
    
    <Table
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      skipPageReset={skipPageReset}
    />
  </Styles>
     
     
        
      </body>
     
    </div>
  );
}

export default App;
