import TimerList from './timer_list';
import Timer from './timer';

class TimerSeqList {

  constructor() {

    this.list = [
      { name: "Short strenching ", timerList: new TimerList(), key: 1 },
      { name: "Yoga ", timerList: new TimerList(), key: 2 },
      { name: "Gym workout ", timerList: new TimerList(), key: 3 }
    ]

    this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 3, name = "Arm stretch"))
    this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 2, name = "Relax"))
    this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 3, name = "Leg stretch"))

    // this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Arm stretch"))
    // this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 5, name = "Relax"))
    // this.list[0].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Leg stretch"))

    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Child pose"))
    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Cobra pose"))
    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 45, name = "Child pose"))
    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Downward facing dog"))
    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Standing forward bend"))
    this.list[1].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 45, name = "Bridge pose"))

    this.list[2].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Push - Barbell bench press"))
    this.list[2].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Pull - Barbell deadlift"))
    this.list[2].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 20, name = "Legs - Barbell squats"))
    this.list[2].timerList.addTimer(new Timer(hours = 0, minutes = 0, secs = 10, name = "Push ups"))
  }

  getRefIndex(timerSeqRef) {
    return this.list.indexOf(timerSeqRef)
  }

  deleteSequence(timerSeqRef) {
    index = this.list.indexOf(timerSeqRef)
    console.log("Deleting timer sequence " + this.list.name + " at index " + index)
    this.list.splice(index, 1)
  }

  addSequence(seqName) {
    let newSequence = { name: seqName, timer: new TimerList(), key: this.list.length + 1}
    console.log(newSequence)
    this.list.push(newSequence)
  }
}

export default TimerSeqList