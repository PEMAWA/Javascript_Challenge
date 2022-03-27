

//Challenge 1 : Your age in days
function AgeinDays(){
    let BirthYear = prompt('Which year were you born')

    var ageInDayss=(2022-BirthYear)*365
 var h1 = document.createElement('h1');
 var textAnswer = document.createTextNode('You are ' +ageInDayss +' days old')
 h1.setAttribute('id','AgeinDays')
 h1.appendChild(textAnswer)
 document.getElementById('flex-box-result').appendChild(h1)

}

function reset(){
    document.getElementById('AgeinDays').remove();
}


//Challenge 2  Generate Cat

function generateCat(){
 var image =   document.createElement('img');

 var div = document.getElementById('flex-cat-gen');
 image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
 div.appendChild(image)


}

//Challenge 3 : Rock Paper Sciccors

function rpsGame(yourChoice){
console.log (yourChoice)
var humanChoice,ComputerChoice

humanChoice=yourChoice.id
ComputerChoice = numToChoice(randTorpsInt())
console.log('Computer Choice',ComputerChoice)

results=decideWinner(humanChoice,ComputerChoice);
console.log(results)
message = finalMessage(results)  // Messsage :You Won!  color:green
console.log(message)

rpsFrontEnd(yourChoice.id,ComputerChoice,message)
}

function randTorpsInt(){

    return Math.floor(Math.random() * 3)
}
function numToChoice(number){
    return ['rock','paper', 'scissors'][number]

}
function decideWinner(yourChoice,ComputerChoice){
    var rpsDatabase =
        {
            'rock': {
                'scissors':1,
                'rock': 0.5,
                'paper': 0,
            },
            'paper':{
                'rock': 1,
                'paper': 0.5,
                'scissors':0,
            },
            'scissors':{
                'paper': 1,
                'scissors': 0.5,
                'rock':0,
            }

        }

        var yourScore = rpsDatabase[yourChoice][ComputerChoice]
        var ComputerScore = rpsDatabase[ComputerChoice][yourChoice]
    return [yourScore,ComputerScore];
}

function finalMessage([yourScore,ComputerChoice]){
    if(yourScore === 0){

        return{'message': 'You Lost !', 'color': 'red'};

    }else if (yourScore === 0.5){

        return{'message': 'You Tied !', 'color': 'yellow'};

    }else{
        return{'message': 'You Won !', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice,ComputerImageChoice,finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src

    }
   //remove all the images
   document.getElementById('rock').remove()
   document.getElementById('paper').remove()
   document.getElementById('scissors').remove()

   var humanDiv = document.createElement('div')
   var ComputerDiv = document.createElement('div')
   var MessageDiv = document.createElement('div')

   humanDiv.innerHTML = "<img src ='"+imageDatabase[humanImageChoice] +"' height=150 width =150 style= 'box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
   MessageDiv.innerHTML= "<h1 style = 'color: "+finalMessage['color'] +"; font-size:60px ; padding : 30px;'> " +finalMessage['message'] + "</h1>"
   ComputerDiv.innerHTML = "<img src ='"+imageDatabase[ComputerImageChoice] +"' height=150 width =150 style= 'box-shadow:0px 10px 50px rgba(243,38,24,1);'>"


   document.getElementById('flex-box-rps-div').appendChild(humanDiv)
   document.getElementById('flex-box-rps-div').appendChild(MessageDiv)
   document.getElementById('flex-box-rps-div').appendChild(ComputerDiv)


}

// Challenge 4 : Cahnge the color of all buttons

var AllButtons = document.getElementsByTagName('button')
console.log(AllButtons)

var copyAllButtons =[];

for (let i=0; i<AllButtons.length;i++){
    copyAllButtons.push (AllButtons[i] .classList[1] )
}
console.log(copyAllButtons)

function  buttonColorChange(Buttonchange){
    if (Buttonchange.value === 'red'){
        buttonRED();

    }else if (Buttonchange.value=== 'green'){
        buttonGREEN();
    } else if (Buttonchange.value ==='reset'){
        buttonRESET();

    }else if (Buttonchange.value === 'random'){
        buttonRandom();
    }
}
function buttonRED(){
   for(let i =0 ;i<AllButtons.length ; i++){
      AllButtons[i].classList.remove(AllButtons[i].classList[1]);
      AllButtons[i].classList.add('btn-danger')
   } 
}
function buttonGREEN(){
    for(let i =0 ;i<AllButtons.length ; i++){
       AllButtons[i].classList.remove(AllButtons[i].classList[1]);
       AllButtons[i].classList.add('btn-success')
    } 
 }

 function buttonRESET(){

    for(let i =0 ;i<AllButtons.length ; i++){
        AllButtons[i].classList.remove(AllButtons[i].classList[1]);
        AllButtons[i].classList.add(copyAllButtons[i]);

    }
 }
 function buttonRandom(){
     var choices=  ['btn-danger','btn-success', 'btn-primary' ,'btn-warning']
     for(let i =0 ;i<AllButtons.length ; i++){
         var RandomNumber = Math.floor(Math.random() * 4);
         AllButtons[i].classList.remove(AllButtons[i].classList[1])
         AllButtons[i].classList.add(choices[RandomNumber])
     }
 }

 // Challenge 5 : Black-Jack
 let BlackJackGame ={
     'you': {'scorespan': '#your-blackjack-result', 'div':'#your-box','score' : 0},
     'computer': {'scorespan': '#computer-blackjack-result', 'div':'#computer-box','score' : 0},
     'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
     'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
     'wins' : 0,
     'losses':0,
     'draws':0,
     'isStand':false,
     'turnsOver' :false,

 };
 const YOU = BlackJackGame['you']
 const COMPUTER = BlackJackGame['computer']

 const hitSound = new Audio ('static/sound/swish.m4a')
 const winSound = new Audio ('static/sound/cash.mp3')
 const lossSound = new Audio ('static/sound/aww.mp3')

 document.querySelector('#blackjack-hit-button').addEventListener('click',blackJackHit);
 document.querySelector('#blackjack-stand-button').addEventListener('click',computerLogic);
 document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal);

 function blackJackHit(){
     if(BlackJackGame['isStand'] ===false){
        let card = randomCard()
            showCard(card,YOU)
            updateScore(card,YOU)
            showScore(YOU)
     }

 }

 function randomCard(){
    let randomIndex = Math.floor(Math.random() *13);
    return BlackJackGame ['cards'][randomIndex];
}

 function showCard (card ,Activeplayer){

    if (Activeplayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(Activeplayer['div']).appendChild(cardImage)
    hitSound.play();
    }
}
function blackJackDeal(){
   // showResult(computeWinner())
    if (BlackJackGame['turnsOver']=== true){
        BlackJackGame['isStand']==false
            let yourImages= document.querySelector('#your-box').querySelectorAll('img');
            let computerImages= document.querySelector('#computer-box').querySelectorAll('img');
            for (let i = 0 ; i<yourImages.length;i++){
                yourImages[i].remove()

            }
            for (let i = 0 ; i<computerImages.length;i++){
                computerImages[i].remove()

            }

            YOU['score']=0;
            COMPUTER['score']=0;

            document.querySelector('#your-blackjack-result').textContent =0;  
            document.querySelector('#computer-blackjack-result').textContent =0;
            
            document.querySelector('#your-blackjack-result').style.color ='white';
            document.querySelector('#computer-blackjack-result').style.color ='white';
            document.querySelector('#blackjack-result').textContent ="Let's play"
            document.querySelector('#blackjack-result').style.color ="Black"
            
        }
        BlackJackGame['turnsOver']=true
}
function updateScore (card,Activeplayer){
    if (card ==='A'){
    // IF adding 11 keeps me below 21 then add 11 otherwise add 1
    if (Activeplayer['score'] + BlackJackGame['cardsMap'][card][1] <=21){
        Activeplayer['score']+=BlackJackGame['cardsMap'][card][1]
    }else{
        Activeplayer['score']+=BlackJackGame['cardsMap'][card][0]

    }
}else{
    Activeplayer['score']+= BlackJackGame['cardsMap'][card] 
}
   
}
function showScore (Activeplayer){
    if(Activeplayer['score']>21){
        document.querySelector(Activeplayer['scorespan']).textContent = 'FAILED!'
        document.querySelector(Activeplayer['scorespan']).style.color = 'red'
        
    }else {
    document.querySelector(Activeplayer['scorespan']).textContent =Activeplayer['score']
}
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms))
}

