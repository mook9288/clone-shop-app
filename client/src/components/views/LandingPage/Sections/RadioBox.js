import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
  const [checked, setChecked] = useState([]);

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Price' key='1'>
          <Radio value={'test'}>test</Radio>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
