

import DisplayTable from '../app/components/DisplayTable';
import FileDropdown from '../app/components/FileDropdown';
import ErrorNotice from '../app/components/ErrorNotice';
import { useState, useEffect } from 'react'
function Dashboard() {
  const [searchData, setSearchData] = useState({
    search: '',
    filename: ''
  });

  const [jsonData, setJsonData] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e) => {
    console.log('name',e.target.name);
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('asd',searchData.search);
    if (searchData.search == '') {
      console.log('1: running this');
      fetch(`http://localhost:5000/api/process/?filename=${searchData.filename}`)
        .then(response =>
          response.json()
        ).then(data => {
          if (data.status === 400) {
            console.log('first condition: error');
            setErrorStatus(true);
            setErrorMessage(data.message)
            return;
          }
          console.log('1: DO NOT RUN');
          setErrorStatus(false);
          setJsonData(JSON.stringify(data.data))
        })
        .catch(error => {
          console.error(error);
          return { error: error.message };
        });
    }
    else {
      console.log('the other query');
      fetch(`http://localhost:5000/api/process/filter?stock=${searchData.search}&filename=${searchData.filename}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data.status)
          if (data.status === 400) {
            console.log(data);
            setErrorStatus(true);
            setErrorMessage(data.message)
            return;
          }
          console.log('DO NOT RUN');
          setErrorStatus(false);
          setJsonData(JSON.stringify(data.data))
        })
        .catch(error => {
          console.error(error);
          return { error: error.message };
        });
    }


  }
  console.log(searchData);
  const { search } = searchData;
  return (
    <div>
      <section className='form'>
        <div className="form-group">
          <form>
            <div>
              <FileDropdown  onSelect={(e) => onChange(e)} />
            </div>
            <input
              type='text'
              name='search'
              className='form-control'
              id='search' value={search}
              placeholder="Enter the ticker"
              onChange={onChange} />
          </form>
        </div>
        <div className="form-group">
          <button type='search' className='btn btn-block' onClick={onSubmit}>
            Search
          </button>
        </div>
      </section>
      <section>
        <div id='table_box'>
          {errorStatus ? <ErrorNotice message={errorMessage} /> :
            <DisplayTable jsonData={jsonData} />}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
