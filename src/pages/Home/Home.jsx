import { useEffect, useState } from 'react'
import { CalendarDays, Day, CalendarDaysHead, AddBtn } from './Home.styles';
import { Button, Col, Input, Row, Select, App } from 'antd';
import { months } from '../../app/utils';
import { saveCalendar, getUserLastCalendarId, getCalendarById, getCalendarsFromUserId, updateLastUsedCalendarId } from '../../app/api';
import { useUIDContext } from '../../app/providers/UIDProvider';
import Activities from '../../components/Activities/Activities';
import ActivityItem from '../../components/ActivityItem/ActivityItem';


const Home = () => {
  const [activeActivity, setActiveActivity] = useState();
  const [month, setMonth] = useState(null); // Julio
  const [year, setYear] = useState(null);
  const [monthInfo, setMonthInfo] = useState(null);
  const [calendarData, setCalendarData] = useState();
  const [calendars, setCalendats] = useState([]);

  const [uid] = useUIDContext();
  const [calendarName, setCalendarName] = useState();
  const [activities, setActivities] = useState([]);
  const [lastUserCAlendarId, setLastUserCalendarId] = useState();
  const { notification } = App.useApp();


  useEffect(() => {
    const f = async () => {
      const isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
      const daysOfTheMonth = [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

      setMonthInfo({
        startingDayOfTheWeek: new Date(`${year}-${month + 1}-01`).getDay() - 1,
        daysOfTheMonth: daysOfTheMonth,
      });

      const calendarIdFromUser = await getUserLastCalendarId(uid);
      setLastUserCalendarId(calendarIdFromUser);
      if (calendarIdFromUser) {
        loadCalendar(calendarIdFromUser);
      }

    }
    if (month != null && year != null && uid != null) {
      f();
    }
  }, [month, year, uid])


  const loadCalendar = async (calendarIdFromUser) => {
    const cal = await getCalendarById(calendarIdFromUser);
    setCalendarData(cal);
  }
  useEffect(() => {
    if (uid) {
      const f = async () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth();
        setYear(y);
        setMonth(m);

        getCalendarsFromUserId(uid).then(res => {
          setCalendats(res);
        })
      }
      f();// obtenemos el mes y año actual
    }

  }, [uid])

  const saveC = async () => {
    const calendarDataAux = calendarData || {};
    calendarDataAux.owner = uid;
    calendarDataAux.name = calendarName || 'uyuyuyuyuy';
    setCalendarData(calendarDataAux);
    await saveCalendar(uid, calendarData?.id, calendarDataAux);

    notification.info({
      message: 'Calendario salvado',
    });
  }

  // const calendarIsReady = calendarData && calendarData.months && calendarData.months[month + '-' + year]
  // console.log('9999999999999', calendarData, calendarData.months)

  const currentMonth = calendarData && calendarData.months && calendarData.months[month + '-' + year] ? calendarData.months[month + '-' + year] : {};

  const getCompleteAcivityFromId = (id) => {
    return activities.find(a => a.id === id);
  }

  const handleProjectSelection = (v) => {
    console.log(v)
    setLastUserCalendarId(v)
    updateLastUsedCalendarId(uid, calendarData.id);
    loadCalendar(v);
  }


  return (
    <>
      <Row>
        <Col>
          Calendarios:
        </Col>
        <Col>
          <Select onChange={handleProjectSelection} style={{ minWidth: 200 }} value={lastUserCAlendarId}>
            {
              calendars.map((calendar, i) => <Select.Option key={i} value={calendar.id}>{calendar.id}</Select.Option>)
            }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder='Nombre del calendario' onChange={e => setCalendarName(e.target.value)} value={calendarData?.name} />
        </Col>
        <Col>
          <Button type="primary" onClick={saveC}>Guardar calendario</Button>
        </Col>
      </Row >

      {
        calendarData ? <>

          <Select onChange={v => setMonth(v)} options={months} placeholder="Seleccione un mes" value={month} />

          <Select onChange={v => setYear(v)} placeholder="Seleccione un año" value={year}>
            <Select.Option value="2024">2024</Select.Option>
            <Select.Option value={year + 1}>{year + 1}</Select.Option>
          </Select>

          <CalendarDaysHead>
            <div>Lunes</div>
            <div>Martes</div>
            <div>Miércoles</div>
            <div>Jueves</div>
            <div>Viernes</div>
            <div>Sábado</div>
            <div>Domingo</div>
          </CalendarDaysHead>
          <CalendarDays>
            {[...Array(35)].map((v, index) => {

              let isActive = false;
              let i = -1;
              if (monthInfo) {
                isActive = index >= monthInfo.startingDayOfTheWeek && index <= monthInfo.daysOfTheMonth - 1 + monthInfo.startingDayOfTheWeek;
                i = index + 1 - monthInfo.startingDayOfTheWeek;
              }

              const day = 'day' + i;
              return <Day
                isactive={isActive}
                key={index + '-' + month + '-' + year}
              >

                {isActive && index + 1 - monthInfo.startingDayOfTheWeek}

                {isActive && <AddBtn onClick={() => {
                  if (!activeActivity) {
                    alert('Selecciona una actividad primero')
                  } else {
                    const activitiesIdsInSelectedDay = currentMonth && currentMonth['day' + i] ? currentMonth['day' + i] : [];
                    console.log(11, activeActivity, currentMonth, '-----------', activitiesIdsInSelectedDay, '-----------', i)
                    // const auxDays = currentMonth ? currentMonth : {};
                    // Añadimos la persona que corresponda
                    let currentMonthAux = currentMonth ? currentMonth : {};
                    currentMonthAux[day] = activitiesIdsInSelectedDay == null ?
                      currentMonthAux[day] = [{ id: activeActivity.id, time: activeActivity.time }] :
                      currentMonthAux[day] = activitiesIdsInSelectedDay.includes(activeActivity.id) ?
                        activitiesIdsInSelectedDay.filter(p => p !== activeActivity.id) : [...activitiesIdsInSelectedDay, { id: activeActivity.id, time: activeActivity.time }];

                    const obj = { ...calendarData, months: { ...calendarData?.months, [month + '-' + year]: currentMonthAux } }
                    setCalendarData(obj);
                    saveCalendar(uid, calendarData?.id, obj);
                  }
                }}>add</AddBtn>
                }

                {calendarData && i >= 0 && currentMonth['day' + i] && currentMonth['day' + i].map((act) => {
                  const activity = getCompleteAcivityFromId(act.id);
                  return <ActivityItem key={'day:' + day + '-' + act.id} activity={activity} activityTime={act.time} day={day} calendarId={calendarData.id} month={month + '-' + year} />
                })}
              </Day>
            })}
          </CalendarDays>

          <Activities currentMonth={currentMonth} calendarId={calendarData?.id} sendActiveActivity={(uu) => {
            setActiveActivity(uu);
          }} sendActivities={(acts) => {
            setActivities(acts);
          }} />

        </> : <div>El calendario no está listo</div>
      }


    </>
  )
}

export default Home
