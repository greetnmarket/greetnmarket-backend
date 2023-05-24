module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({
      isPaidUser: 1
    }, {$set: { referralcode: 'OWN_PAYMENT'}});
    await db.collection('profiles').updateMany({
      isPaidUser: 0
    }, {$set: { referralcode: ''}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({},{ $unset: { referralcode: ''} });
  }
};
