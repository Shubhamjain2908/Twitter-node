
exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries

  try {
    await knex('follow').del();
    await knex('follow').insert([
      {
        "id": 1,
        "follower": 1,
        "followedUser": 2
      },
      {
        "id": 2,
        "follower": 1,
        "followedUser": 3
      },
      {
        "id": 3,
        "follower": 1,
        "followedUser": 4
      },
      {
        "id": 4,
        "follower": 1,
        "followedUser": 5
      },
      {
        "id": 5,
        "follower": 2,
        "followedUser": 1
      },
      {
        "id": 6,
        "follower": 3,
        "followedUser": 1
      },
      {
        "id": 7,
        "follower": 2,
        "followedUser": 3
      },
      {
        "id": 8,
        "follower": 2,
        "followedUser": 3
      },
      {
        "id": 9,
        "follower": 2,
        "followedUser": 4
      },
      {
        "id": 10,
        "follower": 3,
        "followedUser": 1
      },
    ]);

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
