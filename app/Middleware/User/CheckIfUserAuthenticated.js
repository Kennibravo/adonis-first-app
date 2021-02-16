'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckIfUserAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    // call next to advance the request

    try {
      await auth.check();
    } catch (e) {
      return response.route('login');
    }
    
    await next()
  }
}

module.exports = CheckIfUserAuthenticated
