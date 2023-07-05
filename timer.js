class Timer {
  constructor(props) {
    this.hh = 0
    this.mm = 0
    this.ss = 15
  }

  getTimerString() {
    return "" + this.hh + ":" + this.mm + ":" + this.ss
  }
}

export default Timer
