import styled from "styled-components";

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
`
const FlexRow = styled.div<{justifyContent?: string}> `
    display: flex;
    flex-direction: row;
    justify-content: ${({justifyContent}:any) => justifyContent || "start"
    };
    gap:10px;
    margin-bottom: 20px;
`


export {FlexColumn,FlexRow}