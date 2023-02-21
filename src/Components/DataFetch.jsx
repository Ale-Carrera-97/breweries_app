import React, {useState, useEffect} from "react";
import axios from 'axios';

import '../App.css';
// const baseURL = 'https://api.openbrewerydb.org/breweries?by_state=texas&by_city=dallas&page=1';

// const baseURL= `https://api.openbrewerydb.org/breweries?by_state=${worldstates}&by_city=dallas&page=${pageNumbers}`;
// const dictURL = 'https://api.openbrewerydb.org/breweries/meta?by_state=texas&by_city=dallas';

function DataFetch(){
    const [breweries, setBreweries] = useState([]);
    // const [dictionaries, setDictionaries] = useState([]);
    const [pageNumbers, setPageNumbers] = useState(1);
    const [picStates, setStates] = useState('Select');
    const [picCities, setCities] = useState('Select')


    function handleStatesChange(event){
        //function to handle change on State (florida, texas, NY, California, etc..) selection
        setStates(event.target.value);
    }

    function handleCitiesChange(event){
        //function to handle change on Cities (DC, Orlando, PaloAlto, etc..) selection
        setCities(event.target.value);
    }

    useEffect(() => {
        axios.get(`https://api.openbrewerydb.org/breweries?by_state=${picStates}&by_city=${picCities}&page=${pageNumbers}`)
            .then(response => {setBreweries(response.data);console.log(response.data)})
            // console.log(response.data)
            .catch(error => {console.error(error.message);});
            console.log(`https://api.openbrewerydb.org/breweries?by_state=${picStates}&by_city=${picCities}&page=${pageNumbers}`)

    } , [pageNumbers, picCities, picStates]);


    return(
        <div className="container">
            <h3>Breweries near you.</h3>
            <h2>Select a State first and then a City to see breweries near you</h2>
            <div>Select State
            <select id='picStates' value={picStates}  onChange={handleStatesChange}>
                
                <option value="selected" selected='selected'>Select a State</option>
                <option value="Texas">Texas</option>

                <option value="Florida">Florida</option>

                <option value="California">California</option>

            </select>
            </div>
            <div>Select City
            <select id='picCities' value={picCities}  onChange={handleCitiesChange}>
                <option value="selected" selected='selected'>Select a City</option>
                
                {
                    picStates === 'Texas' &&(
                        <>
                            <option value="Dallas">Dallas</option>
                            <option value="Houston">Houston</option>
                            <option value="Austin">Austin</option>
                        </>
                    )
                }

                {
                    picStates === 'Florida' &&(
                        <>
                            <option value="Orlando">Orlando</option>
                            <option value="Kissimee">Kissimee</option>
                            <option value="Miami">Miami</option>
                        </>
                    )
                }

                {
                    picStates === 'California' &&(
                        <>
                            <option value="San Diego">San Diego</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="Los Angeles">Los Angeles</option>
                        </>
                    )
                }
                
                
            </select>
            </div>
            
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">State</div>
                    <div className="col col-3">City</div>
                    <div className="col col-4">Address</div>
                </li>

                {
                    breweries.map((brewery, index)=>(
                        <li className="table-row" key={index}>
                            <div className="col col-1" data-label='Name'>{brewery.name}</div>
                            <div className="col col-2" data-label='State'>{brewery.state}</div>
                            <div className="col col-3" data-label='City'>{brewery.city}</div>
                            <div className="col col-4" data-label='Street'>{brewery.street}</div>
                        </li>
                    ))
                }
            </ul>
            <div>
            <button onClick={()=>setPageNumbers(pageNumbers - 1)}>
                Previous Page
            </button>

            <button onClick={()=>setPageNumbers(pageNumbers + 1)}>
                Next Page
            </button>
            </div>
        </div>
    )
}
export default DataFetch;