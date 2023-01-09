import { StyleSheet } from 'react-native';
import colors from '../../Constants/colors';
import fontSize from '../../Constants/fontSize';

export const typography = {
  dark: StyleSheet.create({
    typo1: {
      fontSize: fontSize.f12,
      color: colors.white,
    },
  }),
  light: StyleSheet.create({
    typo1: {
      fontSize: fontSize.f12,
      color: colors.black,
    },
  }),
};

export const uiStyle = StyleSheet.create({
  btnRounded: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  btnRound: {
    borderRadius: 10000,
    overflow: 'hidden',
  },
});

export const commonUI = {
  btnSubmit: StyleSheet.create({
    contentContainerStyle: {
      backgroundColor: 'red',
      borderRadius: 8,
      overflow: 'hidden',
      justifyContent: 'center',
      width: '50%',
    },
    titleStyle: {
      color: 'green',
      flex: 0,
    },
  }),
  container: StyleSheet.create({
    flex1: {
      flex: 1,
    },
    flex1Row: {
      flex: 1,
      flexDirection: 'row',

    },
    flexRow: {
      flexDirection: 'row',
    },
    flexColumn: {
      flexDirection: 'column',
    },
    flex1JustifyCenter: {
      flex: 1,
      justifyContent: 'center',
    },
    flex1JustifyEnd: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    rowJustifyEvenly: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    rowAlignCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    justifyAlignCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowAlignSelfEnd: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
    },
    rowMt5: { flexDirection: 'row', marginTop: 5 },
  }),
  image: StyleSheet.create({
    imageStyle: {
      tintColor: colors.white,
    },
  }),
  height: StyleSheet.create({
    height10: {
      height: 10,
    },
    mt10: {
      marginTop: 10,
    },
  }),
  modal: StyleSheet.create({
    containerStyle: {
      margin: 0,
      justifyContent: 'flex-end',
    },
  }),
};
export const commonColorUi = {
  backgroundColor: StyleSheet.create({
    white: {
      backgroundColor: colors.white,
    },
    black: {
      backgroundColor: colors.black,
    },
    halfBlack: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  }),
  textColor: StyleSheet.create({
    white: {
      color: colors.white,
    },
    black: {
      color: colors.black,
    },
  }),
};
export const themeUi = {
  dark: {
    ...commonUI,
  },
  light: {
    btnSubmit: {
      contentContainerStyle: {
        ...commonUI.btnSubmit.contentContainerStyle,
        backgroundColor: 'green',
      },
      titleStyle: { ...commonUI.btnSubmit.titleStyle, color: 'red' },
    },
  },
};

// rightIconContainerStyle,
// rightIconStyle,
// leftIconContainerStyle,
// leftIconStyle,
// titleStyle,
// contentContainerStyle: {
//     backgroundColor: colors.primary,
//   },
