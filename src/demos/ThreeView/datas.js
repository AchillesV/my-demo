import * as THREE from 'three';
import { modelClassifyMapper, TextureFactory } from 'amos-3d';
import { A3DUtil, helper } from 'amos-3d/lib/threeTools';
import { backgroundHelpers, materialHelpers } from 'amos-3d/lib/helpers';

const A3DMath = A3DUtil.Math;
const { getInnerSkybox } = backgroundHelpers;
const { MeshMaterialTypes, createMeshMaterial } = materialHelpers;

const getManor = (names) => {
  return names.map(n => {
    const objParam = {
      basePath: '/threeres/models/shm/',
      objName: n.objName,
      mtlName: n.mtlName,
      modelLevel: n.modelLevel
    };
    if (n.foreignKey){
      objParam.foreignKey = n.foreignKey;
    }
    if (n.primaryKey){
      objParam.primaryKey = n.primaryKey;
    }
    return objParam;
  });
};

/**
 * 系统 obj 模型
 */
export const modelMapper = {
  manor: getManor([
    { "objName": "plane.obj", "mtlName": "ground.mtl", "modelLevel": "Park" }
  ])
};

