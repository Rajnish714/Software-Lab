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
    paddingHorizontal: 10, // Reduce paddingHorizontal
    paddingTop: 10, // Reduce paddingTop
  },
  title: {
    fontSize: 18, // Reduce font size
    fontWeight: "bold",
    marginBottom: 10, // Reduce marginBottom
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Reduce marginBottom
  },
  dayText: {
    marginRight: 5, // Reduce marginRight
    width: 60, // Reduce width
    fontSize: 14, // Reduce font size
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, // Reduce marginRight
  },
});

// import React, { useContext, useState } from "react";
// import { Text, Button, Modal, View, StyleSheet, Switch } from "react-native"; // Import Switch from react-native
// import { Data } from "../../utils/Store";
// import VerificationComponent from "./VerificationComponent";

// export default function BusinessHour({ visibleBusinessHour, setVisibleBusinessHour }) {
//   const { text, onChangeText } = useContext(Data);
//   const [visibleVerification, setVisibleVerification] = useState(false);
//   const [businessHours, setBusinessHours] = useState({
//     mon: [],
//     tue: [],
//     wed: [],
//     thu: [],
//     fri: [],
//     sat: [],
//     sun: [],
//   });

//   const handleToggle = (day, time) => {
//     const updatedHours = { ...businessHours };
//     if (updatedHours[day].includes(time)) {
//       updatedHours[day] = updatedHours[day].filter((hour) => hour !== time);
//     } else {
//       updatedHours[day] = [...updatedHours[day], time];
//     }
//     setBusinessHours(updatedHours);
//   };

//   const hasSelectedHours = () => {
//     // Check if any day has at least one selected hour
//     return Object.values(businessHours).some((hours) => hours.length > 0);
//   };

//   const handleContinue = () => {
//     const updatedText = { ...text, business_hours: businessHours };
//     onChangeText(updatedText);

//     setVisibleVerification(true);
//   };

//   return (
//     <Modal
//       visible={visibleBusinessHour}
//       onRequestClose={() => {
//         setVisibleBusinessHour(false);
//       }}
//       animationType="slide"
//     >
//       <Text>Business Hours</Text>
//       <View style={styles.container}>
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Sunday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.sun.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("sun", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//         </View>
//         {/* Monday */}
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Monday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.mon.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("mon", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.mon.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("mon", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//         </View>
//         {/* Tuesday */}
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Tuesday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.tue.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("tue", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.tue.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("tue", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//         </View>

//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Wednesday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.wed.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("wed", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.wed.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("wed", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.wed.includes("1:00pm - 4:00pm")}
//               onValueChange={() => handleToggle("wed", "1:00pm - 4:00pm")}
//             />
//             <Text>1:00pm - 4:00pm</Text>
//           </View>
//         </View>
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Thursday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.thu.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("thu", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.thu.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("thu", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.thu.includes("1:00pm - 4:00pm")}
//               onValueChange={() => handleToggle("thu", "1:00pm - 4:00pm")}
//             />
//             <Text>1:00pm - 4:00pm</Text>
//           </View>
//         </View>
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Friday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.fri.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("fri", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.fri.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("fri", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//         </View>
//         <View style={styles.dayContainer}>
//           <Text style={styles.dayText}>Saturday</Text>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.sat.includes("8:00am - 10:00am")}
//               onValueChange={() => handleToggle("sat", "8:00am - 10:00am")}
//             />
//             <Text>8:00am - 10:00am</Text>
//           </View>
//           <View style={styles.switchContainer}>
//             <Switch
//               value={businessHours.sat.includes("10:00am - 1:00pm")}
//               onValueChange={() => handleToggle("sat", "10:00am - 1:00pm")}
//             />
//             <Text>10:00am - 1:00pm</Text>
//           </View>
//         </View>
//       </View>

//       <Button title="Continue" onPress={handleContinue} disabled={!hasSelectedHours()} />
//       <VerificationComponent
//         visibleVerification={visibleVerification}
//         setVisibleVerification={setVisibleVerification}
//       />
//       <Button
//         title="Close"
//         onPress={() => {
//           setVisibleBusinessHour(false);
//         }}
//       />
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   dayContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   dayText: {
//     marginRight: 10,
//   },
//   switchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 20,
//   },
// });
