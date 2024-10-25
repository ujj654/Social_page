const Circle = require('../models/circle');

exports.createAutoJoinedCircles = async (parent) => {
  const schoolCircle = await Circle.findOneAndUpdate(
    { name: parent.school },
    { $setOnInsert: { name: parent.school, isAutoJoined: true } },
    { new: true, upsert: true }
  );

  const gradeCircle = await Circle.findOneAndUpdate(
    { name: `${parent.grade}, ${parent.school}` },
    { $setOnInsert: { name: `${parent.grade}, ${parent.school}`, isAutoJoined: true, parentCircle: schoolCircle._id } },
    { new: true, upsert: true }
  );

  const sectionCircle = await Circle.findOneAndUpdate(
    { name: `Section ${parent.section}, ${parent.grade}, ${parent.school}` },
    { $setOnInsert: { name: `Section ${parent.section}, ${parent.grade}, ${parent.school}`, isAutoJoined: true, parentCircle: gradeCircle._id } },
    { new: true, upsert: true }
  );

  return [schoolCircle, gradeCircle, sectionCircle];
};
