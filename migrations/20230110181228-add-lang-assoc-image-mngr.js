module.exports = {
  async up(db, client) {
    await db.collection('img-managers').updateMany({}, {$set: { lang_association: ''}});
  },

  async down(db, client) {
    await db.collection('img-managers').updateMany({},{ $unset: { lang_association: ''} });
  }
};
