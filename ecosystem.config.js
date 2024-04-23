module.exports = {
    apps: [{
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }]
  };