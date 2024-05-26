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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Event {
  title: string;
  date: Date;
}

const HomeScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const addEvent = () => {
    if (newEventTitle.trim() !== "" && selectedDate && selectedTime) {
      const eventDate = new Date(selectedDate);
      eventDate.setHours(selectedTime.getHours());
      eventDate.setMinutes(selectedTime.getMinutes());

      setEvents([
        ...events,
        {
          title: newEventTitle,
          date: eventDate,
        },
      ]);
      setNewEventTitle("");
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setModalVisible(false);
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
      <View style={styles.mainView}>
        <View style={defaultStyles.line}>
          <TouchableOpacity>
            <Ionicons name="remove" size={50} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <View
              style={[
                styles.eventItem,
                { backgroundColor: getBackgroundColor(item.date) },
              ]}
            >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    position: "absolute",
    top: hp(8),
    left: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(100),
  },
  headingText: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    textAlign: "left",
  },
  addIconStyle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#fff",
    padding: 5,
    backgroundColor: "#fff"
  },
  mainView: {
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(75),
    marginTop: hp(15),
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
  },
  eventTime: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 5,
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
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
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
});

export default HomeScreen;
