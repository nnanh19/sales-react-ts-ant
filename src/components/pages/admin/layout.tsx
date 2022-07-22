import { FileAddOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { apiCategory, apiProduct } from '../../../api';
import { getCategories, getProducts, useStore } from '../../../store';
import { HeaderStyle, FooterStyle, ContentStyle, LayoutStyle, SidebarStyle,  FlexRow, Paragraph, FlexColumn, FlexRowCategory } from './styles'
import { ImageStyle, InputStyle, IconSearch } from './styles'

type Props = {}

const Layout = (props: Props) => {
  const navigate = useNavigate()
  const [hideSearch, setHideSearch] = useState(true)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    value ? setHideSearch(false) : setHideSearch(true)
  };
  const handleClickSearch = () =>{
    
  }
  const handleOnMouseSearch = () =>{
    setHideSearch(true)
  }

  const {state, dispatch} = useStore()

  const {categories} = state

  useEffect(() => {
    apiCategory.getCategories()
    .then(res =>{
      if(res.status === 200) {
        dispatch(getCategories(res.data))
      }else{
        console.log('lỗi')
      }
    })
  }, [])

  const handleFilterProductByCategory = async (value : number) => {
    new Promise((res:any,rej) => {
      navigate('/admin/products')
      res()
    })      
    .then(() => {
      apiProduct.getProductsByCategory(value)
      .then((res)=>{
        if(res.status === 200) {
          dispatch(getProducts(res.data.products))
        }
      })
      return
    })
  }

  return (
    <LayoutStyle>
        <HeaderStyle>
          <FlexRow justifyContent="space-between" alignItems="center">
            <FlexRow onClick={() => navigate('/admin')} cursor="pointer" justifyContent="space-between" alignItems="center">
              <ImageStyle src='http://res.cloudinary.com/ph-th/image/upload/v1658488406/oswy6xgreaqjvw6niyad.png' />
              <Paragraph color='white'>Dardboard</Paragraph>
              <>
                <InputStyle onChange={onChange}/>
                 {hideSearch && <IconSearch color="black"/>}
              </>
            </FlexRow>
            <Paragraph color='white' fontWeight={500}>Xin chào Nguyễn Nhật Anh</Paragraph>
          </FlexRow>
        </HeaderStyle>
        <SidebarStyle>
          <FlexColumn marginTop="50px" marginLeft='15px' gap='20px'>
            {categories.map(category => 
            <FlexRowCategory onClick={() => handleFilterProductByCategory(category.id!)} cursor="pointer" width="200px" paddingTop="10px"  >
              <FileAddOutlined /> 
              <p>{category.name}</p>
            </FlexRowCategory>
            )}
          </FlexColumn>
        </SidebarStyle>
        <ContentStyle>
          <Outlet/>
        </ContentStyle>
        <FooterStyle>
footer
        </FooterStyle>
    </LayoutStyle>
  )
}

export default Layout