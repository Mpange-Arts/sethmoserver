const mongoose = require('mongoose');

const ExpertiseItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' } // Can hold a Cloudinary URL or an icon name
}, { _id: false }); // Prevents Mongoose from crashing on updates

const ExpertiseSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Our Expertise' },
  sectionSubtitle: { type: String, default: 'Delivering world-class solutions across multiple industries.' },
  items: [ExpertiseItemSchema]
}, { timestamps: true });

ExpertiseSchema.statics.getSingleton = async function() {
  let doc = await this.findOne();
  if (!doc) doc = await this.create({ items: [] });
  return doc;
};

module.exports = mongoose.model('Expertise', ExpertiseSchema);