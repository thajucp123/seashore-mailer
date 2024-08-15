module.exports = {
    version: 2,
    build: {
      target: 'serverless',
    },
    routes: [
        {
            src: '/public/(.*)', //for serving the public images correctly
            dest: 'public/$1',
          },
      {
        src: '/(.*)',
        dest: 'app.js',
      },
    ]
  };