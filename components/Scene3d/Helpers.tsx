import {
  GizmoHelper as GizmoHelperDREI,
  GizmoViewport,
  useHelper,
} from '@react-three/drei'
import { MutableRefObject } from 'react'
import * as THREE from 'three'
import { SHOW_HELPERS } from './config'

export const GizmoHelper = () => (
  <GizmoHelperDREI
    alignment='bottom-right'
    margin={[60, 60]}
    onUpdate={() => {
      null
    }}
  >
    {SHOW_HELPERS && (
      <GizmoViewport
        axisColors={['#f7867e', '#7ef782', '#827ef7']}
        labelColor='black'
      />
    )}
  </GizmoHelperDREI>
)

export const LightHelpers = ({
  refs,
  disabled,
}: {
  refs: {
    spotLight: MutableRefObject<undefined>
    ambientLight: MutableRefObject<undefined>
  }
  disabled: boolean
}) => {
  useHelper(
    refs.spotLight,
    SHOW_HELPERS && !disabled ? THREE.SpotLightHelper : THREE.PointLightHelper,
    0,
    '#ffffff'
  )
  useHelper(
    refs.ambientLight,
    THREE.PointLightHelper,
    SHOW_HELPERS && !disabled ? 0.1 : 0,
    '#ff3c77'
  )

  return null
}
