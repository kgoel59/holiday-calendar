import { Component } from 'react';

import HolidayCalendarJSX from './HolidayCalendar';
import data from './data';

class HolidayCalendar extends Component {
    constructor() {
        super();

        this.state = {
            name: 'No Holiday Today',
            listOfHolidays : [],
            listOfDates : [],
            todaysDate: "2019-01-14",
            isTodayHoliday: false,
            indexOfHoliday: null,
            passed: false,

            modalState: false,
            holidayDate:"2019-01-01",
            holidayName:"New Year's Day",
            holidayType: "National holiday",
            holidayDescription: "New Year’s Day is celebrated many countries such as in India on the January 1 in the Gregorian calendar."
        } 
    }

    componentDidMount() {
        this.getListOfHolidays();
    }

    getListOfHolidays =async  () => {
        // const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=573cb407e77ed898288ec37357cd3e58ea559d14&country=IN&year=2019`);
        // const myJson = await response.json();
        this.setState({
          listOfHolidays: data.response.holidays
        }, () => {
          this.isTodayHoliday()
        });
        
    }
    
    isTodayHoliday = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();

        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        
        today = yyyy+'-'+mm+'-'+dd;

        this.setState({
          todaysDate: today
        })
        
        const dates = [];
        this.state.listOfHolidays.map((eachHoliday) => (
          dates.push(eachHoliday.date.iso.substr(0,10))
        ))

        this.setState({
          listOfDates: dates
        })

        let isHoliday = dates.indexOf(today);

        if(isHoliday !== -1) {
          this.setState({
            isTodayHoliday: true,
            indexOfHoliday: isHoliday,
            name: this.state.listOfHolidays[isHoliday].name
          })
        }
    }

    togglePassed = () => {
      this.setState(prevState => ({
        passed: !prevState.passed
      }));
    }

    toggleModal = () => {
      this.setState(prevState => ({
        modalState: !prevState.modalState
      }));
    }

    viewHoliday = (index) => {
      const holiday = this.state.listOfHolidays[index];

      this.setState({
        holidayDate: holiday.date.iso,
        holidayName: holiday.name,
        holidayType: holiday.type[0],
        holidayDescription: holiday.description
      }, this.toggleModal)
    }

    render() {
      return HolidayCalendarJSX.call(this);
    }
}

export default HolidayCalendar;