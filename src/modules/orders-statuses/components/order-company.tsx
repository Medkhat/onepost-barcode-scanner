import { MarketCompany } from "@/modules/orders-statuses/api/orders-statuses.types"

const companyImg: Record<MarketCompany, string> = {
  PINDUODUO: "https://medkhat.sirv.com/UDA/pinduoduo.png",
  TEMU: "https://aimg.kwcdn.com/upload_aimg/personal/41c8132e-1ccf-4465-9e6a-dacb95ec8205.png.slim.png",
}

export default function OrderCompanyLogo({
  company,
}: {
  company: MarketCompany
}) {
  return <img src={companyImg[company]} alt={company} className="h-10" />
}
