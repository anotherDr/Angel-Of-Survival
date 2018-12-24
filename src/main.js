
import Timer from './timer'
import '../sass/main.scss'




/* -----------------------------------------
* CONTROLS
* ------------------------------------------ */


const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const workInput = document.getElementById('timer__work-time');
const restInput = document.getElementById('timer__rest-time');

let timer;
let timerProps = {};

playBtn.addEventListener('click', (e)=>{
	if (timer instanceof Timer) return;
	
	e.target.classList.add('active');
	
	timerProps.workTime = workInput.value;
	timerProps.restTime = restInput.value;
	
	timer = new Timer(timerProps);
	timer.start();
});

stopBtn.addEventListener('click', ()=>{
	timer.stop();
	timer = null;
	console.log(timer instanceof Timer);
});
