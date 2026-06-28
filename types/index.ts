export interface SurpriseRequest {
  createdAt: Date
  status: 'new' | 'in_progress' | 'sent' | 'completed'
  name: string
  email: string
  recipient: string
  occasion: string
  age: number
  budget: number
  deliveryDate: string
  description: string
  contactPermission: boolean
}

export interface FormValues {
  recipient: string
  occasion: string
  age: string
  budget: number
  deliveryDate: string
  description: string
  name: string
  email: string
  contactPermission: boolean
}
