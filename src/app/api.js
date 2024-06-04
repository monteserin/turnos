import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "./firebase";


export const getUserLastCalendarId = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const result = await getDoc(query(docRef));
    return result.data()?.lastUsedCalendarId;
}

export const addActivityToCalendar = async (calendarId, activity) => {
    console.log('ppppppppppppppppppppppppppppp', calendarId)
    const colRef = collection(db, 'calendars', calendarId, 'activities');
    await addDoc(colRef, activity);
}

export const getActivitiesFromCalendarId = async (calendarId) => {
    const colRef = collection(db, 'calendars', calendarId, 'activities');
    const result = await getDocs(query(colRef));
    const res = getArrayFromCollection(result);
    return res;
}

export const getCalendarById = async (calendarId) => {
    const docRef = doc(db, 'calendars', calendarId);
    const result = await getDoc(query(docRef));
    return { ...result.data(), id: calendarId };
}

export const saveCalendar = async (uid, calendarId, calendarData) => {
    const colRef = collection(db, 'calendars');

    let calendarIdAux = calendarId;
    if (calendarId) {
        await setDoc(doc(colRef, calendarId), calendarData);
    } else {
        const data = await addDoc(colRef, calendarData);
        calendarIdAux = data.id;
        const colRef2 = collection(db, 'users', uid, 'calendars');
        // await addDoc(colRef2, { id: calendarIdAux });
        await setDoc(doc(colRef2, calendarIdAux), {});

    }
    updateLastUsedCalendarId(uid, calendarIdAux)
}

export const updateLastUsedCalendarId = async (uid, calendarId) => {
    const colRef = collection(db, 'users');

    await setDoc(doc(colRef, uid), { lastUsedCalendarId: calendarId });

}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

export const updateActivityTimeInDay = async (month, calendarId, activityId, day, time) => {
    const docRef = doc(db, 'calendars', calendarId);
    const result = await getDoc(docRef);
    const monthData = result.data();
    const oldActivitiesInDay = monthData.months[month][day];
    let newActivitiesInDay = oldActivitiesInDay.map(act => {
        if (act.id === activityId) {
            return { ...act, time };
        }
        return act;
    });

    const newMonths = { ...monthData.months, [month]: { ...monthData.months[month], [day]: newActivitiesInDay } };
    await updateDoc(docRef, { months: newMonths });

}


export const getCalendarsFromUserId = async (uid) => {
    const colRef = collection(db, 'users', uid, 'calendars');
    const result = await getDocs(query(colRef));
    const data = getArrayFromCollection(result);
    console.log('ddddd', data, uid)
    return data;
}