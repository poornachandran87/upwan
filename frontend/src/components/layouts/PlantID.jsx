import React, { useState, useEffect } from 'react'; 

import FileBase64 from 'react-file-base64';
// import axios from 'axios';
import './PlantId.css'

const PlantId = () =>{
    const [plantFile, setPlantFile] = useState(null);
    const [plantData, setPlantData] = useState(null);
    const handleInput = (files) => {
        setPlantFile(files);
    };
        const setPicIdData = () => {
        const data = {
        api_key: "zkquqZ5YhjeXK6YkTeOlakXJ2RLsMt99dYmrFPy7v1Dmuaml7X",
        images: [plantFile.base64.slice(23)],
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"
        ]
        };
        fetch('https://api.plant.id/v2/identify', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
            setPlantData(responseData)
            // axios.post('/api/plants', {
            //     plantName: responseData.suggestions[0].plant_name,
            //     plantUrl: responseData.suggestions[0].plant_details.url
            //   })
                // .then(response => console.log(response.data))
                // .catch(error => console.error(error));
            });
        };
            // console.log('Success:', responseData);
        
        
        console.log(plantData);
    return (
       
        <div className='plant-identify-conatiner'>
      <h2 className='identify-heading'>Plant Identification</h2>
      <label htmlFor="plantId" className='upload'>Upload an image</label> 
  

  <div className='upload-div'>

  <FileBase64
        multiple={false}
        onDone={handleInput}
        id="plantId"
      />
      <br />


  </div>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginTop: '10px' }} onClick={setPicIdData}>
        Identify Plant
      </button>
      <br />

      <div className='plants-are' > <div></div>
      {plantData && plantData.suggestions.map((suggestion, index) => (
        
        
        <div className='plant-is' key={index} >
          <h1 className='plant-name-is'>{suggestion.plant_name}</h1>
          <p className='more-info'><a href={suggestion.plant_details.url} style={{ color: 'green', textDecoration: 'none' }}>More Info</a></p>
        </div>

        
      ))}
      </div>
    </div>
  );
};
    
// }
export default PlantId;

 // <div>
        //     PlantId
        //     <FileBase64
        //     multiple={false}
        //     onDone={handleInput}
        //     />
        //     {/* {plantFile && plantFile.base64.slice(23)} */}
        //     <button onClick={setPicIdData}>Click me</button>
        //     <h1>{plantData && plantData.suggestions[0].plant_name}</h1>
        //     <h1>{plantData && plantData.suggestions[0].plant_details.url}</h1>
        //     <h1>{plantData && plantData.suggestions[1].plant_name}</h1>
        //     <h1>{plantData && plantData.suggestions[1].plant_details.url}</h1>
        //     <h1>{plantData && plantData.suggestions[2].plant_name}</h1>
        //     <h1>{plantData && plantData.suggestions[2].plant_details.url}</h1>
        //     {/* {plantData && plantData.suggestions.map(name=>{<h1>{name.plant_name}</h1>})} */}
        // </div>