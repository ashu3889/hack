import axios from 'axios';


export function getAlphaData(data , id){

var seg1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NSE:';
var seg2 = '&outputsize=full&apikey=';


//B1A31LJSJBKKJR49

var url = `${seg1}${data}${seg2}${id}`

//debugger;


return function(dispatch) {
                axios({
       method: 'get',
       url: url,
      })
      .then(response => {
      //debugger;
     //alert(JSON.stringify(response));

         dispatch({type: 'DATA_OBTAINED',payload: response.data});

      })
      .catch((error) => {
        console.log("Error Response"+error);
       
      });
   




};

 


} 





//getAcessToken  ADD_DATA_SCOPE
export function pivotDataTest(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_TEST',
     payload : data,
    })
} 



export function removeAlphadata(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_ALPHA_DATA',
     payload : '',
    })
} 


export function removePlotdatatest(data){
 // alert(JSON.stringify(data));
    return ({
     type :'REMOVE_PLOT_PIVOT_DATA',
     payload : '',
    })
} 


export function removeTickData(data){
    return ({
     type :'REMOVE_TICK_DATA',
     payload : '',
    })
} 




export function removeTickDataTest(data){
 // alert(JSON.stringify(data));
   return ({
     type :'REMOVE_DATA_SCOPE_TEST',
     payload : ''
    })
}


export function addTickDataTest(data){
 // alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_TEST',
     payload : data
    })
}

export function pivotData(data){

  //debugger;
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA',
     payload : data,
    })
}

export function pivotDataTCS(data){
    return ({
     type :'PLOT_PIVOT_DATA_TCS',
     payload : data,
    })
}

export function pivotJDData(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_JD',
     payload : data,
    })
}

export function addJDTickData(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_JD',
     payload : data
    })
}

export function addTickData(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE',
     payload : data
    })
}

export function addTickDataTCS(data){
  //alert(JSON.stringify(data));


   return ({
     type :'ADD_DATA_SCOPE_TCS',
     payload : data
    })
}

export function addTickDataNifty(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_NIFTY',
     payload : data
    })
}

export function addTickDataNickle(data){
  //alert(JSON.stringify(data));
   return ({
     type :'ADD_DATA_SCOPE_NICKLE',
     payload : data
    })
}

export function pivotDataNickle(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_NICKLE',
     payload : data,
    })
}

export function pivotDataNifty(data){
 // alert(JSON.stringify(data));
    return ({
     type :'PLOT_PIVOT_DATA_NIFTY',
     payload : data,
    })
}



export function passingAcessToken(api_key, secret, request_token,access_token){  

alert('passing access token');

  return function(dispatch) {
    // Submit email/password to the server 
    //{"username":"admin", "password": "adminpass"} 
    let postData = {
      "api_key": api_key,
     "secret": secret,
     "request_token" : request_token,
     "access_token" : access_token,
    };
    
  
    
     axios({
       method: 'post',
       url: 'http://localhost:4000/kite/login',
       data: postData,
       config: { headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}    
      })
      .then(response => {
      //debugger;
     alert(JSON.stringify(response));

    // dispatch({type: 'ACCESS',payload: response.data});

      })
      .catch((error) => {
        console.log("Error Response"+error);
       
      });
  }
}




 export function getAcessToken(api_key, secret, request_token){  


  return function(dispatch) {
    // Submit email/password to the server 
    //{"username":"admin", "password": "adminpass"} 
    let postData = {
      "api_key": api_key,
     "secret": secret,
     "request_token" : request_token,
    };
    
    
    
     axios({
       method: 'post',
       url: 'http://localhost:4000/kite/login',
       data: postData,
       config: { headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}    
      })
      .then(response => {
      //debugger;
    // alert(JSON.stringify(response));

     dispatch({type: 'ACCESS',payload: response.data});

      })
      .catch((error) => {
        console.log("Error Response"+error);
        // If request is bad...
        // - Show an error to the user
        // dispatch({type: 'UNAUTH_USER',payload: 'User not authenticated'}); 
      });
  }
}



 

export function shufflecards(data){
   return ({
     type :'Shuffle',
     payload : data
    })
}

export function sortcards(data){
   return ({
     type :'Sortcards',
     payload : data
    })
}

export function deletecards(count){
    return ({
      type :'DeleteCard',
      payload : count
    })
}

export function addDrawnCards(count){	
     return ({
       type :'AddDrawnCard',
       payload : count
   })
}


export function sortDrawnCards(count){	
    return ({
      type :'SortDrawnCard',
      payload : count
    })
}

export function shuffleDrawnCard(count){	
    return ({
      type :'ShufflerawnCard',
      payload : count
    })
}







