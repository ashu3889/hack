
export default function(state = [], action) {
  switch(action.type) {

    case 'REMOVE_DATA_SCOPE_TEST':
    return [];
    case 'ADD_DATA_SCOPE_NIFTY':
   //alert('asuss');
    
         let length = state.length;
         let direction = '';
         const now = new Date();
        
        if(length >= 1){
          // check the direction and add it in candle

            if(state[state.length-1].high < action.payload.high){
             //up direction
              direction ='up';
            }
            else if(state[state.length-1].high > action.payload.high){
            //down direction
              direction ='down';
            }
             else if(state[state.length-1].high == action.payload.high){
               return state;
            }
          

          if(direction == 'up'){
            action.payload.y = action.payload.high;
          }
          else if(direction == 'down'){
            action.payload.y = action.payload.low;
          }
          else{            
            action.payload.y = action.payload.close;
          }


          

 
            if((state[state.length-1].high >= action.payload.high ) && (state[state.length-1].low <= action.payload.low)){
            
                return state ;
             
             } 

           else{      
                         //DETETC UPWARD INFLECTION AND DOWNWARD
                         //CHECK ONLY IF LENGTH IS GREATER THAN 3
                  if(length> 4){
                      //if new one is 
                      let prevone = state[state.length-1].direction;
                      let beforeprevone = state[state.length-2].direction;
                      let swingHigh = state[state.length-1].swingHigh;
                      let swingLow = state[state.length-1].swingLow;



                      if(direction == prevone && beforeprevone != prevone && direction !="same"){

                        //ideal condition
                         //condition of inflection treend will be decided by direction

                         if(direction == "down"){
                           action.payload.trend = "downtrend";
                           action.payload.pivot = state[state.length-2].high; 
                           action.payload.dir = 'up'; 
                         } 
                         else if(direction == "up"){
                            action.payload.trend = "upward";
                            action.payload.pivot = state[state.length-2].low; 
                            action.payload.dir = 'low'; 
                         }

                       }  
                       else if(direction =="same" && state[state.length-1].direction =="same"){
                        //condition to remove same candles from data                          
                               if( action.payload.y == state[state.length-1].close ){
                                     //same candle alert  remove this state                             
                                      return state;
                                 }  
                       }
                       else if(direction != prevone && direction == beforeprevone){
                       // debugger;
                               if(direction == "up"){                                   
                                   if(state[state.length-2].high >= action.payload.high){                                   
                                       return state;
                                   }
                                   else if(state[state.length-2].high < action.payload.high){
                                      //time to remove the state here
                                       let statelength = state.length -1;
                                       let newstatedata =  state.filter(function(item ,index) {
                                               return index !== statelength
                                          });
                                       action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                       action.payload.x = newstatedata.length+1;
                                       action.payload.direction = direction;
                                       action.payload.y = action.payload.high;
                                       let newstate1 = newstatedata.concat(action.payload);                
                                       return newstate1 ;
                                   }
                               }
                                else if(direction == "down"){ 

                                   if(state[state.length-2].low <= action.payload.low){
                                      return state;
                                   }
                                   else if(state[state.length-2].low > action.payload.low){
                                      //time to remove the state here
                                       let statelength = state.length -1;
                                       let newstatedata =  state.filter(function(item ,index) {
                                               return index !== statelength
                                          });
                                       action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                       action.payload.x = newstatedata.length+1;
                                       action.payload.y = action.payload.low;
                                       action.payload.direction = direction;
                                       let newstate1 = newstatedata.concat(action.payload);                
                                       return newstate1 ;
                                    }
                               }
                       } 
                   }

                   /*//adding current swinghigh and low condition
                     //this code will make sure swinghigh and swinglow is present in state after pivot is formed
                    if(state[state.length-1].swingLow != undefined){
                         //first swing condition                               
                         action.payload.swingLow = state[state.length-1].swingLow;
                    }
                    else if(action.payload.swingLow != undefined){
                      //do nothing here
                    }
                    else if(action.payload.swingLow == undefined && state[state.length-1].swingLow ==undefined ){
                          action.payload.swingLow = 0;
                    }

                   if(state[state.length-1].swingHigh != undefined){
                         //first swing condition                               
                         action.payload.swingHigh = state[state.length-1].swingHigh;
                    }
                    else if(action.payload.swingHigh != undefined){
                      //do nothing here
                    }
                    else if(action.payload.swingHigh == undefined && state[state.length-1].swingHigh ==undefined ){
                          action.payload.swingHigh = 0;
                    }*/
                    


              action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
              action.payload.x = state.length+1;
              action.payload.direction = direction;
              let newstate = state.concat(action.payload);                
               return newstate ;
            }
      }
         //plot x and y based on time 
         action.payload.trend = "";
         action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
         action.payload.x = 1;
         let newstate = state.concat(action.payload);
         return newstate ;
   
     
  }

  return state;
}
