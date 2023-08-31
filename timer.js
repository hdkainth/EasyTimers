class Timer {
  constructor(hours = 0, minutes = 0, secs = 15, name = "default") {
    // save timer components
    this.hh = hours
    this.mm = minutes
    this.ss = secs
    this.name=name

    // JS timer interval ID
    this.intervalId = undefined
    // Time elasped in active timer
    this.timerElapsed = 0

    // reference to function to decrement running timer
    this.decrementTimeSecRef = this.decrementTimeSec.bind(this)

    this.timerViewRef = undefined

    this.timerFinishNotify = undefined
  }

  // convert timer into formatted string
  getTimerString() {
    return String(this.hh) + ':' + String(this.mm).padStart(2, 0) + ':' + String(this.ss).padStart(2, 0)
    // let displayMinutes = ""
    // if (this.mm < 10) {
    //   displayMinutes = "0" + this.mm
    // } else {
    //   displayMinutes = this.mm
    // }

    // let displaySeconds = ""
    // if (this.ss < 10) {
    //   displaySeconds = "0" + this.ss
    // } else {
    //   displaySeconds = this.ss
    // }


    // return "" + this.hh + ":" + displayMinutes + ":" + displaySeconds
  }

  decrementTimeSec() {
    this.timerElapsed++;
    console.log((this.getTimeString()))
    if (this.timerElapsed == this.getTimerSeconds()) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
      this.timerViewRef.notifyTimerActive(false)
      this.timerFinishNotify()
      this.timerElapsed = 0
      this.timerFinishNotify = undefined
    }

    this.timerViewRef.notifyValueUpdate()
  }

  startTimer(timerFinishNotify) {
    console.log("Starting timer " + this.name)
    this.timerElapsed = 0
    this.timerFinishNotify = timerFinishNotify
    this.timerViewRef.notifyTimerActive(true)
    this.intervalId = setInterval(this.decrementTimeSecRef, 1000)
  }

  pauseTimer() {
    console.log("Pausing timer " + this.name)
    clearInterval(this.intervalId)
    this.intervalId = undefined
  }

  resumeTimer() {
    console.log("Resuming timer " + this.name)
    this.intervalId = setInterval(this.decrementTimeSecRef, 1000)
  }

  cancelTimer() {
    if (this.intervalId != undefined) {
      console.log("Cancelling timer " + this.name)
      clearInterval(this.intervalId)
    }
    this.timerViewRef.notifyTimerActive(false)
    this.timerFinishNotify = undefined
    this.timerElapsed = 0
  }

  getTimerSeconds() {
    return ((3600 * this.hh) + (60 * this.mm) + (this.ss * 1))
  }

  getTimerRemainingSeconds() {
    return this.getTimerSeconds() - this.timerElapsed
  }

  getTimeString() {
    let timeLeft = this.getTimerSeconds() - this.timerElapsed
    timeLeft = Math.max(0, timeLeft)

    let secondsLeft = timeLeft % 60
    let minutesLeft = Math.floor(timeLeft / 60) % 60
    let hoursLeft = Math.floor(timeLeft / 3600)

    let tempTimer = new Timer(hoursLeft, minutesLeft, secondsLeft)
    return tempTimer.getTimerString()

    // if (minutesLeft < 10) {
    //   minutesLeft = "0" + this.mm
    // }
    // if (secondsLeft < 10) {
    //   secondsLeft = "0" + this.mm
    // }

    // return "" + hoursLeft + ":" + minutesLeft + ":" + secondsLeft

  }

}

export default Timer
