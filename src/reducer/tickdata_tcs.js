
export default function(state = [], action) {
  switch(action.type) {
    case 'ADD_DATA_SCOPE_TCS':
  //  debugger;
    
         let length = state.length;
         let direction = '';
         const now = new Date();
         let shift = action.payload.shift;
        
        if(length >= 1){
          // check the direction and add it in candle

          //debugger;

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

                      //action.payload.date.slice(14,16)

                      debugger;

                      action.payload.timeOfFormation = parseInt(action.payload.date.slice(14,16));
                      action.payload.hourOfFormation = parseInt(action.payload.date.slice(11,13));



                      if(direction == prevone && beforeprevone != prevone && direction !="same"){

                        //ideal condition
                         //condition of inflection treend will be decided by direction

                         if(direction == "down"){
                          // debugger;
                           action.payload.trend = "downtrend";
                           action.payload.pivot = state[state.length-2].high; 


                           //condition here asap to check if only 1 candle formed or not
                            var prevPivotDiff = Math.abs(state[state.length-1].timeOfFormation - action.payload.timeOfFormation);
                            var beforePrevDiff = Math.abs(state[state.length-2].timeOfFormation - state[state.length-1].timeOfFormation);

                            var prevHourPivotDiff = Math.abs(state[state.length-1].hourOfFormation - action.payload.hourOfFormation);
                            var beforeHourPrevDiff = Math.abs(state[state.length-2].hourOfFormation - state[state.length-1].hourOfFormation);
                           
                        
                            if((prevPivotDiff == 5 || prevPivotDiff == 55) && (beforePrevDiff == 5 || beforePrevDiff == 55) ){
                                 action.payload.dojiFormed = true; 
                            }
                            else{
                              action.payload.dojiFormed = false; 
                            }


                           action.payload.pivotLength = Math.abs(state[state.length-2].open-state[state.length-2].close); 



                             action.payload.dir = 'up'; 
                             action.payload.currentPrice = action.payload.close ;

                           //new code data
                            action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                            action.payload.x = state.length+1;
                            action.payload.direction = direction;
                            var newstate = state.concat(action.payload);                
                            return newstate ;
                             //new code data

                         } 
                         else if(direction == "up"){
                          //  debugger;
                            action.payload.trend = "upward";
                            action.payload.pivot = state[state.length-2].low; 

                            
                            //condition here asap to check if only 1 candle formed or not
                            var prevPivotDiff = Math.abs(state[state.length-1].timeOfFormation - action.payload.timeOfFormation);
                            var beforePrevDiff = Math.abs(state[state.length-2].timeOfFormation - state[state.length-1].timeOfFormation);

                            var prevHourPivotDiff = Math.abs(state[state.length-1].hourOfFormation - action.payload.hourOfFormation);
                            var beforeHourPrevDiff = Math.abs(state[state.length-2].hourOfFormation - state[state.length-1].hourOfFormation);
                           
                        
                            if((prevPivotDiff == 5 || prevPivotDiff == 55) && (beforePrevDiff == 5 || beforePrevDiff == 55) ){
                                 action.payload.dojiFormed = true; 
                            }
                            else{
                              action.payload.dojiFormed = false; 
                            }

                            

                            action.payload.pivotLength = Math.abs(state[state.length-2].open-state[state.length-2].close); 

                            action.payload.dir = 'low'; 
                            action.payload.currentPrice = action.payload.close ;

                            //new code data
                            action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                            action.payload.x = state.length+1;
                            action.payload.direction = direction;
                            var newstate = state.concat(action.payload);                
                            return newstate ;
                             //new code data
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


              action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
              action.payload.x = state.length+1;
              action.payload.direction = direction;
              var newstate = state.concat(action.payload);                
              return newstate ;
            }
      }
         //plot x and y based on time 
         action.payload.trend = "";
         action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
         action.payload.x = 1;
         var newstate = state.concat(action.payload);
         return newstate ;
   
     
  }

  return state;
}
