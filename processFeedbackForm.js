function processFeedbackForm(formObject) {
    try {
        const {users, startDate, startTime, endTime} = formObject;
        const userList = getValidUsers(users);
        const userPairs = getSchedulePairs(userList);
        scheduleEvents(userPairs, startDate, startTime, endTime);

        return "SUCCESS";
    } catch(err) {
        Logger.log(err);
        return err.message;
    }
}
