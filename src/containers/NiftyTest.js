    import React ,{Component} from 'react';   
    import { connect } from "react-redux";
    import {KiteTicker} from 'kiteconnect';
    import {getAcessToken ,addTickData ,pivotData} from '../action/action.js';
    import { withRouter } from "react-router-dom"; 
    import KitePlot from './plot.js'; 
    import LineApp from './lineplot.js';
    import * as KiteConnect  from './connect.js';



    let count = 1;
     let access_token_const =0;
    export  class LoginNav extends Component{
     

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

              }
            }

            startGeneratingServerSession(){ 

            var api_key = "ypmxayteat7agml9",
             secret = "0ob46jtno6x3vqixhkmn5ok5qhp1eyax",
             request_token = this.state.token;
             let access_token = ''; 

             var options = {
               "api_key": api_key,
               "debug": false
             };   

            let kc = new KiteConnect(options);   

              if(!access_token) {
                  kc.generateSession(request_token, secret)
                    .then(function(response) {
                      access_token_const = response.access_token;
                                        

                     kc.setAccessToken(access_token_const);
                                       
                    
                    })
                 .catch(function(err) {
                    // alert('error here');
                     console.log(err);
                  })
              } 
              else {
               alert('else');
               kc.setAccessToken(access_token);

              }
              
            }




           


      componentDidMount(){
                 let base_url = window.location.host ;
                 localStorage.setItem('token', this.getUrlParameter('request_token'));
                 this.setState({token : this.getUrlParameter('request_token')});
                 

                
            }

            onTick(ticks) {
                       console.log("Ticks", ticks);
               }

            onConnect(d) {
                d.subscribe([53718791]);
                d.setMode(d.modeFull, [53718791]);
              }

            getUrlParameter = (name) => {
                   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                   let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                   let results = regex.exec(window.location.search);
                   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            };

           

