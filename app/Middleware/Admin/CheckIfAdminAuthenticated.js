'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckIfAdminAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    // call next to advance the request
    const adminAuth = auth.authenticator('session_admin');

    try {
      await adminAuth.check();
    } catch (error) {
      return response.route('admin.login');
    }
    await next()
  }
}

module.exports = CheckIfAdminAuthenticated
