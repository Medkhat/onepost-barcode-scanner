import { printedBarcodesColumns } from "@/modules/barcodes/components/printed-barcodes-columns"
import { useBarcodesStore } from "@/modules/barcodes/store/barcodes.store"
import { DataTable } from "@/shared/components/table/data-table"

export default function PrintedBarcodes() {
  const orders = useBarcodesStore((state) => state.orders)
  return <DataTable data={orders} columns={printedBarcodesColumns} />
}
