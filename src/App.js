import React from 'react';
import { Row, Col, Layout } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import accessLevels from './data/accessLevels';
import readers from './data/readers';
import readerTypes from './data/readerTypes';
import { AccessTableContainer } from './components/AccessTableContainer';
import { SpotLightSearch } from './components/SpotLightSearch';
import { WrappedEditAccessForm } from './components/EditAccessForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevels,
      readers,
      readerTypes,
      spotLightFilter: '',
      selectedAccessId: null
    };
    this.updateSpotlight = this.updateSpotlight.bind(this);
    this.setSelectedAccessId = this.setSelectedAccessId.bind(this);
  }

  componentDidMount() {

  }

  updateSpotlight(evt) {
    this.setState({ spotLightFilter: evt.target.value });
  }

  setSelectedAccessId(record) {
    console.log(JSON.stringify(record));
    this.setState({ selectedAccessId: record.id });
  }

  render() {
    const { Header, Footer, Content } = Layout;
    const accessTableProps = {
      ...this.state,
      setSelectedAccessId: this.setSelectedAccessId
    }
    const { selectedAccessId } = this.state;
    return (
      <Layout>
        <Header></Header>
        <Content>
          <Row>
            <Col span={12}>
              <SpotLightSearch updateSpotlight={this.updateSpotlight}/>
              <AccessTableContainer { ...accessTableProps }></AccessTableContainer>
            </Col>
            <Col span={12}>
              { (selectedAccessId !== null) ? (
                <div>
                  <WrappedEditAccessForm/>
                </div>
              ) : (null) }
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
  
}

export default App;
