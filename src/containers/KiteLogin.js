	import React ,{Component} from 'react';		
		import { connect } from "react-redux";
    import {KiteTicker} from 'kiteconnect';
    import {getAcessToken ,addTickDataTest, pivotDataTest,removeTickDataTest, removePlotdatatest} from '../action/action.js';
    import { withRouter } from "react-router-dom"; 
    import KitePlot from './plot.js'; 

    import LineApp from './lineplot.js';

    import * as KiteConnect  from './connect.js';
    //https://www.dukascopy.com/swiss/english/marketwatch/historical/

     let testdata = '';
     let count = 1;
     let access_token_const =0;

		export  class KiteLogin extends Component{

		  constructor(props){


        
              super(props);
               this.state ={
                token : '',  
               timecount : 0  ,
               tickdata : '', 
               pivotpoint : 0, 
               minPivot : 0,
               maxPivot : 0,  
               sidewaysCount: 0,
               minblackpivot : 0,
               maxblackpivot : 0,
               tradeTime :0,  
               teststartindex : 0,
               testendindex : 0,
               inputValue: '', 
               detectpoint : 0,
                
              };
            }

           updateInputValue(evt) {
               this.setState({
                 inputValue: evt.target.value
                });


             }

             updatedIndex(){
                  count =1;
                  this.nextData(this.state.inputValue);
             }

            componentWillReceiveProps(nextProps) {


              //trigger order code
              let strlen = this.props.trendData.length-1;

              if((this.props.trendData)!=undefined){

                  if(strlen>= 1){ 

                     if(this.props.trendData[strlen].TimeToEnter == true){
        
                        // alert(this.props.trendData[strlen].x);
                           //this.placeorder();
           //code to set and get the data

           //t45f9mr9r3jvbkgyg423hf5il90399el
           
                var api_key = "vlu1o53tt1makdu3",
             secret = "t45f9mr9r3jvbkgyg423hf5il90399el",
             request_token = this.state.token;
             let access_token = ''; 

             var options = {
               "api_key": api_key,
               "debug": false,
               "access_token" : access_token_const,
             };   

             let kc = new KiteConnect(options);

             kc.placeOrder("regular", {
               "exchange": "NSE",
               "tradingsymbol": "RELIANCE",
               "transaction_type": "BUY",
               "quantity": 1,
               "product": "MIS",
               "order_type": "MARKET"
             }).then(function(resp) { 
                console.log(resp);
              }).catch(function(err) {
                console.log(err);
             }); 
    //code to set and get the data   */ 



                     }

                 }

              }

               
  let len = nextProps.tickCombo.length-1;
  
  if((this.props.tickCombo)!=undefined){

     if((nextProps.tickCombo).length >= 1){ 
      
      if(nextProps.tickCombo[len].pivot != undefined ){

        debugger;

        //write condition to enter the trade
       if(nextProps.tickCombo[len].TimeToEnter == true){

        

        }

        if(this.state.pivotpoint != nextProps.tickCombo[len].pivot){                     
                this.setState({pivotpoint: nextProps.tickCombo[len].pivot});
                let datainput = {x : count , y :  nextProps.tickCombo[len].pivot ,dir : nextProps.tickCombo[len].dir, time :nextProps.tickCombo[len].ticktmoment};
                this.props.pivotDataTest(datainput);
                count = count +1;
        }        
         
      }

            
     }
  }  
            }
            

           nextData(a){
           
            this.setState({teststartindex : a});
            this.props.removeTickDataTest(); 
            this.props.removePlotdatatest(); 
            this.startfetchingdata();
           }

            

            startfetchingdata(){

              alert('ranuuuuuuu');
             
              var self = this;
             let  WSS_ROOT_URL = 'ws://localhost:4000/echo';
             // let accessdata = this.props.access.access_token.access_token;
              var ws = new WebSocket(`${WSS_ROOT_URL}`);
              //alert(accessdata);

                ws.onclose = function(){

                }

               ws.onopen = function (event) {
               // alert('on open');

                   self.startfetchingdata();
                   var message = {"a": "subscribe", "v": [779521]};

                   ws.send(JSON.stringify(message));
              };

              ws.onmessage = function(e) {

                 alert('message received');
                  debugger;

                  testdata = e.data;
                  splitData(testdata , self);
              }

              function splitData(data, scope){
               // debugger;
                var parsedata = JSON.parse(data)
                var len = parsedata.length;
                var tickLength = 0;
                //debugger;
                //alert(parsedata.length);
                
                //scope.props.addTickData(data);

                let stateindex = 145 + (self.state.teststartindex*288);
                let endindex =  276 + (self.state.teststartindex*288);


                 for(var i = 0; i < len-1 ; i++){

                  if(i >= stateindex && i <= endindex){
                    var tickType = '';
                    var tickarray = '';
                    if(parsedata[i].Open  < parsedata[i].Close){
                          tickType ="green";
                    }
                    else if(parsedata[i].Open  > parsedata[i].Close){
                        tickType ="red";
                    }
                    else if(parsedata[i].Open  = parsedata[i].Close){
                        tickType ="doji";
                    }

                   // debugger;
                    var ticktmoment = parsedata[i]["Local time"].substring(20,11);


                    tickLength = Math.abs(parsedata[i].High-parsedata[i].Low);
                    tickarray = {"open" : parsedata[i].Open ,"low" :parsedata[i].Low ,"high" :parsedata[i].High , "close" : parsedata[i].Close ,"tickType" :tickType ,'tickLength' : tickLength,"ticktmoment" :ticktmoment};
                    scope.props.addTickDataTest(tickarray);
                  }
                 }
               }
            }


		
		  render(){
        //alert(JSON.stringify(this.props.tickCom));
        //t45f9mr9r3jvbkgyg423hf5il90399el

		    return(
		       <div>
		          <p>Start login</p> 

              <div>

             <a href="https://kite.trade/connect/login?v=3&api_key=vlu1o53tt1makdu3" target="_blank"> Login redirect</a>

              </div>
            
        
             <div>

              <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
              
              <button onClick = {() => this.updatedIndex()} >Get Updated index</button>

             </div>
     
    

        

             <div>
                   {
                      (  this.props.tickCombo != undefined  &&  this.props.tickCombo.length >=1)
                        ?   <KitePlot title="Crude" plotdata ={this.props.tickCombo}/> 
                        : ''
                    } 

                    {
                      (  this.props.tickCombo != undefined  &&  this.props.tickCombo.length >=1)
                        ?   <LineApp  title = "Trend" plotdata ={this.props.trendData}/>
                        : ''
                    } 




             </div>

		          
		        </div>
          )
		    }
		}



  function mapStateToProps(state){
      return  {
         access : state.access ,  
         tickCombo : state.tickDataTest, 
         trendData : state.plDataTest,
       }
    };


     export default connect(mapStateToProps,{addTickDataTest,pivotDataTest,removeTickDataTest,removePlotdatatest})(KiteLogin);


