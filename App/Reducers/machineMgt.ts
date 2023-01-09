import { CATEGORIES } from './reducersType'

const initialState = {
  categoryList:[]
}

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORIES: {
      return {
        ...state,
        categoryList: action.payload,
      }
    }
    default:
      return state
  }
}
