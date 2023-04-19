import type {RouteProp} from '@react-navigation/native';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SlotsInput: undefined;
  BookedSlots: {no: number};
};

export type Navigation<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type SlotNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SlotsInput'
>;

export type SlotScreenRouteProp = RouteProp<RootStackParamList, 'SlotsInput'>;

export type BookedSlotNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BookedSlots'
>;

export type BookedSlotScreenRouteProp = RouteProp<RootStackParamList, 'BookedSlots'>;

