export function isPlaceholder(url: string | undefined): boolean {
  if (!url) return true
  return url.includes("/placeholder.svg") || url.includes("placeholder.svg")
}

export function getProjectImage(project: any): string {
  const image = project.mainImage || project.image

  if (isPlaceholder(image)) {
    // Status'e göre varsayılan görsel seç
    if (project.status === "ongoing") {
      return "/construction-site-building-progress.jpg"
    } else if (project.status === "upcoming") {
      return "/architectural-rendering-building.jpg"
    } else {
      return "/modern-apartment-building-istanbul.jpg"
    }
  }

  return image || "/modern-apartment-building-istanbul.jpg"
}

export function getServiceImage(service: any): string {
  const image = service.image

  if (isPlaceholder(image)) {
    // Service ID'ye göre varsayılan görsel seç
    if (service.id === "ticari" || service.title?.toLowerCase().includes("ticari")) {
      return "/modern-office-building.png"
    } else if (service.id === "karma" || service.title?.toLowerCase().includes("karma")) {
      return "/commercial-building-construction.png"
    } else {
      return "/modern-apartment-building.png"
    }
  }

  return image || "/modern-apartment-building.png"
}
