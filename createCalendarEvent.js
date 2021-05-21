function createCalendarEvent(user1, user2, startDateTime, endDateTime) {
    const name1 = getFirstName(user1);
    const name2 = getFirstName(user2);
    Logger.log(name1);
    Logger.log(name2);
    try {
        const calendarId = 'primary';
        let event = {
            summary: `${name1} : ${name2}`,
            description: 'Time for feedback !!',
            start: {
                dateTime: startDateTime
            },
            end: {
                dateTime: endDateTime
            },
            attendees: [
                {
                    email: user1,
                    responseStatus: "accepted"
                },
                {
                    email: user2,
                    responseStatus: "accepted"
                }
            ],
            colorId: 5,
            sendNotifications: true,
            sendUpdates: "all",
            guestsCanModify: true
        };
        event = Calendar.Events.insert(event, calendarId);
        Logger.log('Event ID: ' + event.id);
    } catch(err) {
        throw err;
    }
}

function getFirstName(user) {
    const username = user.split('@')[0].split('.')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
}
