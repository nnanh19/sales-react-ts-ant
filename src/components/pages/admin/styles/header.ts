import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HeaderStyle = styled.div `
    background: #00B0D7;
    grid-area: header;
    height: 100px;
    padding:20px;
`
const ImageStyle = styled.img`
    width: 70px
`
const InputStyle = styled.input `
    border: none;
    outline: none;
    padding:3px 25px;
    border-radius:10px;
    min-width: 400px;   
    margin-left: 50px;
`
const IconSearch = styled(SearchOutlined)<{color?: string}>`
    position: relative;
    color: ${({color}) => color};
    right: 400px;
`
export {HeaderStyle,ImageStyle, InputStyle, IconSearch}