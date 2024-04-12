import React, { useContext, useState } from "react";
import { Text, Button, Modal, View, StyleSheet, Switch } from "react-native";
import { Data } from "../../utils/Store";
import VerificationComponent from "./VerificationComponent";

export default function BusinessHour({ visibleBusinessHour, setVisibleBusinessHour }) {
  const { text, onChangeText } = useContext(Data);
  const [visibleVerification, setVisibleVerification] = useState(false);
  const [businessHours, setBusinessHours] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  const handleToggle = (day, time) => {
    const updatedHours = { ...businessHours };
    if (updatedHours[day].includes(time)) {
      updatedHours[day] = updatedHours[day].filter((hour) => hour !== time);
    } else {
      updatedHours[day] = [...updatedHours[day], time];
    }
    setBusinessHours(updatedHours);
  };

  const hasSelectedHours = () => {
    return Object.values(businessHours).some((hours) => hours.length > 0);
  };

  const handleContinue = () => {
    const updatedText = { ...text, business_hours: businessHours };
    onChangeText(updatedText);
    setVisibleVerification(true);
  };

  return (
    <Modal
      visible={visibleBusinessHour}
      onRequestClose={() => {
        setVisibleBusinessHour(false);
      }}
      animationType="slide"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Business Hours</Text>
        {Object.keys(businessHours).map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={businessHours[day].includes("8:00am - 10:00am")}
                onValueChange={() => handleToggle(day, "8:00am - 10:00am")}
              />
              <Text>8:00am - 10:00am</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={businessHours[day].includes("10:00am - 1:00pm")}
                onValueChange={() => handleToggle(day, "10:00am - 1:00pm")}
              />
              <Text>10:00am - 1:00pm</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={businessHours[day].includes("1:00pm - 4:00pm")}
                onValueChange={() => handleToggle(day, "1:00pm - 4:00pm")}
              />
              <Text>1:00pm - 4:00pm</Text>
            </View>
          </View>
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} disabled={!hasSelectedHours()} />
      <VerificationComponent
        visibleVerification={visibleVerification}
        setVisibleVerification={setVisibleVerification}
      />
      <Button
        title="Close"
        onPress={() => {
          setVisibleBusinessHour(false);
        }}
      />
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  dayText: {
    marginRight: 5,
    width: 60,
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
});
