function contentReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload
      const itemAlreadyExists = state.some((content) => content.id === newItem.id)

      if (itemAlreadyExists) {
        return state
      }

      return [newItem, ...state]
    }

    case 'REMOVE_ITEM':
      return state.filter((content) => content.id !== action.payload)

    case 'CLEAR_LIST':
      return []

    default:
      return state
  }
}

export default contentReducer
