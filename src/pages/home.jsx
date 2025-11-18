import React from 'react';
import APODImage from "../components/APODImage.jsx";
import { useState, useEffect } from "react";
// const dummyData = {
//     title: "Astronomy Picture of the Day",
//     url: "https://placehold.co/600x400"
// };


const Home = () => {

    const [apodData, setApodData] = useState(null)
    useEffect(() => {
        const fetchAPOD = async () => {

            try {
                const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY') // insert emoji API
                const data = await response.json();
                setApodData(data)
            } catch(err){
                console.log(err.message);
            }
        }
        fetchAPOD();
    },[])

    return(
        <div>
            <h1>Memoji</h1>
            {apodData && (
                <>
                    <APODImage title={apodData.title} url={apodData.url} />
                    <button>Start</button>
                </>)
            }
        </div>);
};

export default Home;