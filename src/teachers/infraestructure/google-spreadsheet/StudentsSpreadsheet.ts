import { GoogleSpreadsheetRow } from 'google-spreadsheet'
import { Spreadsheet } from '../../../shared/infraestructure/google-apis/google-spreadsheet/Spreadsheet'
import { SUBNAME_SHEET } from '../../domain/services/drive/constants'
import { Student } from '../../domain/entities/Student'
import { EmailVO } from '../../../shared/domain/value-objects/Email.vo'
import { ClassAttendance } from '../../domain/entities/ClassAttendance'
import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { ClassAttendanceSheet } from './ClassAttendanceSheet'

export class StudentsSpreadsheet {

    private constructor(public readonly Ss: Spreadsheet) { }

    static async create(sheetId: string) {
        const spreadsheet = await Spreadsheet.findById(sheetId)

        return new StudentsSpreadsheet(spreadsheet)
    }

    async readStudents(): Promise<{
        sheetTitle: string;
        studentsFromSheet: Student[];
    }[]> {

        const sheets = this.Ss.getAllSheets()

        const sheetMatch = SUBNAME_SHEET

        const studentSheets = []

        //* get the students of the sheet and format the data
        for (const sheet of sheets) {
            if (sheet.title.includes(sheetMatch)) {
                const rows = await sheet.getRows()

                const students = this.getStudentsFromSheet(rows)

                const obj = {
                    sheetTitle: sheet.title,
                    studentsFromSheet: students
                }
                studentSheets.push(obj)
            }
        }

        return studentSheets
    }


    async writeClassAttendance(
        students: Student[],
        classAttendance: ClassPrimitives<ClassAttendance>
    ) {

        const { studentsClass, date } = classAttendance
        const { commission, subject } = studentsClass

        const sheet = this.Ss.getSheetByTitle(`${commission}/${subject}/${SUBNAME_SHEET}`)

        await sheet.loadCells()

        const masterSheet = new ClassAttendanceSheet(sheet)

        const column = await masterSheet.getColumnValueByDate(date)

        await masterSheet.writeStudentsAttendance(students, column)
    }

    private getStudentsFromSheet(rows: GoogleSpreadsheetRow[]): Student[] {
        const formatStudents: Array<Student> = []
        const COUNT_CELL_VOID = 2
        //* +2 for the row A2 and A3 that represent void spaces

        for (let i = COUNT_CELL_VOID; i < rows.length && rows[i].Legajo; i++) {

            const name: string = rows[i].Nombre
            const surname: string = rows[i].Apellido
            const record: string = rows[i].Legajo
            const email = rows[i].Email ? EmailVO.build(rows[i].Email) : undefined

            const student = Student.create({
                name,
                surname,
                record,
                email
            })

            formatStudents.push(student)
        }

        return formatStudents
    }
}
