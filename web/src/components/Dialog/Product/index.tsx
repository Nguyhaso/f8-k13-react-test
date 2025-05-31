import {DialogContainer} from "../../index.ts";
import {Stack, TextField} from "@mui/material";
import { type ProductDialogProp} from "../../../utils";

export default ({isOpen, onClose, product, setProduct, onSave}: ProductDialogProp) => {

  const onChange = (event: any) => {
    setProduct({...product, [event.target.name]: event.target.value})
  }

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
    >
      <Stack sx={{ width: 450 }} spacing={2}>

        <TextField
          fullWidth name={"name"} label="Ten" variant="standard" value={product.name} onChange={onChange}
        />
        <TextField
          fullWidth name={"price"} label="Gia" variant="standard" value={product.price} onChange={onChange}
        />
        <TextField
          fullWidth name={"remaining"} label="Ton Kho" variant="standard" value={product.remaining} onChange={onChange}
        />

      </Stack>
    </DialogContainer>
  )
}