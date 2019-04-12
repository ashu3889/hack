		import _ from "lodash";

		export default function(state= [], action){
		   
		    switch (action.type){
		        case 'Shuffle' :
		              return _.shuffle(state);
		        case 'Sortcards' :
		               return _.sortBy(state, 'count');
		        case 'DeleteCard' :
		            return state.filter(function(item) {
		               return item.count !== action.payload
		            });
		        default:
		           return state;
		    }
		}