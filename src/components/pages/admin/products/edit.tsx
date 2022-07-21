import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, ListStyle, Paragraph, Title, FlexColumn, FlexRow, Select, Button, LongInput, Upload, UploadIcon, ImagePreview } from '../styles'
import { setProductImage, useStore } from '../../../../store';
import axios from 'axios';
import { Modal, notification } from 'antd';
import { apiProduct } from '../../../../api';
type Props = {
  justifyContent?: string;
  alignItems?:string
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const edit: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate()

  const {state, dispatch} = useStore()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorModel, setErrorModel] = useState('');
  const {productImage} = state

  const imgRef = useRef<any>()


  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type](
      type === 'success' ? {
        message: 'Thêm mới sản phẩm thành công!',
        description:
          '',
      } : {
        message: 'Thêm mới sản phẩm thất bại!',
        description:
          '',
      }
    );
  };

  const onFinish = (value :any) => {
    if(productImage){
      const product = {
        ...value,
        price: Number(value.price),
        promotion: Number(value.promotion),
        categoryId: Number(value.categoryId),
        image: productImage
      }
      const ProductCreate = async () => {
        const data = await apiProduct.createProduct(product);
        data.status === 201 ? openNotificationWithIcon('success') : openNotificationWithIcon('error')
      }
      ProductCreate();
    }else{
      imgRef.current.click()
    }
  }
  
  const formData = new FormData();
  const API = 'https://api.cloudinary.com/v1_1/ph-th/image/upload';
  const preset = 'rjbb3yjz';
  const handleImageChange = async (files : any) => {
    if(files[0].size > 500000){
      showModal()
      if(files[0].size >= 1024){
         let size = (files[0].size / 1024).toFixed(0) + " KB"
         setErrorModel(`Chỉ cho phép kích thước ảnh nhỏ hơn 500kb, ảnh của bạn ${size}`)
      }
      const value = imgRef.current.value = ''
    }else{
      formData.append('file' , files[0] );
      formData.append('upload_preset', preset );
      const {data} = await axios.post(API, formData)
      dispatch(setProductImage(data.url))
    }
  };
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(setProductImage(''))
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(setProductImage(''))
  };

  
  return (
    <ListStyle>
      <Title onClick={() => console.log(formData) }>Cập nhật sản phẩm</Title>
      <Paragraph onClick={() => navigate('/admin/products')} style={{cursor: 'pointer'}}>Danh mục sản phẩm</Paragraph>
        
        <Form onFinish={onFinish} layout="vertical">
          <FlexColumn>
            <Form.Item>
                <Upload htmlFor='image'>
                    <UploadIcon />
                    <input
                    tabIndex={0}
                    ref={imgRef}
                    style={{display: 'none'}}
                    type="file"
                    id="image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={(event) => handleImageChange(event.target.files)} />
                    <p>Thêm ảnh</p>
                </Upload>
                <ImagePreview>
                  <img width={250} src={productImage} />
                </ImagePreview>
            </Form.Item>
            <Form.Item name="shortDescription" label="Mô tả ngắn">
              <LongInput width="50vh"/>
            </Form.Item>
          </FlexColumn>
          <FlexColumn>
            <Form.Item name="name" label="Tên sản phẩm" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <FlexRow>

              <Form.Item name="price" label="Giá sản phẩm" rules={[{required: true}]}>
                <Input value={1} width="50vh" />
              </Form.Item>

              <Form.Item name="promotion" label="Khuyến mãi (%)" rules={[{required: true}]}>
                <Input width="50vh"/>
              </Form.Item>

            </FlexRow>
            <Form.Item name="categoryId" label="Danh mục sản phẩm" rules={[{required: true}]}>
              <Select 
                placeholder="Chọn danh mục sản phẩm"
                style={{width:"50%"}}
              >
                <Select.Option value="1">Anh</Select.Option>
                <Select.Option value="2">AnhE</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="outstandingFeatures" label="Đặc điểm nổi bật">
              <LongInput />
            </Form.Item>
            <Form.Item name="longDescription" label="Mô tả dài">
              <LongInput />
            </Form.Item>
            <Button type='primary' htmlType='submit'>Thêm</Button>
          </FlexColumn>
          
        </Form>
        <Modal title="Không tải được ảnh lên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{errorModel}</p>
      </Modal>
    </ListStyle>
  )
}

export default edit