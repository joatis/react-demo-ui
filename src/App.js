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
      selectedAccessRecord: {}
    };
    this.updateSpotlight = this.updateSpotlight.bind(this);
    this.setSelectedAccessRecord = this.setSelectedAccessRecord.bind(this);
    this.updateSelectedAccessRecord = this.updateSelectedAccessRecord.bind(this);
  }

  updateSpotlight(evt) {
    this.setState({ spotLightFilter: evt.target.value });
  }

  setSelectedAccessRecord(record) {
    this.setState({ selectedAccessRecord: record });
  }

  updateSelectedAccessRecord(fields) {
    const { selectedAccessRecord, accessLevels } = this.state;
    const recordIndex = accessLevels.findIndex(e => (e.id === selectedAccessRecord.id));
    accessLevels[recordIndex].name = fields.name; 
    accessLevels[recordIndex].Description = fields.description; 
    accessLevels[recordIndex].readerId = fields.readers; 
    this.setState({ accessLevels });
  }

  render() {
    const { Header, Footer, Content } = Layout;
    const accessTableProps = {
      ...this.state,
      setSelectedAccessRecord: this.setSelectedAccessRecord
    }
    const accessFormProps = {
      ...this.state,
      updateSelectedAccessRecord: this.updateSelectedAccessRecord
    }
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
                <WrappedEditAccessForm { ...accessFormProps } />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
  
}

export default App;
