function getValidUsers(userList) {
    const users = userList.split(',');
    const uniqueUsers = Array.from(new Set(users));

    if (uniqueUsers.length < 2) throw new Error("Need atleast two users to schedule meetings");
    if (uniqueUsers.length%2 === 1) uniqueUsers.push(PropertiesService.getUserProperties().getProperty('DUMMY_USER'));

    return uniqueUsers;
}
