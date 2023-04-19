import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SlotNavigationProp, SlotScreenRouteProp} from '../types';

interface IState {
  inputVal: string;
}
type Props = {
  route: SlotScreenRouteProp;
  navigation: SlotNavigationProp;
};

class SlotsInput extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputVal: '',
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.inputVal}
          testID="input"
          keyboardType="numeric"
          placeholder="Enter Number Of Slots"
          placeholderTextColor={'#a9a9a9'}
          style={styles.inputContainer}
          onChangeText={val => this.setState({inputVal: val})}
        />
        <TouchableWithoutFeedback
          testID="button"
          disabled={this.state.inputVal === ''}
          onPress={() => {
            this.setState(() => {
              navigation?.push('BookedSlots', {
                no: +this.state.inputVal,
              });
              this.setState({
                inputVal: '',
              });
            });
          }}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnTxt}>Proceed</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    width: '100%',
    color: '#000',
    marginBottom: 20,
    borderRadius: 10,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#6CB4EE',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '700',
  },
});
export default SlotsInput;
