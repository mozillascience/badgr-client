# Badgr-client

> Work In Progress: not much to see for now.

A nodejs client for the [badgr-server](https://github.com/concentricsky/badgr-server) API.

The main goal is to use this client in [PaperBadger](https://github.com/mozillascience/PaperBadger/), so the bulk of the
work will focus on the needs of that particular project. At some point, the library will be extended to support the full Badgr API.

## What works for now
  - Authorisation through user name and password (only method supported by the Badgr API).
  - List all badges

## What needs to be done?
The bulk of the work is stated in [#7](https://github.com/josmas/badgr-client/issues/7).


# Development

## Fork and clone

> Add instructions to forking and cloning - nothing special to do; just normal github flow.

## Main branch - dev
Note that the main branch is `dev` and not `master`. All work will eventually be merged into _master_, but _dev_ is the
working branch, while _master_ will be used to publish to nmp.

## Tests
[Mocha](https://mochajs.org/) is the test framework used for this project, and [chai](http://chaijs.com/api/bdd/) is the assertion library.
Run all tests with `npm test`.

_Unit_ tests can be run with `npm run test:unit`.

Testing will automatically _lint_ and stop if code style does not pass.

> Note that until [#1](https://github.com/josmas/badgr-client/issues/1) is solved, you will need to provide authentication
> for a local Badgr user in integration tests [badge_methods.js](https://github.com/josmas/badgr-client/blob/dev/test/integration/badge_methods.js)
> and [remote.js](https://github.com/josmas/badgr-client/blob/dev/test/integration/remote.js). Variable is `goodTestAuth`.

## Code Style
This project follows most of the guidelines in the [mofo-style](https://github.com/MozillaFoundation/mofo-style) package.
Some of the rules have been modified because this is not a _front-end_ ES6 project.

_Linting_ will be run automatically with some other tasks (such as testing), but can be invoked by itself with `npm run lint`.

## Contributing

> Add contributing guidelines.

# Install & Usage

> Note that there's no npm package yet, so you can npm link if you want to use it in a demo app

The easiest way to see how to use the library is to look into the integration tests in
[badge_methods.js](https://github.com/josmas/badgr-client/blob/dev/test/integration/badge_methods.js)

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
