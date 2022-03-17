db.auth('mongo_root', 'mongo_root_pass');

db = db.getSiblingDB('imuziksocial');

db.createUser({
  user: 'mongo_user',
  pwd: 'mongo_user_pass',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});
