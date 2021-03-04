const square = document.querySelector('.square');
let isCross = true;
let count = 0;
const winSteps = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
]; // все выигрышные комбинации

let endOfGame = false;

// перезапуск игры
const reload = () => {
  const all = square.querySelectorAll('.btn');
  all.forEach((item) => {
    item.classList.remove('btn-x');
    item.classList.remove('btn-o');
    endOfGame = false;
    isCross = true;
    count = 0;
  });
}

// проверка окончания игры
const isEnd = (player) => {
  let allSteps = [];
  let winner;
  if (player) {
    const allX = square.querySelectorAll('.btn-x');
    winner = 'Крестики';
    if (allX.length > 2) {
      allX.forEach((item) => {
        allSteps.push(item.id);
      });  
    }
  }
  else {
    winner = 'Нолики';
    const allO = square.querySelectorAll('.btn-o');
    if (allO.length > 2) {
      allO.forEach((item) => {
        allSteps.push(item.id);
      }); 
    }
  } 
  if (allSteps.length > 2) {
    for (let k = 0; k < winSteps.length; k++) { // сравнение всех ходов текущего игрока с выигрышными комбинациями
      let countWinStep = 0;
      for (let i = 0; i < allSteps.length; i++) {
        for (let j = 0; j < winSteps[k].length; j++) {
          if (winSteps[k][j] == allSteps[i]) { countWinStep++; break;}
        }
      }
      if (countWinStep === 3) { 
        alert(winner + ' победили!'); 
        endOfGame = true; break; }
      if (countWinStep !== 3 && count === 9 && k === winSteps.length - 1) { 
        alert('Ничья'); 
        endOfGame = true; break; }
    }
  }
}


square.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('btn') && !target.classList.contains('btn-x') && !target.classList.contains('btn-o')) {
    if (isCross) {
      target.classList.add('btn-x');
    }
    else {
      target.classList.add('btn-o');
    }
    setTimeout(() => {
      count++;
      if (count > 2) {
        isEnd(isCross);
      }
      if (endOfGame) { 
        reload();
      }
      else { isCross = !isCross; }
    }, 100);
  }
});