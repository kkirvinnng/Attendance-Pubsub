import { AppStatusTitle } from '../domain/constants'

export type AppStatus = typeof AppStatusTitle[keyof typeof AppStatusTitle]


