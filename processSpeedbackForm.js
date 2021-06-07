function processSpeedbackForm(formObject) {
  try {
    const { users } = formObject;
    const userList = getValidUsers(users);
    const schedule = getSchedulePairs(userList);

    let scheduleTable = "";
    for (let slot = 0; slot < schedule.length; ++slot) {
      scheduleTable = scheduleTable + tableCreator(schedule[slot]);
    }
    return scheduleTable;
  } catch (err) {
    Logger.log(err);
    return err.message;
  }
}

function tableCreator(userPairs) {
  let table = "<table><tr><th>Teammate 1</th><th>Teammate 2</th></tr>";
  for (let pair = 0; pair < userPairs.length; ++pair) {
    const user1 =
      userPairs[pair][0] ===
      PropertiesService.getScriptProperties().getProperty("DUMMY_USER")
        ? "TIMEKEEPER"
        : userPairs[pair][0];
    const user2 =
      userPairs[pair][1] ===
      PropertiesService.getScriptProperties().getProperty("DUMMY_USER")
        ? "TIMEKEEPER"
        : userPairs[pair][1];
    table = table + `<tr><td>${user1}</td><td>${user2}</td></tr>`;
  }
  table = table + "</table><br>";
  return table;
}
