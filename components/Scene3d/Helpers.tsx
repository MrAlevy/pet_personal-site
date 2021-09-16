import {
  GizmoHelper as GizmoHelperDREI,
  GizmoViewport,
} from '@react-three/drei'

export const GizmoHelper = () => (
  <GizmoHelperDREI
    alignment='bottom-right'
    margin={[60, 60]}
    onUpdate={() => {
      null
    }}
  >
    <GizmoViewport
      axisColors={['#f7867e', '#7ef782', '#827ef7']}
      labelColor='black'
    />
  </GizmoHelperDREI>
)
