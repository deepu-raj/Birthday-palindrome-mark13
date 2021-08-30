var inputDate = document.querySelector("#dob");
var checkBtn = document.querySelector("#check-btn");
var displayMsg = document.querySelector("#displayMsg")

function reverseStr(str){
  return str.split("").reverse().join("")
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return reverse === str; // return is a boolean fn
}

function convertDateToStr(date) {

 var dateStr = { day:"", month:"", year:""} 
 if (date.day<10){
   dateStr.day = "0" + date.day;
 }
 else {
   dateStr.day= date.day.toString()
 }
 if (date.month<10){
  dateStr.month = "0" + date.month;
}
 else {
  dateStr.month= date.month.toString()
  }
  
  dateStr.year= date.year.toString()
  return dateStr;
}


function getAlldateFormats(date) {
  var dateStr = convertDateToStr(date)
  var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year
  var mmddyyyy = dateStr.month+dateStr.day+dateStr.year
  var yyyymmdd = dateStr.year+dateStr.month+dateStr.day
  var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2)
  var mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2)
  var yymmdd = dateStr.year.slice(-2)+dateStr.month+dateStr.day
  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]

}

function checkAlldateFormatsIsPalindrome(date){
  var flag = false;
  var dateformats = getAlldateFormats(date)
  for (i=0;i<dateformats.length;i++){
    if (isPalindrome(dateformats[i])){
      flag=true;
      break;
    } 
  }
  return flag;
}
function checkLeapYear(year){
  if (year%400===0){
    return true;
  } else if (year%100===0){
    return false;
  } else if (year%4===0){
    return true;
  }
  else {
    return false;
  }
}
function getNextdate(date){
  var monthArray =[31,28,31,30,31,30,31,31,30,31,30,31];
  var day = date.day;
  var month= date.month;
  var year = date.year;
  day=day+1;
  if (month===2){
    if (checkLeapYear(year)){
      if (day>29){
        day=1;
        month++;
      }
    }
    else {
      if (day>28){
        day=1;
        month++;
      }
    }    
  }    
   
  if (day>monthArray[month-1]){
    day=1;
    month++;
  }
  if (month===13){
      month=1;
      year++;
    }
    return {
    day: day,
    month:month,
    year:year
  }
}

function nextPalindrome(date){
  var ctr=0;
  var nextDate=getNextdate(date);
  while(1){
    ctr++
    if (checkAlldateFormatsIsPalindrome(nextDate)){
    break;
    } else {
    nextDate = getNextdate(nextDate);
    }
  }
  return [ctr,nextDate]
}

function getPreviousdate(date){
  var monthArray =[31,28,31,30,31,30,31,31,30,31,30,31];
  var day = date.day;
  var month= date.month;
  var year = date.year;
  day=day-1;
   if (month===3){
    if (checkLeapYear(year)){
      if (day<1){
        day=29;
        month--;
      }
    }
    else {
      if (day<1){
        day=28;
        month--;
      }
    }    
  }    
   
  if (month!==3){
      if (day<1){
        day=monthArray[month-2]
        month--
      }
  }
  if (month===0){
    day=31
    month=12
    year--
  }
    return {
    day: day,
    month:month,
    year:year
  }
}

function previousPalindrome(date){
  var ctr=0;
  var previousDate=getPreviousdate(date);
  while(1){
    ctr++
    if (checkAlldateFormatsIsPalindrome(previousDate)){
    break;
    } else {
    previousDate = getPreviousdate(previousDate);
    }
  }
  return [ctr,previousDate]
}

function findNearest(date){
  var nextPalin = nextPalindrome(date)
  var previousPalin=previousPalindrome(date)
  var nearest
  if (nextPalin[0]<=previousPalin[0]){
       nearest = nextPalin
    } else {
     nearest = previousPalin
  }
  return nearest
 }




function clickhandler(){
  var dateString = inputDate.value.split("-");  
  var date = { day:Number(dateString[2]),month:Number(dateString[1]),year:Number(dateString[0])};
   if (checkAlldateFormatsIsPalindrome(date)){
   displayMsg.innerText = " Yes! you were born on a palindrome"
  } else {
    var nextPalin = nextPalindrome(date)
    var previousPalin=previousPalindrome(date)
    if (nextPalin[0]<=previousPalin[0]){
      displayMsg.innerText = nextPalin[0] + "days ahead is the nearest palindrome on " + nextPalin[1].day+"-"+nextPalin[1].month+"-"+nextPalin[1].year;
    } else {
      displayMsg.innerText = previousPalin[0] + "days before was the nearest palindrome on " + previousPalin[1].day+"-"+previousPalin[1].month+"-"+previousPalin[1].year;
    }
  }
}
checkBtn.addEventListener("click", clickhandler)
