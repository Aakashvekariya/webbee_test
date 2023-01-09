const initialState = {
  rootLoader: false,
  rootLoaderTitle: '',
}
const activityIndicator = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SHOW_ACTIVITY_INDICATOR_ROOT':
      return {
        rootLoader: true,
        rootLoaderTitle: action.text,
      }
    case 'HIDE_ACTIVITY_INDICATOR_ROOT':
      return { rootLoader: false, rootLoaderTitle: '', rootLoaderTrue: false }
    default:
      return state
  }
}
export default activityIndicator
