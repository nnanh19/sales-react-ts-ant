import { Table } from "antd";
import styled from "styled-components";

const FlexColumn = styled.div <{justifyContent?: string, alignItems?: string, marginLeft?: string, marginTop?: string, marginBottom?: string, gap?: string}> `
    display: flex;
    flex-direction: column;
    margin-bottom: ${({marginTop}) => marginTop};
    margin-top: ${({marginTop}) => marginTop};
    margin-left: ${({marginLeft}) => marginLeft};
    gap: ${({gap}) => gap};
`
const FlexRow = styled.div<{width?: string, paddingTop?: string,cursor?: string ,justifyContent?: string, alignItems?:string, marginTop?: string, marginBottom?: string}> `
    display: flex;
    flex-direction: row;
    justify-content: ${({justifyContent}:any) => justifyContent || "start"
    };
    align-items: ${({alignItems}) => alignItems || "start"} ;
    gap:10px;
    margin-bottom: ${({marginTop}) => marginTop};
    margin-top: ${({marginTop}) => marginTop};
    padding-top: ${({paddingTop}) => paddingTop};
    width: ${({width}) => width};
    cursor: ${({cursor}) => cursor};
`
const FlexRowCategory= styled.div<{width?: string, paddingTop?: string,cursor?: string ,justifyContent?: string, alignItems?:string, marginTop?: string, marginBottom?: string}> `
    display: flex;
    flex-direction: row;
    justify-content: ${({justifyContent}:any) => justifyContent || "start"
    };
    align-items: ${({alignItems}) => alignItems || "start"} ;
    gap:10px;
    margin-bottom: ${({marginTop}) => marginTop};
    margin-top: ${({marginTop}) => marginTop};
    padding-top: ${({paddingTop}) => paddingTop};
    width: ${({width}) => width};
    cursor: ${({cursor}) => cursor};
    padding-left:10px;
    &:hover {
       background: #00B0D7;
       border-radius:10px;
       color: white;
    }
`
const TableAnt = styled(Table)`
    margin-top: 20px;
`

export {FlexColumn,FlexRow,FlexRowCategory, TableAnt}