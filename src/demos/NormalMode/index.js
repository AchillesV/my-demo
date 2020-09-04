import React, { useState } from 'react';
import { Button } from 'antd'
import './index.css';

function NormalMode() {
  const [introVisible, setIntroVisible] = useState(true)
  //console.log(introVisible);
  return (
    <div className="mode-bg">
      {/* 正常模式 */}
      <div className="float-bg" style={{ display: introVisible ? 'block' : 'none' }}>
        {/* <div className="float-content">将【数据表读取】拖拽至此</div> */}
        <div className="float-contents">数据表读取</div>
        {/* <div className="content-arrow">→</div> */}

        <div className="content-arrow">
          <img src={require('../../assets/img/arrow.png')} alt='' />
        </div>
        <div className="drag-tip">将【数据表读取】拖拽至此</div>
        <div className="content"></div>
        <div className="next-operate">
          <Button onClick={() => setIntroVisible(false)}>试一试&gt;</Button>&nbsp;
          {/* <Button>下一步</Button> */}
        </div>
        
      </div>
    </div>
  )
}

export default NormalMode;