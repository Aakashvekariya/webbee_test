import { CATEGORIES } from './reducersType'

const initialState = {
  categoryList: []
}

export default function user(state = initialState, action: { type: string, payload: any }) {
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
