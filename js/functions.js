function checkLength(checkingStr, maxLength){
  return checkingStr.length <= maxLength
}

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

function isPalindrom(checkingStr){
    const cleanedStr = checkingStr.toLowerCase().replace(/ /g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');


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

chooseNumber(2023);
chooseNumber(-1);
chooseNumber(1.5);
