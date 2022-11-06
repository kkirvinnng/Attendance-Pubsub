export const cutEmail = (email: string): string => {

    const firstPart = email.split('@')[0]
    return firstPart.toLocaleLowerCase()
}