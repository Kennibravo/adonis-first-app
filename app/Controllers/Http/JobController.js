'use strict'

const Job = use('App/Models/Job')
const { validate } = use('Validator');

class JobController {
  async home({ view }) {
    //Fetch all jobs
    const jobs = await Job.all();
    return view.render('index', { jobs: jobs.toJSON() });
  }

  create({ view }) {
    return view.render('create');
  }

  async store({ request, response, session }) {
    const rules = {
      title: 'required|unique:jobs,title|max:200',
      link: 'required|max:200|url',
      description: 'required'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll();

      return response.redirect('back');
    }

    const job = await Job.create(request.only(['title', 'link', 'description']));

    session.flash({ success: "Job created successfully" });

    return response.route('jobs.index');

  }

  async show({ view, params }) {
    const job = await Job.findOrFail(params.id);

    return view.render('show', { job: job.toJSON() });
  }

  async edit({ view, params }) {
    const job = await Job.findOrFail(params.id);

    return view.render('edit', { job: job.toJSON() });
  }

  async update({ params, request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|unique:jobs,title|max:200',
      link: 'required|max:200|url',
      description: 'required'
    });

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll();

      return response.redirect('back');
    }

    await Job.query().where('id', params.id).update(request.only(['title', 'link', 'description']));

    return response.route('jobs.show', { id: params.id });
  }

  async delete({ response, params, session }) {
    const job = await Job.findOrFail(params.id);
    await job.delete();

    session.flash({ success: 'Job deleted successfully!' });

    return response.route('jobs.index');
  }
}

module.exports = JobController
