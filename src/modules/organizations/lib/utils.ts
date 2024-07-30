import { WorkingHour } from "@/modules/organizations/api/organizations.types"

export const isOrgAlwaysOpen = (workingHours: WorkingHour[]): boolean => {
  return workingHours.every(
    (wh) => wh.open_time === "00:00" && wh.close_time === "23:59"
  )
}

export const isOrgWorkTimeSame = (workingHours: WorkingHour[]): boolean => {
  return workingHours.every(
    (wh) =>
      wh.open_time !== "00:00" &&
      wh.close_time !== "23:59" &&
      wh.open_time === workingHours[0].open_time &&
      wh.close_time === workingHours[0].close_time
  )
}
