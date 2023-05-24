module.exports = {
  async up(db, client) {
    await db.collection('sub-categories').updateMany({}, {$set: { orderNo: 0}});
    await db.collection('common-sub-categories').updateMany({}, {$set: { orderNo: 0}});
    await db.collection('main-banners').updateMany({}, {$set: { orderNo: 0}});
    await db.collection('offer-banners').updateMany({}, {$set: { orderNo: 0}});
    await db.collection('subcategory-textbanners').updateMany({}, {$set: { orderNo: 0}});
  },

  async down(db, client) {
    await db.collection('sub-categories').updateMany({},{ $unset: { orderNo: 0} });
    await db.collection('common-sub-categories').updateMany({},{ $unset: { orderNo: 0} });
    await db.collection('main-banners').updateMany({},{ $unset: { orderNo: 0} });
    await db.collection('offer-banners').updateMany({},{ $unset: { orderNo: 0} });
    await db.collection('subcategory-textbanners').updateMany({},{ $unset: { orderNo: 0} });
  }
};
