import { useCallback, useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { WorkingHour } from "@/modules/organizations/api/organizations.types"
import {
  getWorkingHours,
  setWorkingHours,
} from "@/modules/organizations/api/orgs-requests"
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

export default function WorkingHoursForm() {
  const { t: organizationsT } = useTranslation("organizations")
  const { t: commonT } = useTranslation("common")

  const [defaultValues, setDefaultValues] = useState<WorkingHourFormField[]>(
    Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      open_time: "",
      close_time: "",
      disabled: false,
    }))
  )
  const [isSameTime, setIsSameTime] = useState(false)
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false)

  const orgId = useOrganizationsStore((state) => state.organizationId)
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

  const { data: workingHoursData } = useQuery({
    queryFn: () => getWorkingHours(orgId as string),
    queryKey: ["workingHours", orgId],
  })

  useEffect(() => {
    if (workingHoursData && workingHoursData.length > 0) {
      setDefaultValues(
        workingHoursData.map((item) => {
          if (isOrgAlwaysOpen(workingHoursData)) {
            setIsAlwaysOpen(true)
            return { ...item, disabled: false }
          }
          if (isOrgWorkTimeSame(workingHoursData)) {
            setIsSameTime(true)
            return { ...item, disabled: false }
          }
          return {
            ...item,
            disabled: item.open_time === "00:00" && item.close_time === "00:00",
          }
        })
      )
    }
  }, [workingHoursData])

  const setWorkingHoursMutation = useMutation({
    mutationFn: setWorkingHours,
    onSuccess: () => {
      useOrganizationsStore.setState({
        workingHoursModal: false,
        organizationId: null,
      })
      toast.success(organizationsT("workingHoursSaved"))
    },
  })

  const onSubmit = useCallback(
    (data: { workingHours: WorkingHourFormField[] }) => {
      setWorkingHoursMutation.mutate({
        organization: orgId as string,
        work_time: data.workingHours.map((item) => {
          if (isAlwaysOpen) {
            return {
              day: item.day,
              open_time: "00:00",
              close_time: "23:59",
            }
          }
          if (isSameTime) {
            return {
              day: item.day,
              open_time: data.workingHours[0].open_time,
              close_time: data.workingHours[0].close_time,
            }
          }
          return {
            day: item.day,
            open_time: item.disabled ? "00:00" : item.open_time,
            close_time: item.disabled ? "00:00" : item.close_time,
          }
        }),
      })
    },
    [isAlwaysOpen, isSameTime, orgId, setWorkingHoursMutation]
  )

  const handleChangeNotWork = useCallback(
    (checked: boolean, day: number) => {
      const newValues = defaultValues.map((value) => {
        if (value.day === day) {
          return { ...value, disabled: checked }
        }
        return value
      })
      setDefaultValues(newValues)
      form.setValue(`workingHours.${day - 1}.disabled`, checked)
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

  return (
    <Fragment>
      <label className="flex items-center justify-between p-3 rounded-xl border border-border mb-3">
        <h3 className="text-lg font-bold">{organizationsT("sameTime")}</h3>
        <Switch
          disabled={isAlwaysOpen}
          checked={isSameTime}
          onCheckedChange={() => setIsSameTime((prev) => !prev)}
        />
      </label>
      {isSameTime && (
        <label className="flex items-center justify-between p-3 rounded-xl border border-border mb-3">
          <h3 className="text-lg font-bold">{organizationsT("alwaysOpen")}</h3>
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
              .filter((item) => (isSameTime ? item.day === 1 : item))
              .map((fieldItem, index, arr) => (
                <Fragment key={fieldItem.id}>
                  <div className="flex items-center justify-between space-x-3">
                    <p className="text-xl font-semibold mr-5">
                      {weekdays[fieldItem.day as keyof typeof weekdays]}.
                    </p>
                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.open_time`}
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
                      name={`workingHours.${index}.close_time`}
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
                    <Controller
                      control={form.control}
                      name={`workingHours.${index}.disabled`}
                      render={({ field }) => (
                        <label className="whitespace-nowrap flex items-center ml-5">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked: boolean) => {
                              handleChangeNotWork(checked, fieldItem.day)
                              field.onChange(checked)
                            }}
                            className="mr-2 w-5 h-5"
                          />
                          {organizationsT("notWork")}
                        </label>
                      )}
                    />
                  </div>
                  {index !== arr.length - 1 && <Separator className="my-3" />}
                </Fragment>
              ))}
          <div className="flex items-center pt-5">
            <Button type="button" variant="outline" onClick={handleCancel}>
              {commonT("button.cancel")}
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
