/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if(bestOf>9) {return false}
  else{
    return (bestOf%2!==0)
  }

}
// console.assert(isValidBestOf(1) === true, '1 er valid best of');
// console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
// console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  if(play===1){return 'Skæri'}
  else if(play ===2){return 'Blað'}
  else if(play ===3){return 'Steinn'}
  else{return 'Óþekkt'}
}
// console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
// console.assert(playAsText('2') === 'Blað', '2 táknar blað');
// console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
// console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  if(player === computer){return 0}
  else if(player+1===computer){return 1}
  else if(player-2===computer){return 1}
  else{return -1}
}
// console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
// console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
// console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
// console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
// console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {

  let resround; //nidurstada umferdar
  let computer = Math.floor(Math.random() * 3) + 1;

  let valid = prompt('Veldur 1 fyrir skæri\nVeldu 2 fyrir blað\nVeldu 3 fyrir stein');

  if(valid==null){
    console.error('Hætt við leik');
  }else if(playAsText(Number.parseInt(valid))=='Óþekkt'){
    alert('Þú valdir: ' + playAsText(Number.parseInt(valid))+' sem er óþekkt' +'\nTölvan valdi: '+playAsText(computer) +'\nTölvan vann!')
    return -1;
  }else{
    resround = checkGame(Number.parseInt(valid),computer);
    if(resround==0){
      alert('Þú valdir: ' + playAsText(Number.parseInt(valid)) +'\nTölvan valdi: '+playAsText(computer) +'\nJafntefli!')
      return round();
    }else if(resround==1){
      alert('Þú valdir: ' + playAsText(Number.parseInt(valid)) +'\nTölvan valdi: '+playAsText(computer) +'\nÞú vannst umferð!\n' + playAsText(Number.parseInt(valid)) + ' vinnur ' +playAsText(computer))
      return resround;
    } else{
      alert('Þú valdir: ' + playAsText(Number.parseInt(valid)) +'\nTölvan valdi: '+playAsText(computer) +'\nÞú tapðir umferð!\n' + playAsText(computer) + ' vinnur ' +playAsText(Number.parseInt(valid)))
      return resround;
    }
  }
}

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  let leikir = prompt('Hversu marga leiki af best of í skæri, blað og steinn viltu spila.');

  if(!isValidBestOf(Number.parseInt(leikir))){
    alert('Ekki leyfilegur fjöldi leikja.')
  }else if(leikir===null){
    console.error('Hætt við leik')
  }else{
    let playedRounds=0;
    let resround=0;
    let playerWins=0;
    let computerWins=0;
    let winsTowin=Math.round(Number.parseInt(leikir)/2);

    while(playedRounds<Number.parseInt(leikir)){
      
      playedRounds++;
      resround=round();
      
      if(resround>0){
        playerWins++;
      }else{
        computerWins++;
      }

      if(playerWins>winsTowin-1){
        alert('Þú ert sigurvegari!');
        wins++;
        break;
      }
      if(computerWins>winsTowin-1){
        alert('Þú tapaðir fyrir tölvunni');
        losses++;
        break;
      }
    }
  }
}


/**
 * Birtir stöðu spilara.
 */
function games() {
  if(wins+losses===0){
    console.log('Þú hefur spilað 0 leiki');
  }else{
    console.log('Þú hefur spilað '+(wins+losses)+' leiki. \nÞú hefur unnið '+wins+', eða ' + (100*wins/(wins+losses)).toFixed(2) +'% af heild'+'\nÞú hefur tapað '+losses+', eða ' + (100*losses/(wins+losses)).toFixed(2) +'% af heild');
  }
}
