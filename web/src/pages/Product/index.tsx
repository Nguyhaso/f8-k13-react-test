import {FTable, FHeader, ProductDialog, SearchBar} from '../../components'
import {deleteMethod, type Header, type Product} from '../../utils'
import {Box} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {getMethod, postMethod, putMethod} from "../../utils/api.ts";

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'price', text: 'Gia'},
  {name: 'remaining', text: 'Ton kho'},
  {name: 'action', text: 'Tuy Chinh'}
]


export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const defaultProduct={
    id: 0,
    name: '',
    price: 0,
    remaining: 0,
  }
  const [curProduct, setCurProduct] = useState<Product>(defaultProduct)



  const [products, setProducts] = useState<Product[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    // @ts-ignore
    setCurProduct({...products.find(e => e.id === id)})
    setIsOpenDialog(true)
  }, [products])

  const onSave = async () => {
    try {
      //check if id existed or new create
      if (curProduct.id === 0) {
        const newId = products.length > 0 ? Math.max(...products.map(e => e.id)) + 1 : 1
        // create new product
        await postMethod(`/product`,{...curProduct, id: newId})
        setProducts([...products, {...curProduct, id: newId}])
      } else {
        //update existing employee
        await putMethod(`product/${curProduct.id}`, curProduct)
        const updateProducts = products.map(e => {
          return e.id === curProduct.id ? curProduct : e
        })
        setProducts(updateProducts)
      }
      setIsOpenDialog(false)
      setCurProduct(defaultProduct)
    } catch (error) {
      console.error(error)
    }
  }
  const onDelete = useCallback(async (id: number) => {
    try {
      await deleteMethod(`/product/${id}`)
      setProducts(products.filter(e => e.id !== id))
    } catch (error) {
      console.error(error)
    }
  },[products])
  // const toBody = () => {
  //   return {
  //     name: curProduct.name,
  //     price: curProduct.price,
  //     remaining: curProduct.remaining,
  //   }
  // }

  const onMounted = async () => {
    const productsData = await getMethod(`/product`)
    setProducts([...productsData])
  }

  useEffect(() => {
    onMounted()
  }, [])

  return (
    <>
      <FHeader title={'Products'}/>
      <Box className={'container'}>
        <SearchBar onAdd={onAdd}/>

        <FTable
          onDelete={onDelete}
          headers={headers}
          rows={products}
          onUpdate={onUpdate}
        />
        <ProductDialog
          product={curProduct}
          setProduct={setCurProduct}
          onSave={onSave}
          isOpen={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
        />
      </Box>
    </>
  )
}