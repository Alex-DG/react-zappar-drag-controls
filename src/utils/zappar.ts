import * as ZapparThree from '@zappar/zappar-threejs'

export const ZapparPermissionRquest = async (
  callback: (value: boolean) => void
) => {
  const granted = await ZapparThree.permissionRequest()
  if (granted) return callback(true)
  else ZapparThree.permissionDeniedUI()
}
