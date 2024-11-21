import { WorkingHour } from "@/modules/organizations/api/organizations.types"

export const isOrgAlwaysOpen = (workingHours: WorkingHour[]): boolean => {
  return workingHours.every(
    (wh) => wh.start_time === "00:00" && wh.end_time === "23:59"
  )
}

export const isOrgWorkTimeSame = (workingHours: WorkingHour[]): boolean => {
  return workingHours.every(
    (wh) =>
      wh.start_time !== "00:00" &&
      wh.end_time !== "23:59" &&
      wh.start_time === workingHours[0].start_time &&
      wh.end_time === workingHours[0].end_time
  )
}
