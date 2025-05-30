import api from '../plugins'
import {useEffect, useState} from "react";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export default () => {
  const getMethod = async (endpoint: string) => {
    try {
      const data = await api.get(endpoint);
      return data
    } catch (e) {
      console.error(e);
    }
    return null
  }

  const deleteMethod = async (endpoint: string) => {
    try {
      const {data} = await api.delete(endpoint)
      return data
    } catch (e) {
      console.log(e)
    }

    return null
  }

  const onMounted = async () => {
    const [productsData, ordersData] = await Promise.all([getMethod('/product'), getMethod('/orders')])
    console.log(productsData?.data)
    setProducts(productsData?.data)
    setOrders(ordersData?.data)
  }

  useEffect(() => {
    onMounted()
  }, [])

  // @ts-ignore
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const columnHeader = ["id", "quantity", "amount","action"]

  const onDelete = async (id: number) => {
    await deleteMethod(`product/${id}`)
    await onMounted()
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columnHeader.map((item, index) => (
            <TableCell key={index}>{item}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {orders?.map((order, index) => (
          <TableRow key={index}>
            <TableCell>
              {order.id}
            </TableCell>
            <TableCell>
              {order.quantity}
            </TableCell>
            <TableCell>
              {order.amount}
            </TableCell>
            <TableCell>
              <Button variant={"outlined"}>Add</Button>
              <Button variant={"outlined"} onClick={()=>onDelete(index)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}