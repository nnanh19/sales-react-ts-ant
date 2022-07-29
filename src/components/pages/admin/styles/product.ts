import styled from "styled-components";
import { Typography } from 'antd';

const ListStyle = styled.div `

`
const Title = styled(Typography.Title)`

`
const Text = styled(Typography.Text) `
    font-weight: 500;
`
const Paragraph = styled(Typography.Paragraph) <{color?: string, fontWeight?: number | string}>`
    margin-bottom: 0;
    color: ${({color}) => color };
    font-weight: ${({fontWeight}) => fontWeight};
    &:hover{
       color: white;
    }
`

export {ListStyle, Title, Text, Paragraph}