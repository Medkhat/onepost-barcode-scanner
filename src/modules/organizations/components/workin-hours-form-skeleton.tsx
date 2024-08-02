import { Fragment } from "react/jsx-runtime"

import { Skeleton } from "@/shared/components/ui/skeleton"

export default function WorkingHourFormSkeleton() {
  return (
    <Fragment>
      <Skeleton className="h-8 rounded-lg mb-2" />
      <Skeleton className="h-8 rounded-lg mb-2" />
      <div className="flex items-start justify-between space-x-3 mb-2">
        <Skeleton className="flex-1 h-5 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-5 rounded-lg" />
      </div>
      <div className="flex items-start justify-between space-x-3 mb-2">
        <Skeleton className="flex-1 h-5 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-5 rounded-lg" />
      </div>
      <div className="flex items-start justify-between space-x-3 mb-2">
        <Skeleton className="flex-1 h-5 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-5 rounded-lg" />
      </div>
      <div className="flex items-start justify-between space-x-3 mb-2">
        <Skeleton className="flex-1 h-5 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-5 rounded-lg" />
      </div>
      <div className="flex items-start justify-between space-x-3 mb-2">
        <Skeleton className="flex-1 h-5 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-5 rounded-lg" />
      </div>
    </Fragment>
  )
}
