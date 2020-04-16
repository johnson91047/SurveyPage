class Timer {
  constructor() {
    this.elapseTime = 0;
    this.timerID = 0;
  }

  startTimer() {
    this.elapseTime = 0;
    this.timerID = setInterval(() => {
      this.elapseTime++;
    }, 100);
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  get_timer_second() {
    return this.elapseTime / 10;
  }
}

class CountDownTimer {
  constructor() {
    this.countdownID = 0;
    this.countDownTime = 0;
  }

  count_down(count, tick, complete) {
    this.countDownTime = count;
    this.countdownID = setInterval(() => {
      this.countDownTime--;
      if (this.countDownTime == 0) {
        complete();
        clearInterval(this.countdownID);
      } else {
        tick();
      }
    }, 1000);
  }
}
