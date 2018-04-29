import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[],
    }
  }

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.createEvents(responseData)
    })

  }

  createEvents = (data) => {
    data.forEach((item) =>{
       const eventItem = {
        id: item.id,
        title:item.activity+', '+item.duration,
        start:moment(item.date).format('MM/DD/YYYY'),
        end:moment(item.date).format('MM/DD/YYYY'),
        desc:item.customer.lastname+', '+item.customer.firstname
      };
      this.setState({
        events: [...this.state.events, eventItem]
      });
    })
    console.log(this.state.events);
  }




  render() {

    if (this.state.events.length === 0) return null

    return (

      <BigCalendar
      style={{height:600}}
      events={this.state.events}
      views={['month', 'week', 'day', 'agenda']}
      step={60}
      showMultiDayTimes
      />
    )
  }
}


export default Calendar;
