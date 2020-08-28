import React from 'react';
import { Steps, Button, message } from 'antd';
import './index.css';

const { Step } = Steps;

const steps = [
  {
    title: '',
    content: () => {
      return (
        <div>
        在左侧组件列表中，选择【数据】→【输入】，将【数据表读取】拖入【主流程】
        </div>
      )
    },
  },
  {
    title: '',
    content: () => {
      return (
        <div>
        点击右侧【数据表读取】中的<span role='img' aria-label='文件夹'>📂</span>标志，在弹出框中选择【测试表】，点击确定
        </div>
      )
    },
  },
  {
    title: '',
    content: () => {
      return (
        <div>
        1、在左侧组件列表中，选择【处理】→【列】，将【重命名】拖入【主流程】，连接【数据表读取】和【重命名】。<br />
        2、点击主流程中的【重命名】，在右侧选择需要重命名的字段，填写新名称。
        </div>
      )
    },
  },
  {
    title: '',
    content: () => {
      return (
        <div>
        1、在左侧组件列表中，选择【处理】→【行】，将【排序】拖入【主流程】，连接【重命名】和【排序】。<br />
        2、点击主流程中的【排序】，在右侧选择需要排序的字段和排序顺序。
        </div>
      )
    },
  },
  {
    title: '',
    content: () => {
      return (
        <div>
        1、在左侧组件列表中，选择【算法】→【基础统计】，将【描述性统计量】拖入【主流程】，连接【排序】和【描述性统计量】。<br />
        2、点击主流程中的【描述性统计量】，在右侧选择变量和分组，连接【描述性统计量】的【模型端口】到【输出端口】。点击运行。
        </div>
      )
    },
  },
  {
    title: '',
    content: () => {
      return (
        <div>
        1、点击<span role='img' aria-label='文件夹'>🔍</span>查看每个节点的运行结果，是否与相应节点的功能一致。<br />
        2、点击保存，保存流程。<br />
        3、点击发布，发布流程。
        </div>
      )
    },
  },
];

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
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

  render() {
    const { current } = this.state;
    return (
      <div className='user-tutorial'>
        <div className='tutorial-title'>· 用户引导</div>
        <Steps size='small' current={current} style={{display: 'none'}}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content()}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              完成
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Tutorial;