'use strict'

const User = use('App/Models/User');
const Hash = use('Hash')

const { validate } = use('Validator');

class UserController {
  async login({ auth, request, response, session }) {
    const validation = await validate(request.all(), {
      email: 'required|email',
      password: 'required|max:6'
    });

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password', 'csrf_token']);

      return response.redirect('back');
    }

    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);

      session.flash({ success: "User logged in success" });
      return response.route('jobs.index');
    } catch (e) {
      session.flash({ validationError: "User credentials incorrect" });
      return response.redirect('back');
    }


  }

  showLogin({ view }) {
    return view.render('login');
  }

  async register({ request, response, session }) {
    const validation = await validate(request.all(), {
      username: 'required|unique,users,username|min:6',
      email: 'required|email|unique,users,email',
      password: 'required|max:6'
    });

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password', 'csrf_token']);

      return response.redirect('back');
    }

    const user = new User;

    user.username = request.input('username'),
      user.email = request.input('email'),
      user.password = request.input('password');

    await user.save();

    session.flash({ success: "User registered successfully!" });

    response.route('jobs.index');

  }

  showRegister({ view }) {
    return view.render('register');
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.route('login');
  }
}

module.exports = UserController
