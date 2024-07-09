import { GetAreasResponse } from "@/shared/api/areas.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"

export const getAreas = async () => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.APP).get<GetAreasResponse>(
      "/area/"
    )
  ).data
}
