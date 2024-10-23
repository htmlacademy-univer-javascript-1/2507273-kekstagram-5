function checkLength(checkingStr, maxLength){
  return checkingStr.length <= maxLength;
}

function isPalindrom(checkingStr){
  const cleanedStr = checkingStr.toLowerCase().replace(/ /g, '');
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

function chooseNumber(str) {
  const checkingStr = str.toString();
  let result = '';

  for (let i = 0; i < checkingStr.length; i++) {
    if (!isNaN(checkingStr[i]) && checkingStr[i] !== ' ') {
      result += checkingStr[i];
    }
  }

  return result.length ? parseInt(result, 10) : NaN;
}

checkLength('3dfggf345', 15);
isPalindrom('123321');
chooseNumber('13bvn34gcvbng34');
