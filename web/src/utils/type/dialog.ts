import type {Product} from "./common.ts";

export interface DialogProp {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  width?: number
  children?: any
}


export interface ProductDialogProp extends DialogProp {
  product: Product
  setProduct: (product: Product) => void
}

