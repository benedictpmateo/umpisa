const config = {
  Memory: true, // if set to false, config below will be used.
  IP: '127.0.0.1',
  Port: '27017',
  Database: 'umpisa-mock-db',

  // Mock Variables
  MockAccount: {
    email: "random@email.com",
    password: "mockPassword",
    firstName: "Hello",
    lastName: "World",
  },
  MockTokenId: 10,
}

export default config;
