module.exports = {
    apps: [{
      name: 'vasilkoff-bot',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }]
  };