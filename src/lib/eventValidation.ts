export type EventInput = {
  title: string
  date: string
  hour: string
  minute: string
  location: string
}

export function isValidEventInput(input: EventInput): boolean {
  return (
    input.title.trim() !== '' &&
    input.date !== '' &&
    input.hour !== '' &&
    input.minute !== '' &&
    input.location.trim() !== ''
  )
}
