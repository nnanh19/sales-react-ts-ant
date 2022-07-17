import { FormOutlined } from '@ant-design/icons';
import { Button,Spin,Table} from 'antd';
import {  useEffect, useState } from 'react';
import { ListStyle, Paragraph, Text, Title } from '../styles/product';
import { Select } from 'antd';
import { FlexRow } from '../styles/global';
import { getProducts, setLoading, useStore } from '../../../../store';
import axios from 'axios'
import { IProduct } from '../../../../types';
const { Option } = Select;
type Props = {}
const List = (props: Props) => {
  const [hideAndShow, setHideAndShow] = useState(0)

  const handleHideAndShow = (id :number) =>{
    setHideAndShow(id)
  }

  const handleProvinceChange = (value :any) => {
    console.log(value);
  };

  const onChange = (id: number) => {
    console.log(id);
    
  }
 
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

  const {state, dispatch} = useStore()
  
  const {products} = state

  useEffect(() =>{
    const callApiProducts = async () => {
      let res = await axios.get('http://localhost:4000/products')
      if(res.status === 200) {
        dispatch(getProducts(res.data))
      }
    }
    callApiProducts();
  } , [])

  var listProducts : IProduct[] = []
  if(products){
    
    listProducts = products?.map((product,index) => {
      return {
        key: index,
        name: product.name,
        desc: product.desc,
        price: product.price,
        status: product.status,
        actions: [
          hideAndShow ===  product.id && <Button type="primary" danger>Xóa</Button>,
          hideAndShow ===  product.id && <Button type="primary" ghost>Sửa</Button>,
          hideAndShow !==  product.id && <FormOutlined onClick={() => handleHideAndShow(product.id!)}/>
        ],
      }

    })
    
  }
  
  
  
  
  return (  
    <ListStyle>
      <Title>Điện thoại</Title>
        <Paragraph>Danh mục sản phẩm</Paragraph>
        <FlexRow>
          <Text>Lọc theo danh mục: </Text>
          <Select defaultValue={listProducts[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
            {listProducts?.map((product,index) => (
              <Option key={index}>{product.name}</Option>
            ))}
          </Select>
        </FlexRow>
      <Table columns={columns} dataSource={listProducts} />
    </ListStyle>
  )
}

export default List