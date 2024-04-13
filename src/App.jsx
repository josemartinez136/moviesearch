import './App.css';
import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa"


function App() {


  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([])
  const [finalPoint, setFinalPoint] = useState('')

  useEffect(() => {
    fetchMe()
  }, [finalPoint])


  const fetchMe = () => {



    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`, {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': '32c24264b6msh829ea98c9538a7bp1c4f41jsna3ec7374e64a',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setContainer(data.d)
      })
      .catch(err => {
        console.log(err);
      });
  }



  const onChangeHandler = (e) => {
    setEndPoint(e.target.value) //this is for every single letter i type in
  }

  const submitHandler = e => {
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  return (

    <div className='App'>
      <div className='title-el'>
        <h1>Find your <span className='gradient-text'>favorite</span> movies.</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className='search-container'>
          <input type="text" value={endPoint} onChange={onChangeHandler} placeholder="Enter a movie name.." />
          <button type='submit'><FaSearch className='search-icon' /></button>
        </div>

      </form>
      <div className="element">
        {container.map((item, index) => {
          return (
            <div key={index} className="element-div">
              <img src={item.i.imageUrl} alt="" />
              <p className='movie-name'>{item.l}</p>
              <p className='movie-actors'>{item.s}</p>
              <p className='movie-year'>{item.y}</p>
            </div>
          )
        })}
      </div>

    </div >
  );
}

export default App;
