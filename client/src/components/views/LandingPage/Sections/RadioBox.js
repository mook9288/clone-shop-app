import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
  const [checked, setChecked] = useState([]);

  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (event) => {
    setChecked(event.target.value);
    props.handleFilters(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Price' key='1'>
          <Radio.Group onChange={handleChange} value={checked}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
