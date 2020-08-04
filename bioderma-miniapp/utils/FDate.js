
class FDate{
  public ;
  currentYear;
  currentDayArray;
  constructor(){
    this.currentMonth=0;
    this.currentYear=0;
    var d = new Date();
    this.currentMonth = d.getMonth() + 1;
    this.currentYear = d.getFullYear();
    this.currentDayArray=[]
  }
  GetDay(){
    return  this.GetCurrentDay();
  }
  NextMonth(){
    if(this.currentMonth==12){
      this.currentMonth=1
      this.currentYear+=1
    }
    else
      this.currentMonth++
   return  this.GetCurrentDay();
  }
  PrevMonth(){

      if (this.currentMonth == 1) {
        this.currentMonth = 12
        this.currentYear -= 1
      }
      else
        this.currentMonth--
      return this.GetCurrentDay();


  }
  GetCurrentDay(){
   var d=new Date();
    var Year = this.currentYear 
    var Month=this.currentMonth;
   var d1 = new Date();
   var maxDate =this.GetMaxDay(Year, Month);
   var p=[];
    d1.setDate(1);
    d1.setFullYear(Year)
    d1.setMonth(Month-1)
    var x=d1.getDay();
    for(var i =0;i<x;i++){
      p.push("");
    }
    for(var i=1;i<=maxDate;i++){
      p.push(i);

    }
    this.currentDayArray= p;
    return this.currentDayArray
  }
   GetMaxDay(Year,Month){
     if (this.IsBigMonth(Month))
      return 31;
    if(Month==2)
      return this.IsRunNianYear(Year)?29:28
      return 30;
  }
   IsBigMonth(Month){
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(Month)>-1){
      return true;
    }
    return false;
  }
   IsRunNianYear(Year){
    return Year%4==0;
  }
}

module.exports = {
  FDate,

}