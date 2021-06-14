function processFeedbackForm(formObject) {
    try {
        Logger.log(formObject);
        let {users, startDate, startTime, endTime, userDateTime} = formObject;
        if (!Array.isArray(startTime)) {
            startTime = [startTime];
        }
        if (!Array.isArray(endTime)) {
            endTime = [endTime];
        }
        const userList = getValidUsers(users);
        validateDateTime(startDate, startTime, endTime, userDateTime);
        const userPairs = getSchedulePairs(userList);
        scheduleEvents(userPairs, startDate, startTime, endTime);

        return '<p style="color: green">SUCCESS. Please check your Google Calender</p>';
    } catch(err) {
        Logger.log(err);
        return `<p style="color: red">${err.message}</p>`;
    }
}

function validateDateTime(startDate, startTime, endTime, userDateTime) {
    if(startTime.length !== endTime.length) {
        throw new Error("NUMBER_OF_START_TIMES_SHOULD_EQUAL_END_TIMES");
    }
    const moment = new Date(userDateTime);
    const userTimeZoneOffset = new Date(userDateTime).getTimezoneOffset();
    const hoursOffset = userTimeZoneOffset / 60;
    const minutesOffset = userTimeZoneOffset % 60;

    moment.setHours(moment.getHours() - hoursOffset);
    moment.setMinutes(moment.getMinutes() - minutesOffset);
    const todaysDate = moment.toISOString().split('T')[0];
    const currentUserTime = moment.toISOString().split('T')[1].slice(0, 5);

    if (startDate < todaysDate) {
        throw new Error("START_DATE_SHOULD_NOT_BE_IN_PAST");
    }
    if (startDate === todaysDate) {
        for(let itr = 0; itr < startTime.length; startTime++) {
            if (startTime[itr] < currentUserTime) {
                throw new Error("START_TIME_SHOULD_NOT_BE_IN_THE_PAST");
            }
        }
    }
    for(let itr = 0; itr < startTime.length; startTime++) {
        if (endTime < startTime) {
            throw new Error("END_TIME_SHOULD_BE_GREATER_THAN_START_TIME");
        }
    }
    Logger.log("All Date & Times are valid");
}
