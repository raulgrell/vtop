
exports.seed = function(db) {
  // Deletes ALL existing entries
  return db('table_name').del()
    .then(function () {
      // Inserts seed entries
      return db('table_name').insert([
      ]);
    });
};
