
import { useState } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState();
  // const [loading, setLoading] = useState(false);

  const inputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const fetchPhotos = async () => {
    if (!search) {
      setError('Input Can not be empty')
      return setTimeout(() => setError(''), 5000)
    }
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${search}/photos`);
    const data = await response.json();
    
    if (data.length === 0) {
      setError('Album with the given Id not found, Try Again!')
      
      return setTimeout(() => setError(''), 5000)
    }
    
    return setPhotos(data);
  }
  
  return (
    <div className="App container">
      <h1>Search Photo app</h1>
      <div className="form-search">
            <input type="number" name="search" placeholder="search photoes by id" value={search} onChange={inputChange} />
            <button onClick={fetchPhotos}>Get Album Photos By Id</button> 
      </div>
      <div style={{color: 'red', fontSize: '1.5rem', textAlign: "center"}}>{error && error }</div>
      <div className='images-container'>
        
        {photos?.map(photo => (
          <div className="content" key={photo.id}>
            <img src={photo.thumbnailUrl} alt={ photo.title} />
            <p>{ photo.title}</p>
        </div>
        ))}
        
      </div>
    </div>

  );
}

export default App;
