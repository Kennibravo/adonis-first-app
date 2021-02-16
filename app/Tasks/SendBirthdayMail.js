'use strict'

const Task = use('Task')
const User = use('App/Models/User');

class SendBirthdayMail extends Task {
  static get schedule() {
    return '* * * * *'
  }

  async handle() {
    const today = new Date().toISOString().slice(0, 10);

    const userData = await User.query().where('dob', today).fetch();
    const users = userData.toJSON();

    users.forEach((user) => {
      console.log(user.username);
    });

    // console.log(users);
  }
}

module.exports = SendBirthdayMail
