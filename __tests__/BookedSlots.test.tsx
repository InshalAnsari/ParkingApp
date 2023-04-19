import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import BookedSlots from '../src/screens/BookedSlots';
import {Navigation} from '../src/types';

type Nav = Navigation<'BookedSlots'>['navigation'];
type Route = Navigation<'BookedSlots'>['route'];

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as Partial<Nav>;

const route = {params: {no: 1}} as Route;
const props = {navigation, route} as Navigation<'BookedSlots'>;

afterEach(cleanup);

describe('BookedSlot Screen', () => {
  const {getByTestId} = render(<BookedSlots {...props} />);
  const noOfSlots = [
    {
      id: 1,
      isBooked: false,
      startHour: '00:00',
    },
  ];

  it('should render a FlatList with correct number of items', () => {
    const flatList = getByTestId('flat-list');
    const items = flatList.props.data;
    // console.log('FlatList : ', flatList.props.data);
    expect(items).toHaveLength(noOfSlots.length);
  });

  it('should render a correct status', async () => {
    render(<BookedSlots {...props} />);
    const text = await screen.findByTestId('status');
    // console.log('Text : ', text.props.children);
    expect(text.props.children).toBe('Not Alloted');
  });

  it('should render a correct X and fireEvent', () => {
    const {getByTestId} = render(<BookedSlots {...props} />);
    const submitterName = getByTestId('free-space');
    fireEvent.press(submitterName);
    expect(submitterName).toBeTruthy();
  });

  it('Should apply the value when changing text', () => {
    const {getByTestId} = render(<BookedSlots {...props} />);
    const input = getByTestId('input');
    console.log("Input : ",input);
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
    expect(input.props.placeholder).toBe('Enter Registration No');
  });

  it('should allocate Slot', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<BookedSlots {...props} />);
    const submitterName = getByTestId('addSlot');
    fireEvent.press(submitterName);
    expect(submitterName).toBeTruthy();
  });

});
