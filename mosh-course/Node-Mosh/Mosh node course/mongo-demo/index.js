const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to mongoDB'))
  .catch((err) => console.error('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
  name: { type: String, 
    required: true,
  minlength:5,
  maxlength:255,
  // match:/pattern/
  },
  category:{
type:String,
required:true,
enum: ['web', 'mobile', 'network'],
lowercase: true,
trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate:{
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          // Do some async work
          const result =  v && v.length > 0
          callback(result)

        }, 4000)
        // Do some async work
      },
      message: 'A course should have at least one tag'
    }
  },
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min:10,
    max:200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    category: 'WEB',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
  });
  try{
    const result = await course.save();
    console.log(result);
  }
  
    catch(err) {
for(field in err.errors){
  console.log(err.errors[field].message)
}
    }
  
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  // or
  // and
  const courses = await Course.find({ author: 'Mosh', isPublished: true })
    // Starts with Mosh
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  // Approach : Query first
  // find by id()
  //modify its properties
  // save();
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: 'Kale',
        isPublished: false,
      },
    }
  );
  console.log(result);

  // Approach : update first
  // update directly
  // optionally get the upload docs
}

async function removeCourse(id) {
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

createCourse();
