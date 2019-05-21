		import React ,{Component} from 'react';		
		import { connect } from "react-redux";
		//import CardDeckBody from './CardDeckBody.js';
		//import DrawnCardDeck from './DrawnCardDeck.js';		
		import Kitelogin from './KiteLogin.js';			
		import LoginNav from './LoginNav.js';
		import TestLoginNav from './testLoginNav.js';
		import TestBLoginNav from './b_testLoginNav.js';

		import YearlyBPB from './yearly_bpb.js';

		import FinalYearlyBPB from './final_yearly_bpb.js';

		
		
		import DojiLogin from './dojiLogin.js';
        import { Switch, Route } from 'react-router-dom';



		export default  class Board extends Component{

		  render(){

		    return(
		       <div>
		        <Switch>
                     <Route  path='/login' component={FinalYearlyBPB}/>                     
                     <Route exact path='/success/' component={LoginNav}/>
                     <Route exact path='/test' component={TestLoginNav}/>
                     <Route exact path='/doji' component={DojiLogin}/>
                      <Route exact path='/stest' component={YearlyBPB}/>
                      <Route exact path='/ftest' component={FinalYearlyBPB}/>
                      

                      <Route exact path='/btest' component={TestBLoginNav}/>

                </Switch>		 
		        </div>)
		    }
		}

