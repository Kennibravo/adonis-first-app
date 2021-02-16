'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckIfAdminisNotAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    const Admin = use('App/Models/Admin');
    const adminAuth = auth.authenticator('session_admin');
    await adminAuth.getUser();

    if (adminAuth.user instanceof Admin) {
      return response.redirect('/test/admin');
    }

    // call next to advance the request
    await next()
  }
}

module.exports = CheckIfAdminisNotAuthenticated
