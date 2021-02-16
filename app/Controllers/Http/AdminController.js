'use strict'

const Admin = use('App/Models/Admin');
const Hash = use('Hash')

const { validate } = use('Validator');

class AdminController {
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
      const adminAuth = auth.authenticator('session_admin');

      await adminAuth.attempt(email, password);

      session.flash({ success: "Admin logged in success" });

      return response.redirect('/test/admin');

    } catch (e) {
      session.flash({ validationError: "Admin credentials incorrect" });
      return response.redirect('back');
    }


  }

  showLogin({ view }) {
    return view.render('admin.login');
  }

  async register({ request, response, session }) {
    const validation = await validate(request.all(), {
      username: 'required|unique,admins,username|min:6',
      email: 'required|email|unique,admins,email',
      password: 'required|max:6'
    });

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password', 'csrf_token']);

      return response.redirect('back');
    }

    const admin = new Admin;

    admin.username = request.input('username'),
      admin.email = request.input('email'),
      admin.password = request.input('password');

    await admin.save();

    session.flash({ success: "Admin registered successfully!" });

    return "Admin registered";

  }

  showRegister({ view }) {
    return view.render('admin.register');
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.route('admin.login');
  }
}

module.exports = AdminController
