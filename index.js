const btn=document.querySelectorAll('.btn');
const start=document.querySelector('.start');
const restart=document.querySelector('.re');
const scoreDisplay=document.getElementById('score');
let sequence=[];
let seq=[];
let score=0;
let pturn=false;
const cnum=()=>Math.floor(Math.random()*btn.length);
const highlight=(index)=>{
    btn[index].classList.add('active');
    setTimeout(()=>{
        btn[index].classList.remove('active');
    },500);
};
const playSequence=()=>{
    pturn=false;
    let i=0;
    const interval=setInterval(()=>{
        highlight(sequence[i]);
        i++;      
        if(i>=sequence.length){
            clearInterval(interval);
            pturn=true; 
        }
    },800); 
};
const round=()=>{
    const nextStep=cnum();
    sequence.push(nextStep);
    seq=[];
    setTimeout(playSequence,200); 
};
const btnclick=(index)=>{
    if(!pturn){
        return;
    }
    seq.push(index);
    if(seq[seq.length-1]!==sequence[seq.length-1]){
        alert(`Game Over! Your score: ${score}`);
        restart.style.display='inline-block';
        start.style.display='none';
        pturn=false; 
        return;
    }
    if(seq.length==sequence.length) {
        score++;
        scoreDisplay.textContent=score;
        setTimeout(round,500);
    }
};
const gameOn=()=>{
    sequence=[];
    seq=[];
    score=0;
    scoreDisplay.textContent=score;
    start.style.display='none';
    restart.style.display='none';
    round();
};
const restartGame=()=>{
    gameOn();
};
btn.forEach((button,index) => {
    button.addEventListener('click',()=>btnclick(index));
});
start.addEventListener('click',gameOn);
restart.addEventListener('click',restartGame);
