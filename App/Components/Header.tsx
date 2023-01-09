import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  ImageURISource,
  Keyboard,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { hamburgerIcon, leftArrowIcon } from '../Assets/icons';
import colors from '../Constants/colors';

const styles = StyleSheet.create({
  rightCompContainerStyle: {
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitleStyle: {
    width: '100%',
  },
  headerTitleStyle: {
    width: '100%',
    color: colors.white,
    fontWeight: 'bold',
  },
  leftCompContainerStyle: {
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonStyle: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backDropStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 35,
    height: 35,
  },
  backIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  leftSpace: {
    width: 60,
    height: '100%',
  },
  textContainerStyle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});

type HeaderProps = {
  title?: string;
  headerTitleStyle?: TextStyle;
  subtitle?: string;
  headerSubtitleStyle?: TextStyle;
  source?: ImageURISource;
  onBackPress?: ((event: GestureResponderEvent) => void) | undefined;
  backButtonStyle?: ViewStyle;
  backIconStyle?: ImageStyle;
  headerAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  RightComp?: React.ComponentType | React.ElementType | null | undefined;
  rightCompContainerStyle?: ViewStyle;
  LeftComp?: React.ComponentType | React.ElementType | null | undefined;
  headerColor?: string;
  leftCompContainerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  statusbarStyle?: StatusBarStyle;
  statusbarColor?: string;
  isLeftBlank?: boolean;
  isRightFull?: boolean;
  useBackDrop?: boolean;
  noStatusBar?: boolean;
  backDropStyle?: ViewStyle;
};

const Header: React.FC<HeaderProps> = ({
  title,
  headerTitleStyle,
  subtitle,
  headerSubtitleStyle,
  source,
  onBackPress,
  backButtonStyle,
  backIconStyle,
  headerAlign,
  RightComp,
  rightCompContainerStyle,
  LeftComp,
  headerColor,
  leftCompContainerStyle,
  headerContainerStyle,
  statusbarStyle,
  statusbarColor,
  isLeftBlank,
  isRightFull,
  useBackDrop,
  noStatusBar,
  backDropStyle,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: headerColor || colors.primary },
        headerContainerStyle,
      ]}
    >
      {!noStatusBar && (
        <StatusBar
          barStyle={statusbarStyle || 'dark-content'}
          backgroundColor={statusbarColor || headerColor || colors.primary}
        />
      )}

      <TouchableOpacity
        style={[styles.backButtonStyle, backButtonStyle]}
        onPress={() => {
          Keyboard.dismiss();
          navigation.openDrawer();
        }}
      >
        {useBackDrop ? (
          <View style={[styles.backDropStyle, backDropStyle]}>
            <Image
              style={[
                styles.backIconStyle,
                { tintColor: colors.white },
                backIconStyle,
              ]}
              source={source || hamburgerIcon}
            />
          </View>
        ) : (
          <Image
            style={[
              styles.backIconStyle,
              { tintColor: colors.white },
              backIconStyle,
            ]}
            source={hamburgerIcon || leftArrowIcon}
          />
        )}
      </TouchableOpacity>
      <View style={styles.textContainerStyle}>
        <Text
          numberOfLines={1}
          style={[
            styles.headerTitleStyle,
            { textAlign: headerAlign || 'center' },
            headerTitleStyle,
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.headerSubtitleStyle,
              {
                textAlign: headerAlign || 'center',
              },
              headerSubtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {!isRightFull ? (
        <View style={[styles.rightCompContainerStyle, rightCompContainerStyle]}>
          {RightComp ? <RightComp /> : null}
        </View>
      ) : RightComp ? (
        <RightComp />
      ) : null}
    </View>
  );
};
export default Header;
