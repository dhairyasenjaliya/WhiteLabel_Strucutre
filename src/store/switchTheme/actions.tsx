import {SWITCH_THEME} from '../actionType/type';

export function switchTheme(Data: any) {
  console.log('switchTheme Reducer data==>>>', Data);
  return {
    type: SWITCH_THEME,
    payload: Data,
  };
}
