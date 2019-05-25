
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
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
        {
          "id": 11,
          "username": "BriggsBeach387",
          "verificationCode": 7777,
          "name": "Macias Odonnell",
          "email": "maciasodonnell@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 12,
          "username": "LorettaFisher50",
          "verificationCode": 7777,
          "name": "Bobbi Estes",
          "email": "bobbiestes@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 13,
          "username": "RobinsonPark16",
          "verificationCode": 7777,
          "name": "Sweeney Woodard",
          "email": "sweeneywoodard@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 14,
          "username": "PamCarr260",
          "verificationCode": 7777,
          "name": "Boone Willis",
          "email": "boonewillis@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 15,
          "username": "ShanaMcfarland352",
          "verificationCode": 7777,
          "name": "Eaton Meadows",
          "email": "eatonmeadows@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 16,
          "username": "MalindaMonroe393",
          "verificationCode": 7777,
          "name": "Gracie Crane",
          "email": "graciecrane@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 17,
          "username": "WareDuran43",
          "verificationCode": 7777,
          "name": "Kelli Vaughan",
          "email": "kellivaughan@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 18,
          "username": "FosterCasey99",
          "verificationCode": 7777,
          "name": "Ollie Valenzuela",
          "email": "ollievalenzuela@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 19,
          "username": "MaloneFry259",
          "verificationCode": 7777,
          "name": "Ball Mcdowell",
          "email": "ballmcdowell@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        },
        {
          "id": 20,
          "username": "PalmerGentry324",
          "verificationCode": 7777,
          "name": "Eunice Bernard",
          "email": "eunicebernard@acrodance.com",
          "isVerified": true,
          "password": "$2b$10$N6TnTnI/KIVAfoSdqDQlRexKcvzAZUVJEPuUzy.O96tJhb0cgkeHm"
        }
      ]);
    });
};
