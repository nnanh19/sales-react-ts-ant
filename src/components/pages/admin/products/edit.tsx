import React, { createRef, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, ListStyle, Paragraph, Title, FlexColumn, FlexRow, Select, Button, LongInput, Upload, UploadIcon, ImagePreview, BoxUpload } from '../styles'
import { getProduct, setProductImage, useStore } from '../../../../store';
import axios from 'axios';
import { Modal, notification } from 'antd';
import { apiProduct } from '../../../../api';
import { useForm } from 'antd/lib/form/Form';
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
  const [productImage, setProductImage ]  = useState()

  const {product} = state

  const imgRef = useRef<any>()

  const {id}: any = useParams();

  useEffect(() => {
    new Promise((resolve :any, reject : any)=>{
      apiProduct.getProduct(id)
      .then(res=> {
        if(res.status === 200){
          dispatch(getProduct(res.data))
          return resolve(res.data)
        }else{
          return reject()
        }
      });
    })
    .then(({image} : any)=> {
      setProductImage(image)
    })
    .catch(()=> {
      Modal.error({
        content: 'Không thành công, vui lòng thử lại!',
      });
      navigate('/admin/products')
    })
  }, [])    

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type](
      type === 'success' ? {
        message: 'Cập nhật sản phẩm thành công!',
        description:
          '',
      } : {
        message: 'Cập nhật sản phẩm thất bại!',
        description:
          '',
      }
    );
  };
  
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: product?.name,
      price: product?.price,
      promotion: product?.promotion,
      categoryId: product?.categoryId,
      outstandingFeatures: product?.outstandingFeatures,
      longDescription: product?.longDescription,
      shortDescription: product?.shortDescription,
      image: product?.image,
      status: product?.status
    })
  }, [product])
  
  const getValue = (value :string) => {{
    return form.getFieldValue(value)
  }}
  const submitForm = () => {
     if(productImage){
      const product = {
        id,
        name: getValue('name'),
        price:getValue('price'),
        promotion: Number(getValue('promotion')),
        categoryId: getValue('categoryId'),
        outstandingFeatures: getValue('outstandingFeatures'),
        longDescription: getValue('longDescription'),
        shortDescription: getValue('shortDescription'),
        image: productImage,
        status: getValue('status')
      }
      const ProductCreate = async () => {
        const data = await apiProduct.updateProduct(product);
        data.status === 200 ? openNotificationWithIcon('success') : openNotificationWithIcon('error')
        navigate('/admin/products')
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
      setProductImage(data.url)
    }
  };
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <ListStyle>
      <Title onClick={() => console.log(formData) }>Cập nhật sản phẩm</Title>
      <Paragraph onClick={() => navigate('/admin/products')} style={{cursor: 'pointer'}}>Danh mục sản phẩm</Paragraph>
        <Form layout="vertical" form={form}>  
          <FlexColumn>
            <Form.Item>
                  <BoxUpload style={{background:'white'}}>
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
                        <p>Cập nhật ảnh</p>
                    </Upload>
                    <ImagePreview>
                    <img width={250} src={productImage} />
                    </ImagePreview>
                </BoxUpload>
            </Form.Item>
            <Form.Item name="shortDescription" label="Mô tả ngắn">
              <LongInput width="50vh"/>
            </Form.Item>
          </FlexColumn>
          <FlexColumn>
            <Form.Item name="name"  label="Tên sản phẩm" rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <FlexRow>

              <Form.Item name="price" label="Giá sản phẩm" rules={[{required: true}]}>
                <Input width="50vh" />
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
            <Button type='primary' htmlType='submit' onClick={submitForm}>Cập nhật</Button>
          </FlexColumn>
          
        </Form>
        <Modal title="Không tải được ảnh lên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{errorModel}</p>
      </Modal>
    </ListStyle>
  )
}

export default edit