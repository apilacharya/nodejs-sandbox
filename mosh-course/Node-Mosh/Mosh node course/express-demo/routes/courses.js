const express = require('express')
const router = express.Router()
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
  }

  // If not existing, return 404

  // Validate
  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); //result.error

  // if invalid , return 400 - BAd request
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }

  // Update course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found');
  }
  res.send(course);
});

router.delete('/:id', (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given ID was not found');

  // Not existing, return 404
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router