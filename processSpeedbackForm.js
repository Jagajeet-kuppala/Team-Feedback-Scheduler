function processSpeedbackForm(formObject) {
  try {
    const MAX_USERNAME_LENGTH = 25;
    const { users, slotTime } = formObject;
    validateSlotTime(parseInt(slotTime));
    const userList = getValidUsers(users);
    for (let itr = 0; itr < userList.length; itr++) {
      userList[itr] = userList[itr].slice(0,MAX_USERNAME_LENGTH);
    }
    const schedule = getSchedulePairs(userList);

    let scheduleTables = [];
    for (let slot = 0; slot < schedule.length; ++slot) {
      scheduleTables.push(tableCreator(schedule[slot]));
    }
    return {scheduleTables, slotTime};
  } catch (err) {
    Logger.log(err);
    return { error: `<p style="color: red">${err.message}</p>` };
  }
}

function tableCreator(userPairs) {
  let table = "<table><tr><th>Teammate 1</th><th>Teammate 2</th></tr>";
  for (let pair = 0; pair < userPairs.length; ++pair) {
    const user1 =
      userPairs[pair][0] ===
      PropertiesService.getUserProperties().getProperty("DUMMY_USER")
        ? "TIMEKEEPER"
        : userPairs[pair][0];
    const user2 =
      userPairs[pair][1] ===
      PropertiesService.getUserProperties().getProperty("DUMMY_USER")
        ? "TIMEKEEPER"
        : userPairs[pair][1];
    table = table + `<tr><td>${user1}</td><td>${user2}</td></tr>`;
  }
  table = table + "</table>";
  return table;
}

function validateSlotTime(slotTime) {
  if (!slotTime) {
    throw new Error("Round time should not be empty");
  }
  if (slotTime < PropertiesService.getUserProperties().getProperty('MIN_SPEEDBACK_SLOT_MINUTES') ||
      slotTime > PropertiesService.getUserProperties().getProperty('MAX_SPEEDBACK_SLOT_MINUTES')) {
    throw new Error(`Round time should be between ${PropertiesService.getUserProperties().getProperty('MIN_SPEEDBACK_SLOT_MINUTES')} minutes 
    and ${PropertiesService.getUserProperties().getProperty('MAX_SPEEDBACK_SLOT_MINUTES')} minutes`);
  }
}
