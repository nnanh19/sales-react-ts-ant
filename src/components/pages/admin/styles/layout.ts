import styled from "styled-components";

const LayoutStyle = styled.div `
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-areas:
    "header header header header header"
    "sidebar content content content content"
    "footer footer footer footer footer";
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`
export default LayoutStyle