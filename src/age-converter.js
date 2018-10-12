/* eslint-disable no-unused-vars */

export class AgeConverter {
  constructor(inputDate, lifeExpectancy) {
    this.birthdayArray = inputDate;
    this.year = parseInt(inputDate[0]);
    this.month = parseInt(inputDate[1]) - 1;
    this.day = parseInt(inputDate[2]);
    this.totalDaysAlive = this.getDayDifference();
    this.earthAge = this.getEarthAge();
    this.mercuryAge = this.getMercuryAge();
    this.venusAge = this.getVenusAge();
    this.marsAge = this.getMarsAge();
    this.jupiterAge = this.getJupiterAge();
    this.lifeExpectancy = lifeExpectancy;
  }

  getDayDifference() {
    let today = new Date();
    let todayMonth = today.getMonth();
    let todayDay = today.getDate();
    let todayYear = today.getFullYear();

    let totalYearDays = (this.year - todayYear) * 365;

    let totalMonthDays = (this.getDaysinMonths(this.month, this.year) + this.day) - (this.getDaysinMonths(todayMonth, todayYear) + todayDay);

    let totalDays = totalYearDays + totalMonthDays;
    if (this.year < todayYear) {
      totalDays -= this.countLeapYears(this.year, this.month, this.day, todayYear, todayMonth, todayDay);
    } else {
      totalDays += this.countLeapYears(this.year, this.month, this.day, todayYear, todayMonth, todayDay);
    }
    return Math.abs(totalDays);
  }

  checkLeapYear(year) {
    if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
      return true;
    } else {
      return false;
    }
  }

  countLeapYears(yearOne, monthOne, dayOne, yearTwo, monthTwo, dayTwo) {
    let startYear = 0;
    let startMonth = 0;
    let startDay = 0;
    let finalYear = 0;
    let finalMonth = 0;
    let finalDay = 0;
    if (yearOne < yearTwo) {
      startYear = yearOne;
      startMonth = monthOne;
      startDay = dayOne;
      finalYear = yearTwo;
      finalMonth = monthTwo;
      finalDay = dayTwo;
    } else if (yearTwo < yearOne) {
      startYear = yearTwo;
      startMonth = monthTwo;
      startDay = dayTwo;
      finalYear = yearOne;
      finalMonth = monthOne;
      finalDay = dayOne;
    } else {
      return 0;
    }
    
    let count = 0;

    for (let i = startYear; i <= finalYear; i++) {
      if (this.checkLeapYear(i)) {
        count++;
      }
    }

    if (this.checkLeapYear(startYear) && (startMonth > 1)) {
      count--;
    }

    if (this.checkLeapYear(finalYear) && ((finalMonth === 1 && finalDay <= 29) || finalMonth < 1)) {
      count--;
    }
    return count;
  }

  getDaysinMonths(month) {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let totalMonthDays = 0;
    for (let i = 0; i < month; i++)
    {
      totalMonthDays += monthDays[i]; 
    }
    return totalMonthDays;
  }

  getEarthAge() {
    return Math.floor(this.totalDaysAlive/365);
  }

  getMercuryAge() {
    return Math.floor(this.totalDaysAlive/87.97);
  }

  getVenusAge() {
    return Math.floor(this.totalDaysAlive/224.70);
  }

  getMarsAge() {
    return Math.floor(this.totalDaysAlive/(365*1.8808476));
  }

  getJupiterAge() {
    return Math.floor(this.totalDaysAlive/(365*11.862615));
  }

  mercuryLifeLeft() {
    let lifeLeft = Math.floor((this.lifeExpectancy*365)/87.97) - this.mercuryAge;
    return this.lifeReturnMessage(lifeLeft, "Mercury");
  }

  venusLifeLeft() {
    let lifeLeft = Math.floor((this.lifeExpectancy*365)/224.70) - this.venusAge;
    return this.lifeReturnMessage(lifeLeft, "Venus");
  }

  marsLifeLeft() {
    let lifeLeft = Math.floor(this.lifeExpectancy/1.8808476) - this.marsAge;
    return this.lifeReturnMessage(lifeLeft, "Mars");
  }

  jupiterLifeLeft() {
    let lifeLeft = Math.floor(this.lifeExpectancy/11.862615) - this.jupiterAge;
    return this.lifeReturnMessage(lifeLeft, "Jupiter");
  }
  
  lifeReturnMessage(lifeLeft, planet) {
    if (lifeLeft < -1) {
      return `You have lived ${-lifeLeft} years past your ${planet} life expectancy!`;
    } else if (lifeLeft === -1) {
      return `You have lived ${-lifeLeft} year past your ${planet} life expectancy!`;
    } else if (lifeLeft === 0) {
      return `You have die this year on ${planet}.`;
    } else if (lifeLeft === 1) {
      return `You have ${lifeLeft} year left to live on ${planet}.`;
    } else {
      return `You have ${lifeLeft} years left to live on ${planet}.`;
    }
  }
}