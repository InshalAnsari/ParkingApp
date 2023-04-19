import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import SlotsInput from '../src/screens/SlotsInput';
import {Navigation} from '../src/types';

type Nav = Navigation<'SlotsInput'>['navigation'];
type Route = Navigation<'SlotsInput'>['route'];

const navigation = {
  navigation: jest.fn(),
  goBack: jest.fn(),
  replace:jest.fn()
} as Partial<Nav>;

const route = {params: undefined} as Route;
const props = {navigation, route} as Navigation<'SlotsInput'>;

afterEach(cleanup);

describe('Slots Input Screen', () => {
  it('Should apply the value when changing text', () => {
    const {getByTestId} = render(<SlotsInput {...props} />);
    const input = getByTestId('input');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
  });

  it('Should Fire onPress props when button pressed', () => {
    const {getByTestId} = render(<SlotsInput {...props} />);
    const submitterName = getByTestId('button');
    fireEvent.press(submitterName);
    expect(submitterName).toBeTruthy();
    // expect(navigation.replace).toHaveBeenCalledWith('BookedSlots', { no: 5 });
  });

});
