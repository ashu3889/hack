  import React from 'react';
  import Websocket from 'react-websocket';
 
  class WebsocketClient extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
        count: 90
      };
    }
 
    handleData(data) {
      let result = JSON.parse(data);
      this.setState({count: this.state.count + result.movement});
    }
 
    render() {
      let tokenData = this.props.token;
      let wss_url ='wss://ws.kite.trade?api_key=ypmxayteat7agml9&access_token=';
      let combinedUrl= `${wss_url}${tokenData}`;
      
     
      return (
        <div>
          Count: <strong>{this.state.count}</strong>         
 
          
        </div>
      );
    }
  }
 
  export default WebsocketClient;

  var KiteTicker = require("kiteconnect").KiteTicker;
var ticker = new KiteTicker({
  api_key: "api_key",
  access_token: "access_token"
});

ticker.connect();
ticker.on("ticks", onTicks);
ticker.on("connect", subscribe);

function onTicks(ticks) {
  console.log("Ticks", ticks);
}

function subscribe() {
  var items = [738561];
  ticker.subscribe(items);
  ticker.setMode(ticker.modeFull, items);
}