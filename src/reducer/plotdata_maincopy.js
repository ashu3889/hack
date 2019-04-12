
export default function(state = [], action) {
 
  switch(action.type) {
    case 'PLOT_PIVOT_DATA':

    const now = new Date();
    let retestDiff = 15;
    let dayRetestDiff = 8;
    let sidewaysClearDiff = 7;
    let crudeBigDay = 90;
    let sidewaysMinimumHeight = 0;
    let sidewaysClearDiffRatio = 0.4;
    //let minimumSidewaysHeight = 15;
    let minimumSidewaysHeight = 10;
    let minimumSidewaysLength = 9;
    let smallDifMinHeight =20;
    let sidewaysCheckMinHeight = 20;
    let statelen = state.length;
    var minDiffForExtremeValidation = 4;

    


            if(statelen ==1){
            
               if(action.payload.y > state[0].y){
                   action.payload.lowest = state[0].y;
                   action.payload.highest = action.payload.y;
                   action.payload.sidecount = 0;
               }
               else if(action.payload.y < state[0].y){
                    action.payload.highest = state[0].y;
                    action.payload.lowest = action.payload.y;
                    action.payload.sidecount = 0;
               }
            }



            if(statelen == 2 ){



              if(state[0].y > state[1].y){

                //lower than 1

                 if(action.payload.y < state[1].y){
                       action.payload.highest = state[0].y;
                       action.payload.lowest =  action.payload.y;
                       action.payload.sidecount = 0;
                 }
                   

                //same as 1
                if(action.payload.y == state[1].y){

                    action.payload.highest = state[0].y;
                    action.payload.lowest = state[1].y;
                    action.payload.sidecount = 0;
                }

                // upper than 1
                 if(action.payload.y > state[1].y && action.payload.y >= state[0].y){

                    //condition to check inside here goes
                   

                    var diff = Math.abs(state[0].y - action.payload.y);
                    var sidewaysHeight =  Math.abs(state[0].y - state[1].y) ;
                    var diffHeightRatio = diff/sidewaysHeight;
                    var insideSideways = 0;

                    

                    if(sidewaysHeight <= minimumSidewaysHeight && sidewaysHeight > minimumSidewaysLength){
                          
                            if(diff< minimumSidewaysHeight){insideSideways = 1;}
                            else{ insideSideways = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ insideSideways = 0;}
                            else{insideSideways = 1;}
                    }
                    //alert(insideSideways);

                    if(insideSideways == 1){
                      //inside sideways
                       action.payload.highest = state[0].y;
                       action.payload.lowest =  state[1].y;
                       action.payload.sidecount = 1;
                    }
                    else{
                      //outside sideways
                       action.payload.lowest = state[1].y;
                       action.payload.highest = action.payload.y;
                       action.payload.sidecount = 0;
                    }
                   
                  }

                //between 0 and 1 

                  if(action.payload.y > state[1].y && action.payload.y < state[0].y ){

                      action.payload.lowest = state[1].y;
                      action.payload.highest = state[0].y;
                      action.payload.sidecount = 1;
                  }


              }
              else if(state[0].y < state[1].y){

                  //lower than 1

                 if(action.payload.y < state[0].y){

                  //condition to check inside here goes

                    var diff = Math.abs(state[0].y - action.payload.y);
                    var sidewaysHeight =  Math.abs(state[0].y - state[1].y) ;
                    var diffHeightRatio = diff/sidewaysHeight;
                    var insideSideways = 0;

                    if(sidewaysHeight <= minimumSidewaysHeight  && sidewaysHeight > minimumSidewaysLength){
                           
                            if(diff< minimumSidewaysHeight){insideSideways = 1;}
                            else{ insideSideways = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ insideSideways = 0;}
                            else{insideSideways = 1;}
                    }
                    //alert(insideSideways);

                    if(insideSideways == 1){
                      //outside sideways
                       action.payload.highest = state[1].y;
                       action.payload.lowest =  state[0].y;
                       action.payload.sidecount = 1;
                    }
                    else{
                      //inside sideways
                       action.payload.highest = state[1].y;
                       action.payload.lowest = action.payload.y;
                       action.payload.sidecount = 0;
                    }

                 }
                   

                //same as 1
                 if(action.payload.y == state[0].y){

                    action.payload.highest = state[1].y;
                    action.payload.lowest = state[0].y;
                    action.payload.sidecount = 0;
                 }

                // upper than 1
                 if(action.payload.y > state[0].y && action.payload.y > state[1].y){
                    action.payload.highest = action.payload.y;
                    action.payload.lowest = state[0].y;
                    action.payload.sidecount = 0;
                 }

                //between 0 and 1 

                  if(action.payload.y > state[0].y && action.payload.y < state[1].y ){

                      action.payload.lowest = state[0].y;
                      action.payload.highest = state[1].y;
                      action.payload.sidecount = 1;
                  }


                   }
              else if(state[0].y == state[1].y){
                      action.payload.lowest = state[0].y;
                      action.payload.highest = state[0].y;
                      action.payload.sidecount = 0;

              }
            
              /* if(action.payload.y > state[1].y && action.payload.y < state[0].y ){

                   action.payload.lowest = state[1].y;
                   action.payload.highest = state[0].y;
                   action.payload.sidecount = 1;
               }
               else if(action.payload.y == state[1].y && action.payload.y < state[0].y){
                    action.payload.highest = state[0].y;
                    action.payload.lowest = state[1].y;
                    action.payload.sidecount = 0;
               }
                else if(action.payload.y < state[1].y && state[1].y< state[0].y){
                    action.payload.highest = state[0].y;
                    action.payload.lowest =  action.payload.y;
                    action.payload.sidecount = 0;
               }
               else if(action.payload.y > state[1].y && action.payload.y > state[0].y && state[0].y > state[1].y){
                    action.payload.highest = action.payload.y;
                    action.payload.lowest = state[1].y;
                    action.payload.sidecount = 0;
               }


               if(action.payload.y > state[1].y && state[1].y > state[0].y ){
                   action.payload.lowest = state[0].y;
                   action.payload.highest = action.payload.y;
                   action.payload.sidecount = 0;
               }
               else if(action.payload.y == state[1].y && state[1].y > state[0].y){
                    action.payload.highest = state[1].y;
                    action.payload.lowest = state[0].y;
                    action.payload.sidecount = 0;
               }
                else if(action.payload.y < state[1].y && state[1].y > state[0].y){

                    var diff = state[1].y - action.payload.y;
                    var sidewaysHeight =  Math.abs(state[0].y - state[1].y) ;
                    var diffHeightRatio = diff/sidewaysHeight;
                    var insideSideways = 0;

                    if(sidewaysHeight <= 20){
                            if(diff< 20){insideSideways = 1;}
                            else{ insideSideways = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ insideSideways = 0;}
                            else{insideSideways = 1;}
                    }
                    alert(insideSideways);

                    if(insideSideways == 1){
                      //outside sideways
                       action.payload.highest = state[1].y;
                       action.payload.lowest =  state[0].y;
                       action.payload.sidecount = 1;
                    }
                    else{
                      //inside sideways
                       action.payload.highest = state[1].y;
                       action.payload.lowest = action.payload.y;
                       action.payload.sidecount = 0;
                    }
               }*/

            }

            

            if( state.length > 2 ){ 




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
                 
                   if(action.payload.y > state[statelen-1].y && action.payload.crudeTradeManagement != "trailing"){
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
                      action.payload.trend = '';
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
                      action.payload.trend = '';
                      let newstate = state.concat(action.payload);
                      return newstate ;

                   }

              }

                


              if(state[statelen-1].trend == 'sideways'){
                    //write logic of blackline setup here

                    //


                    if(action.payload.dir == "up" && state[statelen-1].highest < action.payload.y){
                      //alert('111');
                      //set this point as blackline to test 

                     //  

                      if(state[statelen-1].upblackextreme != undefined &&  state[statelen-1].upblackextreme != 0){
                        var diff = Math.abs(state[statelen-1].upblackextreme-action.payload.y );
                        
                        
                         if(diff <= retestDiff && state[statelen-1].ShortTradeInitiated != true ){
                         //  alert('up black point 1 is' + action.payload.x);
                           //normal bpb short

                            //; 

                            debugger;
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
                            //
                           // alert('up black point 2 is' + state[statelen-1].x);
                            //alert('up black point is ' + action.payload.x);

                            
                             // 
                             action.payload.highest = state[statelen-1].highest;                    
                             action.payload.lowest = state[statelen-1].lowest; 

                             if(action.payload.upblackextreme < action.payload.y){

                              ;
                                    action.payload.upblackextreme = action.payload.y;
                                    action.payload.UPblackpoint = action.payload.upblackextreme;
                             }
                             action.payload.upcount = state[statelen-1].upcount; 


                             
                             //action.payload.UPblackpointindex = action.payload.upblackextremeindex;
                               //

                               ;

                      }
                      else{ 

                           ;
                               
                            action.payload.upblackextreme = action.payload.y;
                            action.payload.UPblackpoint = action.payload.y;
                            action.payload.UPblackpointindex = action.payload.x;
                            action.payload.highest = state[statelen-1].highest;                    
                            action.payload.lowest = state[statelen-1].lowest;
                            action.payload.upcount = state[statelen-1].upcount; 

                            ;
                             //
                      }

                    }
                    else if(action.payload.dir == "low" && state[statelen-1].lowest > action.payload.y){
                        //set this point as blackline to test 
                       

                        if(state[statelen-1].lowblackextreme != undefined &&  state[statelen-1].lowblackextreme != 0 ){
                       
                          var diff = Math.abs(state[statelen-1].lowblackextreme-action.payload.y );
                         

                              if( diff <= retestDiff && state[statelen-1].LongTradeInitiated != true){
                                  //alert('low black point 1 is' + action.payload.x);

                                 // 

                                   //  alert('titli');

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

                              //  

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
                            // 
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
                         
                           // 

                           if((state[statelen-1].UPblackpoint <= action.payload.y || diff <= dayRetestDiff) && state[statelen-1].trend == 'sideways' && state[statelen-1].ShortTradeInitiated != true){
                               //normal bpb short
                                debugger;
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
                   // 

                    if(action.payload.x == 9){
                     // 

                    }


                    let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;
                    var diff = action.payload.y - state[statelen-1].highest ;
                    var sidewaysHeight =   state[statelen-1].highest -  state[statelen-1].lowest ;
                    var diffHeightRatio = diff/sidewaysHeight;

                    var check = 0;

                   /* if(sidewaysHeight <= 20){
                      alert('1234');
                            if(diff< 20){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                      alert('34567');
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }*/ 


                    


                    if(sidewaysHeight <= minimumSidewaysHeight  && sidewaysHeight > minimumSidewaysLength){
                           
                            if(diff< minimumSidewaysHeight){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }
                    


                    if(check == 0 && action.payload.crudeTradeManagement != "trailing"){

                    //  alert(action.payload.x);
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

                      ;
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 1; 

                        if(diff> minDiffForExtremeValidation){
                           action.payload.upblackextreme = action.payload.y;
                           action.payload.upblackextremeindex = action.payload.x;
                        }
                        

                      ;
                    }

                 }
              else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].highest && state[state.length-1].sidecount < 4 && state[statelen-1].upcount == 1 ){
                    //time to empty the swing and create a new swing 
                    //let breakoutlength =  Maths.abs(action.payload.y - state[statelen-1].y);
                    //let prevswinglength = state[statelen-1].highest - state[statelen-1].lowest;
                    //console.log('bonuuuuuuuuuuuuuuuuuuu');
                      // 

                     var tradeDir = action.payload.y - state[statelen-1].upblackextreme;
                     var sidewaysHeight =   state[statelen-1].highest -  state[statelen-1].lowest ;
                     var diff = action.payload.y - state[statelen-1].highest ;
                     var diffHeightRatio = diff/sidewaysHeight;
                     var check = 0;

                    

                    /*if(sidewaysHeight <= sidewaysCheckMinHeight){
                            if(diff< smallDifMinHeight){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }*/

                     if(sidewaysHeight <= minimumSidewaysHeight  && sidewaysHeight > minimumSidewaysLength){
                            if(diff< minimumSidewaysHeight){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }
                    
                    

                    if(check ==1 && Math.abs(tradeDir) <= 5){
                      alert('1');
                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 

                    }
                    else{
                     

                      action.payload.downcount = 0; 
                      action.payload.upcount = 0; 
                      action.payload.sidecount = 0; 
                      action.payload.highest = action.payload.y;                    
                      action.payload.lowest = state[statelen-1].y;
                      action.payload.upblackextreme = 0;
                      action.payload.lowblackextreme = 0;
                      action.payload.UPblackpoint = 0;
                      action.payload.Lowblackpoint = 0;  
                      action.payload.trend = '';

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
              else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].lowest && (state[statelen-1].downcount == undefined || state[statelen-1].downcount ==0)  && state[state.length-1].sidecount < 4){
                   
                    var diff = state[statelen-1].lowest - action.payload.y;
                    var sidewaysHeight =   state[statelen-1].highest -  state[statelen-1].lowest ;
                    var diffHeightRatio = diff/sidewaysHeight;
                    var check = 0;

                   /* if(sidewaysHeight <= sidewaysCheckMinHeight){

                            if(diff< smallDifMinHeight){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }*/

                    if(sidewaysHeight <= minimumSidewaysHeight  && sidewaysHeight > minimumSidewaysLength){
                           
                            if(diff< minimumSidewaysHeight){check = 1;}
                            else{ check = 0;}
                    }
                    else{
                            if(diffHeightRatio >= sidewaysClearDiffRatio ){ check = 0;}
                            else{check = 1;}
                    }
                    
                    
                    //

                    if( check == 0 && (action.payload.downcount == 0 || action.payload.downcount == undefined)){

                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;
                       action.payload.upblackextreme = 0;
                       action.payload.lowblackextreme = 0;
                       action.payload.UPblackpoint = 0;
                       action.payload.Lowblackpoint = 0; 
                       action.payload.trend = '';
                     }
                     else{
                         
                       action.payload.sidecount = state[state.length-1].sidecount +1;                    
                       action.payload.highest = state[statelen-1].highest;                    
                       action.payload.lowest = state[statelen-1].lowest; 
                       

                       if(Math.abs(action.payload.y-action.payload.lowest) >= 4){
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

                if(state[statelen-1].Lowblackpoint - action.payload.y > retestDiff && action.payload.crudeTradeManagement != "trailing"){
                       //  
                      
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
                       action.payload.trend = '';

                }

                      

                }  
                 else if(action.payload.dir == "up" && action.payload.y > state[statelen-1].UPblackpoint && (state[statelen-1].retesthappen == true)){
              //now time to clear sideways context and make a new trend all together
                 
                // alert(' up diff is');
                 //alert(state[statelen-1].UPblackpoint - action.payload.y );
                // alert('x');

                    if(action.payload.LongTradeInitiated !== undefined || action.payload.ShortTradeInitiated !== undefined){

                       if(action.payload.LongTradeInitiated == false){

                  if(action.payload.y - state[statelen-1].UPblackpoint> retestDiff  && action.payload.crudeTradeManagement != "trailing"){
                     //  
                        
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
                       action.payload.trend = '';



                       }



                       }

                    }

                 
                 

                } 

                  else if(action.payload.dir == "low" && action.payload.y < state[statelen-1].lowest && state[state.length-1].sidecount < 4 && state[statelen-1].downcount == 1 ){
                    //time to empty the swing and create a new swing 
                    
                     var diff = state[statelen-1].lowest - action.payload.y;
                     //var tradeDir = state[statelen-1].upblackextreme;
                     //ashutosh singh
                    // 

                     if(diff <= retestDiff){
                     //mark it as inside sideways


                        action.payload.sidecount = state[state.length-1].sidecount +1;                      
                        action.payload.highest = state[statelen-1].highest;                    
                        action.payload.lowest = state[statelen-1].lowest; 
                        action.payload.upcount = 0; 
                     }
                     else{

                       //
                       action.payload.downcount = 0; 
                       action.payload.sidecount = 0; 
                       action.payload.upcount = 0; 
                       action.payload.highest = state[statelen-1].y;                    
                       action.payload.lowest = action.payload.y;
                       action.payload.trend = '';

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

                     if(action.payload.highest-action.payload.lowest > sidewaysMinimumHeight){
                                 action.payload.trend = 'sideways';
                                 if(state[statelen-1].UPblackpoint != undefined){

                                  ;
                                      action.payload.UPblackpoint = state[statelen-1].UPblackpoint;
                                  }

                                 if(state[statelen-1].Lowblackpoint != undefined){
                                      action.payload.Lowblackpoint = state[statelen-1].Lowblackpoint;               
                                  }
 
                     }
                     else{
                           //time to empty sideways

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


           
          
             let newstate = state.concat(action.payload);
               return newstate ;
          }
          return state;
  }

