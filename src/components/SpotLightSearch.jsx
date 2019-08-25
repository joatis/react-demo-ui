import React from 'react';
import { Input, Icon } from 'antd';

export const SpotLightSearch = (props) => {
  const { updateSpotlight } = props;
  return (
    <div>
      <Input addonBefore={<Icon type="plus"/>} placeholder="Spotlight Search" onKeyUp={(evt) => updateSpotlight(evt)}></Input>
    </div>
  )
}