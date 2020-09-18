
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import A3DDesigner, { Connect, DESIGNER_CONSTS, INNER_CONSTS } from 'amos-3d/lib/designer';
import { Renderer } from 'amos-3d';
import { A3DUtil } from 'amos-3d/lib/threeTools';
import imgUrl from '../../consts/imgUrl';


const { resizeConnect } = Connect;
const { Math: A3DMath } = A3DUtil;
const { ANIMATION_CONSTS } = DESIGNER_CONSTS;
const { STAGE_EVENT_TYPE } = INNER_CONSTS;

const options = {
  light: [
    { type: 'AmbientLight', options: { color: 0xffffff, intensity: 0.15 } },
    { type: 'DirectionalLight', options: { color: 0xffffff, intensity: 0.15 } }
  ],
  floorBoard: {
    visible: true, // 地板显隐
    position: { y: -60 }, // 地板坐标
    showType: 'grid', // 显示类型 分为 grid、both 和 mesh 三种类型
    size: 600, // 底板的大小，用于 HelperGrid 和 PlaneBufferGeometry 中宽度
    divisions: 20, // 格子数
    colorCenterLine: '#ffffff',
    colorGrid: '#ffffff',
    //  Grid 配置信息 仅是 Material 属性配置
    gridOptions: {
      opacity: 0.2,
      transparent: true
    },

    widthSegments: 1,
    heightSegments: 1,
    boardColor: '#070709',
    // 地板 mesh 配置， 仅是 Material 属性配置
    boardOptions: {

    }
  }
};

const graphParams = {
  sceneOptions: {
    background: 'rgb(0,11,36)'
  },
  cameraOptions: {
    fov: 45,
    near: 1,
    far: 5000,
    rotateY: 10,
    position: { z: 300 },
    // 是否启用拾取器
    enablePicker: true,
    builtInOrbit: {
      maxPolarAngle: Math.PI * 0.5,
      minDistance: 1,
      maxDistance: 5000,
      autoRotate: true,
      rotateSpeed: 0.001
    }
  }
};

const positions = [[],[400, 0, -10], [150, 0, 0],[75, 0, 0], [0, 0, 0], [-150, 0, 0], [-75, 0, 0]]

const genModelItem = (modeyKey, hasMtl, displayName, index) => {
  const objParam = {
    objPath: `/src/assets/threeres/models/shm/${modeyKey}.obj`
  };
  if (hasMtl){
    objParam.mtlPath = `/src/assets/threeres/models/shm/${modeyKey}.mtl`;
  }
  const basicAttr = {
    name: '',
    displayName,
    visible: index === 1 ? false : true,
    position: positions[index],
    rotation: null,
    scale: null
  };
  return {
    modeyKey,
    id: `${modeyKey}-${index}`,
    objParam,
    basicAttr,
    type: 'model'
  };
};

const modelsPool = [
  genModelItem('ZC1', true, '消防栓1号', 2),
  genModelItem('ZC2', true, '消防栓2号', 3),
  genModelItem('ZC3', true, '机器人1号', 4),
  genModelItem('ZC5', true, '无人机1号', 5),
  genModelItem('ZC4', true, '无人机1号', 6)
];

// target 需要填充所对应的模型 id
const animations = [
  { animateKey: 'anim-1', id: 1, name: '初始动画', target: 'ZC1-2', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 },
    linkObjModel: [
    //{ target: 'ZC1-2', animateParams: { animationType: 'moveTo', position: [0, 0, -70], duration: 500 } },
    { target: 'ZC2-3', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 } },
    { target: 'ZC3-4', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 } },
    { target: 'ZC5-5', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 } },
    { target: 'ZC4-6', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 } },
    ] }
];

const animation = [
  { animateKey: 'anim-10', id: 5, name: '隐藏动画', target: 'ZC1-2', animateParams: { animationType: 'moveTo', position: [150, 0, 0], duration: 500 },
    linkObjModel: [
    //{ target: 'ZC1-2', animateParams: { animationType: 'moveTo', position: [150, 0, -70], duration: 500 } },
    { target: 'ZC2-3', animateParams: { animationType: 'moveTo', position: [75, 0, 0], duration: 500 } },
    { target: 'ZC3-4', animateParams: { animationType: 'moveTo', position: [0, 0, 0], duration: 500 } },
    { target: 'ZC5-5', animateParams: { animationType: 'moveTo', position: [-150, 0, 0], duration: 500 } },
    { target: 'ZC4-6', animateParams: { animationType: 'moveTo', position: [-75, 0, 0], duration: 500 } },
    ] }
];

const animationMove = [
  { animateKey: 'anim-5', id: 9, name: '摄像机动画', target: '', startTimeout: 1, endTimeout: 1.5, duration: 0.5, animateParams: {
    animationType: 'fitView', duration: 3000, position: [327.2441, 152.4367, -214.1621]
  } }
];



class ModelAnalysisPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      currentKey: '',
      playState: true
    };
    /**
     * 上一次动画
     */
    this.prevAnimKey = null;
  }

  componentDidMount() {
    this.parseThing();
    this.r3d.on(ANIMATION_CONSTS.ANIMATION_FRAME_CHANGE, this.onAnimationChange);
    this.r3d.on(ANIMATION_CONSTS.ANIMATION_END, this.onAimationEnd);
    //this.a3dRef.playAll();
  }

  componentWillUnmount() {
    this.r3d.off(ANIMATION_CONSTS.ANIMATION_FRAME_CHANGE, this.onAnimationChange);
    this.r3d.off(ANIMATION_CONSTS.ANIMATION_END, this.onAimationEnd);
  }

  onGraphCreated = ({ r3d, stagePilot }) => {
    this.r3d = r3d;
    this.stagePilot = stagePilot;
    this.outlineHelper = stagePilot.outlineHelper;
  }

  /** 监听动画每一步执行，当前动画执行开始时触发 */
  onAnimationChange = (animate) => {
    if (animate && animate.target){
      this.toggleOutline(animate.target, '#fff');

      if (this.prevAnimKey !== animate.target){
        this.toggleOutline(this.prevAnimKey, null);
        // 将当前正在执行的 animate target 赋值给 prevAnimKey
        this.prevAnimKey = animate.target;
      }
    }

    this.setState({
      currentKey: animate.animateKey
    });
  }

  /** 执行所有动画时，最后一个动画执行完成时监听 */
  onAimationEnd = (animate) => {
    console.log('last animate done:', animate);
  }

  parseThing = () => {
    console.log(modelsPool);
    /**
     * parseEverything(modelsParam = [], itemFmt, filter) 接收三个参数
     * modelsParam: 模型原始数据
     * itemFmt: 每一条数据进行数据格式化
     * filter: 每一条数据进行过滤，返回值为true，则采用 modelParser 进行数据创建。可以再filter 中进行其它操作，同时返回 Boolean
     */
    this.a3dRef.parseEverything(modelsPool, null, (item, modelParser) => {
/*       if (item.type === 'particle'){
        const particle = this.addParticle({
          userData: item,
          data: fireData
        });
        // 添加到 parser 的 cache 中，以供动画使用, 注意，此处的 item.id 需要和 targetKeys 中的项保持一致
        modelParser.cacheIn(item.id, particle);
      } */
      return item.type === 'model'; // 仅处理 model
    });
  }

  toggleOutline(modelKey, outlineColor){
    const parser = this.a3dRef.modelParser.get(modelKey);
    if (parser){
      // 设置 outline
      if (!parser.objHelper.outlineHelper){
        parser.objHelper.setOutlineHelper(this.outlineHelper);
      }
      parser.objHelper.style.outlineColor = outlineColor;
    }
  }

  full = () =>{
    // 触发全屏
    this.r3d.trigger(STAGE_EVENT_TYPE.FULLSCREEN);
  }

  handleModelParserData = (parser, fmtData) => {
    // 将 fmtData 绑定到 parser 的 node.userData 上
    // Object.assign(parser.obj.userData, fmtData)
    // or
    parser.bindUserData(fmtData);

    // 初始 绑定 title
    if (fmtData.modeyKey === 'people'){
      // 需要根据不同的模型，设置具体参数
      parser.objHelper.titleConfig = {
        planeOptions: {
          width: 256 * 0.1,
          height: 128 * 0.1,
          // 顶牌相对于 parser 模型的位置
          position: [0, 88.22, 0],
          // 是否双面
          doubleSide: true
        },
        canvasOptions: {
          fillStyle: 'rgb(51, 51, 51)',
          font: '32px sans-serif',
          textBaseline: 'middle'
        }
      };
      parser.objHelper.title = fmtData.basicAttr.displayName;
    }
  }


  handleParticlesCreated = ({ particleHelper }) => {
    this.particleHelper = particleHelper;
  };

  /** 创建粒子 */
  addParticle = (param = {}) => {
    return this.particleHelper.create(param);
  };

  // 组合
  handlePlay = () => {
    this.setState({
      checked: 0
    },() => {
      this.a3dRef.parseAnimation(animations);
      this.a3dRef.playAll();
    });
  }
  // 展开
  handleUnfold = () => {
    this.setState({
      checked: 1
    },() => {
      this.a3dRef.parseAnimation(animation);
      this.a3dRef.playAll();
    });
    console.log(this.a3dRef);
  }

  render() {
    const { checked } = this.state;
    const { dimension } = this.props;
    const graphicProps = {
      ...dimension,
      ...graphParams,
      enableModelParser: true,
      disabledEdit: true,
      defaultLoading: false,
      // 启用 objHelper 方式设置 outline
      enableObjOutline: true,
      options,
      onCreated: this.onGraphCreated,
      handleModelParserData: this.handleModelParserData,
      enableParticles: true,
      particlesProps: {
        onCreated: this.handleParticlesCreated
      }
    };

    return (
      <div className="designer">
        <div className="designer-control" style={{ padding: 2 }}>
          <div className={`control-button-bg ${checked === 0 ? 'control-button-bg-checked' : ''}`} onClick={this.handlePlay}>
            {/* <img src={imgUrl.imgUrls.he} alt='组合' /> */}组合
          </div>
          <div className={`control-button-bg ${checked === 1 ? 'control-button-bg-checked' : ''}`} onClick={this.handleUnfold}>
            {/* <img src={imgUrl.imgUrls.fen} alt='展开' /> */} 展开
          </div>
        </div>
        <A3DDesigner {...graphicProps} ref={node => this.a3dRef = node} />
      </div>
    );
  }
}

ModelAnalysisPool.propTypes = {
  dimension: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default ModelAnalysisPool;
