import type { Address } from './addresses'

export type VirtualAccountCustomer = {
  createdAt: string
  email: string
  id: string
  name: string
  network: string
  phone: string
  status: string
  updatedAt: string
}

export type VirtualAccount = {
  accountName: string
  accountNumber: string
  address: Address | null
  bankCode: string
  bankName: string
  createdAt: string
  currency: string
  customer: VirtualAccountCustomer
  id: string
  isActive: boolean
  reference: string
  status: string
  type: string
  updatedAt: string
  wallet: {
    address: string
    configurations: unknown | null
    createdAt: string
    derivationPath: string
    description?: string | null
    id: string
    isActive: boolean
    name: string
    network: string
    status: string
    updatedAt: string
  }
}

export type VirtualAccountCreateMasterRequest = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

export type VirtualAccountCreateAddressRequest = {
  accountName?: string
  accountNumber?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
}

export type VirtualAccountUpdateRequest = {
  isActive?: boolean
  accountName?: string
  accountNumber?: string
}