import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import DataBase from './dataBase';

let db: DataBase;

// start each test with a fresh empty database.
beforeEach(() => {
  db = new DataBase
});

// this may look undefined in TSC until you do an npm install
// and possibly restart VSC.
describe('tests for addStudent', () => {

  test('addStudent should add a student to the database', () => {
    // const db = new DataBase ()
    expect(db.nameToIDs('blair')).toEqual([])
    const id1 = db.addStudent('blair');
    expect(db.nameToIDs('blair')).toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})

describe('tests for adding grade to existing student', () => {
  test('adding grade should increase transcipt length', () => {
    const sid1:StudentID = db.addStudent('adam');
    const sid1Transcript:Transcript = db.getTranscript(sid1);

    expect(sid1Transcript.grades.length).toEqual(0);

    const newCourse:Course = 'math';
    const newCourseGrade:CourseGrade = {course:newCourse, grade:100};
    db.addGrade(sid1, newCourse, newCourseGrade)

    expect(sid1Transcript.grades.length).toEqual(1);

    const newCourse1:Course = 'english';
    const newCourseGrade1:CourseGrade = {course:newCourse, grade:40};
    db.addGrade(sid1, newCourse1, newCourseGrade1)

    expect(sid1Transcript.grades.length).toEqual(2);

  });

  test('adding coursegrade is accurately populated in the transcript to the right student', () => {

  })

  test('check that grade is valid', () => {
    
  }) ;

  test('adding grade for course that already exist should update grade for that class, not create new entry', () => {

  });

  test('course name matches the Course object name, else throws error') {
    
  }
}) 

