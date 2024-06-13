module.exports = {
    apps: [{
      name: 'vasilkoff-bot',
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }]
  };