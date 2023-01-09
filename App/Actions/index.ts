export * from './machineMgt'

export const SHOW_ACTIVITY_INDICATOR_ROOT = 'SHOW_ACTIVITY_INDICATOR_ROOT'
export const HIDE_ACTIVITY_INDICATOR_ROOT = 'HIDE_ACTIVITY_INDICATOR_ROOT'

export function rootLoader(request:boolean, text?:string) {
  return (dispatch:any) => {
    if (request) {
      return dispatch({
        type: SHOW_ACTIVITY_INDICATOR_ROOT,
        text: text || '',
      })
    }
    return dispatch({ type: HIDE_ACTIVITY_INDICATOR_ROOT })
  }
}
