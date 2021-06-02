function getSchedulePairs(users) {
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