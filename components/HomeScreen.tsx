import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultStyles } from "@/constants/Styles";

interface Event {
  title: string;
  date: Date;
}

interface Item {
  id: string;
  title: string;
  color: string;
  selected: boolean;
}

const HomeScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    loadEvents();
    if (verticalData.length > 0) {
      setSelectedItemId(verticalData[0].id);
    }
  }, []);

  const verticalData: Item[] = [
    { id: "2", title: "new", color: Colors.mint, selected: true },
    { id: "3", title: "business", color: Colors.mint, selected: false },
    { id: "4", title: "holiday plans", color: Colors.mint, selected: false },
    { id: "5", title: "meetings", color: Colors.mint, selected: false },
    { id: "6", title: "to do's", color: Colors.mint, selected: false },
  ];

  const handleItemPress = (id: string) => {
    setSelectedItemId(id);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={[
        styles.bottomIcon,
        { backgroundColor: selectedItemId === item.id ? "#fff" : Colors.black },
      ]}
      onPress={() => handleItemPress(item.id)}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: selectedItemId === item.id ? Colors.primary : item.color,
          fontSize: 14,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem("events");
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents).map((event: Event) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error("Failed to load events", error);
    }
  };

  const saveEvents = async (events: Event[]) => {
    try {
      await AsyncStorage.setItem("events", JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events", error);
    }
  };

  const handleCloseModal = () => {
    setOptionsModalVisible(false);
  };

  const addEvent = () => {
    if (newEventTitle.trim() !== "" && selectedDate && selectedTime) {
      const eventDate = new Date(selectedDate);
      eventDate.setHours(selectedTime.getHours());
      eventDate.setMinutes(selectedTime.getMinutes());

      const newEvents = [
        ...events,
        {
          title: newEventTitle,
          date: eventDate,
        },
      ];
      setEvents(newEvents);
      saveEvents(newEvents);
      setNewEventTitle("");
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setModalVisible(false);
    } else {
      Alert.alert("Missing Information", "Please provide all event details.");
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const newEvents = events.filter((event) => event !== selectedEvent);
      setEvents(newEvents);
      saveEvents(newEvents);
      setOptionsModalVisible(false);
      setSelectedEvent(null);
    }
  };

  const handleUpdateEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map((event) =>
        event === selectedEvent
          ? {
              ...event,
              title: newEventTitle,
              date: new Date(selectedDate as Date),
            }
          : event
      );
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      setModalVisible(false);
      setOptionsModalVisible(false);
      setSelectedEvent(null);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setDatePickerVisible(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      setDatePickerVisible(false);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setTimePickerVisible(Platform.OS === "ios");
    if (time) {
      setSelectedTime(time);
      setTimePickerVisible(false);
    }
  };

  const getBackgroundColor = (eventDate: Date) => {
    const now = new Date();
    const timeDifference = eventDate.getTime() - now.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (timeDifference <= oneDayInMs && timeDifference > 0) {
      return Colors.secondary;
    } else if (timeDifference >= oneDayInMs && timeDifference < 0) {
      return Colors.green;
    } else {
      return Colors.mint;
    }
  };

  const handleLongPress = (event: Event) => {
    setSelectedEvent(event);
    setOptionsModalVisible(true);
  };

  return (
    <SafeAreaView style={defaultStyles.homeContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Welcome...</Text>
        <TouchableOpacity
          style={styles.addIconStyle}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View style={{ height: hp(10), top: hp(7), marginLeft: 10 }}>
        <FlatList
          data={verticalData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      <View style={styles.mainView}>
        <View style={defaultStyles.line}>
          <TouchableOpacity>
            <Ionicons name="remove" size={50} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              style={[
                styles.eventItem,
                { backgroundColor: getBackgroundColor(item.date) },
              ]}
            >
              <View>
                <Text style={styles.eventText}>{item.title}</Text>
                <Text style={styles.eventDate}>
                  {item.date.toLocaleDateString()}
                </Text>
                <Text style={styles.eventTime}>
                  {item.date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.eventList}
        />
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter event"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
              placeholderTextColor={Colors.green}
            />
            <TouchableOpacity
              onPress={showDatePicker}
              style={defaultStyles.pickDateButton}
            >
              <Text style={defaultStyles.pickDateButtonText}>Pick Date</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  mode="date"
                  value={selectedDate || new Date()}
                  onChange={handleDateChange}
                  display="default"
                />
              </View>
            )}
            <TouchableOpacity
              onPress={showTimePicker}
              style={defaultStyles.pickTimeButton}
            >
              <Text style={defaultStyles.pickTimeButtonText}>Pick Time</Text>
            </TouchableOpacity>
            {isTimePickerVisible && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  mode="time"
                  value={selectedTime || new Date()}
                  onChange={handleTimeChange}
                  display="default"
                />
              </View>
            )}
            <Text style={styles.selectedDateTime}>
              {selectedDate && selectedTime
                ? `${selectedDate.toLocaleDateString()} at ${selectedTime.toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}`
                : ""}
            </Text>
            <TouchableOpacity onPress={addEvent} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>Add Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={defaultStyles.cancelButton}
            >
              <Text style={defaultStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isOptionsModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOptionsModalVisible(false)}
      >
        <View style={styles.optionsModalContainer}>
          <View style={styles.optionsModalContent}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.cancelButton}
            >
              <Ionicons size={25} name="close" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateEvent}
              style={styles.updateButton}
            >
              <Text style={styles.optionButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteEvent}
              style={styles.deleteButton}
            >
              <Text style={styles.optionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(100),
    marginBottom: 10,
    top: hp(8),
  },
  headingText: {
    color: "#fff",
    fontSize: 45,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    textAlign: "left",
  },
  addIconStyle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#fff",
    padding: 5,
    backgroundColor: "#fff",
  },
  mainView: {
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(65),
    marginTop: hp(7),
    width: wp(100),
    backgroundColor: Colors.primary,
    padding: 10,
  },
  eventList: {
    justifyContent: "center",
  },
  eventItem: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    maxWidth: wp(45),
  },
  eventText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    textAlign: "center",
  },
  eventDate: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  eventTime: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: wp(80),
    alignItems: "center",
    shadowColor: "rgba(255,255,255)",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    height: hp(6),
    fontFamily: "Avenir Next",
    fontWeight: "bold",
  },
  selectedDateTime: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Avenir Next",
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  optionsModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  optionsModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: wp(70),
    alignItems: "center",
    shadowColor: "rgba(255,255,255)",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  updateButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  deleteButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  flatListContainer: {
    marginTop: 10,
    height: hp(6),
    marginBottom: 20,
  },
  bottomIcon: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#fff",
    justifyContent: "space-between",
    marginHorizontal: 5,
    backgroundColor: Colors.black,
  },
});

export default HomeScreen;
