'use strict';

const path = require('path');
const coffee = require('coffee');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('test/beidou-init.test.js', () => {
  const beidou = require.resolve('../bin/beidou.js');
  const cwd = path.join(__dirname, 'fixtures/test-files');

  before(() => {
    rimraf.sync(cwd);
    mkdirp.sync(cwd);
  });

  after(() => {
    rimraf.sync(cwd);
    mkdirp.sync(cwd);
  });


  describe('global options', () => {
    it('should show version', done => {
      coffee.fork(beidou, ['--version'], {
          cwd
        })
        .expect('stdout', /\d+\.\d+\.\d+/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help', done => {
      coffee.fork(beidou, ['--help'], {
          cwd
        })
        .expect('stdout', /Usage: .*beidou.* \[command] \[options]/)
        .expect('code', 0)
        .end(done);
    });

    it('should show help when command not exists', done => {
      coffee.fork(beidou, ['not-exists'], {
          cwd
        })
        .expect('stdout', /init.*\n.*start.*\n.*dev.*\n.*build/)
        .expect('code', 0)
        .end(done);
    });
  });

  describe('project init', () => {
    const beidou = require.resolve('../bin/beidou.js');
    const cwd = path.join(__dirname, 'fixtures/test-files');

    it('should init boilerplate project', done => {
      coffee.fork(beidou, ['init'], {
          cwd
        })
        .write('\n')
        .expect('code', 0)
        .end(done);
    });
  });


  describe('dev server and build', () => {
    const beidou = require.resolve('../bin/beidou.js');
    const cwd = path.join(__dirname, 'fixtures/test-files');
    const env = Object.create(process.env);

    env.NODE_ENV = 'local';

    it('should run build script', done => {
      coffee.fork(beidou, ['build'], {
          cwd,
          env,
        })
        .expect('stdout', /Build finished/)
        .end(done);
    });

    // it('should start dev server', done => {
    //   coffee.fork('/Users/wujingfeng/.tnvm/versions/alinode/v3.8.1/bin/egg-bin', ['dev'], {
    //       cwd
    //     })
    //     .expect('stderr', /beidou-core start/)
    //     .expect('code', 0)
    //     .end(done);
    // });
  });
});