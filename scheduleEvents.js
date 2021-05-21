function scheduleEvents(userPairs, startDate, startTime, endTime) {
    let startDateTimeObj = dateTimeBuilder(startDate, startTime);
    let endDateTimeObj = dateTimeBuilder(startDate, endTime);
    if (isWeekend(startDateTimeObj)) {
        startDateTimeObj = getNextWorkingDay(startDateTimeObj);
        endDateTimeObj = getNextWorkingDay(endDateTimeObj);
    }

    for (let i = 0; i < userPairs.length; i++) {
        for (let j = 0; j < userPairs[i].length; j++) {
            if (userPairs[i][j][0] !== userPairs[i][j][1]) {
                createCalendarEvent(userPairs[i][j][0], userPairs[i][j][1], startDateTimeObj.toISOString(), endDateTimeObj.toISOString());
            }
        }
        startDateTimeObj = getNextWorkingDay(startDateTimeObj);
        endDateTimeObj = getNextWorkingDay(endDateTimeObj);
    }
}

function dateTimeBuilder(date, time) {
    const dateTimeObj = new Date(date);
    const splitTime = time.split(':');
    dateTimeObj.setHours(splitTime[0], splitTime[1], 0);

    return dateTimeObj;
}

function getNextWorkingDay(date) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() === 6) date.setDate(date.getDate() + 2);
    if (date.getDay() === 0) date.setDate(date.getDate() + 1);
    return date;
}

function isWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}
