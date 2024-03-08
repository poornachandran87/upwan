
import React, { useState } from "react";
import axios from 'axios';
import './suggestplant.css';

export default function SuggestPlant() {
  const [wateringAnswer, setWateringAnswer] = useState(null);
  const [sunlightAnswer, setSunlightAnswer] = useState(null);
  const [flowersAnswer, setFlowersAnswer] = useState(null);
  const [suggestedPlant, setSuggestedPlant] = useState(null);
  const [error,setError]= useState(null)

  const ApiUrl = "http://localhost:8000/api/v1/suggestPlant";

  const handleButtonClick = async () => {
    try {
      
      const response = await axios.post(ApiUrl, {
        watering: wateringAnswer,
        sunlight: sunlightAnswer,
        floweringPlant: flowersAnswer,
      });

      console.log(response)
      setSuggestedPlant(response.data);
      setError(null); 
    } catch (error) {
      setError(error.message); 
      console.error("Error fetching suggested plant:", error);
    }
  };

  return (
    <div className="container-fluids">
      <div>
        <h1 className="headings">Suggest me a plant</h1>
      </div>
      <div className="div3">
        
        <div className="card1 ">
          <div className="card-header">Q. When will you be able to water the plants?</div>
          <ul className="list-group list-group-flush">
            <li className={`list-group-item ${wateringAnswer === "Regular" ? 'selected' : ''}`} onClick={() => setWateringAnswer("Regular") }  key={1}>I am always there to water them</li>
            <li className={`list-group-item ${wateringAnswer === "Moderate" ? 'selected' : ''}`} onClick={() => setWateringAnswer("Moderate")} key={2}>Whenever I get time in the day</li>
            <li className={`list-group-item ${wateringAnswer === "Low" ? 'selected' : ''}`} onClick={() => setWateringAnswer("Low")} key={3}>Only on weekends</li>
           
          </ul>
        </div>

        
        <div className="card2">
          <div className="card-header">Q. Does your plant have access to sun?</div>
          <ul className="list-group list-group-flush">
            <li className={`list-group-item ${sunlightAnswer === "Part shade" ? 'selected' : ''}`} onClick={() => setSunlightAnswer("Part shade")} key={6}>Only for some time</li>
            <li className={`list-group-item ${sunlightAnswer === "Full sun" ? 'selected' : ''}`} onClick={() => setSunlightAnswer("Full sun")} key={7}>Yes, it will get sunlight all day</li>
          </ul>
        </div>

       
        <div className="card2">
          <div className="card-header">Q. Do you like flowers and their odor?</div>
          <ul className="list-group list-group-flush">
            <li className={`list-group-item ${flowersAnswer === true ? 'selected' : ''}`} onClick={() => setFlowersAnswer(true)} key={4}>I love flowers</li>
            <li className={`list-group-item ${flowersAnswer === false ? 'selected' : ''}`} onClick={() => setFlowersAnswer(false)} key={5}>No, I don't like flowers</li>
          </ul>
        </div>

        
        <div className="div4 d-grid gap-2 col-6 mx-auto">
          <button className="btn1" type="button" onClick={handleButtonClick}>Find this type of plant...</button>
        </div>

        {/* Display suggested plant */}
        {suggestedPlant && (
          <div className="suggested-plant">
            <h1 className="header text-green-900">We suggest you this plant -</h1>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {suggestedPlant.image && (
      <img
        src={suggestedPlant.image}
        alt={suggestedPlant.image}
        className=" image"
      />
      
    )}
                   </div>
                   <div className="mt-4  ">
                      
                        <h1 className="plant-name ">{suggestedPlant.name}</h1>

                        <h2 className="h2">Scientific Name :   {suggestedPlant.scientificName}</h2>
                        
                        <p className="para"> <h2 className="plant-care">How to to care of this plant-</h2> {suggestedPlant.plantsCare}</p>
                        <h3 className="price">Price "Rs {suggestedPlant.price}"</h3>
                       
                     
                      
                    </div>
                   
                   
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>} {/* Display error, if any */}
    </div>
    
  );
}
