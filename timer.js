class Timer {
  constructor(hours = 0, minutes = 0, secs = 15, name = "default") {
    this.hh = hours
    this.mm = minutes
    this.ss = secs
    this.name=name

    this.key = undefined
    this.intervalId = undefined
    this.timerElapsed = 0

    this.decrementTimeSecRef = this.decrementTimeSec.bind(this)
  }

  getTimerString() {
    let displayMinutes = ""
    if (this.mm < 10) {
      displayMinutes = "0" + this.mm
    } else {
      displayMinutes = this.mm
    }

    let displaySeconds = ""
    if (this.ss < 10) {
      displaySeconds = "0" + this.ss
    } else {
      displaySeconds = this.ss
    }


    return "" + this.hh + ":" + displayMinutes + ":" + displaySeconds
  }

  decrementTimeSec() {
    this.timerElapsed++;
    console.log((this.getTimerSeconds() - this.timerElapsed) + " seconds left")
    if (this.timerElapsed == this.getTimerSeconds()) {
      clearInterval(this.intervalId)
    }
  }

  startTimer() {
    console.log("Starting timer")
    this.timerElapsed = 0
    this.intervalId = setInterval(this.decrementTimeSecRef, 1000)
  }

  pauseTimer() {
    console.log("Pausing timer")
    clearInterval(this.intervalId)
  }

  resumeTimer() {
    console.log("Resuming timer")
    this.intervalId = setInterval(this.decrementTimeSecRef, 1000)
  }

  cancelTimer() {
    console.log("Cancelling timer")
    clearInterval(this.intervalId)
    this.timerElapsed = 0
  }

  getTimerSeconds() {
    return (
      (3600 * this.hh) + (60 * this.mm) + (this.ss)
    )
  }
}

export default Timer
