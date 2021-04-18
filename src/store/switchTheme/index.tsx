import {SWITCH_THEME} from '../actionType/type';

import {darkTheme, lightTheme} from '../../constants/styles';

const initialState = {
  theme: {
    ...darkTheme,
    type: 'darkTheme',
  },
};

export default function themeReducer(state = initialState, action: any) {
  switch (action.type) {
    case SWITCH_THEME:
      if (action.payload === false) {
        return {
          theme: {
            ...darkTheme,
            type: 'darkTheme',
          },
        };
      }
      if (action.payload === true) {
        return {
          theme: {
            ...lightTheme,
            type: 'lightTheme',
          },
        };
      }
      break;
    default:
      return state;
  }
}
