import { useCallback, useEffect, useMemo, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  OrgWorkingHours,
  WEEKDAYS,
  WorkingHour,
} from "@/modules/organizations/api/organizations.types"
import { setWorkingHours } from "@/modules/organizations/api/orgs-requests"
import WorkingHourFormSkeleton from "@/modules/organizations/components/workin-hours-form-skeleton"
import {
  isOrgAlwaysOpen,
  isOrgWorkTimeSame,
} from "@/modules/organizations/lib/utils"
import { useOrganizationsStore } from "@/modules/organizations/store/organizations.store"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Separator } from "@/shared/components/ui/separator"
import { Switch } from "@/shared/components/ui/switch"
import { useWeekdayLabels } from "@/shared/hooks/use-weekday-labels"

type WorkingHourFormField = WorkingHour & {
  disabled: boolean
}

export default function WorkingHoursForm({
  workTimes,
  isLoading,
}: {
  workTimes?: OrgWorkingHours
  isLoading?: boolean
}) {
  const { t: organizationsT } = useTranslation("organizations")
  const { t: commonT } = useTranslation("common")

  const [defaultValues, setDefaultValues] = useState<WorkingHourFormField[]>(
    Array.from({ length: 7 }, (_, i) => ({
      day: WEEKDAYS[i],
      start_time: "",
      end_time: "",
      disabled: false,
    }))
  )
  const [isSameTime, setIsSameTime] = useState(false)
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false)

  const storedOrgId = useOrganizationsStore((state) => state.organizationId)
  const orgId = useParams().id || storedOrgId

  const weekdays = useWeekdayLabels()
  const form = useForm({
    defaultValues: {
      workingHours: defaultValues,
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "workingHours",
  })

  const queryClient = useQueryClient()
  const setWorkingHoursMutation = useMutation({
    mutationFn: setWorkingHours,
    onSuccess: () => {
      useOrganizationsStore.setState({
        workingHoursModal: false,
      })
      toast.success(organizationsT("workingHoursSaved"))
      queryClient.invalidateQueries({
        queryKey: ["org", orgId],
      })
    },
  })

  const onSubmit = useCallback(
    (data: { workingHours: WorkingHourFormField[] }) => {
      setWorkingHoursMutation.mutate({
        station: orgId as string,
        is_active: true,
        week_days: data.workingHours.map((item) => {
          if (isAlwaysOpen) {
            return {
              day: item.day,
              start_time: "00:00",
              end_time: "23:59",
            }
          }
          if (isSameTime) {
            return {
              day: item.day,
              start_time: data.workingHours[0].start_time,
              end_time: data.workingHours[0].end_time,
            }
          }
          return {
            day: item.day,
            start_time: item.disabled ? "00:00" : item.start_time,
            end_time: item.disabled ? "00:01" : item.end_time,
          }
        }),
      })
    },
    [isAlwaysOpen, isSameTime, orgId, setWorkingHoursMutation]
  )

  const handleChangeNotWork = useCallback(
    (checked: boolean, day: number) => {
      const newValues = defaultValues.map((value) => {
        if (value.day === WEEKDAYS[day]) {
          return { ...value, disabled: checked }
        }
        return value
      })
      setDefaultValues(newValues)
      form.setValue(`workingHours.${day}.disabled`, checked)
    },
    [defaultValues, form]
  )

  const handleCancel = useCallback(() => {
    form.reset()
    useOrganizationsStore.setState({
      workingHoursModal: false,
      organizationId: null,
    })
  }, [form])

  const workingHoursData = useMemo(
    () =>
      workTimes?.week_days
        ? workTimes?.week_days.map((item) => ({
            ...item,
            start_time: item.start_time.slice(0, 5),
            end_time: item.end_time.slice(0, 5),
          }))
        : [],
    [workTimes]
  )

  useEffect(() => {
    if (workingHoursData && workingHoursData.length > 0) {
      if (isOrgWorkTimeSame(workingHoursData)) {
        setIsSameTime(true)
      } else if (isOrgAlwaysOpen(workingHoursData)) {
        setIsAlwaysOpen(true)
        setIsSameTime(true)
      }
      const newValues = workingHoursData.map((item) => {
        return {
          ...item,
          disabled: item.start_time === "00:00" && item.end_time === "00:01",
        }
      })
      setDefaultValues(newValues)
      form.setValue("workingHours", newValues)
    }
  }, [form, workingHoursData])

  return isLoading ? (
    <WorkingHourFormSkeleton />
  ) : (
    <Fragment>
      <label className="flex items-center justify-between p-3 rounded-xl border border-border mb-3">
        <h3 className="text-lg font-medium">{organizationsT("sameTime")}</h3>
        <Switch
          disabled={isAlwaysOpen}
          checked={isSameTime}
          onCheckedChange={() => setIsSameTime((prev) => !prev)}
        />
      </label>
      {isSameTime && (
        <label className="flex items-center justify-between p-3 rounded-xl border border-border mb-3">
          <h3 className="text-lg font-medium">
            {organizationsT("alwaysOpen")}
          </h3>
          <Switch
            checked={isAlwaysOpen}
            onCheckedChange={() => setIsAlwaysOpen((prev) => !prev)}
          />
        </label>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isAlwaysOpen &&
            fields
              .filter((item) => (isSameTime ? item.day === "MO" : item))
              .map((fieldItem, index, arr) => (
                <Fragment key={fieldItem.id}>
                  <div className="flex justify-between space-x-3">
                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.start_time`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>{organizationsT("open")}</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              disabled={defaultValues[index].disabled}
                              required
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.end_time`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>{organizationsT("close")}</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              disabled={defaultValues[index].disabled}
                              required
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-xl font-semibold mr-5">
                        {weekdays[fieldItem.day as keyof typeof weekdays]}.
                      </p>
                      {!isSameTime && (
                        <Controller
                          control={form.control}
                          name={`workingHours.${index}.disabled`}
                          render={({ field }) => (
                            <label className="whitespace-nowrap flex items-center">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => {
                                  handleChangeNotWork(checked, index)
                                  field.onChange(checked)
                                }}
                                className="mr-2 w-5 h-5"
                              />
                              {organizationsT("notWork")}
                            </label>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  {index !== arr.length - 1 && <Separator className="my-3" />}
                </Fragment>
              ))}
          <div className="flex items-center pt-5">
            <Button type="button" variant="outline" onClick={handleCancel}>
              {commonT("button.reset")}
            </Button>
            <Button
              disabled={setWorkingHoursMutation.isPending}
              isLoading={setWorkingHoursMutation.isPending}
              type="submit"
              className="flex-1 ml-2"
            >
              {commonT("button.save")}
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  )
}
