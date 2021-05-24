function processForm(formObject) {
    try {
        const {users, startDate, startTime, endTime} = formObject;
        const userList = extractUsers(users);
        const userPairs = schedulePairs(userList);
        scheduleEvents(userPairs, startDate, startTime, endTime);

        return "SUCCESS";
    } catch(err) {
        Logger.log(err);
        return err.message;
    }
}

function schedulePairs(users) {
    const combos = [];
    for (let i = 1; i < users.length; i++) {
        const temp = [];
        for (let j = 0; j < users.length / 2; j++) {
            temp.push([users[j], users[users.length - j - 1]].sort());
        }
        combos.push(temp);
        users.splice(1, 0, users.pop());
    }
    return combos;
}

function extractUsers(userList) {
    const users = userList.split(',');
    const uniqueUsers = Array.from(new Set(users));

    if (uniqueUsers.length < 2) throw new Error("Need atleast two users to schedule meetings");
    if (uniqueUsers.length%2 == 1) uniqueUsers.push(PropertiesService.getScriptProperties().getProperty('DUMMY_USER'));

    return uniqueUsers;
}