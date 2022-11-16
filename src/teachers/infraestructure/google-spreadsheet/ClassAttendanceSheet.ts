import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { Student } from '../../domain/entities/Student'

export class ClassAttendanceSheet {

    sheet: GoogleSpreadsheetWorksheet
    constructor(sheet: GoogleSpreadsheetWorksheet) {
        this.sheet = sheet
    }

    async getColumnValueByDate(date: string) {

        const columnIndex: number = await this._indexOfStartDates()
        const columnValue = this._writeDateIntoCell(columnIndex, date)

        await this.sheet.saveUpdatedCells()

        return columnValue
    }

    async writeStudentsAttendance(students: Student[], column: string) {
        const rows = await this.sheet.getRows()
        const COUNT_CELL_VOID = 2
        //* +2 for the row A2 and A3 that represent Dates

        for (const student of students) {
            let i = COUNT_CELL_VOID

            while (i < rows.length && student.record != rows[i].Legajo) {
                i++
            }

            if (i !== rows.length && student.record == rows[i].Legajo) {

                const indexRow = i + COUNT_CELL_VOID
                const a1Address = column + indexRow
                const cellCheck = this.sheet.getCellByA1(a1Address) // A1 style notation
                cellCheck.value = true

            }
        }
        await this.sheet.saveUpdatedCells()
    }

    async uncheckAll() {
        const rows = await this.sheet.getRows()
        const indexStartBox = await this._indexOfStartDates()
        const columnLength = this.sheet.columnCount
        const rowLength = rows.length

        //* Uncheck all cells that have a ✅
        for (let i = 2; i <= rowLength; i++) {
            let j = indexStartBox

            while (j < columnLength) {
                const cell = this.sheet.getCell(i, j)

                if (cell.value && cell.value === true) {

                    cell.value = false
                }
                j++
            }
        }
        await this.sheet.saveUpdatedCells()
    }

    private async _indexOfStartDates(): Promise<number> {
        const columnLength = this.sheet.columnCount
        let columnIndex = -1

        //* Get the index of the column corresponding to the 'Day' && 'Month' in the cell
        for (let i = 0; i < columnLength; i++) {
            const cellDayValue = '' + this.sheet.getCell(1, i).value
            const cellMonthValue = '' + this.sheet.getCell(2, i).value
            if (
                cellDayValue.toLocaleLowerCase() === 'dia'
                && cellMonthValue.toLocaleLowerCase() === 'mes'
            ) {
                columnIndex = i + 1
                break
            }
        }

        return columnIndex
    }

    private _writeDateIntoCell(columnIndex: number, date: string): string {
        const { 0: day, 1: month } = date.split('-')

        const columnLength = this.sheet.columnCount
        let columnValue = ''

        //* Get the value of the column corresponding to the date
        while (columnIndex < columnLength && columnValue === '') {
            const cellDay = this.sheet.getCell(1, columnIndex)
            const cellMonth = this.sheet.getCell(2, columnIndex)

            if (cellDay.value === day && cellMonth.value === month) {
                columnValue = cellDay.a1Column
            }

            if (!cellDay.value) {
                columnValue = cellDay.a1Column
                cellDay.value = day
                cellMonth.value = month
            }

            columnIndex++
        }
        return columnValue
    }
}
