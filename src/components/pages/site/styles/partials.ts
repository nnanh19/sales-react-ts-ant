import styled from "styled-components";
import { Layout, Input } from "antd";
const { Search } = Input;

const HeaderStyle = styled(Layout.Header)`
  background-color: #d70018;
`;
const HeaderContent = styled.div `
  max-width: 1300px;
  margin:auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const FooterStyle = styled(Layout.Footer)``;
const Header__Image = styled.img`
  max-width: 65px;
  max-height: 57px;
`;
const Header__Search = styled(Search)`
  max-width: 508px;
  max-height: 34px;
`;
const Header__Utils = styled.div`
  display: flex;
  flex-direction: rown;
  gap: 10px;
`;
const Header__Utils_FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 18px;
  color: white;
  font: Roboto;
  gap: 5px;
`;
const Header__Utils_FlexRown = styled.div`
  display: flex;
  flex-direction: rown;
  align-items: center;
  line-height: 18px;
  color: white;
  font: Roboto;
  gap: 5px;
`;


export {
  HeaderStyle,
  FooterStyle,
  Header__Image,
  Header__Search,
  Header__Utils,
  Header__Utils_FlexColumn,
  Header__Utils_FlexRown,
  HeaderContent,
};
