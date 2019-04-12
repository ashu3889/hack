
export default function(state = [], action) {
 
  switch(action.type) {
     case 'REMOVE_PLOT_PIVOT_DATA_TEST':
     return [];
    case 'PLOT_PIVOT_DATA_TEST':

    //write condition for uptrend and downtrend here
    //let currentpiv = action.payload.y;
    let statelen = state.length;
    const now = new Date();

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



                 //   alert('sideways formed');
                    //alert(action.payload.x);
                   // alert('high' + high);                    
                   // alert('low' + low);
                   
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
                



                //now handle condition of BPB Failure

                if(action.payload.TradeStarted =="downbuy" && action.payload.dir =="up"){
                      // alert('time to exit bpb setup');
                      // alert('BPB fail short at' + action.payload.x);
                       //action.payload.caution =true;
                       //action.payload.TradeStarted ="bpbfail";  LongTradeInitiated ShortTradeInitiated

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

                


              if(state[statelen-1].trend == 'sideways'){
                    //write logic of blackline setup here


                    if(action.payload.dir == "up" && state[statelen-1].highest < action.payload.y){
                      //alert('111');
                      //set this point as blackline to test 

                      if(state[statelen-1].upblackextreme != undefined &&  state[statelen-1].upblackextreme != 0){
                        let diff = Math.abs(state[statelen-1].upblackextreme-action.payload.y );
                       // alert(diff);
                        
                         if(diff <= 0.01 && state[statelen-1].ShortTradeInitiated != true ){
                         //  alert('up black point 1 is' + action.payload.x);
                           //normal bpb short
                             action.payload.retesthappen = true;
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest;
                             action.payload.ShortTradeInitiated = true;
                             action.payload.UPblackpoint = action.payload.upblackextreme;
                             action.payload.UPblackpointindex = action.payload.upblackextremeindex;                             
                             action.payload.TradeStarted = 'upsell';
                             action.payload.TimeToEnter = true;
                             action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                             alert('BPB short at ' + action.payload.x);
                            // alert('time is' + action.payload.time);
                             let newstate = state.concat(action.payload);
                             return newstate ; 
                         }
                            
                           // alert('up black point 2 is' + state[statelen-1].x);
                            //alert('up black point is ' + action.payload.x);
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest; 
                             action.payload.UPblackpoint = action.payload.upblackextreme;
                             action.payload.UPblackpointindex = action.payload.upblackextremeindex;
                      }
                      else{ 

                           // alert('up black point 3 is' + action.payload.x);
                           // alert('up black point is ' + action.payload.x);
                       
                            action.payload.UPblackpoint = action.payload.y;
                            action.payload.UPblackpointindex = action.payload.x;
                            action.payload.highest = state[statelen-1].highest;                    
                            action.payload.lowest = state[statelen-1].lowest;
                      }

                    }
                    else if(action.payload.dir == "low" && state[statelen-1].lowest > action.payload.y){
                        //set this point as blackline to test 
                       

                        if(state[statelen-1].lowblackextreme != undefined &&  state[statelen-1].lowblackextreme != 0 ){
                       
                          let diff = Math.abs(state[statelen-1].lowblackextreme-action.payload.y );
                          
                          //alert(action.payload.x);
                          // alert('diff is' + diff);
                        //  alert('long trade initiated' + state[statelen-1].LongTradeInitiated );
                         
                             //now we will enter here
                              if( diff <= 0.1  && state[statelen-1].LongTradeInitiated != true){
                                  //alert('low black point 1 is' + action.payload.x);

                                  action.payload.retesthappen = true;
                                  action.payload.highest = state[statelen-1].highest;                    
                                  action.payload.lowest = state[statelen-1].lowest;
                                  action.payload.LongTradeInitiated = true;
                                  action.payload.Lowblackpoint = action.payload.lowblackextreme;
                                  action.payload.lowblackindex = action.payload.lowblackextremeindex;
                                  action.payload.TradeStarted = 'downbuy';
                                  action.payload.TimeToEnter = true;
                                  action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                                  alert('BPB Buy at' + action.payload.x);
                                 // alert('time is' + action.payload.time);
                                  let newstate = state.concat(action.payload);
                                  return newstate ;
                              }
                               // alert('low black point 2 is' + action.payload.x);

                               action.payload.highest = state[statelen-1].highest;                    
                               action.payload.lowest = state[statelen-1].lowest; 
                               action.payload.Lowblackpoint = action.payload.lowblackextreme;
                               action.payload.lowblackindex = action.payload.lowblackextremeindex;
                             
                        }
                        else{
                            // alert('low black point 3 is' + action.payload.x);

                             action.payload.Lowblackpoint = action.payload.y;
                             action.payload.lowblackindex = action.payload.x;
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest; 
                        }
                    }
                }

                

                //now condition of retest here
                 
               if(state[statelen-1].UPblackpoint != undefined || state[statelen-1].Lowblackpoint != undefined){
                   
                   //now see if black line point is touched or not asap
                      if((state[statelen-1].UPblackpoint != undefined &&  state[statelen-1].UPblackpoint != 0) && state[statelen-1].trend == 'sideways' && state[statelen-1].dir =="low" && action.payload.caution != true ){
                          //newww codeeee hereeee
                          let diff = Math.abs(state[statelen-1].UPblackpoint - action.payload.y);
                          //alert(action.payload.x);
                          //alert('diffferrrr is' + diff);
                                      
                           if((state[statelen-1].UPblackpoint <= action.payload.y || diff <= 0.1) && state[statelen-1].trend == 'sideways' && state[statelen-1].ShortTradeInitiated != true){
                               //normal bpb short
                                action.payload.retesthappen = true;
                                action.payload.highest = state[statelen-1].highest;                    
                                action.payload.lowest = state[statelen-1].lowest;
                                action.payload.ShortTradeInitiated = true;
                                action.payload.TradeStarted = 'upsell';
                                action.payload.TimeToEnter = true;
                                action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                                alert('BPB short at ' + action.payload.x);
                               // alert('time is' + action.payload.time);
                                let newstate = state.concat(action.payload);
                                return newstate ;  //ktk20003918  true professional carrier
                           }                           
                          
                      }
                      else if((state[statelen-1].Lowblackpoint != undefined &&  state[statelen-1].Lowblackpoint != 0) && state[statelen-1].dir =="up"  && action.payload.caution != true){
                             //newww codeeee hereeee
                             //alert('22');
                            let diff = Math.abs(state[statelen-1].Lowblackpoint-action.payload.y);
                            if( state[statelen-1].LongTradeInitiated != true && (state[statelen-1].Lowblackpoint >= action.payload.y || diff <= 0.1)){
                              action.payload.retesthappen = true;
                              action.payload.highest = state[statelen-1].highest;                    
                              action.payload.lowest = state[statelen-1].lowest;
                              action.payload.LongTradeInitiated = true;
                              action.payload.TradeStarted = 'downbuy';
                              action.payload.TimeToEnter = true;
                              action.payload.TradeTime=  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();;
                             alert('BPB Buy at' + action.payload.x);
                             //alert('time is' + action.payload.time);
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
                    let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;

                    let diff = action.payload.y - state[statelen-1].highest ;

                    if(diff >= 0.1){
                      //time to clear sideways
                      action.payload.highest = state[statelen-1].y;                    
                      action.payload.lowest = state[statelen-2].y;
                      action.payload.trend = 'uptrend';
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 1;
                      action.payload.downcount =0;  

                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0;  




                    }
                    else{
                     // alert('ashutosh up black extreme' + action.payload.y);
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 1; 
                        action.payload.upblackextreme = action.payload.y;
                        action.payload.upblackextremeindex = action.payload.x;

                    }

                 }
              else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].highest && state[state.length-1].sidecount < 4 && state[statelen-1].upcount == 1 ){
                    //time to empty the swing and create a new swing 
                    //let breakoutlength =  Maths.abs(action.payload.y - state[statelen-1].y);
                    //let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;

                    let diff = action.payload.y - state[statelen-1].highest ;
                     if(diff <= 0.1){
                     //mark it as inside sideways
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 
                     }
                     else{
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0; 
                      action.payload.highest = action.payload.y;                    
                      action.payload.lowest = state[statelen-1].y;
                     }

              }
              else if(action.payload.dir == "low" && action.payload.y > state[statelen-1].highest && state[statelen-1].trend != 'sideways' ){
                    //time to empty the swing and create a new swing 

                    action.payload.highest = state[statelen-1].y;                    
                    action.payload.lowest = state[statelen-2].y;
                    action.payload.trend = 'uptrend';
                    action.payload.upcount = 0; 
                    action.payload.sidecount = 1;
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
                    
                    let diff = state[statelen-1].lowest - action.payload.y;


                    if(diff >= 0.20){
                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;
                     }
                     else{
                      //alert('low black extrems is ' + action.payload.x);
                       action.payload.sidecount = state[state.length-1].sidecount +1;                    
                       action.payload.highest = state[statelen-1].highest;                    
                       action.payload.lowest = state[statelen-1].lowest; 
                       action.payload.downcount =1; 
                       action.payload.lowblackextreme = action.payload.y;
                       action.payload.lowblackextremeindex = action.payload.x;

                     }
                   }

               else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].Lowblackpoint && (state[statelen-1].retesthappen == true)){
              //now time to clear sideways context and make a new trend all together ShortTradeInitiated LongTradeInitiated

                 //alert(' low diff is');
                // alert(state[statelen-1].Lowblackpoint - action.payload.y );

                if(state[statelen-1].Lowblackpoint - action.payload.y > 0.25){
                      
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

                  if(action.payload.y - state[statelen-1].UPblackpoint> 0.2){
                        
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

              else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].lowest && state[state.length-1].sidecount < 4 && state[statelen-1].downcount == 1 ){
                    //time to empty the swing and create a new swing 
                    
                     let diff = state[statelen-1].lowest - action.payload.y;
                     //alert('diff is' + diff);

                     if(diff <= 0.20){
                     //mark it as inside sideways
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 
                     }
                     else{
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

