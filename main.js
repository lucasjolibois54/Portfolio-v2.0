const typedTextSpan= document.querySelector(".typed-text")/*makes it easier to acess the .typed-text class*/
const cursorSpan = document.querySelector(".writting-cursor");

const textArray = ["web development", "social media", "Lighroom Adobe", "photography", "UX design" ];
const typingDelay= 200; /*delay before typing the next characters (200 millisec)*/
const erasingDelay= 100; /*delay before deleting text. typing will be slower than erasing as it needs time to write before deleting, whcih is why it is twice as much*/
const newTextDelay= 2000; /*delay befoe the current and new text*/
/*this is to keep track of the curent characters- we use let instead of cons as we expect reasignment of values to these variables*/
let textArrayIndex= 0; /*first text (elemtent) from the textArray*/
let charIndex= 0; /*first character from the textArray which is the first letter*/

/*typing fuction (type a character and then wait for the delay from before before deleting it and rewrite a new one*/
function type(){
    if(charIndex < textArray[textArrayIndex].length) { /*this is the entire string/ word*/ /*if the last character/ letter of the current string is not already typed we want to erase it before writing the next, which is underneath in erase (textArray[textArrayIndex]: current string)*/ 
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex); /*adding the next character at the specified index*/ 
    charIndex++; /*increase carindex by one to move on to the next character*/
    setTimeout(type, typingDelay) /*setting the type again after waiting for the typingdelay(type is refrence to the type above which is also the text)*/
}

/*erase*/
else{
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay); /*waiting for the delay before erasing the text*/
}
}

function erase(){ /*giving the function erase a functionality*/
    if(charIndex > 0){
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing"); /*if the earase typing is greater than 0, the typing will be visible and wont blink*/
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0,charIndex-1) /*the first time the erase function is used, charIndex has the value 15, which is the amount of characters that the first word has whihc is web development (length). the substrings starts from 0 which is the first letter. thats w. Therefore there is still 14 characters. Inorder to only remove those and not too much i said harIndex-1 as harIndex is 15 and i only need 14 as 0 is already the first character*/ 
        charIndex--; /*reduse charIndex by one which is the -- */
        setTimeout(erase, erasingDelay); /*add a delay to the erase function*/
    }
    else{ /*this will affect erase when the charIndex is 0 (when there are 0 characters left in the word)*/
        cursorSpan.classList.remove("typing"); /*here the typing will start blink again*/
        textArrayIndex++; /*it will start writing as theres a ++ which means that i will add*/
        if(textArrayIndex>=textArray.length) textArrayIndex=0; /*it will only add a new word if the textArrayIndex is down to 0 characters*/
        setTimeout(type, typingDelay + 1100); /*Adds another delay*/
    }
}
document.addEventListener("DOMContentLoaded", function(){ /*when the first word has been loaded, it will call the function*/
  if(textArray.length)  setTimeout(type, newTextDelay + 250); /*adding delay to the type function so that there's time to read what it says on the site*/
})