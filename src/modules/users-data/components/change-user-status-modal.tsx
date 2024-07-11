import { Dispatch, ElementRef, SetStateAction, useRef, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { UserStatus } from "@/modules/users-data/api/users-data.types"
import { changeUserStatus } from "@/modules/users-data/api/users-data-requests"
import UsersDataStatus from "@/modules/users-data/components/users-data-status"
import { useUsersDataStore } from "@/modules/users-data/store/users-data.store"
import { Button } from "@/shared/components/ui/button"
import { DialogClose } from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Textarea } from "@/shared/components/ui/textarea"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { cn } from "@/shared/lib/utils"

export default function ChangeUserStatusModal() {
  const { t: commonT } = useTranslation("common")
  const { t: usersDataT } = useTranslation("usersData")

  const {
    queryParams: { pSize, page },
  } = useQueryParams()

  const usersData = useUsersDataStore((state) => state.usersData)

  const closeRef = useRef<ElementRef<typeof DialogClose> | null>(null)
  const [selectedValue, setSelectedValue] = useState<string>(
    usersData?.status.toString() as string
  )
  const [comment, setComment] = useState<string>("")

  const qc = useQueryClient()
  const changeStatusMut = useMutation({
    mutationFn: () =>
      changeUserStatus(usersData?.id as string, {
        status: Number(selectedValue),
        comment,
      }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["usersData" + page + pSize],
      })
      toast.success(usersDataT("changeStatusSuccess"))
      closeRef.current?.click()
    },
  })

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-2 mb-5 py-3">
        <h3 className="font-bold text-lg">{usersData?.real_name}</h3>
        <UsersDataStatus status={usersData?.status as UserStatus} />
      </div>
      <RadioGroup
        value={selectedValue}
        onValueChange={(value: string) => setSelectedValue(value)}
      >
        <Label
          className={cn(
            "flex items-center p-2 rounded-lg border border-input border-r-green-600 border-r-[12px] mb-1"
          )}
        >
          <RadioGroupItem value="2" className="w-5 h-5" />
          <span className="ml-2">{usersDataT("approve")}</span>
        </Label>
        <Label
          className={cn(
            "flex items-center p-2 rounded-lg border border-input border-r-destructive border-r-[12px] mb-1"
          )}
        >
          <RadioGroupItem value="3" className="w-5 h-5" />
          <span className="ml-2">{usersDataT("reject")}</span>
        </Label>
      </RadioGroup>
      {selectedValue === "3" && <Comment setComment={setComment} />}
      <Button
        onClick={() => changeStatusMut.mutate()}
        isLoading={changeStatusMut.isPending}
        disabled={
          changeStatusMut.isPending ||
          usersData?.status.toString() === selectedValue
        }
      >
        {commonT("button.save")}
      </Button>
      <DialogClose ref={closeRef} />
    </Fragment>
  )
}

function Comment({
  setComment,
}: {
  setComment: Dispatch<SetStateAction<string>>
}) {
  const { t: usersDataT } = useTranslation("usersData")
  const [value, setValue] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    if (value.length > 0) {
      setComment(value)
    }
  }

  return (
    <Textarea
      placeholder={usersDataT("commentPh")}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className="my-3"
    />
  )
}
