
export default function(state = {}, action) {
  switch(action.type) {
    case 'DATA_OBTAINED':
      return action.payload;
    case 'REMOVE_ALPHA_DATA':
     return [];
    
  }

  return state;
}
