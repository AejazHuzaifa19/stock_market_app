import DisplayTable from '../app/components/DisplayTable';
import FileDropdown from '../app/components/FileDropdown';
import ErrorNotice from '../app/components/ErrorNotice';
import UploadFile from '../app/components/UploadFile';
import Register from '../app/components/Register';
import { useState, useEffect } from 'react'
function Dashboard() {
  const [searchData, setSearchData] = useState({
    search: '',
    filename: '',
  });

  const [jsonData, setJsonData] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email , setEmail] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(null);

  useEffect(() => {
    if(localStorage.getItem('email') != null){
      fetchUploadedFiles(localStorage.getItem('email'));
    }
  }, []);

  const [registered, setRegistered] = useState(true);

  const onChange = (e) => {
    e.preventDefault();
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const onRegister = (e, email) => {
    localStorage.setItem('email', email);
    const data = new URLSearchParams();
    data.append('email', email);

    fetch(`http://localhost:5000/api/process/registerEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data,
    }).then(response => console.log(response));

    fetchUploadedFiles(email)
    setEmail(email);
    setRegistered(true);
  }

  const updateUploadedFiles = (filename) =>
  {
    const newArray = uploadedFiles.concat(filename);
    setUploadedFiles(newArray);
  }

  const fetchUploadedFiles = (email_adress) => {
    let email_address =  email_adress ? email_adress : email;
    fetch(`http://localhost:5000/api/process/getUploadedFiles?email=${email_address}`)
    .then(res => {
      return res.json();
    })
    .then((json) => {
      const filenames = json.map(obj => obj.filename);
      setUploadedFiles(filenames);
    });
  }

  const onLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem('email');
    setRegistered(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchData.search === '') {
      fetch(`http://localhost:5000/api/process/?filename=${searchData.filename}`)
        .then(response =>
          response.json()
        ).then(data => {
          if (data.status === 400) {
            setErrorStatus(true);
            setErrorMessage(data.message)
            return;
          }
          setErrorStatus(false);
          setJsonData(JSON.stringify(data.data))
        })
        .catch(error => {
          return { error: error.message };
        });
    }
    else {
      fetch(`http://localhost:5000/api/process/filter?stock=${searchData.search}&filename=${searchData.filename}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.status === 400) {
            setErrorStatus(true);
            setErrorMessage(data.message)
            return;
          }
          setErrorStatus(false);
          setJsonData(JSON.stringify(data.data))
        })
        .catch(error => {
          return { error: error.message };
        });
    }
  }
  const { search } = searchData;
  return registered ?
    (

      <div>
        <button className="btn btn-secondary" onClick={onLogout} name="logout">Logout</button>
        <section className='form'>
          <div className="form-group">
            <form>
              <div>
                <input
                  type='text'
                  name='email_address'
                  className='form-control'
                  disabled={true}
                  id='email_address'
                  value={localStorage.getItem('email')}
                  placeholder="Enter your email address"
                  onChange={onChange} />
                <UploadFile fetchUploadedFiles={fetchUploadedFiles} updateUploadedFiles={updateUploadedFiles} uploadedFiles={uploadedFiles} email={email}/>
              </div>
              <div>
                <FileDropdown uploadedFiles={uploadedFiles} onSelect={(e) => onChange(e)} />
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
    ) : <Register onRegister={onRegister} />;
}

export default Dashboard
