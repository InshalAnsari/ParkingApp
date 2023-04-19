import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {BookedSlotNavigationProp, BookedSlotScreenRouteProp} from '../types';
import moment from 'moment';

type IProps = {
  navigation: BookedSlotNavigationProp;
  route: BookedSlotScreenRouteProp;
};

interface IState {
  noOfSlots: {
    id: number;
    isBooked: boolean;
    startHour: string;
    reg: string;
  }[];
  regNo: string;
}

class BookedSlots extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      noOfSlots: [],
      regNo: '',
    };
  }
  // Creates an Object with N size passed in props
  setInitialData = () => {
    var initialData = [];
    for (var i = 0; i < this.props.route.params.no; i++) {
      initialData[i] = {
        id: i + 1,
        isBooked: false,
        startHour: '00:00',
        reg: '',
      };
    }
    this.setState({
      noOfSlots: initialData,
    });
  };

  componentDidMount(): void {
    this.setInitialData();
  }

  renderItem = ({
    item,
    index,
  }: {
    item: {id: number; isBooked: boolean; startHour: string; reg: string};
    index: number;
  }) => (
    <View
      style={[
        styles.renderContainer,
        {backgroundColor: item.isBooked ? '#90EE90' : '#ffff'},
      ]}>
      <Text testID="status" style={{color: '#000'}}>
        {item.reg ? item.reg : 'Not Alloted'}
      </Text>
      <TouchableWithoutFeedback
        testID="free-space"
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        onPress={() => {
          this.freeSpace(item);
        }}>
        <Text testID="cross" style={{color: '#000'}}>
          X
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );

  // Clears the alloted space
  freeSpace = (item: {id: number; isBooked: boolean; startHour: string}) => {
    let newArr = this.state.noOfSlots.map(data => {
      if (item.id === data.id) {
        return {
          ...data,
          isBooked: false,
          startHour: '00:00',
          regNo: '',
        };
      }
      return data;
    });
    this.setState(
      {
        noOfSlots: newArr,
      },
      () => this.totalHour(item),
    );
  };

  // Calculate the PRice based on Hours parked
  totalHour = (item: {id: number; isBooked: boolean; startHour: string}) => {
    var end = moment();
    var duration = moment.duration(end.diff(item.startHour)).asSeconds();
    let totalMinute = moment.utc(duration * 1000).format('mm');
    let totalAmt = 10;
    if (+totalMinute > 2) {
      let extraHrs = +totalMinute - 2;
      totalAmt += extraHrs * 10;
    }
    Alert.alert(
      `Total Time Spent is ${totalMinute} and your Total is ${totalAmt}`,
    );
  };

  // Genrates a Random no
  getRandomNo = () => {
    return Math.floor(Math.random() * this.props.route.params.no);
  };

  // Allocate the space based on Random No
  getSlotBooked = () => {
    let space = false;
    let index = -1;
    while (!space) {
      index = this.getRandomNo();
      if (this.state.noOfSlots[index].isBooked === true) continue;
      else space = true;
    }
    let temp = this.state.noOfSlots[index];
    let newArr = this.state.noOfSlots.map(data => {
      if (data.id === temp.id) {
        return {
          ...data,
          isBooked: true,
          reg: this.state.regNo,
          startHour: moment(new Date()).toString(), //todays date
        };
      }
      return data;
    });
    this.setState({
      noOfSlots: newArr,
      regNo: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter Registration No"
          testID="input"
          placeholderTextColor="#a9a9a9"
          style={styles.inputBox}
          value={this.state.regNo}
          onChangeText={val => {
            this.setState({regNo: val});
          }}
        />
        <FlatList
          data={this.state.noOfSlots}
          testID="flat-list"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
        <TouchableWithoutFeedback
          testID='addSlot'
          onPress={() => {
            if (this.state.regNo === '') {
              Alert.alert('Please Enter Register No to Continue');
            } else {
              this.getSlotBooked();
            }
          }}>
          <View style={styles.absContainer}>
            <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  renderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
  },
  absContainer: {
    backgroundColor: 'blue',
    borderRadius: 25,
    height: 50,
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
  },
  inputBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 9,
    color: '#000',
  },
});
export default BookedSlots;