async function computerLogic(){
BlackJackGame['isStand'] =true;

while(COMPUTER['score']<16 && BlackJackGame['isStand']=== true){
    let card= randomCard();
    showCard(card,COMPUTER)
    updateScore(card,COMPUTER)
    showScore(COMPUTER);
    await sleep(1000)
}

    
    BlackJackGame['turnsOver'] =true;
    let winner = computeWinner();
    showResult(winner)
        
    }
    
 //function to compute winner
 //Update Results

function computeWinner (){
    let winner;
     if (YOU['score']<=21){
         //cONDITION HIGHER SCORE THAN THE COMPUTER
         if(YOU['score']>COMPUTER['score'] ||(COMPUTER['score']>21)){
             console.log('You won')
             BlackJackGame['wins']++
             winner = YOU
         }else if(YOU['score']<COMPUTER['score']){
           console.log('You lost')
           BlackJackGame['losses']++
           winner = COMPUTER

         }else if(YOU['score']===COMPUTER['score']){
           console.log('You drew')
           BlackJackGame['draws']++
           

         }
         
         
     }else if (YOU['score'] >21 && COMPUTER['score']<=21){
         console.log('you lost')
         BlackJackGame['losses']++
         winner =COMPUTER;

         // Condition when both players fail
     }else if (YOU['score'] >21 && COMPUTER['score']>21){
       console.log('you drew')
       BlackJackGame['draws']++

     }
     console.log(BlackJackGame)
     return winner;

}

function showResult(winner){
    let message ,messageColor ;

    if (BlackJackGame['turnsOver']=== true){

    
        if (winner===YOU){
            document.querySelector('#wins').textContent = BlackJackGame['wins'];
            message = 'You won !';
            messageColor = 'green';
            winSound.play();
        }else if (winner=== COMPUTER){
            document.querySelector('#losses').textContent = BlackJackGame['losses'];
            message = 'You lost !';
            messageColor = 'red';
            lossSound.play();
        }else{
            document.querySelector('#draws').textContent = BlackJackGame['draws'];
            message = 'You drew !';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent =message;
        document.querySelector('#blackjack-result').style.color =messageColor;

    }
}