const matenancePath = '/maintenance'

export default function({ route, redirect }) {
  const isMaintenance = process.env.isMaintenance
  const isMaintenancePath = route.path === matenancePath

  if (!isMaintenance && isMaintenancePath) {
    redirect('/')
  }

  if (isMaintenance && !isMaintenancePath) {
    redirect(matenancePath)
  }
}
