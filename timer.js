class Timer {
  constructor(hours = 0, minutes = 0, secs = 15) {
    this.hh = hours
    this.mm = minutes
    this.ss = secs
  }

  getTimerString() {
    return "" + this.hh + ":" + this.mm + ":" + this.ss
  }
}

export default Timer
