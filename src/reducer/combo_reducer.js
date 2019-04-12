import {combineReducers, createStore,applyMiddleware} from 'redux';

import cards from './card_reducer.js';

import cardDeckReducers from './card_reducer.js';

import drawnCardReducer from './drawn_cards_reducers.js';

import accessReducer from './access.js';

import tickData from './tickdata.js';

import tickDataTCS from './tickdata_tcs.js';
import plDataTCS from './plotdata_tcs.js';

import plData from './plotdata.js';

import tickDataNifty from './tickdata_nifty.js';

import plDataNifty from './plotdata_nifty.js';

import tickDataJD from './tickdata_justdial.js';

import tickDataNickle from './tickdata_nickle.js';

import plDataNickle from './plotdata_nickle.js';

import tickDataTest from './tickdata_test.js';

import plDataTest from './plotdata_test.js';

import reduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const rootreducer = combineReducers({
alphaData : accessReducer,
tickData :tickData,
plData:plData,
tickDataTest :tickDataTest,
plDataTest:plDataTest,
plDataNifty:plDataNifty,
tickDataNifty :tickDataNifty,
plDataNickle: plDataNickle,
tickDataNickle :tickDataNickle,
tickDataJD: tickDataJD,
tickDataTCS :tickDataTCS,
plDataTCS:  plDataTCS,
});

const persistedstate = {
  cards : [
  {count: 1,value:'A♣' ,type:'clubs' }, {count: 2,value:'2♣' ,type:'clubs'} , {count: 3,value:'3♣',type:'clubs' } ,{count: 4,value:'4♣',type:'clubs' },{count: 5,value:'5♣',type:'clubs' }, {count: 6,value:'6♣',type:'clubs' } , {count: 7,value:'7♣',type:'clubs' } ,{count: 8,value:'8♣',type:'clubs'},
  {count: 9,value:'9♣',type:'clubs' }, {count: 10,value:'10♣',type:'clubs' } , {count: 11,value:'J♣',type:'clubs' } ,{count: 12,value:'Q♣',type:'clubs' },{count: 13,value:'K♣',type:'clubs' },
  {count: 14,value:'A♠',type:'Spades'}, {count: 15,value:'2♠',type:'Spades'} , {count: 16,value:'3♠',type:'Spades'} ,{count: 17,value:'4♠',type:'Spades'},
  {count: 18,value:'5♠',type:'Spades'}, {count: 19,value:'6♠',type:'Spades'} , {count: 20,value:'7♠',type:'Spades'} ,{count: 21,value:'8♠' ,type:'Spades'},
  {count: 22,value:'9♠',type:'Spades'}, {count: 23,value:'10♠',type:'Spades'} , {count: 24,value:'J♠',type:'Spades'} ,{count: 25,value:'Q♠',type:'Spades'},
  {count: 26,value:'K♠',type:'Spades'},{count: 27,value:'A♥',type:'Hearts'}, {count: 28,value:'2♥',type:'Hearts'} , {count: 29,value:'3♥',type:'Hearts'} ,{count: 30,value:'4♥',type:'Hearts'},
  {count: 31,value:'5♥',type:'Hearts'}, {count: 32,value:'6♥',type:'Hearts'} , {count: 33,value:'7♥',type:'Hearts'} ,{count: 34,value:'8♥',type:'Hearts'},
  {count: 35,value:'9♥',type:'Hearts'}, {count: 36,value:'10♥',type:'Hearts'} , {count: 37,value:'J♥',type:'Hearts'} ,{count: 38,value:'Q♥',type:'Hearts'},
  {count: 39,value:'K♥',type:'Hearts'},{count: 40,value:'A♦',type:'Diamonmds'}, {count: 41,value:'2♦',type:'Diamonmds'} , {count: 42,value:'3♦',type:'Diamonmds'} ,{count: 43,value:'4♦',type:'Diamonmds'},
  {count: 44,value:'5♦',type:'Diamonmds'}, {count: 45,value:'6♦',type:'Diamonmds'} , {count: 46,value:'7♦',type:'Diamonmds'} ,{count: 47,value:'8♦',type:'Diamonmds'},
  {count: 48,value:'9♦',type:'Diamonmds'}, {count: 49,value:'10♦',type:'Diamonmds'} , {count: 50,value:'J♦',type:'Diamonmds'} ,{count: 51,value:'Q♦',type:'Diamonmds'},
 {count: 52,value:'K♦',type:'Diamonmds'},
  ],
   drawncards : []
};

const store = createStoreWithMiddleware(rootreducer , persistedstate,/* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   );



//console.log(store.getstate());

export default store;