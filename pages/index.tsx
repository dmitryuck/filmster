import { Row, Col, Container } from 'react-grid-system';
import HomeLayout from '../layouts/HomeLayout';
import HeaderLayout from '../layouts/HeaderLayout';
import FooterLayout from '../layouts/FooterLayout';


interface Props {
}

const appContainerStyle = {
  margin: 0,
  padding: 0,
  width: '100%'
};

const Index = (props: Props) => (
  <Container fluid style={appContainerStyle}>
    <Row>
      <Col xs={12}>
        <HeaderLayout />
        <HomeLayout />
        <FooterLayout />
      </Col>
    </Row>
  </Container>
);

Index.getInitialProps = async ({ query }) => {
  return { ...query }
};

export default Index;