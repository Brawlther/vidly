process.env.NODE_ENV = 'test';

const workerId = process.env.JEST_WORKER_ID ?? '1';
process.env.MONGO_URI = `mongodb://localhost/mongo-exercises_tests_${workerId}`;
