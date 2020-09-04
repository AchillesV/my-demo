import React from 'react';
import { Steps, Button, message, Modal } from 'antd';
import './index.css';
import { imgUrl } from '../../consts/imgUrl';
console.log(Image);
const { Step } = Steps;


class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      introVisible: true,
      visible: false,
      imgSrc: ''
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  skip = () => {
    this.setState({ introVisible: false })
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handlePreview = (e) => {
    console.log(e.target.src);
    this.setState({visible: true, imgSrc: e.target.src});
  }

  render() {
    const { current, introVisible } = this.state;
    const steps = [
      {
        title: '',
        content: () => {
          return (
            <div>
              <span>在左侧组件列表中，选择【数据】→【输入】，将【数据表读取】拖入【主流程】.</span>
              <div style={{padding: '10px 30px'}}>
                <img src={require('../../assets/img/drag.gif')} alt='' height='100%' width='100%' onClick={this.handlePreview} />
              </div>
            </div>
          )
        },
      },
      {
        title: '',
        content: () => {
          return (
            <div>
              <span>点击右侧【数据表读取】中的<span role='img' aria-label='文件夹'>📂</span>标志，在弹出框中选择【测试表】，点击确定.</span>
            </div>
          )
        },
      },
      {
        title: '',
        content: () => {
          return (
            <div>
              <span>1、在左侧组件列表中，选择【处理】→【列】，将【重命名】拖入【主流程】，连接【数据表读取】和【重命名】。</span><br />
              <div style={{padding: '10px 30px'}}><img src={require('../../assets/img/sjb_cmm.png')} alt='' height='100%' width='100%' onClick={this.handlePreview} /></div>
              <span>2、点击主流程中的【重命名】，在右侧选择需要重命名的字段，填写新名称。</span>
              <div style={{padding: '10px 20px'}}><img src={require('../../assets/img/config.gif')} alt='' height='100%' width='100%' onClick={this.handlePreview} /></div>
            </div>
          )
        },
      },
      {
        title: '',
        content: () => {
          return (
            <div>
              <span>1、在左侧组件列表中，选择【处理】→【行】，将【排序】拖入【主流程】，连接【重命名】和【排序】。</span><br />
              <div style={{padding: '10px 30px'}}><img src={require('../../assets/img/cmm_px.png')} alt='' height='100%' width='100%' onClick={this.handlePreview} /></div>
              <span>2、点击主流程中的【排序】，在右侧选择需要排序的字段和排序顺序。</span>
            </div>
          )
        },
      },
      {
        title: '',
        content: () => {
          return (
            <div>
              <span>1、在左侧组件列表中，选择【算法】→【基础统计】，将【描述性统计量】拖入【主流程】，连接【排序】和【描述性统计量】。</span><br />
              <div style={{padding: '10px 30px'}}><img src={require('../../assets/img/ps.png')} alt='' height='100%' width='100%' onClick={this.handlePreview} /></div>
              <span>2、点击主流程中的【描述性统计量】，在右侧选择变量和分组，连接【描述性统计量】的【模型端口】到【输出端口】。点击运行<span style={{color: 'green'}}>▶</span>.</span>
            </div>
          )
        },
      },
      {
        title: '',
        content: () => {
          return (
            <div>
              1、依次点击组件上的<span role='img' aria-label='文件夹'>🔍</span>，查看每个节点的运行结果，是否与相应节点的功能一致。<br />
              2、点击保存，保存流程。<br />
              3、点击发布，发布流程。
            </div>
          )
        },
      },
    ];
    
    return (
      <div className='user-tutorial' style={{ display: introVisible ? 'block' : 'none' }}>
        <div className='tutorial-title'>&nbsp; · 新手引导({current+1}/6)</div>
        <Steps size='small' current={current} style={{display: 'none'}}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content()}</div>
        <div className="steps-action">
          {current > 0 ? 
            <Button style={{ marginRight: '8px' }} onClick={() => this.prev()}>
              &lt;
            </Button> :
            <Button style={{ marginRight: '8px' }} disabled onClick={() => this.prev()}>
              &lt;
            </Button>
          }
          <Button style={{ marginRight: '8px' }} onClick={() => this.skip()}>
            跳过引导
          </Button>
          {current < steps.length - 1 && (
            <Button onClick={() => this.next()}>
              &gt;
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button disabled onClick={() => message.success('引导结束！')}>
              &gt;
            </Button>
          )}
        </div>
        <Modal
          title="图片预览"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <img style={{width:'100%'}} src={this.state.imgSrc} alt="" />
        </Modal>
      </div>
    );
  }
}

export default Tutorial;