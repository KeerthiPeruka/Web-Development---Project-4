import { useState } from 'react'
import './App.css';

function App()
{
  const[image, setImage] = useState('');
  const[rover, setRover] = useState('');
  const [camera, setCamera] = useState("");
  const [earthDate, setEarthDate] = useState("");
  const [status, setStatus] = useState("");
  const[banList, setBanList] = useState([]);

const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=API_KEY";

  //fetch data from api 
  const getRandomData = async() => {
    try{
      const response = await fetch(apiUrl);
      const { photos } = await response.json();

      const validPhotos = photos.filter(({ rover, camera, earth_date }) =>
        !banList.includes(rover.name) &&
        !banList.includes(camera.full_name) &&
        !banList.includes(earth_date) &&
        !banList.includes(rover.status)
      );
      

      if (validPhotos.length) {
        const randomPhoto = validPhotos[Math.floor(Math.random() * validPhotos.length)];
        setImage(randomPhoto.img_src);
        setRover(randomPhoto.rover.name);
        setCamera(randomPhoto.camera.full_name);
        setEarthDate(randomPhoto.earth_date);
        setStatus(randomPhoto.rover.status);
      } else {
        console.log("No valid photos.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const toggleBanList = (item) => {
    setBanList((prevBanList) =>
      prevBanList.includes(item)
        ? prevBanList.filter((banItem) => banItem !== item)
        : [...prevBanList, item]
    );
  };

  return (
    <div>
      <h1> Nasa Information</h1>
      <button onClick={getRandomData}>Discover Rover Image</button>
      
        {image && (
          <div>
            <img src={image} alt="Mars Rover" width="300" />
            <p onClick={() => toggleBanList(rover)}>Rover: {rover}</p>
            <p onClick={() => toggleBanList(camera)}>Camera: {camera}</p>
            <p onClick={() => toggleBanList(earthDate)}>Earth Date: {earthDate}</p>
            <p onClick={() => toggleBanList(status)}>Status: {status}</p>
          </div>
        )}
      
      <div>
        <h3> Ban List</h3>
        <ul>
          {banList.map((item, index) => (
            <li key = {index} > {item} </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default App;
