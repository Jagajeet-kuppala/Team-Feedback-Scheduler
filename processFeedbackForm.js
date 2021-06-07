function processFeedbackForm(formObject) {
    try {
        const {users, startDate, startTime, endTime, userDateTime} = formObject;
        const userList = getValidUsers(users);
        validateDateTime(startDate, startTime, endTime, userDateTime);
        const userPairs = getSchedulePairs(userList);
        scheduleEvents(userPairs, startDate, startTime, endTime);

        return "SUCCESS";
    } catch(err) {
        Logger.log(err);
        return err.message;
    }
}

function validateDateTime(startDate, startTime, endTime, userDateTime) {
    const moment = new Date();
    const todaysDate = moment.toISOString().split('T')[0];
    const userTimeZoneOffset = new Date(userDateTime).getTimezoneOffset();
    const hoursOffset = userTimeZoneOffset / 60;
    const minutesOffset = userTimeZoneOffset % 60;

    moment.setHours(moment.getHours() - hoursOffset);
    moment.setMinutes(moment.getMinutes() - minutesOffset);
    const currentUserTime = moment.toISOString().split('T')[1].slice(0, 5);

    if (startDate < todaysDate) {
        throw new Error("START_DATE_SHOULD_NOT_BE_IN_PAST");
    }
    if (startDate === todaysDate) {
        if (startTime < currentUserTime) {
            throw new Error("START_TIME_SHOULD_NOT_BE_IN_THE_PAST");
        }
    }
    if (endTime < startTime) {
        throw new Error("END_TIME_SHOULD_BE_GREATER_THAN_START_TIME");
    }
}