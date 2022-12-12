

import DisplayTable from '../app/components/DisplayTable';
import { useState, useEffect } from 'react'
function Dashboard() {
  const [searchData, setSearchData] = useState({
    search: ''
  });

  const [jsonData, setJsonData] = useState([]);

  const onChange = (e) => {
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(searchData.search)
    fetch(`http://localhost:5000/api/process/filter?stock=${searchData.search}`)
      .then(response => response.json())
      .then(data => {
        console.log('displaying');
        console.log(data);
        setJsonData(JSON.stringify(data.data))
      })
      .catch(error => {
        // handle any errors
      });
  }

  const { search } = searchData;
  return (
    <div>
      <section className='form'>
        <div className="form-group">
          <form>
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
          {<DisplayTable jsonData={jsonData} />}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