componentWillReceiveProps(nextProps) {
  
  let len = nextProps.tickCombo.length-1;
  
  if((this.props.tickCombo)!=undefined){

   

//code to set and get the data
            var api_key = "ypmxayteat7agml9",
             secret = "0ob46jtno6x3vqixhkmn5ok5qhp1eyax",
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
    //code to set and get the data          

















     if((nextProps.tickCombo).length >= 1){ 
      
      if(nextProps.tickCombo[len].pivot != undefined ){

        if(this.state.pivotpoint != nextProps.tickCombo[len].pivot){
      

          if(this.state.sidewaysCount == 4){
                  this.sidewaysFormed();
          }



        //code to identify min and max pivot sidewaysCount
         if(nextProps.tickCombo[len].trend == 'downtrend'){
                
                //check if max pivot is there
                if(this.state.maxPivot == 0){
                     this.setState({maxPivot: nextProps.tickCombo[len].pivot});
                }
                else if(this.state.maxPivot > nextProps.tickCombo[len].pivot){
                      this.setState({sidewaysCount: this.state.sidewaysCount+1});
                }
                else if(this.state.maxPivot < nextProps.tickCombo[len].pivot){
                  //here we have to check the conditon of black line retets

                  if(this.state.sidewaysCount >= 4){
                    //blackline retets point which is IMP to us
                    let upperpivot = nextProps.tickCombo[len].pivot;

                     if(this.state.maxblackpivot == 0){
                        alert('blackline upward pivot reached');
                        this.setState({maxblackpivot: upperpivot});
                     }
                     else if(this.state.maxblackpivot != 0 && (this.state.maxblackpivot <= upperpivot)){
                          let now = new Date();
                          let timenow =  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                        
                          alert('Entry point upwards reached at blackline retest');
                          alert(timenow);

                          //time to clear sideways and start new sideways
                           this.setState({sidewaysCount: 0}); 
                           this.setState({minPivot: 0}); 
                           this.setState({maxPivot: 0}); 
                           this.setState({minblackpivot: 0}); 
                           this.setState({maxblackpivot: 0}); 
                           this.setState({tradeTime: timenow}); 

                     }
                     //write condition of retest
                        
                  }
                   else if(this.state.sidewaysCount <= 4){

                     let upPivot = nextProps.tickCombo[len].pivot;
                     let diff = this.state.maxPivot - upPivot;
                     if(Math.abs(diff) <5){
                         alert('count it as sideways' + this.state.maxPivot);
                         this.setState({sidewaysCount: this.state.sidewaysCount+1});
                     }
                     else{
                      //time to clear sideways and start new sideways
                        this.setState({sidewaysCount: 0}); 
                        this.setState({minPivot: 0}); 
                        this.setState({maxPivot: 0}); 
                        this.setState({minblackpivot: 0}); 
                        this.setState({maxblackpivot: 0}); 
                     }

                   }
                  else{
                     //time to clear sideways and start new sideways
                        this.setState({sidewaysCount: 0}); 
                        this.setState({minPivot: 0}); 
                        this.setState({maxPivot: 0}); 
                        this.setState({minblackpivot: 0}); 
                        this.setState({maxblackpivot: 0}); 

                  }
                     
                }

              
         }
         else if(nextProps.tickCombo[len].trend == 'upward'){
                
                //check if min pivot is there
                if(this.state.minPivot == 0){
                     this.setState({minPivot: nextProps.tickCombo[len].pivot});
                }
                else if(this.state.minPivot < nextProps.tickCombo[len].pivot){
                      this.setState({sidewaysCount: this.state.sidewaysCount+1});
                }
                else if(this.state.minPivot > nextProps.tickCombo[len].pivot){
                  //here we have to check the conditon of black line retets

                  if(this.state.sidewaysCount>= 4){

                      let lowerpivot = nextProps.tickCombo[len].pivot;
                    //blackline retets point which is IMP to us
                      if(this.state.minblackpivot == 0){
                        alert('blackline downward pivot reached');
                        this.setState({minblackpivot: lowerpivot});
                     }
                     else if(this.state.minblackpivot != 0 && (this.state.minblackpivot >= lowerpivot)){
                      const now = new Date();
                      let timenow =  now.getHours().toString()   + now.getMinutes().toString() + now.getSeconds().toString();
                             alert('Entry point downwards reached at black line retest');
                             alert(timenow);

                              //time to clear sideways and start new sideways
                           this.setState({sidewaysCount: 0}); 
                           this.setState({minPivot: 0}); 
                           this.setState({maxPivot: 0}); 
                           this.setState({minblackpivot: 0}); 
                           this.setState({maxblackpivot: 0}); 
                           this.setState({tradeTime: timenow});
                     }
                        
                  }
                   else if(this.state.sidewaysCount <= 4){

                     let downPivot = nextProps.tickCombo[len].pivot;
                     let diff = this.state.minPivot - downPivot;
                     if(Math.abs(diff) < 5){
                      alert('count it as sideways' + this.state.minPivot);
                         this.setState({sidewaysCount: this.state.sidewaysCount+1});
                     }
                    else{
                      //time to clear sideways and start new sideways
                        this.setState({sidewaysCount: 0}); 
                        this.setState({minPivot: 0}); 
                        this.setState({maxPivot: 0}); 
                        this.setState({minblackpivot: 0}); 
                        this.setState({maxblackpivot: 0}); 
                     }

                   }
                  else{
                    //normal uptrend condition
                    //time to clear sideways and start new sideways
                        this.setState({sidewaysCount: 0}); 
                        this.setState({minPivot: 0}); 
                        this.setState({maxPivot: 0}); 
                        this.setState({minblackpivot: 0}); 
                        this.setState({maxblackpivot: 0}); 
                  }
                     
                }
         }
                          
              this.setState({pivotpoint: nextProps.tickCombo[len].pivot});
                let datainput = {x : count , y :  nextProps.tickCombo[len].pivot};
                this.props.pivotData(datainput);
                count = count +1;
        }
         
         
      }

            
     }
  }  
}

