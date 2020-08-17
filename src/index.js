import './styles.css';

const countdownTimer = {
  intervalId: null,
  selector: '#timer-1',
  targetDate: new Date('Feb 30, 2021'),
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    updateClockface(0);

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const xTime = this.targetDate - currentTime;
      updateClockface(xTime);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateClockface(0);
  },
};

const startBtn = document.querySelector('.js-startBtn');
const stopBtn = document.querySelector('.js-stopBtn');
const daysRef = document.querySelector('[data-value="days"]');
const hoursRef = document.querySelector('[data-value="hours"]');
const minsRef = document.querySelector('[data-value="mins"]');
const secsRef = document.querySelector('[data-value="secs"]');

startBtn.addEventListener('click', countdownTimer.start.bind(countdownTimer));
stopBtn.addEventListener('click', countdownTimer.stop.bind(countdownTimer));

function updateClockface(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minsRef.textContent = `${mins}`;
  secsRef.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
