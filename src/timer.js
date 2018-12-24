//
import fn from './functions'

let timerProps = {
	workTime: .1,
	restTime: .1
};

const timerStatusMsg = document.getElementById('timer__status-msg');

export default class Timer {
	constructor(props = timerProps){
		this.workTime = (props.workTime || timerProps.workTime)*60;
		this.restTime = (props.restTime || timerProps.restTime)*60;
		this.interval;
	}
	
	get wt(){
		return this.workTime;
	}
	
	timer(seconds, period){
		let that = this,
			m,  // minutes
			s;  // seconds
		
		that.interval = setInterval(function(){
			m = Math.floor(seconds/60);  // minutes
			s = seconds%60;  // seconds
			document.getElementById('min').innerHTML = fn.formatedNumber(m);
			document.getElementById('sec').innerHTML = fn.formatedNumber(s);
			if (seconds <= 0 ) {
				clearInterval(that.interval);
				if (period === 'w'){
					timerStatusMsg.innerHTML = `Time for rest &nbsp; <i class="fas fa-coffee"></i>`;
					that.timer(that.restTime, 'r');
					timerStatusMsg.classList.remove('work');
					timerStatusMsg.classList.add('rest');
				}
				else if (period === 'r') {
					timerStatusMsg.innerHTML = `Time for work &nbsp; <i class="fas fa-plug"></i> <i class="fas fa-horse"></i>`;
					that.timer(that.workTime, 'w');
					timerStatusMsg.classList.remove('rest');
					timerStatusMsg.classList.add('work');
				}
				timerStatusMsg.classList.add('active');
			}
			seconds--;
		}, 1000);
	}
	
	start(){
		let that = this;
		that.timer(that.workTime,'w');
	}
	
	stop(){
		let that = this;
		clearInterval(that.interval);
	}
}

