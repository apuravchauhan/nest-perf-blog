module.exports = {
  apps: [
    {
      name: "nestjs-app",  // ✅ Name of the application
      script: "npm",       // ✅ Runs an npm script
      args: "run start",   // ✅ Runs `npm run start`
      exec_mode: "cluster", // ✅ Enables Cluster Mode
      instances: 2,        // ✅ Run on 2 CPU cores (use `max` for all available)
    },
  ],
};