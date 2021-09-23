import { useCubeTexture, useGLTF } from '@react-three/drei'
import { MeshStandardMaterialProps } from '@react-three/fiber'
import * as THREE from 'three'
import { BufferGeometry } from 'three'
import { GLTF } from 'three-stdlib'

type Material = MeshStandardMaterialProps & { [key: string]: unknown }
type Model = GLTF & {
  materials: {
    ComputerFrame: Material
    ComputerScreen: Material
  }
  nodes: {
    Frame_ComputerFrame_0: { geometry: BufferGeometry }
    Screen_ComputerScreen_0: { geometry: BufferGeometry }
  }
}

export function useModel(isLaptopOpened: boolean, isSkeletonMode: boolean) {
  const laptopModel = useGLTF('/laptop/laptop.glb') as Model

  const bumpMap = new THREE.TextureLoader().load('/textures/bump-map.jpg')
  const envMap = useCubeTexture(
    ['env.jpg', 'env.jpg', 'env.jpg', 'env.jpg', 'env.jpg', 'env.jpg'],
    { path: '/textures/' }
  )

  const frameMaterial = laptopModel.materials.ComputerFrame
  frameMaterial.metalness = 0.8
  frameMaterial.roughness = 0.4
  frameMaterial.color = new THREE.Color('#d0d5db')
  frameMaterial.emissive = new THREE.Color('#C6C6C6')
  frameMaterial.emissiveIntensity = 1.8
  frameMaterial.bumpMap = bumpMap
  frameMaterial.bumpScale = 0.0002
  frameMaterial.envMap = envMap
  frameMaterial.envMapIntensity = isLaptopOpened ? 1.5 : 0.3
  frameMaterial.wireframe = isSkeletonMode

  const screenMaterial = laptopModel.materials.ComputerScreen
  screenMaterial.metalness = 0.8
  screenMaterial.roughness = 0.35
  screenMaterial.color = new THREE.Color('#d0d5db')
  screenMaterial.bumpMap = bumpMap
  screenMaterial.bumpScale = isLaptopOpened ? 0 : 0.0001
  screenMaterial.envMap = envMap
  screenMaterial.envMapIntensity = isLaptopOpened ? 1.5 : 0.3
  screenMaterial.wireframe = isSkeletonMode

  return {
    frame: {
      material: frameMaterial as THREE.Material,
      geometry: laptopModel.nodes.Frame_ComputerFrame_0.geometry,
    },
    screen: {
      material: screenMaterial as THREE.Material,
      geometry: laptopModel.nodes.Screen_ComputerScreen_0.geometry,
    },
  }
}
