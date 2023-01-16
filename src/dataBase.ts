import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import { IDataBase } from './IDataBase'

const Avery : Student = { studentID: -1, studentName: "Avery"}
const emptyTranscript : Transcript = { student: Avery, grades: [] };

export default class DataBase implements IDataBase {

    /** the list of transcripts in the database */
    private transcripts : Transcript [] = []

    /** the last assigned student ID 
     * @note Assumes studentID is Number
    */
    private lastID : number

    constructor () {this.lastID = 0}

    /** Adds a new student to the database
     * @param {string} newName - the name of the student
     * @returns {StudentID} - the newly-assigned ID for the new student
     */
    addStudent (newName: string): StudentID {
        const newID = this.lastID++
        const newStudent:Student = {studentID: newID, studentName: newName}
        this.transcripts.push({student: newStudent, grades: []})
        return newID
    }


    /**
     * @param studentName 
     * @returns list of studentIDs associated with that name
     */
    nameToIDs (studentName: string) : StudentID[] {
        return this.transcripts
            .filter(t => t.student.studentName === studentName)
            .map(t => t.student.studentID)
    }


    /**
     * 
     * @param id - the id to look up
     * @returns the transcript for this ID
     */
    getTranscript (id: StudentID): Transcript {
        const ret : Transcript | undefined = this.transcripts.find(t => t.student.studentID === id)
            if (ret === undefined) {throw new Error("unknown ID")}
            else {return ret}
    }

        
    deleteStudent (id: StudentID): void  {
        throw new Error("not implemented yet")  
    }   // hmm, what to do about errors??

    addGrade (id: StudentID, course: Course, courseGrade: CourseGrade) : void {
        if (course !== courseGrade.course) {
            throw new Error("course name does not match");
        }
        if (courseGrade.grade < 0 || courseGrade.grade > 100) {
            throw new Error("invalid grade");
        }
        for (let i = 0; i < this.transcripts.length; i++) {
            const curr:Transcript = this.transcripts[i];
            if (curr.student.studentID === id) {
                for (let j = 0; j < curr.grades.length; j++) {
                    const currCourse = curr.grades[j];
                    if (currCourse.course === course) {
                        currCourse.grade = courseGrade.grade;
                        return;
                    } 
                }
                curr.grades.push(courseGrade);
                return;
            }
        }

        throw new Error("unknown ID");

    }

    getGrade (id: Student, course: Course) : CourseGrade {
        throw new Error("not implemented yet") 
    }

    getAllStudentIDs () : StudentID[] {
        throw new Error("not implemented yet") 
    }
    
    
}
    