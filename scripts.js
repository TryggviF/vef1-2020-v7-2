/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  let mode;
  let code = prompt("Hvort viltu kóða eða afkóða streng? skrifaðu ,,kóða'' eða ,,afkóða''");
  while(code.localeCompare("afkóða") != 0 && code.localeCompare("kóða") != 0){
    let newCode = prompt("Veit ekki hvaða aðgerð " + code + " er. Reyndu aftur.");
    code = newCode
  }
  if(code.localeCompare("afkóða") == 0){
    mode = 0;
  }
  else mode = 1;
  let n = prompt("Hversu mikið á að hiðra streng? Gefðu upp heiltölu á bilinu [1,31].");
  while(!Number.isInteger(parseInt(n,10)) || parseInt(n) < 0 || parseInt(n) > 31){  //Góðan dag ég hata type coercion
    let newN = prompt(n + " er ekki heiltala á bilinu [0,31]. Reyndu aftur.");
    n = newN;
  }
  let str = prompt("Gefðu upp strenginn sem þú vilt " + code + " með hliðrun " + n + ":");
  const regEx = /[^AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ]/g;
  str = str.toLocaleUpperCase();
  while(str.match(regEx) != null){
    let newStr = prompt("Þú gafst upp stafi sem ekki er hægt að " + code +  ": " + str.match(regEx).join(",") + ". Reyndu aftur.");
    str = newStr;
    str = str.toLocaleUpperCase();
  }
  if(mode == 0) alert(decode(str,parseInt(n))); //Svo mikið
  else alert(encode(str,parseInt(n))); //Svoo, svoo mikið



}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
let run;
alert('Halló!');
do{
  start();
  run = prompt("Viltu halda áfram?").toLocaleUpperCase();
}
while(run.localeCompare("JÁ") == 0);
/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  str = str.toLocaleUpperCase();
  let newstr = "";
  for(let i = 0; i < str.length; i++){
    newstr += LETTERS.charAt((LETTERS.indexOf(str.charAt(i))+n)%32);
  }
  return newstr;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  str = str.toLocaleUpperCase();
  let newstr = "";
  for(let i = 0; i < str.length; i++){
    newstr += LETTERS.charAt((LETTERS.indexOf(str.charAt(i))-n+32)%32);
  }
  return newstr;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
