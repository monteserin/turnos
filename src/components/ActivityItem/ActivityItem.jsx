import { Act } from "./ActivityItem.styles";
import { InputNumber } from 'antd';
import { updateActivityTimeInDay } from '../../app/api';
import { useEffect, useState } from "react";

const ActivityItem = ({ activity, day, calendarId, month, activityTime }) => {
  const [time, setTime] = useState(activityTime);

  const handleChange = (v) => {
    setTime(v);
    updateActivityTimeInDay(month, calendarId, activity.id, day, v);
  }

  useEffect(() => {
    if (activityTime) {
      setTime(activityTime);
    }
  }, [activityTime]);

  return (
    <>
      {
        activity && <Act color={activity.color}><span> {activity.name}</span>  <InputNumber value={time} onChange={handleChange} /></Act>
      }
    </>
  );
}

export default ActivityItem;
