import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"

import scanner from "@/assets/barcode-scan.png"
import printer from "@/assets/printer.png"
import BarcodeFieldAutofill from "@/modules/barcodes/components/barcode-field-autofill"
import BarcodeFieldManual from "@/modules/barcodes/components/barcode-field-manual"
import PrintedBarcodes from "@/modules/barcodes/components/printed-barcodes"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

export default function BarcodesRoute() {
  const { t: barcodesT } = useTranslation("barcodes")
  return (
    <Fragment>
      <div className="p-3 md:my-10 sm:p-10 rounded-xl shadow border flex items-start w-full md:w-3/4 mx-auto">
        <img src={scanner} alt="Scanner" className="w-10 sm:w-32" />
        <div className="flex-1 mx-2 sm:mx-10">
          <Tabs defaultValue="autoFill" className="w-full">
            <TabsList className="w-full mb-2">
              <TabsTrigger value="autoFill" className="w-full font-medium">
                {barcodesT("autoFill")}
              </TabsTrigger>
              <TabsTrigger value="manualFill" className="w-full font-medium">
                {barcodesT("manualFill")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="autoFill">
              <BarcodeFieldAutofill />
            </TabsContent>
            <TabsContent value="manualFill">
              <BarcodeFieldManual />
            </TabsContent>
          </Tabs>
        </div>
        <img src={printer} alt="Printer" className="w-10 sm:w-32" />
      </div>
      <PrintedBarcodes />
    </Fragment>
  )
}
