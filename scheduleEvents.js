function scheduleEvents(userSlotPairs, startDate, startTime, endTime) {
    const slots = getDateTimeSlots(userSlotPairs.length, startDate, startTime, endTime);

    for (let i = 0, slot = 0; i < userSlotPairs.length; i++, slot++) {
        for (let j = 0; j < userSlotPairs[i].length; j++) {
            if (!hasDummyUser(userSlotPairs[i][j])) {
                createCalendarEvent(
                    userSlotPairs[i][j][0], userSlotPairs[i][j][1],
                    slots[slot].startDateTimeObj.toISOString(), slots[slot].endDateTimeObj.toISOString()
                );
            }
        }
    }
}

function getDateTimeSlots(slotCount, startDate, startTime, endTime) {
    const dateTimeSlots = [];
    startDate = dateTimeBuilder(startDate);
    if (isWeekend(startDate)) {
        startDate = getNextWorkingDay(startDate);
    }
    for (let slot = 0; slot < slotCount;) {
        for (let itr = 0; itr < startTime.length && slot < slotCount; itr++, slot++) {
            let startDateTimeObj = dateTimeBuilder(startDate, startTime[itr]);
            let endDateTimeObj = dateTimeBuilder(startDate, endTime[itr]);

            dateTimeSlots.push({startDateTimeObj, endDateTimeObj});
        }
        startDate = getNextWorkingDay(startDate);
    }
    return dateTimeSlots;
}

function dateTimeBuilder(date, time = null) {
    const dateTimeObj = new Date(date);
    if(time) {
        const splitTime = time.split(':');
        dateTimeObj.setHours(splitTime[0], splitTime[1], 0);
    }
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

function hasDummyUser(pairs) {
    return pairs.includes(PropertiesService.getScriptProperties().getProperty('DUMMY_USER'));
}
