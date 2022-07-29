import styled from 'styled-components'
import { Layout } from 'antd';

const ContentStyle = styled(Layout.Content) `
   max-width: 1300px;
   margin: 20px auto; 
   
`
const ContentProducts = styled.div `
   display: flex;
   flex-wrap: wrap;
   gap:10px;
`  
const ContentProduct = styled.div<{direction?: string, justifyContent?:string}> `
   padding: 20px 0;
   display: flex;
   flex-direction: ${({direction}) => direction};
   gap:10px;
   justify-content: ${({justifyContent}) => justifyContent}
`
const ContentProductImg = styled.img `
   width: 250px;
`

export {ContentStyle,ContentProduct,ContentProducts,ContentProductImg,}