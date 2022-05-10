let q = document.querySelector.bind(document);
const frames = {
   a1: 'x', a2: '', a3: '',
   b1: '', b2: '', b3: '',
   c1: 'x', c2: '', c3: ''
}
let player = '';
let info = '';
let start = true;


// -------------  Events --------------- //


q('.reset').addEventListener('click', reset);
document.querySelectorAll('.frame').forEach(item =>{
   item.addEventListener('click', itemClick)
});

function itemClick(event){
   let click = event.target.getAttribute('id')
   if(start && frames[click] === ''){
      frames[click] = player
      framesUpdate();
      change();
   }
   
}
function change(){
   player = (player === 'X') ? 'O': 'X';
   infoUpdate();
}

function reset(){
   info = '';
   player = random();
   for (const key in frames) {
      if (Object.hasOwnProperty.call(frames, key)) {
         frames[key] = '';
         
      }
   }
   start = true;
   framesUpdate();
   infoUpdate();
}
function random(){
   let number =  Math.floor(Math.random()*2)
   return number === 0 ? "X": "O";
   
}
function framesUpdate(){
   for (const f in frames) {
      if (Object.hasOwnProperty.call(frames, f)) {
         let item = q(`#${f}`)
         item.innerHTML = frames[f];
      }
   }
   checkGame();

}
function infoUpdate(){
   q('.info h2').innerHTML = `Jogador "${player}"`;
}

function checkGame(){
   if (checkWinner('x')){
      info = `O jogador "X" venceu`;
      start = false;
      console.log('x')
   }else if(checkWinner('o')){
      info = `O jogador "O" venceu`;
      start = false;
      console.log('o')
   }else if(isDraw()){
      info = `Deu empate`;
      start = false;
      console.log('emp')
   }
}
function checkWinner(player){
   let odds = [
      "a1,a2,a3", 
      "b1,b2,b3",
      "c1,c2,c3",

      "a1,b1,c1",
      "a2,b2,c2",
      "a3,b3,c3",

      "a1,b2,c3",
      "a3,b2,c1"

   ]

   for (const pos in odds) {
      let array = odds[pos].split(',')
      let win = array.every((option)=>{
         if(frames[option] === player){
            return true;
         }else{
            return false;
         }
      })
      if(win){
         return true;
      }
   }
   return false;
}
function isDraw(){
   for(let i in frames){
      if(frames[i] === ''){
         return false;
      }
   }
   return true;
}
reset();