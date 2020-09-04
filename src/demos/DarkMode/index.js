import React,{ useEffect } from 'react';
import { Button } from 'antd';
import './index.css';

function DarkMode() {

  const handleChange = (e) => {
    console.log(e);
    var inputFile = document.getElementById('inputFile');
    var body = document.body || document.getElementsByTagName('body')[0];
    var files = Array.from(e.target.files)
    files.forEach(function(item) {
        var image = new Image()
        image.src = createObjectURL(item)
        body.appendChild(image)
        image.onload = function() {
            revokeObjectURL(this.src)
        }
    })
    
  }

  function createObjectURL(file) {
    if (window.URL) {
        return window.URL.createObjectURL(file)
    } else {
        return window.webkitURL.createObjectURL(file)
    }
  }

  function revokeObjectURL(file) {
    if (window.URL) {
        return window.URL.revokeObjectURL(file)
    } else {
        return window.webkitURL.revokeObjectURL(file)
    }
  }

  return (
    <div>
      测试黑暗模式
      <div>
      <input type='file' multiple accept='image/png, image/jpeg, image/jpg, image/svg, image/gif' id='inputFile' onChange={handleChange} />
      <label for="inputFile">上传图片</label>
      </div>
    </div>
  )
}

export default DarkMode;