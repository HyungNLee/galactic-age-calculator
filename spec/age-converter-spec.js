import { AgeConverter } from "../src/age-converter.js";

describe('Age Converter', function() {

  let inputDate;

  beforeEach(function() {
    let inputString = "1990-01-15";
    let inputArray = inputString.split("-");
    
    inputDate = new AgeConverter(inputArray, 75);
  });

  it('should correctly construct AgeConverter object', function() {
    let earthDays = inputDate.totalDaysAlive;
    expect(earthDays).toEqual(10497);
  });

  it('should hold proper earth age value', function() {
    let earthAge = inputDate.earthAge;
    expect(earthAge).toEqual(28);
  });

  it('should test getMercuryAge() for proper value', function() {
    let mercuryAge = inputDate.mercuryAge;
    expect(mercuryAge).toEqual(119);
  });

  it('should test getVenusAge() for proper value', function() {
    let venusAge = inputDate.venusAge;
    expect(venusAge).toEqual(46);
  });

  it('should test getMarsAge() for proper value', function() {
    let marsAge = inputDate.marsAge;
    expect(marsAge).toEqual(15);
  });

  it('should test getJupiterAge() for proper value', function() {
    let jupiterAge = inputDate.jupiterAge;
    expect(jupiterAge).toEqual(2);
  });

  it('should test mercuryLifeLeft() for proper value', function() {
    let mercuryLifeLeft = inputDate.mercuryLifeLeft();
    expect(mercuryLifeLeft).toEqual(192);
  });

  it('should test venusLifeLeft() for proper value', function() {
    let venusLifeLeft = inputDate.venusLifeLeft();
    expect(venusLifeLeft).toEqual(75);
  });
});