sidewaysFormed(data){
 alert('sideways Formed');
}



            newWebsocketMETHOD(){
              var self  = this;
             
            var root = "wss://ws.kite.trade/";
    //var self = this.state;
    var read_timeout = 5, // seconds
    reconnect_max_delay = 0,
    reconnect_max_tries = 0,

    // message flags (outgoing)
    mSubscribe = "subscribe",
    mUnSubscribe = "unsubscribe",
    mSetMode = "mode",

    // incoming
    mAlert = 10,
    mMessage = 11,
    mLogout = 12,
    mReload = 13,
    mClearCache = 14,

    // public constants
    modeFull  = "full", // Full quote including market depth. 164 bytes.
    modeQuote = "quote", // Quote excluding market depth. 52 bytes.
    modeLTP   = "ltp";

  // public constants
  /**
   * @memberOf KiteTicker
   * @desc Set mode full
   */
  this.modeFull = modeFull;

  /**
   * @memberOf KiteTicker
   * @desc Set mode quote
   */
  this.modeQuote = modeQuote;

  /**
   * @memberOf KiteTicker
   * @desc Set mode LTP
   */
  this.modeLTP = modeLTP;

  var ws = null,
    triggers = {"connect": [],
          "ticks": [],
          "disconnect": [],
          "error": [],
          "close": [],
          "reconnect": [],
          "noreconnect": [],
          "message": [],
          "order_update": []},
    read_timer = null,
    last_read = 0,
    reconnect_timer = null,
    auto_reconnect = false,
    current_reconnection_count = 0,
    last_reconnect_interval = 0;
    var current_ws_url = null,
    token_modes = {},
    defaultReconnectMaxDelay = 60,
    defaultReconnectMaxRetries = 50,
    maximumReconnectMaxRetries = 300,
    minimumReconnectMaxDelay = 5;

  // segment constants
  var NseCM = 1,
    NseFO = 2,
    NseCD = 3,
    BseCM = 4,
    BseFO = 5,
    BseCD = 6,
    McxFO = 7,
    McxSX = 8,
    Indices = 9;

    var tickcount = 0,
    ticklow = 0,
    tickhigh = 0,
    tickopen = 0,
    tickarray =[],
    tickType =0,
    tickLength = 0,
    tickclose = 0;



  

    this.connect = function() {

       
      
     
              let  WSS_ROOT_URL = 'wss://ws.kite.trade?api_key=ypmxayteat7agml9&access_token=';
             // let accessdata = this.props.access.access_token.access_token;
              var ws = new WebSocket(`${WSS_ROOT_URL}${access_token_const}`);
              //alert(accessdata);

              ws.onclose = function(){

              }

               ws.onopen = function (event) {
                   var message = {"a": "subscribe", "v": [53767943]};
                   ws.send(JSON.stringify(message));
              };

               ws.binaryType = "arraybuffer";

               ws.onmessage = function(e) {
      // Binary tick data.
              if(e.data instanceof ArrayBuffer) {
                 if(e.data.byteLength > 2) {
                  
          var d = parseBinary(e.data);
         

          get5minData(d[0].last_price, self);
         // if(d) trigger("ticks", [d]);
        }
      } else {
        parseTextMessage(e.data)
      }

      // Set last read time to check for connection timeout
      last_read = new Date();
    };


    }

    this.connect();

    function get5minData(d ,scope){
     
     
     if(tickcount == 0){
      tickopen = d;
      tickhigh =d;
      ticklow =d;
      tickcount =tickcount +1;
      //alert('next should be 1');
      //alert(tickcount);
     }
     else if(tickcount == 3){
     tickclose = d;
     //alert('ohlc formed');
     
     if(tickopen < tickclose){
         tickType ="green";
     }
    else if(tickopen > tickclose){
          tickType ="red";
    }
    else if(tickopen = tickclose){
          tickType ="doji";
    }

     tickLength = Math.abs(tickhigh-ticklow);
    
     tickarray = {"open" : tickopen ,"low" :ticklow ,"high" :tickhigh , "close" : tickclose ,"tickType" :tickType ,'tickLength' : tickLength};
     
     //scope.setState({tickdata: tickarray});
     //alert(JSON.stringify(scope.state.tickdata));

     scope.props.addTickData(tickarray);
     tickcount = 0;
     }
     else{
         if(tickhigh <d){
            tickhigh = d;
         }
         if(ticklow>d){
             ticklow = d;
         }

          tickcount =tickcount +1;

     }

    }


    // trigger event callbacks
  function trigger(e, args) {
    if (!triggers[e]) return
    for(var n=0; n<triggers[e].length; n++) {
      triggers[e][n].apply(triggers[e][n], args ? args : []);
    }
  }

  function parseTextMessage(data) {
        try {
            data = JSON.parse(data)
    } catch (e) {
      return
    }

    if (data.type === "order") {
      trigger("order_update", [data.data]);
    }
  }

  // parse received binary message. each message is a combination of multiple tick packets
  // [2-bytes num packets][size1][tick1][size2][tick2] ...
  function parseBinary(binpacks) {
   
    var packets = splitPackets(binpacks),
      ticks = [];

    for(var n=0; n<packets.length; n++) {
      var bin = packets[n],
        instrument_token = buf2long(bin.slice(0, 4)),
        segment = instrument_token & 0xff;

      var tradable = true;
      if (segment === Indices) tradable = false;

      var divisor = 100.0;
      if (segment === NseCD) divisor = 10000000.0;

      // Parse LTP
      if (bin.byteLength === 8) {
        ticks.push({
          tradable: tradable,
          mode: modeLTP,
          instrument_token: instrument_token,
          last_price: buf2long(bin.slice(4,8)) / divisor
        });
      // Parse indices quote and full mode
      } else if (bin.byteLength === 28 || bin.byteLength === 32) {
        var mode = modeQuote;
        if (bin.byteLength === 32) mode = modeFull;
      
                var tick = {
                    tradable: tradable,
                    mode: mode,
                    instrument_token: instrument_token,
                    last_price: buf2long(bin.slice(4,8)) / divisor,
                    ohlc: {
                        high: buf2long(bin.slice(8, 12)) / divisor,
                        low: buf2long(bin.slice(12, 16)) / divisor,
                        open: buf2long(bin.slice(16, 20)) / divisor,
                        close: buf2long(bin.slice(20, 24)) / divisor,
          },
          change: buf2long(bin.slice(24, 28))
        };

                // Compute the change price using close price and last price
                if(tick.ohlc.close != 0) {
                    tick.change = (tick.last_price - tick.ohlc.close) * 100 / tick.ohlc.close;
        }

                // Full mode with timestamp in seconds
                if (bin.byteLength === 32) {
          tick.timestamp = null;
          var timestamp = buf2long(bin.slice(28, 32));
          if (timestamp) tick.timestamp = new Date(timestamp);
        }

        ticks.push(tick);
      } else if (bin.byteLength === 44 || bin.byteLength === 184) {
        var mode = modeQuote;
        if (bin.byteLength === 184) mode = modeFull;

          var ticktype ='';

        if((buf2long(bin.slice(28, 32)) / divisor)>(buf2long(bin.slice(40, 44)) / divisor)){
            ticktype ="green";
        }
        else if((buf2long(bin.slice(40, 44)) / divisor)> (buf2long(bin.slice(28, 32)) / divisor)){
             ticktype ="red";
        }
        else if ((buf2long(bin.slice(28, 32)) / divisor) == (buf2long(bin.slice(40, 44)) / divisor)){
             ticktype ="doji";
        }


                   // alert(ticktype);


        var tick = {
                    tradable: tradable,
                    mode: mode,
                    instrument_token: instrument_token,
                    last_price: buf2long(bin.slice(4, 8)) / divisor,
                    last_quantity: buf2long(bin.slice(8, 12)),
                    average_price: buf2long(bin.slice(12, 16)) / divisor,
                    volume: buf2long(bin.slice(16, 20)),
                    buy_quantity: buf2long(bin.slice(20, 24)),
                    sell_quantity: buf2long(bin.slice(24, 28)),
                    ohlc: {
                        open: buf2long(bin.slice(28, 32)) / divisor,
                        high: buf2long(bin.slice(32, 36)) / divisor,
                        low: buf2long(bin.slice(36, 40)) / divisor,
                        close: buf2long(bin.slice(40, 44)) / divisor,                        
                        ticktype : ticktype,
                    }
        };

                // Compute the change price using close price and last price
                if (tick.ohlc.close != 0) {
                    tick.change = (tick.last_price - tick.ohlc.close) * 100 / tick.ohlc.close;
        }

        // Parse full mode
        if (bin.byteLength === 184) {
          // Parse last trade time
          tick.last_trade_time = null;
          var last_trade_time = buf2long(bin.slice(44, 48));
          if (last_trade_time) tick.last_trade_time = new Date(last_trade_time * 1000);

          // Parse timestamp
          tick.timestamp = null;
          var timestamp = buf2long(bin.slice(60, 64));
          if (timestamp) tick.timestamp = new Date(timestamp * 1000);

          // Parse OI
          tick.oi = buf2long(bin.slice(48, 52));
                    tick.oi_day_high = buf2long(bin.slice(52, 56));
          tick.oi_day_low = buf2long(bin.slice(56, 60));
          tick.depth = {
            buy: [],
            sell: []
          };

          var s = 0, depth = bin.slice(64, 184);
          for (var i=0; i<10; i++) {
            s = i * 12;
            tick.depth[i < 5 ? "buy" : "sell"].push({
              quantity: buf2long(depth.slice(s, s + 4)),
              price:    buf2long(depth.slice(s + 4, s + 8)) / divisor,
              orders:   buf2long(depth.slice(s + 8, s + 10))
            });
          }
        }

        ticks.push(tick);
      }
    }

    return ticks;
  }

  // split one long binary message into individual tick packets
  function splitPackets(bin) {
    // number of packets
    var num = buf2long(bin.slice(0, 2)),
      j = 2,
      packets = [];

    for(var i=0; i<num; i++) {
      // first two bytes is the packet length
      var size = buf2long(bin.slice(j, j+2)),
        packet = bin.slice(j+2, j+2+size);

      packets.push(packet);

      j += 2 + size;
    }

    return packets;
  }

 
  // Big endian byte array to long.
  function buf2long(buf) {
    var b = new Uint8Array(buf),
      val = 0,
      len = b.length;

    for(var i=0, j=len-1; i<len; i++, j--) {
      val += b[j] << (i*8);
    }

    return val;
  }





            }

              


 

            startCountingTick(){
              alert('called');
            }

            startWebsocketClient(){

             //  alert('called');
              //alert(this.props.access);KiteTicker("your_api_key", "your_access_token")
              let  SIGNIN_ROOT_URL = 'token ypmxayteat7agml9:';
                let accessdata = this.props.access;

              var headers = {
                        'X-Kite-Version': '3',
                        'Authorization': `${SIGNIN_ROOT_URL}${accessdata}`,
                };

     

          var data = {
                        'api_key': 'ypmxayteat7agml9',
                        'access_token': this.props.access,
                };



              var ticker = new KiteTicker(data ,headers);  

                  ticker.connect();
                  ticker.on("tick", this.onTick(ticker));
                  ticker.on("connect", this.onConnect(ticker));
            }

      render(){

        return(
           <div>        
                

             <p>Congratulation we got the session key as {this.state.token}</p>

             <p>Congrats first job done. Now we have to call websocket client</p>

             <p>Call websocket client with sesion key</p>

             <button onClick = {() => this.startGeneratingServerSession()} >Call Websocket client</button>
            

                {
                      (this.props.access != '' &&  this.props.access != undefined )
                        ?  <button onClick = {() => this.newWebsocketMETHOD()} >Start websocket client</button>
                        : ''
                    } 

               <KitePlot title="Crude" plotdata ={this.props.tickCombo}/> 

               <LineApp plotdata ={this.props.trendData}/>




              

            </div>)
        }
    }


  function mapStateToProps(state){
      return  {
         access : state.access ,  
         tickCombo : state.tickData, 
         trendData : state.plData,
       }
    };

    export default withRouter(connect(mapStateToProps,{getAcessToken,addTickData,pivotData})(LoginNav));

