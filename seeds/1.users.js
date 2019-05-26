
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          "id": 1,
          "username": "shubhamjain2908",
          "verificationCode": 7777,
          "name": "Shubham Jain",
          "email": "shubhamjain2908@gmail.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 2,
          "username": "MonaJones319",
          "verificationCode": 7777,
          "name": "Vanessa Sykes",
          "email": "vanessasykes@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 3,
          "username": "KiddKennedy359",
          "verificationCode": 7777,
          "name": "Roth Mcintosh",
          "email": "rothmcintosh@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 4,
          "username": "BeckerMckee117",
          "verificationCode": 7777,
          "name": "Meredith Bird",
          "email": "meredithbird@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 5,
          "username": "KatyBranch20",
          "verificationCode": 7777,
          "name": "French Lynch",
          "email": "frenchlynch@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 6,
          "username": "NewmanFitzpatrick357",
          "verificationCode": 7777,
          "name": "Downs Frank",
          "email": "downsfrank@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 7,
          "username": "NellieGutierrez352",
          "verificationCode": 7777,
          "name": "Samantha Paul",
          "email": "samanthapaul@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 8,
          "username": "KingPollard266",
          "verificationCode": 7777,
          "name": "Johns Flynn",
          "email": "johnsflynn@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 9,
          "username": "DodsonTurner117",
          "verificationCode": 7777,
          "name": "Acosta Heath",
          "email": "acostaheath@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 10,
          "username": "PollardSnyder364",
          "verificationCode": 7777,
          "name": "Antoinette Diaz",
          "email": "antoinettediaz@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
      ]);
    });
};
