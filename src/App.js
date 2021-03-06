import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import backgroundImage from "./images/AdobeStock_306938507.jpeg";


function App(){

  const [premierLeagueStandings, fillStandings]=useState([])

  useEffect(
    () => {fetchStandings()}, []
  );

  function fetchStandings(){
    axios({ //Get Premier League Standings
      'method': "GET",
      'url': 'https://api-football-v1.p.rapidapi.com/v2/leagueTable/2790',
      'headers': {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': 'a3e9667df8msh1fa39a70e177eadp14832bjsned2e9b17d6a1'
      },
    }).then((results)=>{
      var standingsFromAPI = results.data.api.standings[0]
      var ourStandings=[]
      for (var i=0; i<standingsFromAPI.length; i++) {
        ourStandings.push(standingsFromAPI[i])
      }
      fillStandings(ourStandings)
    })
  }

  return (
    <div style={{textAlign:'center', display:'block'}}>
      <h1>See the standings for the Premier League below!</h1>
      <img src={backgroundImage} style={{width:'500px'}} />
      

      <table style={{marginLeft:'auto', marginRight:'auto', position:'relative', top:'25px'}}>
        <tbody>
          <tr>
            <th>Standing:</th><th>Team:</th><th>Points:</th>
          </tr>
          
          {premierLeagueStandings.map(standing=>{
            return (
              <tr>
                <td>{standing.rank}</td><td>{standing.teamName}</td><td>{standing.points}</td>
                <td></td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <AmplifySignOut style={{position:'relative',top:'82px'}}/>
  </div>
  )
}

export default withAuthenticator(App);
