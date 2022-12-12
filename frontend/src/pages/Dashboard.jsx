import React from 'react'
import {useState, useEffect} from 'react'
function Dashboard() {
  const [searchData, setSearchData] = useState({
    search: ''
  });

  const onChange = (e) =>{
    setSearchData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
  }

  const {search} = searchData;
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
                  <button type='search' className='btn btn-block'>
                      Search
                  </button>
              </div>
          </section>
      </div>
  )
}

export default Dashboard
