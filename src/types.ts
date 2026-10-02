export interface StudentInfo {
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  classApplyingFor: string;
  previousSchool: string;
}

export interface ParentInfo {
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
}

export interface AddressInfo {
  residentialAddress: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface UploadedDoc {
  id: string;
  label: string;
  required: boolean;
  file?: {
    name: string;
    size: number;
    type: string;
    dataUrl?: string;
  };
}

export interface AdmissionApplication {
  applicationNumber: string;
  transactionReference: string;
  submittedAt: string;
  studentInfo: StudentInfo;
  parentInfo: ParentInfo;
  addressInfo: AddressInfo;
  documents: {
    label: string;
    fileName: string;
    fileSize: number;
  }[];
  feeAmount: number;
  paymentStatus: 'PAID' | 'FAILED' | 'PENDING';
  applicationStatus: 'Under Document Verification' | 'Document Verified' | 'Interaction Scheduled' | 'Admission Granted';
  paymentMethod?: string;
}
