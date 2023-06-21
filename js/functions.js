// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

const checkStringLength = (string, length) => string.length <= length;

// Тест функции для проверки длины строки.
checkStringLength('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.

const checkStringPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

// Тест функции для проверки, является ли строка палиндромом.
checkStringPalindrome('топот');

// Функция для получения числа из строки. Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const getNumberFromString = (string) => {
  string = string.toString().replace(/\D/g, '');
  return(parseInt(string, 10));
};

// Тест функции для числа из строки.
getNumberFromString('2023 год'); // 2023

