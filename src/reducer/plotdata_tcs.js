
export default function(state = [], action) {
 
  switch(action.type) {
    case 'PLOT_PIVOT_DATA_TCS':

    //write condition for uptrend and downtrend here
    //let currentpiv = action.payload.y;
    let statelen = state.length;
    const now = new Date();

    //////////

    let retestDiff = 14;
    let dayRetestDiff = 8;
    let sidewaysClearDiff =11;
    let crudeBigDay = 70;

    //////////

   // let actionHigh = action.payload.highest ;
    //let actionLow = action.payload.lowest ;
    //here comes the rule of black line setup



           if(statelen ==0){
            
               if(action.payload.dir == "low"){
                   action.payload.lowest =action.payload.y;
               }
               else if(action.payload.dir == "up"){
                   action.payload.highest = action.payload.y;
               }
            }

            if(statelen ==1){
              
                 if(action.payload.dir == "up"){
                     action.payload.highest = action.payload.y;
                     action.payload.sidecount = 0;
                     action.payload.lowest = state[statelen-1].lowest;
                 }
                 else if(action.payload.dir == "low"){
                     action.payload.lowest = action.payload.y;
                     action.payload.sidecount = 0 ;
                     action.payload.highest = state[statelen-1].highest;

                 }
            }

            if( state.length >= 2 ){ 




                if(state[statelen-1].upcount != undefined){
                  action.payload.upcount = state[statelen-1].upcount;
                }   
                 

                 if(state[statelen-1].downcount != undefined){
                  action.payload.downcount = state[statelen-1].downcount;
                } 

              if(state[statelen-1].sidecount ==4){
                let high = state[statelen-1].highest;
                let low = state[statelen-1].lowest;
              }


                if(state[statelen-1].highest != undefined){
                  action.payload.highest = state[statelen-1].highest;
                } 

                if(state[statelen-1].lowest != undefined){
                  action.payload.lowest = state[statelen-1].lowest;
                } 


               if(state[statelen-1].trend != undefined){
                  action.payload.trend = state[statelen-1].trend;
                }  

                if(state[statelen-1].UPblackpoint != undefined){
                  action.payload.UPblackpoint = state[statelen-1].UPblackpoint;
                }  
                 
                if(state[statelen-1].Lowblackpoint != undefined){
                  action.payload.Lowblackpoint = state[statelen-1].Lowblackpoint;
                }  

                if(state[statelen-1].tradeDirection != undefined){
                  action.payload.tradeDirection = state[statelen-1].tradeDirection;
                }   

                if(state[statelen-1].upblackindex != undefined){
                  action.payload.upblackindex = state[statelen-1].upblackindex;
                }

                if(state[statelen-1].lowblackindex != undefined){
                  action.payload.lowblackindex = state[statelen-1].lowblackindex;
                }

                if(state[statelen-1].lowblackextreme != undefined){
                  action.payload.lowblackextreme = state[statelen-1].lowblackextreme;
                }

                if(state[statelen-1].upblackextreme != undefined){
                  action.payload.upblackextreme = state[statelen-1].upblackextreme;
                }

                if(state[statelen-1].upblackextremeindex != undefined){
                  action.payload.upblackextremeindex = state[statelen-1].upblackextremeindex;
                }

                if(state[statelen-1].lowblackextremeindex != undefined){
                  action.payload.lowblackextremeindex = state[statelen-1].lowblackextremeindex;
                }
                


                if(state[statelen-1].LongTradeInitiated != undefined){
                  action.payload.LongTradeInitiated = state[statelen-1].LongTradeInitiated;
                }

                if(state[statelen-1].ShortTradeInitiated != undefined){
                  action.payload.ShortTradeInitiated = state[statelen-1].ShortTradeInitiated;
                }   

                if(state[statelen-1].retesthappen != undefined){
                  action.payload.retesthappen = state[statelen-1].retesthappen;
                }  

                 if(state[statelen-1].bigDayTrade != undefined){
                  action.payload.bigDayTrade = state[statelen-1].bigDayTrade;
                }   

                if(state[statelen-1].bigDayTradePrice != undefined){
                  action.payload.bigDayTradePrice = state[statelen-1].bigDayTradePrice;
                }  




              if(Math.abs(action.payload.y - state[statelen-1].y) > crudeBigDay){
                 //time to clear everything and loop for short and look respectivity
                 //debugger;
                   if(action.payload.y > state[statelen-1].y){
                      action.payload.bigDayTrade = 'short'; 
                      action.payload.bigDayTradePrice = action.payload.y; 
                      action.payload.highest = action.payload.y;                    
                      action.payload.lowest = state[statelen-1].y;
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0;
                      action.payload.downcount =0;  
                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0; 
                      let newstate = state.concat(action.payload);
                      return newstate ;

                   }
                   else if(action.payload.y < state[statelen-1].y){
                      
                      action.payload.bigDayTrade = 'long'; 
                      action.payload.bigDayTradePrice = action.payload.y;
                      action.payload.lowest = action.payload.y;                    
                      action.payload.highest = state[statelen-1].y;
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0;
                      action.payload.downcount =0;  
                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0; 
                      let newstate = state.concat(action.payload);
                      return newstate ;

                   }

              }

                


              if(state[statelen-1].trend == 'sideways'){
                    //write logic of blackline setup here

                    //debugger;


                    if(action.payload.dir == "up" && state[statelen-1].highest < action.payload.y){
                      //alert('111');
                      //set this point as blackline to test 

                     //  debugger;

                      if(state[statelen-1].upblackextreme != undefined &&  state[statelen-1].upblackextreme != 0){
                        var diff = Math.abs(state[statelen-1].upblackextreme-action.payload.y );
                        
                        
                         if(diff <= retestDiff && state[statelen-1].ShortTradeInitiated != true ){
                         //  alert('up black point 1 is' + action.payload.x);
                           //normal bpb short

                             // debugger;

                             action.payload.retesthappen = true;
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest;
                             action.payload.ShortTradeInitiated = true;
                             action.payload.UPblackpoint = action.payload.upblackextreme;
                             action.payload.UPblackpointindex = action.payload.upblackextremeindex;                             
                             action.payload.TradeStarted = 'upsell';
                             action.payload.TimeToEnter = true;
                             action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                            // alert('BPB short at  crude' + action.payload.x);
                            // alert('time is' + action.payload.time);
                             let newstate = state.concat(action.payload);
                             return newstate ; 
                         }
                            //debugger;
                           // alert('up black point 2 is' + state[statelen-1].x);
                            //alert('up black point is ' + action.payload.x);

                            
                             // debugger;
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest; 

                             if(action.payload.upblackextreme < action.payload.y){
                                    action.payload.upblackextreme = action.payload.y;
                                    action.payload.UPblackpoint = action.payload.upblackextreme;
                             }
                             action.payload.upcount = state[statelen-1].upcount; 


                             
                             //action.payload.UPblackpointindex = action.payload.upblackextremeindex;
                               //debugger;

                      }
                      else{ 
                               
                            action.payload.upblackextreme = action.payload.y;
                            action.payload.UPblackpoint = action.payload.y;
                            action.payload.UPblackpointindex = action.payload.x;
                            action.payload.highest = state[statelen-1].highest;                    
                            action.payload.lowest = state[statelen-1].lowest;
                            action.payload.upcount = state[statelen-1].upcount; 
                             //debugger;
                      }

                    }
                    else if(action.payload.dir == "low" && state[statelen-1].lowest > action.payload.y){
                        //set this point as blackline to test 
                       

                        if(state[statelen-1].lowblackextreme != undefined &&  state[statelen-1].lowblackextreme != 0 ){
                       
                          var diff = Math.abs(state[statelen-1].lowblackextreme-action.payload.y );
                         

                              if( diff <= retestDiff && state[statelen-1].LongTradeInitiated != true){
                                  //alert('low black point 1 is' + action.payload.x);

                                 // debugger;

                                  action.payload.retesthappen = true;
                                  action.payload.highest = state[statelen-1].highest;                    
                                  action.payload.lowest = state[statelen-1].lowest;
                                  action.payload.LongTradeInitiated = true;
                                  action.payload.Lowblackpoint = action.payload.lowblackextreme;
                                  action.payload.lowblackindex = action.payload.lowblackextremeindex;
                                  action.payload.TradeStarted = 'downbuy';
                                  action.payload.TimeToEnter = true;
                                  action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                                
                                  let newstate = state.concat(action.payload);
                                  return newstate ;
                              }
                               // alert('low black point 2 is' + action.payload.x);

                              //  debugger;

                               action.payload.highest = state[statelen-1].highest;                    
                               action.payload.lowest = state[statelen-1].lowest; 
                               //low black extreme lovely


                                if(action.payload.lowblackextreme > action.payload.y){
                                     action.payload.lowblackextreme = action.payload.y;
                                     action.payload.Lowblackpoint = action.payload.lowblackextreme;
                                }

                               /*if(Math.abs(action.payload.y-action.payload.lowest) >10){
                                  action.payload.lowblackextreme = action.payload.y;
                                  action.payload.Lowblackpoint = action.payload.lowblackextreme;
                                  action.payload.lowblackindex = action.payload.lowblackextremeindex;
                               }*/

                        }
                        else{
                            // alert('low black point 3 is' + action.payload.x);
                            // debugger
                             action.payload.lowblackextreme = action.payload.y;
                             action.payload.Lowblackpoint = action.payload.y;
                             action.payload.lowblackindex = action.payload.x;
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest; 
                             let newstate = state.concat(action.payload);
                             return newstate ;

                        }
                    }
                }

                

                //now condition of retest here
                 
               if(state[statelen-1].UPblackpoint != undefined || state[statelen-1].Lowblackpoint != undefined){
                   
                   //now see if black line point is touched or not asap
                      if((state[statelen-1].UPblackpoint != undefined &&  state[statelen-1].UPblackpoint != 0) && state[statelen-1].trend == 'sideways' && state[statelen-1].dir =="up" && action.payload.caution != true ){
                          //newww codeeee hereeee
                          
                          var diff = Math.abs(state[statelen-1].UPblackpoint - action.payload.y);
                         
                           // debugger;

                           if((state[statelen-1].UPblackpoint <= action.payload.y || diff <= dayRetestDiff) && state[statelen-1].trend == 'sideways' && state[statelen-1].ShortTradeInitiated != true){
                               //normal bpb short
                                //alert('2345');
                                action.payload.retesthappen = true;
                                action.payload.highest = state[statelen-1].highest;                    
                                action.payload.lowest = state[statelen-1].lowest;
                                action.payload.ShortTradeInitiated = true;
                                action.payload.TradeStarted = 'upsell';
                                action.payload.TimeToEnter = true;
                                action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                               
                                let newstate = state.concat(action.payload);
                                return newstate ;  //ktk20003918  true professional carrier
                           }                           
                          
                      }
                      else if((state[statelen-1].Lowblackpoint != undefined &&  state[statelen-1].Lowblackpoint != 0) && state[statelen-1].dir =="low"  && action.payload.caution != true){
                             
                            var diff = Math.abs(state[statelen-1].Lowblackpoint-action.payload.y);
                            if( state[statelen-1].LongTradeInitiated != true && (state[statelen-1].Lowblackpoint >= action.payload.y || diff <= dayRetestDiff)){
                              action.payload.retesthappen = true;
                              action.payload.highest = state[statelen-1].highest;                    
                              action.payload.lowest = state[statelen-1].lowest;
                              action.payload.LongTradeInitiated = true;
                              action.payload.TradeStarted = 'downbuy';
                              action.payload.TimeToEnter = true;
                              action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                          
                              let newstate = state.concat(action.payload);
                              return newstate ;
                            }
                            
                      } 
               }



              

              if(state[statelen-1].highest >= action.payload.y && state[statelen-1].lowest <= action.payload.y ){
                    //sideways movemnet started
                     action.payload.sidecount = state[state.length-1].sidecount+1;
                     action.payload.highest = state[statelen-1].highest;                    
                     action.payload.lowest = state[statelen-1].lowest;

              }
              else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].highest && state[statelen-1].trend != 'sideways'  && (state[statelen-1].upcount == undefined || state[statelen-1].upcount ==0)){
                    //first time price breaks outside
                    //check the length of this breakout ..if it exceed normal length then time to empty sideways

                    //let breakoutlength =  Maths.abs(action.payload.y - state[statelen-1].y);
                   // debugger;

                    if(action.payload.x == 9){
                     // debugger;

                    }


                    let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;
                    var diff = action.payload.y - state[statelen-1].highest ;

                    

                   // debugger;

                    if(diff >= sidewaysClearDiff){
                      //time to clear sideways
                     //  alert('1');
                     // debugger;
                      action.payload.highest = action.payload.y;                    
                      action.payload.lowest = state[statelen-1].y;
                      action.payload.trend = 'uptrend111111';
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0;
                      action.payload.downcount =0;  

                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0;  




                    }
                    else{
                     // alert('ashutosh up black extreme' + action.payload.y);
                       // debugger;
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 1; 
                        action.payload.upblackextreme = action.payload.y;
                        action.payload.upblackextremeindex = action.payload.x;
                       // debugger;

                    }

                 }
              else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].highest && state[state.length-1].sidecount < 4 && state[statelen-1].upcount == 1 ){
                    //time to empty the swing and create a new swing 
                    //let breakoutlength =  Maths.abs(action.payload.y - state[statelen-1].y);
                    //let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;
                    //console.log('bonuuuuuuuuuuuuuuuuuuu');
                      // debugger;

                     var tradeDir = action.payload.y - state[statelen-1].upblackextreme;

                     var diff = action.payload.y - state[statelen-1].highest ;
                     if(diff <= sidewaysClearDiff && tradeDir <= 0){
                     //mark it as inside sideways
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 
                     }
                     else{
                      // alert('2');
                     // debugger;
                      action.payload.downcount = 0; 
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0; 
                      action.payload.highest = action.payload.y;                    
                      action.payload.lowest = state[statelen-1].y;
                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0;  

                     }

              }
              else if(action.payload.dir == "low" && action.payload.y > state[statelen-1].highest && state[statelen-1].trend != 'sideways' ){
                    //time to empty the swing and create a new swing 

                    action.payload.highest = state[statelen-1].y;                    
                    action.payload.lowest = state[statelen-2].y;
                    action.payload.trend = 'uptrend222222';
                    action.payload.upcount = 0; 


                    //action.payload.sidecount = 1;

                    action.payload.sidecount = state[state.length-1].sidecount +1;      


                    action.payload.downcount =0;  
                    alert('trend is downtrend ashu' + action.payload.x);

                   action.payload.upblackextreme = 0;
                   action.payload.lowblackextreme = 0;
                   action.payload.UPblackpoint = 0;
                   action.payload.Lowblackpoint = 0;  

                    //alert('high is ' + action.payload.highest);
                    //alert('low is ' + action.payload.lowest);
              }
              else if(action.payload.dir == "up" && action.payload.y < state[statelen-1].lowest && state[statelen-1].trend != 'sideways'){
                    //time to empty the swing and create a new swing
                    action.payload.highest = state[statelen-2].y;                    
                    action.payload.lowest = state[statelen-1].y;
                    action.payload.trend = 'downtrend';
                    action.payload.upcount = 0; 
                    action.payload.sidecount = 1;
                    action.payload.downcount =0; 
                    alert('trend is downtrend');
                    

                action.payload.upblackextreme = 0;
                action.payload.lowblackextreme = 0;
                action.payload.UPblackpoint = 0;
                action.payload.Lowblackpoint = 0;  
              }
              else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].lowest && (state[statelen-1].downcount == undefined || state[statelen-1].downcount ==0)){
                    
                    var diff = state[statelen-1].lowest - action.payload.y;

                   // debugger;
                    if(diff >= sidewaysClearDiff && (action.payload.downcount == 0 || action.payload.downcount == undefined)){
                       //alert('3');
                      // debugger;
                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;
                     }
                     else{
                      //alert('low black extrems is ' + action.payload.x);
                       //debugger;
                       action.payload.sidecount = state[state.length-1].sidecount +1;                    
                       action.payload.highest = state[statelen-1].highest;                    
                       action.payload.lowest = state[statelen-1].lowest; 
                       

                       if(Math.abs(action.payload.y-action.payload.lowest) >5){
                            //debugger;
                            action.payload.downcount =1; 
                            action.payload.lowblackextreme = action.payload.y;
                            action.payload.lowblackextremeindex = action.payload.x;
                       }
                       

                     }
                   }

               else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].Lowblackpoint && (state[statelen-1].retesthappen == true)){
              //now time to clear sideways context and make a new trend all together ShortTradeInitiated LongTradeInitiated

                 //alert(' low diff is');
                // alert(state[statelen-1].Lowblackpoint - action.payload.y );

                if(state[statelen-1].Lowblackpoint - action.payload.y > retestDiff){
                       //  debugger;
                      
                      alert('clear sideways all together at' + action.payload.x); 
                       action.payload.ShortTradeInitiated = false;
                       action.payload.LongTradeInitiated = false;
                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;

                       action.payload.upblackextreme = 0;
                       action.payload.lowblackextreme = 0;
                       action.payload.UPblackpoint = 0;
                       action.payload.Lowblackpoint = 0;  

                }

                      

                }  
                 else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].UPblackpoint && (state[statelen-1].retesthappen == true)){
              //now time to clear sideways context and make a new trend all together
                 
                // alert(' up diff is');
                 //alert(state[statelen-1].UPblackpoint - action.payload.y );
                // alert('x');

                    if(action.payload.LongTradeInitiated !== undefined || action.payload.ShortTradeInitiated !== undefined){

                       if(action.payload.LongTradeInitiated == false){

                  if(action.payload.y - state[statelen-1].UPblackpoint> retestDiff){
                     //  debugger;
                        
                      alert('clear sideways all together at' + action.payload.x); 

                       action.payload.ShortTradeInitiated = false;
                       action.payload.LongTradeInitiated = false;

                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = action.payload.y;                    
                       action.payload.lowest = state[statelen-1].y;

                       action.payload.upblackextreme = 0;
                       action.payload.lowblackextreme = 0;
                       action.payload.UPblackpoint = 0;
                       action.payload.Lowblackpoint = 0; 

                       }



                       }

                    }

                 
                 

                } 

              else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].lowest && state[state.length-1].sidecount < 4 && state[statelen-1].downcount == 1 ){
                    //time to empty the swing and create a new swing 
                    
                     var diff = state[statelen-1].lowest - action.payload.y;
                     //var tradeDir = state[statelen-1].upblackextreme;
                     //ashutosh singh
                    // debugger;

                     if(diff <= retestDiff){
                     //mark it as inside sideways

                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 
                     }
                     else{

                       //debugger;
                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;

                     }

              }
              else {
                  if(action.payload.dir == "low" ){ 

                          if(action.payload.y >= state[statelen-1].highest && action.payload.upcount ==1 && state[statelen-1].trend != 'sideways'){
                            //uptredn started
                           alert('uptrend started');
                           action.payload.sidecount = 0;
                           action.payload.trend = 'uptrend';
                           action.payload.highest = action.payload.y;
                           action.payload.lowest = state[state.length-1].y;
                           action.payload.upcount = 0;
                           action.payload.downcount = 0;   

                           action.payload.upblackextreme = 0;
                           action.payload.lowblackextreme = 0;
                           action.payload.UPblackpoint = 0;
                           action.payload.Lowblackpoint = 0;                                                  

                           } 
                           else if(state[statelen-1].highest >= action.payload.y && state[statelen-1].lowest <= action.payload.y){
                                //back in sideways
                                action.payload.sidecount = state[statelen-1].sidecount+1;                               
                                action.payload.highest = state[statelen-1].highest;                    
                                action.payload.lowest = state[statelen-1].lowest;
                           }

                    }
                    else if(action.payload.dir == "up"){
                               
                       if(action.payload.y <= state[statelen-1].lowest && action.payload.downcount ==1 && state[statelen-1].trend != 'sideways'){
                            //uptredn started
                             alert('downtrend started');
                           action.payload.sidecount = 0;
                           action.payload.trend = 'downtrend';
                           action.payload.highest = state[state.length-2].y;
                           action.payload.lowest = state[state.length-1].y;
                           action.payload.downcount = 0;
                           action.payload.upcount = 0;

                           action.payload.upblackextreme = 0;
                           action.payload.lowblackextreme = 0;
                           action.payload.UPblackpoint = 0;
                           action.payload.Lowblackpoint = 0;  
                           
                           } 
                           else if(state[statelen-1].highest >= action.payload.y && state[statelen-1].lowest<= action.payload.y){
                                //back in sideways
                                action.payload.sidecount = state[state.length-1].sidecount+1;                               
                                action.payload.highest = state[statelen-1].highest;                    
                                action.payload.lowest = state[statelen-1].lowest;
                           }

                    }

               }
           

           }


               if(action.payload.sidecount >=4 ){
                //hurray sideways formed yayyyy
                action.payload.trend = 'sideways';

                if(state[statelen-1].UPblackpoint != undefined){
                       action.payload.UPblackpoint = state[statelen-1].UPblackpoint;
                  }

                  if(state[statelen-1].Lowblackpoint != undefined){
                       action.payload.Lowblackpoint = state[statelen-1].Lowblackpoint;               
                   }

              }


           
          
             let newstate = state.concat(action.payload);
               return newstate ;
          }
          return state;
  }

