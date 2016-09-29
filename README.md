# Badgr-client

> Work In Progress: not much to see for now.

[![Travis](https://img.shields.io/travis/mozillascience/badgr-client.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/mozillascience/badgr-client)

A nodejs client for the [badgr-server](https://github.com/concentricsky/badgr-server) API.

The main goal is to use this client in [PaperBadger](https://github.com/mozillascience/PaperBadger/), so the bulk of the
work will focus on the needs of that particular project. At some point, the library will be extended to support the full Badgr API.

## What works for now
  - Authorisation through user name and password (only method supported by the Badgr API).
  - List all badges
  - Issue badges to a recipient (email as Id)
  - List all instances of a badge by issuer
  - List all badges issued to a particular recipient (by ORCID)

## What needs to be done?
The bulk of the work is stated in [#7](https://github.com/mozillascience/badgr-client/issues/7).


# Development

## Fork and clone

Fork a repo as per [github instructions](https://help.github.com/articles/fork-a-repo/) and then clone with
 (make sure to swap _YOUR_USER_NAME_ with your real github username):

`git clone git@github.com:YOUR_USER_NAME/badgr-client.git`


## Main branch - dev
Note that the main branch is `dev` and not `master`. All work will eventually be merged into _master_, but _dev_ is the
working branch, while _master_ will be used to publish to nmp.

## Tests
[Mocha](https://mochajs.org/) is the test framework used for this project, and [chai](http://chaijs.com/api/bdd/) is the assertion library.
Run all tests with `npm test`.

_Unit_ tests can be run with `npm run test:unit`.

Testing will automatically _lint_ and stop if code style does not pass.

Note that you will need to copy the _default.env_ file into an _.env_ file in order to provide authentication details for a Badgr user and server URL.

### Easy badgr-server install
For an easy way to install [badgr-server](https://github.com/concentricsky/badgr-server), you can use this [Dockerfile](https://github.com/josmas/local-badgr-server).

## Code Style
This project follows most of the guidelines in the [mofo-style](https://github.com/MozillaFoundation/mofo-style) package.
Some of the rules have been modified because this is not a _front-end_ ES6 project.

_Linting_ will be run automatically with some other tasks (such as testing), but can be invoked by itself with `npm run lint`.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Install & Usage

> Note that there's no npm package yet, so you can npm link if you want to use it in a demo app

The easiest way to see how to use the library is to look into the integration tests in
[badge_methods.js](https://github.com/mozillascience/badgr-client/blob/dev/test/integration/badge_methods.js)

## Client setup & API calls

The main example in tests so far is:

```

    it('should return data when calling all badges', function (done) {
      var client = new Index(apiEndpoint, goodTestAuth);

      var opts = {
        path: 'v1/issuer/all-badges'
      };

      client.getAllBadges(opts, function (err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.undefined;
        expect(data[0].created_at).not.to.be.undefined;
        done();
      });

    });

```

where `apiEndpoint` is a valid url to a badgr-server instance, and `goodTestAuth` is in the form: `{ username: 'x@x.x', password: 'xxx'}`.


Jos - May 2o16
