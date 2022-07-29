import { EditOutlined, FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { Image, message, Switch,Table} from 'antd';
import React, {  useEffect, useState } from 'react';
import { ListStyle, Paragraph, Text, Title } from '../styles/product';
import { Select } from 'antd';
import { FlexRow, TableAnt } from '../styles';
import { getCategories, getProducts,  useStore } from '../../../../store';
import { IProduct } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { apiCategory, apiProduct } from '../../../../api';
import { updateProduct, updateProductOneField } from '../../../../api/product';
type Props = {
  justifyContent?: string
}
const List:React.FC<Props> = () => {

  const {state, dispatch} = useStore()
  
  const {products, categories} = state
  console.log(state);
  
  const navigate= useNavigate()

  const onStatusChange = (data: IProduct) => {
    // const product = {id: id, status: !status}
    //  console.log(product);
    let product =  {...data, status:!data.status}
    const res = updateProduct(product)
    .then( async (res) => {
      const {data} = await apiProduct.getProducts();
      dispatch(getProducts(data))
      
      res.data.status === false 
      ?  message.warning('Sản phẩm để trạng thái riêng tư') 
      :  message.success('Sản phẩm đã trưng bày'); 
    })
    .catch(() => message.error('Không thể chuyển trạng thái sản phẩm'))
  };
    
  const columns = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render: (img : string) =><Image width={70}src={img} />
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Sale',
      key: 'price',
      dataIndex1: 'id',
      render: (product: IProduct) => <p>{product.promotion ? product.price * ((100 - product.promotion!) /100): product.price } </p>
    },
    {
      title: 'Desc',
      key: 'longDescription',
      dataIndex: 'longDescription',
    },
    {
      title: 'Tính năng đặc biệt',
      key: 'outstandingFeatures',
      dataIndex: "outstandingFeatures",
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex1: "id",
      render: (product : IProduct) => <Switch defaultChecked={product.status} onChange={() => onStatusChange(product)} />
    },
    
    {
      title: 'Actions',
      key: 'id',
      dataIndex: 'id',
      render: (id : number) => <EditOutlined onClick={() => navigate(`/admin/products/${id}/edit`)}/>
    },
  ];

  const handleFilterProductByCategory = async (value : number) => {
    let res = await apiProduct.getProductsByCategory(value)
    if(res.status === 200) {
      dispatch(getProducts(res.data.products))
    }
  }


  useEffect(() =>{
    const callApiProducts = async () => {
      let res = await apiProduct.getProducts()
      if(res.status === 200) {
        dispatch(getProducts(res.data))
      }
    }
    callApiProducts()
  } , [])

  useEffect(() =>{
    const callApiCategories = async () => {
      let res = await apiCategory.getCategories()
      if(res.status === 200) {
        dispatch(getCategories(res.data))
      }
    }
    callApiCategories()
  }, [])

  return (  
    <ListStyle>
      <Title>Danh mục sản phẩm</Title>
      <Paragraph onClick={() => navigate('/admin/products/add')} style={{cursor: 'pointer'}}>Thêm mới sản phẩm</Paragraph>
        <FlexRow justifyContent="space-between">
          <FlexRow>
          <Text>Lọc theo danh mục: </Text>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Chọn danh mục sản phẩm"
            optionFilterProp="children"
            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare((optionB!.children as unknown as string).toLowerCase())
            }
            onChange={handleFilterProductByCategory}
          >
            {categories.map(category => 
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>)}
          </Select>
          </FlexRow>

          <FileAddOutlined 
            style={{ fontSize: '32px', color:'#00B0D7', cursor:'pointer'}}  
            onClick={() => navigate("/admin/products/add")}
          />
        </FlexRow>
      <TableAnt  columns={columns} dataSource={products} />
    </ListStyle>
  )
}

export default List