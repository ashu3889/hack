
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

         
    
    


        
        if(length >= 1 ){


                if(state[state.length-1].hasTradeStarted != undefined && state[state.length-1].hasTradeStarted != false){
                    action.payload.detectionCount = state[state.length-1].detectionCount;
                } 

                 if(state[state.length-1].detectionCount != undefined){
                  action.payload.detectionCount = state[state.length-1].detectionCount;
                } 


                if(state[state.length-1].detectionCandle != undefined){
                  action.payload.detectionCandle = state[state.length-1].detectionCandle;
                } 


                if(state[state.length-1].downPivotNotFormed != undefined){
                  action.payload.downPivotNotFormed = state[state.length-1].downPivotNotFormed;
                } 




                if(action.payload.hasTradeStarted != undefined && action.payload.hasTradeStarted  != false){
                   
                     if(action.payload.detectionCount == undefined){

                        action.payload.detectionCount = 1;
                        var data ={'date':action.payload.date ,'type': action.payload.tickType};
                        action.payload.detectionCandle = [action.payload.tickType];
                     }
                     else{

                       //console.log('action.payload.date ' + action.payload.date);
                       action.payload.detectionCount =  action.payload.detectionCount +1;
                       var data ={'date':action.payload.date ,'type': action.payload.tickType};

                      
                       action.payload.detectionCandle =  action.payload.detectionCandle.concat(data);
                        
                     }
                }

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

          /*  if(action.payload.date == "2019-01-07"){
             
                                    ;
             }*/
            
          if(state[state.length-1].high < parseFloat(action.payload.high) ){
                //up direction
                 if(action.payload.tickType == "green" || action.payload.tickType == "doji"){
                        
                        
                         /* if(action.payload.date == "2018-10-10"){
             
                                    ;
                          }*/


                          if(parseFloat(action.payload.low) < parseFloat(state[state.length-1].low) &&  state[state.length-1].tickType == "red"){
                                direction ='down';
                          }
                          else{
                               direction ='up';
                           }


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

                if(parseFloat(state[state.length-1].low) > parseFloat(action.payload.low)){
                            
                             if(action.payload.tickType == "red"){
                                  direction = "down"
                             }
                }
                else{
                     return state;
                }
               
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
                           //console.log('action.payload.date  down is ' + action.payload.date);
                            var weakPivot = false;
                            // 2018-04-25
                            //2018-05-02

                          
                          

                         
                                  //condition to avaoid unnnecessay pivot weak pivots
                            /*  if(action.payload.close < state[state.length-2].high &&  state[state.length-1].close < state[state.length-2].high){
                                     weakPivot = true;
                              }*/

                            

                          if((action.payload.downPivotNotFormed != true || action.payload.downPivotNotFormed != undefined) && weakPivot ==false){
                                console.log(' up action.payload.date ' + action.payload.date);
                                action.payload.trend = "downtrend";
                                action.payload.pivot =   parseFloat(state[state.length-2].high); 
                                action.payload.dir = 'up'; 
                                action.payload.currentPrice = parseFloat(action.payload.close) ;
                                action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                action.payload.x = state.length+1;
                                action.payload.direction = direction;
                                action.payload.pivotDate = state[state.length-2].date; 
                                action.payload.upPivotNotFormed = false;
                                var newstate = state.concat(action.payload);                
                                return newstate ;

                          } 
                          else{

                               action.payload.upPivotNotFormed = true;
                               var newstate = state.concat(action.payload);
                               return newstate;
                            }

                            
                         
                       

                            //return  state.slice();

                            
                             //new code data

                         } 
                         else if(direction == "up"){


                          

                         //console.log('action.payload.date UP  ' + action.payload.date);

                          var goAhead = true;
                          var triggerGoAhead = true;
                          var triggerCloseGoAhead = true;
                          var prevPivotGoAhead = true;
                          var weakPivot = false;

                          var prevPivotType = state[state.length-3].tickType;
                          var pivotType = state[state.length-2].tickType;
                          var signalType= state[state.length-1].tickType;
                          var triggerType = action.payload.tickType;

                          var prevPivotBodyHigh = state[state.length-3].high;
                          var prevPivotBodyLow = state[state.length-3].low ;

                          var pivotBodyOpen = state[state.length-2].open;
                          var pivotBodyClose = state[state.length-2].close ;

                          var pivotBodyHigh = state[state.length-2].high;
                          var pivotBodyLow = state[state.length-2].low ;

                          var signalBodyOpen = state[state.length-1].open;
                          var signalBodyClose = state[state.length-1].close ;

                          var triggerBodyOpen = action.payload.open;
                          var triggerBodyClose = action.payload.close;

                          var triggerBodyHigh = action.payload.high;
                          var triggerBodyLow = action.payload.low ;

                          var lovelyDiff  = Math.abs(parseFloat(action.payload.low) - parseFloat(state[state.length-2].low));
                          var lovelyDiffRatio = (lovelyDiff/parseFloat(action.payload.low))*100;

                          //HINDCOMPOS
                          if(prevPivotType == "red" && pivotType =="red" && signalType == "red" && triggerType =="green"){
                               if( parseFloat(prevPivotBodyHigh) >= parseFloat(triggerBodyHigh)){
                                      prevPivotGoAhead = false;
                               }

                          }

                          if(triggerType == "red"){

                                if(parseFloat(pivotBodyOpen) >= parseFloat(signalBodyOpen) && parseFloat(pivotBodyOpen) >= parseFloat(triggerBodyOpen)){
                                     goAhead = false;
                                }
                          }

                          
 
                          //genesys condition
                         if(pivotType =="green" && signalType == "red" && triggerType =="red"){
                              if(parseFloat(pivotBodyHigh) >= parseFloat(triggerBodyOpen)){
                                   triggerGoAhead = false;
                              }
                          }

                          if(action.payload.low  >  state[state.length-2].low){

                            if(triggerType == "red"){
                                  if(parseFloat(triggerBodyOpen) >=  parseFloat(state[state.length-2].open) &&  parseFloat(triggerBodyClose) >=  parseFloat(state[state.length-2].open)){
                                      triggerCloseGoAhead = true;
                                  }
                                  else{

                                       if(lovelyDiffRatio < 10){
                                            triggerCloseGoAhead = false;
                                       }
                                       else{
                                             triggerCloseGoAhead = true;
                                       }
                                       
                                  }
                            }

                          }

                        

                          if(action.payload.close < state[state.length-2].high &&  state[state.length-1].close < state[state.length-2].high){
                                     
                                      if(lovelyDiffRatio < 10){
                                            weakPivot = true;
                                       }
                                       else{
                                            weakPivot = false;
                                       }
                          }


                           

                          
                          console.log(' low action.payload.date ' + action.payload.date);

                          if( action.payload.date == "2019-02-15"){
                                 
                                  
                                  // debugger;
                                                      
                          }

                          if((action.payload.upPivotNotFormed != true || action.payload.upPivotNotFormed != undefined) &&  prevPivotGoAhead == true && triggerGoAhead == true && triggerCloseGoAhead == true && goAhead == true && weakPivot == false){

                                        if(state[state.length-1].low  <= state[state.length-2].low ){
                                          action.payload.pivot = state[state.length-1].low; 
                                        }
                                        else{
                                          action.payload.pivot = state[state.length-2].low; 
                                        }

                                         
                                    
                                        action.payload.trend = "upward";
                                       
                                        action.payload.dir = 'low'; 
                                        action.payload.currentPrice = parseFloat(action.payload.close) ;
                                        //new code data
                                        action.payload.time = now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                                        action.payload.x = state.length+1;
                                        action.payload.direction = direction;

                                        action.payload.downPivotNotFormed = false;


                                        action.payload.pivotDate = state[state.length-2].date; 
                                        var newstate = state.concat(action.payload);                
                                        return newstate ;
                            }
                            else{
                               action.payload.direction = direction;
                               action.payload.downPivotNotFormed = true;
                               var newstate = state.concat(action.payload);
                               return newstate;
                            }


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
                                       action.payload.pivotDate = state[state.length-2].date;
                                       action.payload.upPivotNotFormed = false;

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
                                       action.payload.downPivotNotFormed = false;

                                       action.payload.pivotDate = state[state.length-2].date;

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
