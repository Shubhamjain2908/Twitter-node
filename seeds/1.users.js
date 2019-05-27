
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          "id": 1,
          "username": "shubhamjain1",
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 2,
          "username": "shubhamjain2",
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 3,
          "username": "shubhamjain3",
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 4,
          "username": "shubhamjain4",
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 5,
          "username": "shubhamjain5",
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
      ]);
    });
};
