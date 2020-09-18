import React from 'react';

class TestComponent extends React.Component {
  render () {
    return <input value="LinDaiDai"></input>
  }
}

function MyHoc(WrapComponent) {
  return class extends WrapComponent {
    componentDidMount () {
      setTimeout(() => {
        console.log(this.props)
      },2000)
    }
    render () {
      let res = super.render();
      let newProps = {value: '666'};
      let finalProps = Object.assign({}, res.props, newProps);
      let result = React.cloneElement(
        res,
        finalProps,
        res.props.children
      )
      console.log(res)
      console.log(Object.getOwnPropertyDescriptors(res));
      return result
    }
  }
}

const Hoc = MyHoc(TestComponent)

export default Hoc;