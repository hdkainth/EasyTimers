import { StyleSheet } from "react-native";

const mainStyle = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    headerBox: {
      flex: 10,
      width: '100%'
    },
    mainContentBox: {
      flex: 90,
      width: '100%'
    }
  }
)

const timerSeqListStyle = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    timerSeqItem: {
      margin: 5,
      padding: 10,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      width: '98%',
      height: 60,
    }
  }
)


export { mainStyle, timerSeqListStyle };
