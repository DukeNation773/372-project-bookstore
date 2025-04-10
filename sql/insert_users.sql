INSERT INTO users (name, email, password, user_type, created_at, updated_at)
VALUES (
  'Test Shopper',
  'test@shopper.com',
  'password',
  'shopper',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
