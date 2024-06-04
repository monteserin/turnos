import { Button, Drawer, Input, InputNumber, Space, Row, ColorPicker } from 'antd';
import { addActivityToCalendar, getActivitiesFromCalendarId } from '../../app/api';
import { useEffect, useState } from 'react';
import { PersonBtn } from './Activities.styles';
import { IoMdAddCircle } from 'react-icons/io';
import { CiEdit } from "react-icons/ci";


const Activities = ({ sendActiveActivity, sendActivities, calendarId, currentMonth }) => {
  const [activityName, setActivityName] = useState();
  const [activityTime, setActivityTime] = useState();
  const [activityColor, setActivityColor] = useState('#1677ff');

  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activeActivity, setActiveActivity] = useState();

  useEffect(() => {
    if (calendarId) {
      getActivities();
    }
  }
    , [calendarId]);


  const getActivities = async () => {
    const activitiesAux = await getActivitiesFromCalendarId(calendarId);
    setActivities(activitiesAux);
    sendActivities(activitiesAux);
  }


  const getPointsByActivityId = (activityId) => {
    const points = Object.values(currentMonth).reduce((acc, activitiesInDay) => {
      console.log('ooooooooooo', activityId, activitiesInDay)

      const act = activitiesInDay.find(a => a.id === activityId);
      if (act) {
        return acc + act.time;
      }
      return 0
    }, 0);
    return points
  }

  return (
    <div>



      <Row gutter={[20, 20]} align={'middle'}>
        {
          activities.map((activity) => {
            return <PersonBtn key={activity.id} isActive={activity.value === activeActivity}
              onClick={() => {
                setActiveActivity(activity);
                sendActiveActivity(activity);
              }} color={activity.color}><span>{activity.name}:  {getPointsByActivityId(activity.id)}  {[].filter(p => p && p.includes(activity.id)).length}</span> <CiEdit size={40} onClick={() => {
                setActivityName(activity.name);
                setActivityTime(activity.time);
                setActivityColor(activity.color);
                setIsAddActivityOpen(true);
              }} />
            </PersonBtn>
          })
        }

        <div style={{ cursor: 'pointer' }}><IoMdAddCircle size={30} color='#f77754' onClick={() => {
          setIsAddActivityOpen(true)
        }} /></div>
      </Row>
      <Drawer
        title="Añadir nueva actividad"
        placement={'right'}
        width={500}
        onClose={() => setIsAddActivityOpen(false)}
        open={isAddActivityOpen}
      >
        <Space direction='vertical'>
          <label>Nombre de la actividad</label>

          <Input placeholder='Nombre de la actividad' onChange={e => setActivityName(e.target.value)} value={activityName} />
          <label>Horas por defecto de una jornada</label>

          <InputNumber placeholder='Horas por defecto de una jornada' onChange={n => setActivityTime(n)} value={activityTime} />

          <ColorPicker value={activityColor} size="large" onChangeComplete={(colors) => {
            setActivityColor('#' + colors.toHex());
          }} />

          <Space direction='horizontal'>
            <Button type="primary" onClick={async () => {
              setIsAddActivityOpen(false);
              console.log('esto no debería ser null', calendarId)
              await addActivityToCalendar(calendarId, { name: activityName, time: activityTime, color: activityColor })
              getActivities();

            }}>
              Guardar
            </Button>
            <Button onClick={() => { setIsAddActivityOpen(false) }}>
              Cancelar
            </Button>
          </Space>
        </Space>
      </Drawer >
    </div >
  );
}

export default Activities;
