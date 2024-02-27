document.addEventListener('DOMContentLoaded',()=>{
    const square=document.querySelectorAll('.grid div');
    const scoreDisplay=document.querySelectorAll('span')
    const startBtn=document.querySelector('.start')

    const width=10;
    let currentIndex=0;
    let appleIndex=0;
    let currentSnake=[2,1,0];
    let direction=1;
    let score=0;
    let speed=0.9;
    let intervalTime=0;
    let interval=0;

    function startGame(){
        currentSnake.forEach(index=>square[index].classList.remove('snake'));
        square[appleIndex].classList.remove('apple');
        randomApple();
        clearInterval(interval);
        direction=1;
        intervalTime=1000;
        currentIndex=[2,1,0];
        currentSnake.forEach(index=>square[index].classList.add('snake'))
        console.log('snack Position',currentSnake);
        interval=setInterval(moves,intervalTime)
        console.log(interval);
    }
    function randomApple(){
        do{
            appleIndex=Math.floor(Math.random()*square.length)
            console.log('Apple Position',appleIndex);
        }
        while(square[appleIndex].classList.contains('snake')){
            square[appleIndex].classList.add('apple')
        }
    }

    function moves(){

        if((currentSnake[0]+width>=(width*width) && direction===width)||
        (currentSnake[0]-width<0 && direction===-width)||
        (currentSnake[0]%width===0 && direction===-1)||
        (currentSnake[0]%width===width-1 && direction===1)||
        square[currentSnake[0]+direction].classList.contains('snake'))
        {
            const position=currentSnake[0];
            alert('Game Over');
            console.log('currentSnake head',position);
            return clearInterval(interval);
        }


        const tail=currentSnake.pop();
        console.log('tail',tail);
        square[tail].classList.remove('snake') ;
        currentSnake.unshift(currentSnake[0]+direction);
        console.log('move method');
        console.log('currentSnake[0]',currentSnake[0]);
 
        if(square[currentSnake[0]].classList.contains('apple')){
            square[currentSnake[0]].classList.remove('apple');
            score+=1;
            square[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            clearInterval(interval);
            intervalTime=intervalTime*speed;
            interval=setInterval(moves,intervalTime);
        }
        square[currentSnake[0]].classList.add('snake')
        updatescore();
    }
    startBtn.addEventListener('click',startGame)

    function controls(e){
        if(e.keyCode===40){
            direction=+width;
        }
        else if(e.keyCode===38){
            direction=-width;
        }
        else if(e.keyCode===39){
            direction=1;
        }
        else if(e.keyCode===37){
            direction=-1;
        }
    }
document.addEventListener('keyup',controls);
document.addEventListener('keydown',controls);

function updatescore() {
    document.getElementById('score').innerHTML = `SCORE:${score}`;
    localStorage.setItem('score', score)
}
   
})