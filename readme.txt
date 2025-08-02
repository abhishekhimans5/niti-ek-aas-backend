backend/
├── config/               # DB config, constants, Razorpay keys, etc.
│   └── db.js
│   └── constants.js
│   └── paymentConfig.js
│
├── controllers/          # Handle API logic & responses
│   └── authController.js
│   └── companyController.js
│   └── ideaController.js
│   └── investorController.js
│   └── solutionController.js
│   └── adminController.js
│
├── models/               # Mongoose schemas
│   └── User.js
│   └── Problem.js
│   └── Idea.js
│   └── NDA.js
│   └── Chat.js
│   └── Subscription.js
│
├── routes/               # Route definitions
│   └── authRoutes.js
│   └── companyRoutes.js
│   └── ideaRoutes.js
│   └── investorRoutes.js
│   └── solutionRoutes.js
│   └── adminRoutes.js
│
├── services/             # Business logic, not tied to request/response
│   └── userService.js
│   └── ideaService.js
│   └── paymentService.js
│   └── emailService.js
│   └── chatService.js
│
├── workers/              # Scheduled background jobs (cron)
│   └── index.js
│   └── expireNDA.js
│   └── subscriptionReminder.js
│   └── reportGenerator.js
│
├── middleware/           # Custom middlewares
│   └── authMiddleware.js
│   └── roleMiddleware.js
│   └── errorHandler.js
│   └── validateBody.js
│
├── utils/                # Helper functions
│   └── token.js
│   └── fileUploader.js
│   └── logger.js
│   └── mailer.js
│
├── uploads/              # For NDA files, pitch decks, etc.
│   └── nda/
│   └── pitches/
│
├── app.js                # Express setup & middleware registration
├── server.js             # Start server + DB connection
├── .env                  # Secrets (JWT, DB URL, Razorpay key)
├── package.json

|--xc
   |--
   |--
   |--