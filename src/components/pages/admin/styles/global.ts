import styled from "styled-components";

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
`
const FlexRow = styled.div<{justifyContent?: string, alignItems?:string}> `
    display: flex;
    flex-direction: row;
    justify-content: ${({justifyContent}:any) => justifyContent || "start"
    };
    align-items: ${({alignItems}) => alignItems || "start"} ;
    gap:10px;
    margin-bottom: 20px;
`


export {FlexColumn,FlexRow}