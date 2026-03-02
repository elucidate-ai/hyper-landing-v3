import type { IconType } from 'react-icons'
import {
  SiSalesforce,
  SiHubspot,
  SiSap,
  SiQuickbooks,
  SiGooglesheets,
  SiShopify,
} from 'react-icons/si'
import {
  TbChartBar,
  TbBrain,
  TbFileAnalytics,
  TbDatabase,
  TbPlug,
  TbApi,
  TbFileSpreadsheet,
  TbTruck,
  TbMapPin,
  TbBuildingStore,
  TbCar,
  TbReportAnalytics,
} from 'react-icons/tb'

/**
 * Maps string keys used in content data to react-icons components.
 * Industry-specific tools without branded icons use generic Tabler icons.
 */
export const iconRegistry: Record<string, IconType> = {
  // Branded icons
  SiSalesforce,
  SiHubspot,
  SiSap,
  SiQuickbooks,
  SiGooglesheets,
  SiShopify,

  // Generic Tabler icons for industry-specific tools
  TbChartBar,
  TbBrain,
  TbFileAnalytics,
  TbDatabase,
  TbPlug,
  TbApi,
  TbFileSpreadsheet,
  TbTruck,
  TbMapPin,
  TbBuildingStore,
  TbCar,
  TbReportAnalytics,
}
