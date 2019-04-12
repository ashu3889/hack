export default function(state = [], action) {
    switch (action.type) {

        case 'ADD_DATA_SCOPE_JD':
            // alert('asuss');

            let length = state.length;
            let direction = '';
            const now = new Date();
            let statelen = state.length;
            let shift = action.payload.shift;
            let exitTradeInitiated = false;

            if (statelen == 0 || shift === 1) {
                

                // debugger;
                action.payload.highest = action.payload.high;
                action.payload.lowest = action.payload.low;

                if(statelen > 0){

                       if (state[statelen - 1].cumProfit != undefined) {
                            action.payload.cumProfit = state[statelen - 1].cumProfit;
                       }

                       if (state[statelen - 1].highest != undefined) {
                           action.payload.highest =action.payload.high;
                        }

                       if (state[statelen - 1].lowest != undefined) {
                            action.payload.lowest = action.payload.low;
                       } 

                       

                }



                action.payload.openHigh = action.payload.high;
                action.payload.openLow =  action.payload.low;

                action.payload.shift = shift;
                action.payload.loss = undefined;
                action.payload.profit = undefined;
                action.payload.tradeStop = undefined;
                action.payload.tradeTarget = undefined;
                action.payload.tradePrice = undefined;
                action.payload.onGoingTradeDirection = undefined;

            //    let newstate1 = newstatedata.concat(action.payload);
                //alert('returning new state');

                var newstate = state.concat(action.payload);
                return newstate;

            }




            if (length >= 1 && shift === 0) {
                // check the direction and add it in candle

               /// debugger;

                //babu code condition start

                //code to check if we are still in position or not

                if (state[statelen - 1].cumProfit != undefined) {
                    action.payload.cumProfit = state[statelen - 1].cumProfit;
                }


                if (state[statelen - 1].loss != undefined) {
                    action.payload.loss = state[statelen - 1].loss;
                }

                if (state[statelen - 1].profit != undefined) {
                    action.payload.profit = state[statelen - 1].profit;
                }

                


                if (state[statelen - 1].highest != undefined) {
                    action.payload.highest = state[statelen - 1].highest;
                }

                if (state[statelen - 1].lowest != undefined) {
                    action.payload.lowest = state[statelen - 1].lowest;
                }


                //now checking highest and lowest
                if (action.payload.high > state[statelen - 1].highest) {
                  //debugger;
                    action.payload.highest = action.payload.high;
                }

                if (action.payload.low < state[statelen - 1].lowest) {
                    action.payload.lowest = action.payload.low;
                }


                if (state[statelen - 1].tradeStop != undefined) {
                    action.payload.tradeStop = state[statelen - 1].tradeStop;
                }

                if (state[statelen - 1].tradeTarget != undefined) {
                    action.payload.tradeTarget = state[statelen - 1].tradeTarget;
                }

                if (state[statelen - 1].tradePrice != undefined) {
                    action.payload.tradePrice = state[statelen - 1].tradePrice;
                }


                if (state[statelen - 1].openHigh != undefined) {
                    action.payload.openHigh = state[statelen - 1].openHigh;
                }

                if (state[statelen - 1].openLow != undefined) {
                    action.payload.openLow = state[statelen - 1].openLow;
                }


               
                //action.payload. 


                //check condition for stop loss hit or not here asap

                if (state[statelen - 1].onGoingTradeDirection != undefined) {
                    action.payload.onGoingTradeDirection = state[statelen - 1].onGoingTradeDirection;

                       var ohlcLow = action.payload.low;
                       var ohlcHigh = action.payload.high;
                       var tradeTarget = action.payload.tradeTarget;
                       var tradeStop = action.payload.tradeStop;
                       var tradePrice = action.payload.tradePrice;
                       var hour = action.payload.hour;
                       var minute = action.payload.minute;
                       var ohlcClose = action.payload.close;


                      if(action.payload.onGoingTradeDirection == 'buy'){

                                  

                                  if(state[statelen-1].tradeFire === true && state[statelen-1].exitTradeInitiated === undefined){
                                     //debugger;

                                            if(action.payload.tickType == "red" ){
                                                 //exit the trade asap
                                                   alert('exiting the trade asap');
                                                   action.payload.exitTradeInitiated = true;
                                                   action.payload.onGoingTradeDirection = undefined;
                                                   action.payload.tradeTarget = undefined;
                                                   action.payload.tradeStop = undefined;
                                                   action.payload.tradePrice = undefined;
                                                  // action.payload.loss = Math.abs(tradePrice-ohlcClose);

                                                    if(action.payload.close >= tradePrice){
                                                        action.payload.profit = Math.abs(tradePrice-action.payload.close);
                                                        var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                                        action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                                        action.payload.loss = 0;
                                                    }
                                                    if(action.payload.close < tradePrice){
                                                     // debugger;
                                                       action.payload.profit = 0;
                                                       action.payload.loss = Math.abs(tradePrice-action.payload.close);
                                                       var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                                       action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                                     }

                                                    let newstate = state.concat(action.payload);
                                                    return newstate;
                                                  //  action.payload.cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                            }

                                   }





                                   if (ohlcLow < tradeTarget && tradeTarget < ohlcHigh) {
                                          alert('hurray target hit');
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          action.payload.profit = Math.abs(tradeTarget-tradePrice);
                                          action.payload.loss = 0;
                                          var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                          action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));

                                    }
                                    if (ohlcLow < tradeStop && tradeStop < ohlcHigh) {
                                          alert('ohhh stop got hit');
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          action.payload.loss = Math.abs(tradePrice-tradeStop);
                                          action.payload.profit = 0;
                                          var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                          action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                    }
                                    if(hour == 15 && minute ==10){
                                         //debugger;
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          if(action.payload.close >= tradePrice){
                                            action.payload.profit = 0;
                                            action.payload.loss = Math.abs(tradePrice-action.payload.close);
                                            var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                            action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                          }
                                          if(action.payload.close < tradePrice){
                                            action.payload.loss = 0;
                                            action.payload.profit = Math.abs(tradePrice-action.payload.close);
                                            var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                            action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                          }
                                    }


                       }


                       if(action.payload.onGoingTradeDirection == 'sell'){



                                  if(state[statelen-1].tradeFire === true && state[statelen-1].exitTradeInitiated === undefined){
                                     //debugger;

                                            if(action.payload.tickType == "green" ){
                                                 //exit the trade asap
                                                   alert('exiting the trade asap');
                                                   action.payload.exitTradeInitiated = true;
                                                   action.payload.onGoingTradeDirection = undefined;
                                                   action.payload.tradeTarget = undefined;
                                                   action.payload.tradeStop = undefined;
                                                   action.payload.tradePrice = undefined;
                                                  // action.payload.loss = Math.abs(tradePrice-ohlcClose);

                                                    if(action.payload.close < tradePrice){
                                                        action.payload.loss = 0;
                                                        action.payload.profit = Math.abs(tradePrice-action.payload.close);
                                                        var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                                        action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                                    }
                                                    if(action.payload.close >= tradePrice){
                                                     // debugger;
                                                       action.payload.profit = 0;
                                                       action.payload.loss = Math.abs(tradePrice-action.payload.close);
                                                       var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                                       action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                                     }

                                                    let newstate = state.concat(action.payload);
                                                    return newstate;
                                                  //  action.payload.cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                            }

                                   }

                              







                                   if (ohlcLow < tradeTarget && tradeTarget < ohlcHigh) {
                                          alert('hurray target hit');
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          action.payload.loss = 0;
                                          action.payload.profit = Math.abs(tradeTarget-tradePrice);
                                          var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                          action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));

                                    }
                                    if (ohlcLow < tradeStop && tradeStop < ohlcHigh) {
                                          alert('ohhh stop got hit');
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          action.payload.profit = 0;
                                          action.payload.loss = Math.abs(tradePrice-tradeStop);
                                          var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                          action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                    }
                                    if(hour == 15 && minute ==10){
                                        //  debugger;
                                          action.payload.onGoingTradeDirection = undefined;
                                          action.payload.tradeTarget = undefined;
                                          action.payload.tradeStop = undefined;
                                          action.payload.tradePrice = undefined;
                                          if(action.payload.close >= tradePrice){
                                            action.payload.loss = Math.abs(tradePrice-action.payload.close);
                                            action.payload.profit = 0;
                                            var cumProfit = state[statelen - 1].cumProfit - action.payload.loss;
                                            action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                          }
                                          if(action.payload.close < tradePrice){
                                             action.payload.loss = 0;
                                            action.payload.profit = Math.abs(tradePrice-action.payload.close);
                                            var cumProfit = state[statelen - 1].cumProfit + action.payload.profit;
                                            action.payload.cumProfit =  parseFloat(cumProfit.toFixed(4));
                                          }
                                    }
                      }
                }



                


                //babu code condition ends


                //babu enfingle condition starts

                let minuteDiff = Math.abs(action.payload.minute - state[statelen-1].minute);

                if ( minuteDiff ==5 ) {
                    action.payload.spy = true;
                }
                if ( minuteDiff > 5 ) {
                    action.payload.spy = false;
                }

                // start code for algo here ASAP

                if(action.payload.spy === true ){
                    //write code for algo detection here asap
                    //for down condition
                    
                    //down buy condition

                     var diff = action.payload.close - state[statelen-1].high;
                     var percDiff = Number(((diff/state[statelen-1].close) * 100).toFixed(3)) ;
                  //  debugger;

                    if((state[statelen-1].lowest === state[statelen-1].low) && (action.payload.close > state[statelen-1].high) && Math.abs(percDiff) > 0.1 && state[statelen-1].tickType === "red" && action.payload.tickType === "green"){
                         
                          debugger;
                         if(statelen>=2){
                   

                           let diff = Math.abs(state[statelen-1].low - state[statelen-1].openLow);
                           var perc = Number(((diff/state[statelen-1].openLow) * 100).toFixed(3)) ;
                           var targetVal = state[statelen-1].openHigh/100;

                           

                               //state[statelen-1].spy
                          //condition to check last three candles
                             if(state[statelen-1].tickType =="red" && state[statelen-2].tickType =="red" && perc > 0.3 && state[statelen-1].spy !== false){
                                  
                                   action.payload.tradeFire = true;
                                   action.payload.tradeFireType = 'buy';
                                   action.payload.tradePrice = action.payload.high;
                                   action.payload.tradeStop = state[statelen-1].lowest - 2;
                                   action.payload.tradeTarget = action.payload.high + targetVal;
                                   action.payload.onGoingTradeDirection = 'buy';
                             }

                         }


                         
                    }

                     //up sell condition

                     var diff = action.payload.close - state[statelen-1].low;
                     var percDiff = Number(((diff/state[statelen-1].close) * 100).toFixed(3)) ;
                   // debugger;

                    if((state[statelen-1].highest === state[statelen-1].high) && Math.abs(percDiff) > 0.1 && (action.payload.close < state[statelen-1].low) && state[statelen-1].tickType === "green" && action.payload.tickType === "red"){
                         // debugger;   

                         

                         if(statelen>=2){
                                
                                let diff = Math.abs(state[statelen-1].high - state[statelen-1].openHigh);
                                var perc = Number(((diff/state[statelen-1].openHigh) * 100).toFixed(3)) ;
                                var targetVal = state[statelen-1].openHigh/100;

                               // debugger;

                              if(state[statelen-1].tickType =="green" && state[statelen-2].tickType =="green" && perc > 0.3 && state[statelen-1].spy !== false){

                                action.payload.tradeFire = true;
                                action.payload.tradeFireType = 'sell';
                                action.payload.tradePrice = action.payload.low;
                                action.payload.tradeStop = state[statelen-1].highest + 2;
                                action.payload.tradeTarget = action.payload.low - targetVal;
                                action.payload.onGoingTradeDirection = 'sell';
                              }



                         }

                          
                    }

                }

                

                //babu enfingle condition ends




                if (state[state.length - 1].high < action.payload.high) {
                    //up direction
                    direction = 'up';
                } else if (state[state.length - 1].high > action.payload.high) {
                    //down direction
                    direction = 'down';
                } else if (state[state.length - 1].high == action.payload.high) {
                    return state;
                }


                if (direction == 'up') {
                    action.payload.y = action.payload.high;
                } else if (direction == 'down') {
                    action.payload.y = action.payload.low;
                } else {
                    action.payload.y = action.payload.close;
                }




                if ((state[state.length - 1].high >= action.payload.high) && (state[state.length - 1].low <= action.payload.low)) {

                    return state;

                } else {
                    //DETETC UPWARD INFLECTION AND DOWNWARD
                    //CHECK ONLY IF LENGTH IS GREATER THAN 3
                    if (length > 4) {
                        //if new one is 
                        let prevone = state[state.length - 1].direction;
                        let beforeprevone = state[state.length - 2].direction;
                        let swingHigh = state[state.length - 1].swingHigh;
                        let swingLow = state[state.length - 1].swingLow;



                        if (direction == prevone && beforeprevone != prevone && direction != "same") {

                            //ideal condition
                            //condition of inflection treend will be decided by direction

                            if (direction == "down") {
                                action.payload.trend = "downtrend";
                                action.payload.pivot = state[state.length - 2].high;
                                action.payload.dir = 'up';
                            } else if (direction == "up") {
                                action.payload.trend = "upward";
                                action.payload.pivot = state[state.length - 2].low;
                                action.payload.dir = 'low';
                            }

                        } else if (direction == "same" && state[state.length - 1].direction == "same") {
                            //condition to remove same candles from data                          
                            if (action.payload.y == state[state.length - 1].close) {
                                //same candle alert  remove this state                             
                                return state;
                            }
                        } else if (direction != prevone && direction == beforeprevone) {
                            // debugger;
                            if (direction == "up") {
                                if (state[state.length - 2].high >= action.payload.high) {
                                    return state;
                                } else if (state[state.length - 2].high < action.payload.high) {
                                    //time to remove the state here
                                    let statelength = state.length - 1;
                                    let newstatedata = state.filter(function(item, index) {
                                        return index !== statelength
                                    });
                                    action.payload.time = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
                                    action.payload.x = newstatedata.length + 1;
                                    action.payload.direction = direction;
                                    action.payload.y = action.payload.high;
                                    let newstate1 = newstatedata.concat(action.payload);
                                    return newstate1;
                                }
                            } else if (direction == "down") {

                                if (state[state.length - 2].low <= action.payload.low) {
                                    return state;
                                } else if (state[state.length - 2].low > action.payload.low) {
                                    //time to remove the state here
                                    let statelength = state.length - 1;
                                    let newstatedata = state.filter(function(item, index) {
                                        return index !== statelength
                                    });
                                    action.payload.time = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
                                    action.payload.x = newstatedata.length + 1;
                                    action.payload.y = action.payload.low;
                                    action.payload.direction = direction;
                                    let newstate1 = newstatedata.concat(action.payload);
                                    return newstate1;
                                }
                            }
                        }
                    }


                    action.payload.time = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
                    action.payload.x = state.length + 1;
                    action.payload.direction = direction;
                    let newstate = state.concat(action.payload);
                    return newstate;
                }
            }


            //plot x and y based on time 
            action.payload.trend = "";
            action.payload.time = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
            action.payload.x = 1;
            let newstate = state.concat(action.payload);
            return newstate;


    }

    return state;
}