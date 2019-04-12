
export default function(state = [], action) {
  switch(action.type) {
    case 'REMOVE_TICK_DATA':
     return [];
    case 'ADD_DATA_SCOPE':
           

         //;
    //if(parseFloat(action.payload.testHour) >= 10){

               
         let length = state.length;
         let direction = '';
         const now = new Date();
         let shift = action.payload.shift;

         /*if(action.payload.date == "2019-02-14"){
             
              debugger ;
         }*/

    
    


        
        if(length >= 1 ){
          // check the direction and add it in candle

          //

            /*if(parseFloat(state[state.length-1].high)< parseFloat(action.payload.high) ){
                //up direction
                 direction ='up';
            }
            else if(parseFloat(state[state.length-1].high)> parseFloat(action.payload.high)){
                 //down direction
                  direction ='down';
            }
             else if(parseFloat(state[state.length-1].high)== parseFloat(action.payload.high)){
               return state;
            }*/


            //new1
            
          if(state[state.length-1].high < parseFloat(action.payload.high) ){
                //up direction
                 if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                        direction ='up';
                 }
                 else if(action.payload.tickType == "red"){
                          if(parseFloat(action.payload.close) < state[state.length-1].close){
                                if(length >= 2){
                                        if(parseFloat(action.payload.low) < state[state.length-2].low){
                                              //time to mark it as down.. no way its up against my rule if i mark it as up
                                              direction ='down';
                                        }
                                        else{

                                            if(parseFloat(action.payload.low) <= state[state.length-1].low){
                                               direction ='down';
                                            }
                                            else{
                                                direction = 'up';
                                            }
                                             
                                        }
                                }
                          }
                          if(parseFloat(action.payload.low) >= state[state.length-1].low){
                               direction ='up';
                          }
                 }
            }
            else if(parseFloat(state[state.length-1].high) > parseFloat(action.payload.high)){
                  //down direction
                   direction ='down';
            }
            else if(parseFloat(state[state.length-1].high) == parseFloat(action.payload.high)){
               return state;
            }


            //new1







           /*if(parseFloat(state[state.length-1].high)< parseFloat(action.payload.high) ){
                //up direction
                 if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                        direction ='up';
                 }
                 else if(action.payload.tickType == "red"){
                          if(parseFloat(action.payload.close) < parseFloat(state[state.length-1].close)){
                                if(length >= 2){
                                        if(parseFloat(action.payload.low) < parseFloat(state[state.length-2].low)){
                                              //time to mark it as down.. no way its up against my rule if i mark it as up
                                              direction ='down';
                                        }
                                        else{

                                            if(parseFloat(action.payload.low) <= parseFloat(state[state.length-1].low)){
                                               direction ='down';
                                            }
                                            else{
                                                direction = 'up';
                                            }
                                             
                                        }
                                }
                          }
                          if(parseFloat(action.payload.low) >= parseFloat(state[state.length-1].low)){
                               direction ='up';
                          }
                 }
            }
            else if(parseFloat(state[state.length-1].high) > parseFloat(action.payload.high)){
                  //down direction
                   direction ='down';
            }
            else if(parseFloat(state[state.length-1].high)== parseFloat(action.payload.high)){
               return state;
            }*/



          //new condition startes here to avoid some error

           /* if(parseFloat(state[state.length-1].high)< parseFloat(action.payload.high) && (action.payload.tickType == "green" || action.payload.tickType == "doji") ){
                //up direction
                 direction ='up';
            }
            else if(parseFloat(state[state.length-1].high)< parseFloat(action.payload.high) && action.payload.tickType == "red"  ){
               
                 if(parseFloat(action.payload.close) < state[state.length-1].close){
                    direction ='down';
                 }
                 if(parseFloat(action.payload.close) >= state[state.length-1].close){
                    direction ='up';
                 }
            }
            else if(parseFloat(state[state.length-1].high)> parseFloat(action.payload.high) && (action.payload.tickType == "red" || action.payload.tickType == "doji")){
                 //down direction
                  direction ='down';
            }
            else if(parseFloat(state[state.length-1].high)> parseFloat(action.payload.high) && action.payload.tickType == "green"){
                 //down direction
                 if(parseFloat(action.payload.high) > state[state.length-1].high){
                    direction ='up';
                 }
                 if(parseFloat(action.payload.high) >= state[state.length-1].high){
                    direction ='down';
                 }
            }
            else if(parseFloat(state[state.length-1].high)== parseFloat(action.payload.high)){
               return state;
            }*/

            //new condition ends here to avoid some error
          

          if(direction == 'up'){
            action.payload.y = parseFloat(action.payload.high);
          }
          else if(direction == 'down'){
            action.payload.y = parseFloat(action.payload.low);
          }
          else{            
            action.payload.y = parseFloat(action.payload.close);
          }


         

          if(parseFloat(action.payload.low) == parseFloat(action.payload.open) && parseFloat(action.payload.high) == parseFloat(action.payload.close)){

          }


          

 
            if((parseFloat(state[state.length-1].high)>= parseFloat(action.payload.high) ) && (parseFloat(state[state.length-1].low)<= parseFloat(action.payload.low))){
            
                return state ;
             
             } 

           else{      
                         //DETETC UPWARD INFLECTION AND DOWNWARD
                         //CHECK ONLY IF LENGTH IS GREATER THAN 3
                  if(length> 4){
                      //if new one is 

                      //
                      let prevone = state[state.length-1].direction;
                      let beforeprevone = state[state.length-2].direction;
                      let swingHigh = state[state.length-1].swingHigh;
                      let swingLow = state[state.length-1].swingLow;



                      if(direction == prevone && beforeprevone != prevone && direction !="same"){

                         //ideal condition
                         //condition of inflection treend will be decided by direction
                       

                         if(direction == "down"){
                            //;

                            
                         
                            action.payload.trend = "downtrend";
                            action.payload.pivot =   parseFloat(state[state.length-2].high); 
                            action.payload.dir = 'up'; 
                            action.payload.currentPrice = parseFloat(action.payload.close) ;
                           
                           //new code data
                            action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                            action.payload.x = state.length+1;
                            action.payload.direction = direction;



                            var newstate = state.concat(action.payload);                
                            return newstate ;

                            //return  state.slice();

                            
                             //new code data

                         } 
                         else if(direction == "up"){

                            
                         
                            action.payload.trend = "upward";
                            action.payload.pivot = state[state.length-2].low; 
                            action.payload.dir = 'low'; 
                            action.payload.currentPrice = parseFloat(action.payload.close) ;

                            
                           
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
                               if( parseFloat( ) == parseFloat(state[state.length-1].close)){
                                     //same candle console.log  remove this state                             
                                      return state;
                                 }  
                       }
                       else if(direction != prevone && direction == beforeprevone){
                             
                               if(direction == "up"){                                   
                                   if(parseFloat(state[state.length-2].high) >= parseFloat(action.payload.high)){                                   
                                       return state;
                                   }
                                   else if(parseFloat(state[state.length-2].high) < parseFloat(action.payload.high)){
                                      //time to remove the state here
                                       let statelength = state.length -1;
                                       let newstatedata =  state.filter(function(item ,index) {
                                               return index !== statelength
                                          });
                                       action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                       action.payload.x = newstatedata.length+1;
                                       action.payload.direction = direction;
                                       action.payload.y = parseFloat(action.payload.high);
                                       let newstate1 = newstatedata.concat(action.payload);                
                                       return newstate1 ;
                                   }
                               }
                                else if(direction == "down"){ 
                                //  ;


                                   if(parseFloat(state[state.length-2].low) <= parseFloat(action.payload.low)){
                                      return state;
                                   }
                                   else if(parseFloat(state[state.length-2].low) > parseFloat(action.payload.low)){
                                      //time to remove the state here
                                       let statelength = state.length -1;
                                       let newstatedata =  state.filter(function(item ,index) {
                                               return index !== statelength
                                          });
                                       action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                       action.payload.x = newstatedata.length+1;
                                       action.payload.y = parseFloat(action.payload.low);
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
         if(parseFloat(action.payload.open) >= parseFloat(action.payload.close)){
            action.payload.y = parseFloat(action.payload.high);
         }
         else{
            action.payload.y = parseFloat(action.payload.low);
         }
         action.payload.x = 1;
         var newstate = state.concat(action.payload);
         return newstate ;

 
     
  }

  return state;
}
