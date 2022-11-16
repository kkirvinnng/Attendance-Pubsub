
const triggers = {
    userCreated: 'user_created',
    teacherDeleted: 'teacher_deleted',
    commissionAssigned: 'assign_commission_sheet',
    studentsAttendance: 'students_attendance',
    loadStudents: 'load_students'
} as const

export type TopicTrigger = typeof triggers[keyof typeof triggers]