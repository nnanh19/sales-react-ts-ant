import { FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { Button,Spin,Switch,Table} from 'antd';
import {  useEffect, useState } from 'react';
import { ListStyle, Paragraph, Text, Title } from '../styles/product';
import { Select } from 'antd';
import { FlexColumn, FlexRow } from '../styles/global';
import { getProducts, setLoading, useStore } from '../../../../store';
import axios from 'axios'
import { IProduct } from '../../../../types';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
type Props = {}
const List = (props: Props) => {

  const navigate= useNavigate()

  const handleProvinceChange = (value :any) => {
    console.log(value);
  };

  const onChange = (id: number) => {
    console.log(id);
    
  }
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onChangeStatus = (id: number) => {
    console.log(id);
  };
  
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

  let listProducts : IProduct[] = []
  if(products){
    
    listProducts = products?.map((product,index) => {
      return {
        key: index,
        name: product.name,
        desc: product.desc,
        price: product.price,
        status: <Switch defaultChecked onChange={() => onChangeStatus(product.id!)} />,
        categoryId: product.categoryId,
        actions: [
          <Button key={index} type="primary" danger >Xóa</Button>,
          <Button type="primary" ghost >Sửa</Button>,
        ],
      }

    })
    
  }
  return (  
    <ListStyle>
      <Title>Điện thoại</Title>
        <Paragraph>Danh mục sản phẩm</Paragraph>
        <FlexRow justifyContent="space-between">
          <FlexRow>
          <Text>Lọc theo danh mục: </Text>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
            {listProducts.map((product,index) =>  
              <Option key={index} value={product.categoryId}>{product.name}</Option>)}
            </Select>
          </FlexRow>

          <FileAddOutlined 
            style={{ fontSize: '32px', color:'#00B0D7', cursor:'pointer'}}  
            onClick={() => navigate("/admin/products/add")}
          />
        </FlexRow>
      <Table columns={columns} dataSource={listProducts} />
    </ListStyle>
  )
}

export default List