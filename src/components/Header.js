/* @flow strict */

import * as React from 'react';
import { StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

type Props = {
  title: string,
  onBackPress?: () => void,
};

export default class CardAction extends React.Component<Props> {
  render() {
    const { title, onBackPress } = this.props;
    return (
      <Appbar.Header dark statusBarHeight={StatusBar.currentHeight}>
        {onBackPress ? <Appbar.BackAction onPress={onBackPress} /> : null}
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  }
}
