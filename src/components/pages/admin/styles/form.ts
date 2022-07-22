import { PlusOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";

const Form = styled(Ant.Form) `
    display: flex;
    justify-content: space-between;
    padding: 10px;
`
const Input = styled(Ant.Input) `
    width: ${({width}) => width }
`
const Upload = styled.label `
  padding: 20px;
  cursor: pointer;
  display:flex;
  flex-direction: column;
  align-items:center;
  gap: 5px;
`
const BoxUpload = styled.div `
    min-height: 343px;

`
const UploadIcon = styled(PlusOutlined) `
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px
`
const ImagePreview = styled.div`
    text-align:center;
`

const Select = styled(Ant.Select) `
    width: 50%
`
const Button = styled(Ant.Button) `
`
const LongInput = styled(TextArea)<{width?: string}> `
    width: ${({width}) => width};
`
export {Form, Input, Select, Button, LongInput, Upload, UploadIcon,ImagePreview,BoxUpload}