import AppActions from '../actions/AppActions';
import AppState from '../include/AppState';
import Action from '../include/Action';


const initialState: AppState = {
  films: [],
  page: 1,
  total: 0,
  loading: false,
  message: '',
}

export default function appStateReducer(state: AppState = initialState, action: Action) {
  switch (action.type) {
    case AppActions.SET_FILMS: {
      return Object.assign({}, state, { films: action.payload });
    }

    case AppActions.SET_PAGE: {
      return Object.assign({}, state, { page: action.payload });
    }

    case AppActions.SET_TOTAL: {
      return Object.assign({}, state, { total: action.payload });
    }

    case AppActions.SET_LOADING: {
      return Object.assign({}, state, { loading: action.payload });
    }

    case AppActions.SET_MESSAGE: {
      return Object.assign({}, state, { message: action.payload });
    }

    default: return state;
  }
}
