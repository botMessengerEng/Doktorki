import * as data from './doktorki-data';

export async function initDB(mongoUsers, mongoUsersDetails, mongoSchedule, saltRounds, bcrypt) {
    await Promise.all([
        mongoUsers.drop(),
        mongoUsersDetails.drop(),
        mongoSchedule.drop()
    ]);
    let result;
    data.users.forEach(async (element) => {
        element.password = await bcrypt.hash(element.password, saltRounds);
        result += await mongoUsers.insertElements([element]);
    });

    result += await Promise.all(
        [mongoUsersDetails.insertElements(data.usersDetails),
        mongoSchedule.insertElements(data.schedule)
        ]);
    return new Promise(resolve => resolve(result));
}

