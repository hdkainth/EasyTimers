import Timer from "../timer";

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function runTimer() {
  let myTimer = new Timer(0, 1, 10)

  console.log("Created Timer Instance!")
  myTimer.startTimer()
  console.log("Sleeping for 5 sec")
  await sleep(5000)
  console.log("Waking up after sleep")
  myTimer.pauseTimer()
  console.log("Sleeping for 5 sec")
  await sleep(5000)
  console.log("Waking up after sleep")
  myTimer.resumeTimer()
  console.log("Sleeping for 2 sec")
  await sleep(2000)
  console.log("Waking up after sleep")
  myTimer.cancelTimer()
}

test('Testing timer', async () => { await runTimer() }, 20000)
