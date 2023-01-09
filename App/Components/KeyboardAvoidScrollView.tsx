/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import {
  KeyboardAvoidingView, ViewStyle, KeyboardAvoidingViewProps, Platform, ScrollView, ScrollViewProps,
} from 'react-native';

type KeyboardAvoidScrollView={
  children?:any,
  keyboardAvoidingViewProp?:KeyboardAvoidingViewProps,
  scrollViewProp?:ScrollViewProps,
  keyboardAvoidingStyle?:ViewStyle,
  keyboardAvoidingContentContainerStyle?:ViewStyle,
  scrollStyle?:ViewStyle,
  scrollContentContainerStyle?:ViewStyle,
}
const KeyboardAvoidScrollView:FC<KeyboardAvoidScrollView> = ({
  children,
  keyboardAvoidingViewProp,
  scrollViewProp,
  keyboardAvoidingStyle,
  keyboardAvoidingContentContainerStyle,
  scrollStyle,
  scrollContentContainerStyle,

}:KeyboardAvoidScrollView) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={[{ flex: 1 }, keyboardAvoidingStyle]}
    contentContainerStyle={keyboardAvoidingContentContainerStyle}
    {...keyboardAvoidingViewProp}
  >
    <ScrollView
      contentContainerStyle={scrollContentContainerStyle}
      style={scrollStyle}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      bounces={false}
      {...scrollViewProp}
    >
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);
export default KeyboardAvoidScrollView;
