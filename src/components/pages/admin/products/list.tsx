import { EditOutlined, FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { message, Switch,Table} from 'antd';
import React, {  useEffect, useState } from 'react';
import { ListStyle, Paragraph, Text, Title } from '../styles/product';
import { Select } from 'antd';
import { FlexRow } from '../styles';
import { getProducts,  useStore } from '../../../../store';
import { IProduct } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { apiProduct } from '../../../../api';
import { updateProduct, updateProductOneField } from '../../../../api/product';
const { Option } = Select;
type Props = {
  justifyContent?: string
}
const List:React.FC<Props> = () => {

  const navigate= useNavigate()

  const onChange = (id: number) => {
    console.log(id);
    
  }
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onStatusChange = (data: IProduct) => {
    // const product = {id: id, status: !status}
    //  console.log(product);
    let product =  {...data, status:!data.status}
    const res = updateProduct(product)
    .then( async (res) => {
      const {data} = await apiProduct.getProducts();
      dispatch(getProducts(data))
      
      res.data.status === false 
      ?  message.success('Sản phẩm để trạng thái riêng tư') 
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
      render: (img : string) => <img width={70} src={img} alt="" />
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Desc',
      key: 'desc',
      dataIndex: 'desc',
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

  const {state, dispatch} = useStore()
  
  const {products} = state

  useEffect(() =>{
    const callApiProducts = async () => {
      let res = await apiProduct.getProducts()
      if(res.status === 200) {
        dispatch(getProducts(res.data))
      }
    }
    callApiProducts();
  } , [])




  return (  
    <ListStyle>
      <Title>Danh mục sản phẩm</Title>
      <Paragraph onClick={() => navigate('/admin/products/add')} style={{cursor: 'pointer'}}>Thêm mới sản phẩm</Paragraph>
        <FlexRow justifyContent="space-between">
          <FlexRow>
          <Text>Lọc theo danh mục: </Text>
            {/* <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
            {products.map((product,index) =>  
              <Option key={index} value={product.categoryId}>{product.name}</Option>)}
            </Select> */}
          </FlexRow>

          <FileAddOutlined 
            style={{ fontSize: '32px', color:'#00B0D7', cursor:'pointer'}}  
            onClick={() => navigate("/admin/products/add")}
          />
        </FlexRow>
      <Table columns={columns} dataSource={products} />
    </ListStyle>
  )
}

export default List