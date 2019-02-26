//Задание 1 и 2

let str = 'Every royal house or \'dynasty\' has a surname. In Britain\'s case that name is Windsor Queen Elizabeth II is the fourth Windsor monarch. After Queen Elizabeth II, Britain\'s next monarch will probably be Prince Charles, the Prince of Wales. The National Anthem is called \'God save the Queen\'. But if Prince Charles becomes King, it will be \'God save the King\'.\'God save the King\'.';
const reg = new RegExp('\W\'(.+?)\'\W/', 'g');
console.log(str);
str.replace(reg, '"$1"');
console.log(str);