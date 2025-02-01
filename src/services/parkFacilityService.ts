export interface ParkFacilityReservation {
  parkFacilityReservationKey: number;
  locationName: string;
  facilityName: string;
  streetAddressText: string;
  cityName: string;
  zipCode: string;
  reservationBeginDate: string;
  reservationBeginTime: string;
  reservationEndDate: string;
  reservationEndTime: string;
  transactionDtm: string;
  latitudeAndLongitudeCrd: string;
  reservationDsc: string;
  facilityLocationCode: string;
  facilitySpaceCode: string;
  customerName: string;
  customerFirstName: string;
  customerLastName: string;
  householdNbr: number;
  headCnt: number;
  reservationPurposeDsc: string;
  comboKeyCode: string;
  facilityParentCode: string | null;
  facilityChildCodeList: string[] | null;
  facilitySiblingCodeList: string[] | null;
  reservationFacilityTypeCode: string;
  reservationTypeName: string;
  featureCodeList: string[] | null;
  lightedFieldInd: boolean;
  fieldTurfTypeDsc: string | null;
  fieldOperationalStatusDsc: string;
  reservationBeginDtm: string;
  reservationEndDtm: string;
  reservationStatusCode: string;
  calendarIncludeInd: boolean;
  fieldUseTypeDsc: string | null;
  parkUrlText: string;
};


const baseUrl: string = "https://datahub-v2.arlingtonva.us/api/Recreation/ParkFacilityReservations?";

export const fetchParkFacilities = async (): Promise<ParkFacilityReservation[]> => {
  const url =
    `${baseUrl}$top=10000&$orderby=reservationBeginDtm,+comboKeyCode&$filter=reservationBeginDate+ge+%272025-02-01T05:00:00Z%27+and+reservationEndDate+lt+%272025-03-01T04:59:00Z%27+and+facilityLocationCode+eq+%27VA-H%27+and+(reservationFacilityTypeCode+eq+%27DIAMD%27+or+reservationFacilityTypeCode+eq+%27RECT%27)+and+calendarIncludeInd+eq+1+and+(reservationBeginTime+le+%271970-01-01T23:59:00.000Z%27+and+reservationEndTime+ge+%271970-01-01T0:00:00.000Z%27)+and+comboKeyCode+eq+%27RECT_VA-H_FLD1%27`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching park facilities:", error);
    return [];
  }
};
