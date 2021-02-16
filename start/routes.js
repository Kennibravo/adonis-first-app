'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

}).prefix('users');

Route.group(() => {
  Route.get('', 'JobController.home').as('jobs.index');
  Route.get('create', 'JobController.create').as('jobs.create');
  Route.post('store', 'JobController.store').as('jobs.store');
  Route.get('show/:id', 'JobController.show').as('jobs.show');
  Route.get('edit/:id', 'JobController.edit').as('jobs.edit');
  Route.put('update/:id', 'JobController.update').as('jobs.update');
  Route.delete('delete/:id', 'JobController.delete').as('jobs.delete');
}).prefix("jobs").middleware(['userAuth']);

Route.get('logout', 'UserController.logout').as('logout');

Route.group(() => {
  Route.post('login', 'UserController.login').as('login');
  Route.get('login', 'UserController.showLogin').as('showLogin');

  Route.get('register', 'UserController.showRegister').as('showRegister');
  Route.post('register', 'UserController.register').as('register');
}).prefix('user').middleware(['userGuest']);

Route.group(() => {
  Route.post('login', 'AdminController.login').as('admin.login');
  Route.get('login', 'AdminController.showLogin').as('admin.showLogin');

  Route.get('register', 'AdminController.showRegister').as('admin.showRegister');
  Route.post('register', 'AdminController.register').as('admin.register');
}).prefix('admin').middleware('adminGuest');

Route.get('/test/admin', () => {
  return "You are authenticated";
}).middleware('adminAuth');
