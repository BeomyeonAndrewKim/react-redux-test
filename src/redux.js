import {combineReducers,createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

export function fetchRepos(token){
  return async function(dispatch){
    const res = await fetch(`https://api.github.com/user/repos?access_token=${token}`)
    const data = await res.json();
    const repos = data.map(repoObj => repoObj.name);
    dispatch(updateRepos(repos));
  }
}

export function updateRepos(repos){
  return {
    type:'UPDATE_REPOS',
    repos
  }
}

export function incCount(){
  return {
    type:'INC_COUNT',
  }
}

// export function incCountAsync(){
//   return function(dispatch){
//     setTimeout(()=>{
//       dispatch(incCount())
//     },1000)
//   }
// }

export const incCountAsync= () => dispatch =>{
  setTimeout(()=>{
    dispatch(incCount())
  },1000);
}

export function addTodo(text){
  return{
    type:'ADD_TODO',
    text
  }
}

function count(state = 0,action){
  switch(action.type){
    case 'INC_COUNT':
      return state + 1;
      default:
      return state;
      }
  }

function repos(state=[],action){
  switch(action.type){
    case 'UPDATE_REPOS':
      return action.repos
    default:
      return state
  }
}
  
function todos(state=[],action){
  switch(action.type){
    case 'ADD_TODO':
    return [
      ...state,
      action.text
    ]
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  count, todos, repos
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
export const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)));

