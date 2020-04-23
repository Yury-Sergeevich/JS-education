"use strict";

/*      Task. No. 1      */
/*      Task. No. 1      */
/*      Task. No. 1      */
console.log('Task #1')

var a = 1,
    b = 1,
    c, d;

c = ++a;        // -> a += 1;       a = 2
                //    c = a;        c = 2

d = b++;        // -> d = b;        d = 1
                //    b += 1;       b = 2

c = (2 + ++a);  // -> a += 1;       a = 3
                //    c = 2 + a;    c = 5  

d = (2 + b++);  // -> d = 2 + b;    d = 4
                //    b += 1;       b = 3

console.log(d);       // 4
console.log(a);       // 3
console.log(b);       // 3

/*      Task. No. 2      */
/*      Task. No. 2      */
/*      Task. No. 2      */
console.log('Task #2')

a = 2;
var x = 1 + (a *= 2);   // a *= 2;      a = 4
                        // x = 1 + a;   x = 5

console.log(x);       // 5

/*      Task. No. 3      */
/*      Task. No. 3      */
/*      Task. No. 3      */
console.log('Task #3')

function calculate (num_1, num_2) {
    
    if (num_1 < 0 && num_2 < 0) {
        console.log('The numbers are negative');
        return num_1 * num_2;
        }
    
    if (num_1 >= 0 && num_2 >= 0) {
        console.log('Numbers are positive');
        return num_1 - num_2;
        }
    
    console.log('Numbers have opposite signs');
    return num_1 + num_2;
}

var num_1 = + prompt("Enter any number", "10");
var num_2 = + prompt("Enter any number", "-10");

if (isNaN(num_1) || isNaN(num_2)) {
    console.log("NaN");
}

console.log('Result of calculating is ' + calculate(num_1,  num_2));

/*      Task. No. 4      */
/*      Task. No. 4      */
/*      Task. No. 4      */
console.log('Task #4')

var min = 0,
    max = 15;

a = + prompt('Enter number from 0 to 15');

if (!a || a < 0 || a > 15) a = Math.floor(Math.random() * (max - min) + min);

switch(a) {
    case 1:
        console.log(a++);
    case 2:
        console.log(a++);
    case 3:
        console.log(a++);
    case 4:
        console.log(a++);
    case 5:
        console.log(a++);
    case 6:
        console.log(a++);
    case 7:
        console.log(a++);
    case 8:
        console.log(a++);
    case 9:
        console.log(a++);
    case 10:
        console.log(a++);
    case 11:
        console.log(a++);
    case 12:
        console.log(a++);
    case 13:
        console.log(a++);
    case 14:
        console.log(a++);
    case 15:
        console.log(a);
}

/*      Task. No. 5      */
/*      Task. No. 6      */
/*      Task. No. 5      */
/*      Task. No. 6      */
console.log('Task #5 + #6')

function summ(arg1, arg2) {
    return arg1 + arg2;
}

function subtract(arg1, arg2) {
    return arg1 - arg2;
}

function multiply(arg1, arg2) {
    return arg1 * arg2;
}

function divide(arg1, arg2) {
    return arg1 / arg2;
}

function calc(act, arg1, arg2) {
    switch(act) {
        case 'summ':
            return summ(arg1, arg2);

        case 'subtract':
            return subtract(arg1, arg2);

        case 'multiply':
            return multiply(arg1, arg2);

        case 'divide':
            return divide(arg1, arg2);

        default:
            calc(prompt('Enter action again', 'summ / subtract / multiply / divide'), arg1, arg2);
            break;
    }
}

num_1 = + prompt('Enter any number', '10');
num_2 = + prompt('Enter any number', '-10');
var act = prompt('Enter action', 'summ / subtract / multiply / divide');

console.log('Result of ' + act + ' for ' + num_1 + ' and ' + num_2 + ' is ' + calc(act, num_1, num_2));

/*      Task. No. 7      */
/*      Task. No. 7      */
/*      Task. No. 7      */
console.log('Task #7')

var numNull = null;
var num0 = 0;

console.log(typeof numNull);    // object with property 'Null'
console.log(typeof num0);       // number with value 0

console.log(numNull == num0);   // false, default falue by specification
console.log(numNull < num0);    // false, numNull -> +0 (after ToNumber()) -> 0 is not <> 0
console.log(numNull > num0);    // false
console.log(numNull >= num0);   // true, it`s true because numNull < num0 is false
console.log(numNull <= num0);   // true, same reason -> numNull > num0 is false

/*      Task. No. 8      */
/*      Task. No. 8      */
/*      Task. No. 8      */
console.log('Task #8');

function pow(num, degree) {
    if (degree == 0)    return 1;
    if (degree == 1)    return num;
    if (degree == -1)   return 1 / num;
    
    if (degree < 0)     return 1 / num * pow(num, ++degree);
    return num * pow(num, --degree);
}

var num = prompt('Enter a number', '3'),
    degree = prompt('Enter a degree', '3');

console.log(pow(num, degree));








