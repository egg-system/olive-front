const maintenancePath = '/maintenance/'

export default function({ route, redirect, env }) {
  const isMaintenance = env.isMaintenance
  const isMaintenancePath = route.path === maintenancePath

  if (!isMaintenance && isMaintenancePath) {
    redirect('/')
  }

  if (isMaintenance && !isMaintenancePath) {
    redirect(maintenancePath)
  }
}
